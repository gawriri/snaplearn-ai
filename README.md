SnapLearn AI

An AI-powered interactive learning platform for children that transforms real-world objects into educational experiences using image understanding, speech interaction, and adaptive quizzes.

Project Overview :-

SnapLearn AI is an educational web application designed to make learning more interactive and practical for children.

The system allows users to upload images of real-world objects and uses Artificial Intelligence to:

understand the image
generate educational descriptions
provide speech-based explanations
create adaptive quizzes according to different age groups

The project focuses on experience-based learning using AI-powered image understanding.

Features :-
AI-Based Image Understanding
Educational Description Generation
Speech Interaction (Text-to-Speech)
Adaptive Quiz System
Age-Based Learning Modes
Interactive Child-Friendly Interface
React.js Frontend
FastAPI Backend
BLIP AI Model Integration

Technologies Used :-

Frontend =
React.js
Vite
HTML
CSS
JavaScript

Backend =
FastAPI
Python
Uvicorn
AI / ML
BLIP Image Understanding Model
Hugging Face Transformers
Project Structure
SNAPLEARN_AI/
│
├── backend/
│   ├── detector.py
│   ├── main.py
│   ├── requirements.txt
│   ├── users.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│
└── README.md


Backend runs on:

http://127.0.0.1:8000
Frontend Setup

Open another terminal:

cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173

How It Works :- 
User uploads an image
Frontend sends image to FastAPI backend
BLIP AI model processes image
Educational descriptions are generated
Speech interaction and quizzes are created
Final learning output is displayed to the user




Future Scope :- 
Mobile Application Support
Real-Time Camera Learning
Multilingual Educational Support
Cloud Deployment
Conversational AI Integration

References :- 
FastAPI Documentation
React.js Documentation
Hugging Face Transformers
BLIP Model Documentation
Python Documentation
Author

Gauri Shailendra Shinde
M.Sc. Data Science
Savitribai Phule Pune University

License

Copyright © 2026 Gauri Shailendra Shinde

All rights reserved.

This project is developed for academic and educational purposes only.

Unauthorized copying, modification, distribution, or reuse of this project is prohibited without explicit permission from the author.
