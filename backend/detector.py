from ultralytics import YOLO

# Load model once
model = YOLO("yolov8n.pt")

KNOWN_OBJECTS = [
    "apple", "banana", "orange",
    "dog", "cat",
    "car", "bus", "bicycle",
    "bottle", "chair", "cup", "book", "backpack"
]

def detect_object(image_path):
    try:
        results = model(image_path, conf=0.25, verbose=False)

        best_label = "unknown"
        best_conf = 0

        for result in results:
            for box in result.boxes:
                conf = float(box.conf[0])
                cls = int(box.cls[0])
                label = result.names[cls]

                if conf > best_conf:
                    best_conf = conf
                    best_label = label

        if best_label in KNOWN_OBJECTS:
            return best_label

        return "unknown"

    except Exception as e:
        print("YOLO error:", e)
        return "unknown"