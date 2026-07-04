import React from "react";
import { useNavigate } from 'react-router-dom';

export default function AIAccidentDetector() {
  const navigate = useNavigate();
  return (
    <article className="project-detail active">
      <button
        className="back-btn"
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          color: '#00ff41',
          border: 'none',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginBottom: '2rem',
          textDecoration: 'underline',
        }}
      >
        ← Back to Portfolio
      </button>
      <header>
        <h2 className="h2">AI Accident Detector</h2>
      </header>
      <section>
        <p>
          <b>Overview:</b><br />
          Developed a real-time AI-powered accident detection system for live video streams. The system analyzes each frame using computer vision to detect potential vehicle crashes, instantly alerts the user, and auto-saves a 5-second video clip of the event for later review. Designed for fast edge deployment—no cloud or frontend required.
        </p>
        <h3>Key Features</h3>
        <ul>
          <li>
            Connects to any live video source (IP camera, USB webcam, etc.)
          </li>
          <li>
            Runs real-time accident detection using custom-trained CNN models
          </li>
          <li>
            Sends alerts (email, SMS, or CLI) on accident detection
          </li>
          <li>
            Auto-saves 5-second video clips for incidents (pre and post-crash)
          </li>
        </ul>
        <h3>Tech Stack</h3>
        <ul>
          <li>Python, OpenCV, PyTorch/TensorFlow (for detection model), ffmpeg</li>
        </ul>
        <h3>Workflow</h3>
        <ol>
          <li>
            <b>Model Training:</b> Trained a CNN model on a custom dataset of accident/no-accident frames (scraped from dashcams and traffic cams).
          </li>
          <li>
            <b>Real-time Stream Processing:</b> Captures live video stream, processes every Nth frame for efficiency.
          </li>
          <li>
            <b>Detection & Buffering:</b> Maintains a rolling buffer of last 5 seconds. On detection, saves the buffer as a video clip.
          </li>
          <li>
            <b>Alerting:</b> Sends instant alert (email/SMS/CLI) to user/admin on detection.
          </li>
        </ol>
        <h3>Sample Code Snippets</h3>
        <b>1. Real-Time Frame Processing and Buffering:</b>
        <pre>{`
import cv2
from collections import deque

cap = cv2.VideoCapture(0)  # or your video stream
buffer = deque(maxlen=150)  # For 30 FPS, 5 seconds

while True:
    ret, frame = cap.read()
    if not ret:
        break
    buffer.append(frame)
    # ... run inference every N frames
`}</pre>
        <b>2. Crash Detection with PyTorch Model:</b>
        <pre>{`
import torch
model = torch.load('accident_cnn.pt')
model.eval()
def detect_crash(frame):
    input_tensor = preprocess(frame)
    output = model(input_tensor)
    return output.argmax().item() == 1  # 1 = accident
`}</pre>
        <b>3. Saving Video Clip on Detection:</b>
        <pre>{`
import cv2
def save_clip(frames, filename='crash_clip.avi'):
    height, width, _ = frames[0].shape
    out = cv2.VideoWriter(filename, cv2.VideoWriter_fourcc(*'XVID'), 30, (width, height))
    for f in frames:
        out.write(f)
    out.release()
`}</pre>
        <b>4. Simple CLI/Email Alert (pseudo):</b>
        <pre>{`
if detect_crash(frame):
    save_clip(list(buffer))
    print("[!] Accident detected! Clip saved.")
    send_email_alert("Accident detected!", "See attached video.")
`}</pre>
        <h3>Result</h3>
        <ul>
          <li>
            Near real-time crash detection on any live video stream
          </li>
          <li>
            Instant alerts and automatic clip saving for rapid incident review
          </li>
          <li>
            Efficient enough for edge deployment (Raspberry Pi, Jetson Nano, NVR, etc.)
          </li>
        </ul>
      </section>
      <button
        className="back-btn"
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          color: '#00ff41',
          border: 'none',
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginTop: '2rem',
          textDecoration: 'underline',
        }}
      >
        ← Back to Portfolio
      </button>
    </article>
  );
}
