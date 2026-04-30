from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import json

from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch

from detector import detect_object

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- BLIP MODEL ----------------

processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def generate_caption(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = processor(images=image, return_tensors="pt")

    with torch.no_grad():
        out = model.generate(**inputs)

    caption = processor.decode(out[0], skip_special_tokens=True)
    return caption

# Known objects
KNOWN_OBJECTS = [
    "apple", "banana", "orange",
    "dog", "cat",
    "car", "bus", "bicycle",
    "bottle", "chair", "cup", "book", "backpack"
]

def extract_object(caption):
    caption = caption.lower()
    for obj in KNOWN_OBJECTS:
        if obj in caption:
            return obj
    return "object"

# ---------------- LEARNING LOGIC ----------------

def learning_agent(obj):
    obj = obj.lower()

    data = {
        "apple": {"category": "fruit", "usage": "eating", "description": "An apple is a sweet fruit."},
        "banana": {"category": "fruit", "usage": "eating", "description": "A banana gives you energy."},
        "orange": {"category": "fruit", "usage": "eating", "description": "An orange is rich in vitamin C."},

        "dog": {"category": "animal", "usage": "pet", "description": "A dog is a friendly animal."},
        "cat": {"category": "animal", "usage": "pet", "description": "A cat is a cute animal."},

        "car": {"category": "vehicle", "usage": "transport", "description": "A car is used for transport."},
        "bus": {"category": "vehicle", "usage": "transport", "description": "A bus carries many people."},
        "bicycle": {"category": "vehicle", "usage": "transport", "description": "A bicycle is used for riding."},
    }

    if obj in data:
        return data[obj]

    if obj in ["dog", "cat", "horse", "cow"]:
        return {
            "category": "animal",
            "usage": "living being",
            "description": f"A {obj} is an animal."
        }

    if obj in ["apple", "banana", "orange"]:
        return {
            "category": "food",
            "usage": "eating",
            "description": f"A {obj} is something we can eat."
        }

    if obj in ["car", "bus", "truck", "train", "motorcycle", "bicycle"]:
        return {
            "category": "vehicle",
            "usage": "transport",
            "description": f"A {obj} is used for transport."
        }

    if obj in ["chair", "sofa", "bed"]:
        return {
            "category": "furniture",
            "usage": "household",
            "description": f"A {obj} is furniture used in a house."
        }

    return {
        "category": "object",
        "usage": "general",
        "description": f"This is a {obj}."
    }

# ---------------- ROUTES ----------------

@app.get("/")
def home():
    return {"message": "SnapLearn AI is running"}

@app.post("/detect")
async def detect_image(file: UploadFile = File(...)):
    file_path = "temp.jpg"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # BLIP
        caption = generate_caption(file_path)

        # Extract object
        obj = extract_object(caption)

        # Fallback to YOLO
        if obj == "object":
            obj = detect_object(file_path)

        agent = learning_agent(obj)

        return {
            "object": obj,
            "caption": caption,
            "color": "unknown",
            "category": agent["category"],
            "usage": agent["usage"],
            "description": agent["description"]
        }

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@app.get("/quiz/{obj}")
def get_quiz(obj: str):
    return {
        "question": "What is this object?",
        "options": [obj, "banana", "car", "dog"],
        "answer": obj
    }

# ---------------- AUTH ----------------

def load_users():
    if not os.path.exists("users.json"):
        save_users([])
        return []
    with open("users.json", "r") as f:
        return json.load(f)

def save_users(users):
    with open("users.json", "w") as f:
        json.dump(users, f)

@app.post("/register")
async def register(data: dict):
    users = load_users()

    for user in users:
        if user["username"] == data["username"]:
            return {"status": "fail", "message": "Username already exists"}

    users.append({
        "username": data["username"],
        "password": data["password"]
    })

    save_users(users)

    return {"status": "success", "message": "User registered"}

@app.post("/login")
async def login(data: dict):
    users = load_users()

    for user in users:
        if user["username"] == data["username"] and user["password"] == data["password"]:
            return {"status": "success"}

    return {"status": "fail"}