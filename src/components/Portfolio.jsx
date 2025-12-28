import React from 'react';
import { Link } from 'react-router-dom';

const projects = [
  { title: 'Custom Cybersecurity LLM', category: 'AI / Cybersecurity', img: 'assets/images/Gemini.png', description: 'Fine-tuned Qwen2.5 7B model for threat analysis with GPU-accelerated inference.', route: '/projects/custom-cybersecurity-llm' },
  { title: 'Quantum-Resistant Password Manager', category: 'Security / Rust', img: 'assets/images/Gemini.png', description: 'Hybrid post-quantum password manager using ML-KEM and AES-GCM.', route: '/projects/quantum-password-manager' },
  { title: 'Real-Time Voice Cloning', category: 'Deep Learning', img: 'assets/images/Gemini.png', description: 'Real-time multispeaker TTS with voice cloning capabilities.', route: '/projects/real-time-voice-cloning' },
  { title: 'ai-hedge-fund', category: 'AI / Finance', img: 'assets/images/Gemini.png', description: 'AI-powered hedge fund POC with multiple investor agents.', route: '/projects/ai-hedge-fund' },
  { title: 'AI-notes-app', category: 'AI / Productivity', img: 'assets/images/Gemini.png', description: 'Real-time audio transcription to Markdown using faster-whisper.', route: '/projects/ai-notes-app' },
  { title: 'JObseek-agent', category: 'AI Agent', img: 'assets/images/Gemini.png', description: 'AI agent for job search automation and resume tailoring.', route: '/projects/jobseek-agent' },
  {
    title: 'Edge Device Cyber Threat Detection Using ML', category: 'AI / Cybersecurity', img: 'assets/images/Raspi.png',
    description: 'Built a smart security system using Python, Scapy, and Streamlit to detect cyber threats in real time by analyzing internet traffic. Trained classification models (Random Forest, SVM) on public datasets like CICIDS and NSL-KDD to distinguish malicious from benign traffic. Deployed the trained model on Raspberry Pi 5, enabling lightweight, on-device threat detection with low resource overhead.',
    route: '/projects/edge-threat-detection'
  },
  {
    title: 'Cloud-Based Source Code Vulnerability Detector (AWS)', category: 'Cloud Security', img: 'assets/images/cloudcode.jpeg',
    description: 'Developed a cloud-native security tool to scan GitHub repos for vulnerabilities using Python and Semgrep, with optional AI remediation using Gemini. Designed a serverless architecture using AWS Lambda, SQS, SES, API Gateway, and DynamoDB to ensure scalability and async processing. Deployed a static frontend on S3 and integrated with API Gateway for real-time result viewing and scan submission.',
    link: 'https://github.com/Abhi270600/Cloud-Based-Source-Code-Vulnerability-Detector'
  },
  {
    title: '3D Scene Reconstruction from Single Camera Video', category: 'Computer Vision', img: 'assets/images/3D_room.png',
    description: 'Implemented a 3D reconstruction pipeline from a single-camera input video using Python, COLMAP (Structure-from-Motion), and PyTorch. Generated photorealistic 3D scene representations using Neural Radiance Fields (NeRF), training with PyTorch. Visualized reconstructed 3D scenes in Python using Matplotlib and PyTorch3D, making the system interpretable even for non-technical users.',
    route: '/projects/3d-reconstruction'
  },
  {
    title: 'AI Code Assistant (Gemini Flash Edition)',
    category: 'AI / Productivity',
    img: 'assets/images/Gemini.png', // Use a screenshot of your GUI!
    description: `Desktop AI coding assistant with PyQt6 GUI — reviews, suggests, and auto-edits code using Google Gemini 2.5 Flash API. One-click VS Code integration and secure API key management.`,
    link: 'https://github.com/anish-vempaty/ai-code-assistant'
  },
  { title: 'AI Chat Assistant App (Android)', category: 'Mobile / AI', img: 'assets/images/AI_android.png', description: 'Kotlin Android app using Gemini API with voice/chat...', route: '/projects/ai-chat-app' },
  {
    title: 'Volcano Project Security Self‑Assessment', category: 'Security Audit', img: 'assets/images/Volcano.png',
    description: 'Conducted a full security self-assessment on the Volcano CNCF project as part of NYU’s “Internet Security and Privacy” course. Followed CNCF Security Assessment Handbook and evaluated the project across three stages: threat modeling, code review, and deployment risks. Identified key security gaps, misconfigurations, and areas of improvement, delivering actionable mitigation strategies.',
    link: 'https://github.com/volcano-sh/volcano'
  },
  {
    title: 'Linux Disk I/O & System Call Benchmark Suite (NYU)',
    category: 'Systems / OS',
    img: 'assets/images/Linux_read.png', // Swap in a screenshot or graph
    description: `Suite of C programs benchmarking Linux file I/O, caching, system call overhead, and multi-threaded performance. Features real-world comparisons with 'dd', detailed performance graphs, and a Matplotlib-based analysis report.`,
    link: 'https://github.com/anish-vempaty/Intro_to_OS_NYU_final_project'
  },

  { title: 'DeepFake Detection Using CNN‑LSTM', category: 'Deep Learning', img: 'assets/images/Deepfake.png', description: 'Hybrid CNN-LSTM model with Flask UI and Grad-CAM.', route: '/projects/deepfake-detection' },
  { title: 'AI-Enhanced WiFi Decryption (Pwnagotchi)', category: 'Edge AI / Security', img: 'assets/images/pwnogo.jpg', description: 'RL-powered handshake capture & decryption on Pi Zero.', link: 'https://github.com/anish-vempaty/pwnagotchi_v2' },
  { title: 'AI-Powered Coding Mentor', category: 'GenAI / EdTech', img: 'assets/images/AI_coding.png', description: 'GPT-3.5 assistant for code explainability & debugging.', route: '/projects/ai-coding-mentor' },
  {
    title: 'Dining Concierge Chatbot (Serverless Microservices, NYU)',
    category: 'Cloud / AWS',
    img: 'assets/images/Chatbot.png', // Use a diagram of your architecture or frontend screenshot
    description: `Serverless restaurant recommender chatbot (React + AWS Lex, Lambda, SQS, SNS, DynamoDB, OpenSearch). Full cloud deployment—collects preferences and emails personalized restaurant matches via chat.`,
    link: 'https://github.com/anish-vempaty/Cloud_Computing_Assignment-1'
  },
  {
    title: 'AI Photo Album (AWS, Rekognition, Lex, OpenSearch)',
    category: 'Cloud / AI / Fullstack',
    img: 'assets/images/AI_photo.png', // Use a screenshot of your app's UI!
    description: `AI-powered web photo album using AWS S3, Lambda, Rekognition, Lex, OpenSearch. Upload, auto-label, and natural language search photos from a beautiful cloud-hosted frontend.`,
    link: 'https://github.com/anish-vempaty/AI-photo-album'
  },
  { title: 'Vibe (Spotify‑Clone)', category: 'Web Dev', img: 'assets/images/Vibe.png', description: '"Instagram for music" full‑stack app using Spotify API.', route: '/projects/vibe' },
  { title: 'Perspective (VR Puzzle Game)', category: 'Game Dev', img: 'assets/images/VR (2).png', description: 'Unity VR maze game with gravity-shifting puzzles.', route: '/projects/perspective' },
  { title: 'Uberlytics (Uber Surge Visualizer)', category: 'Frontend / Data Viz', img: 'assets/images/Uberlitics.png', description: 'Website visualizing UberRUSH surge trends via Firebase.', route: '/projects/uberlytics' },
  { title: 'ChatBox (Community Chat Platform)', category: 'App Dev', img: 'assets/images/Chatfire.png', description: 'Elegant group chat app for communities.', link: 'https://github.com/anish-vempaty/firechat_1' },
  // { title: 'Micello Integrations', category: 'API / Mapping', img: 'assets/images/project-micello.png', description: 'Indoor map integrations with FlightStats and Uber.', route: '/projects/micello-integrations' },
  {
    title: 'AI Crash',
    category: 'AI / Simulation',
    img: 'assets/images/AI_car_crash.png',
    description: 'Simulating AI crashes and analyzing the causes.',
    route: '/projects/ai-crash'
  },

  {
    title: 'Live Indian Railways Tweet Emergency Classifier',
    category: 'NLP / Streaming AI',
    img: 'assets/images/trainem.png',
    description: `Built a dataset of 5,000+ manually labeled tweets mentioning IRCTC/Indian Railways. Trained an AI model to classify tweets as emergencies or feedback. Used Kafka, Spark, and a web frontend for live tweet ingestion and classification—helping IRCTC teams triage urgent cases in real time.`,
    link: 'https://github.com/anish-vempaty/major_proj'
  },
  {
    title: 'Twitter User Personality Classification (MBTI)',
    category: 'NLP / ML',
    img: 'assets/images/Persona.png',
    description: `Analyzed 8,000+ Twitter users to predict MBTI personality types from tweet history. Implemented and compared Naive Bayes, Random Forest, SVM, Decision Tree, and XGBoost—Random Forest outperformed others. Demonstrates NLP feature engineering and model comparison.`,
    link: 'https://github.com/anish-vempaty/Personality-Classification-using-twitter'
  },


];

export default function Portfolio({ show }) {
  return (
    <article className={`portfolio${show ? ' active' : ''}`} data-page="portfolio">
      <header><h2 className="h2 article-title">Portfolio</h2></header>
      <section className="projects">
        <ul className="project-list">
          {projects.map((p, i) => (
            <li key={i} className="project-item active" data-category={p.category.toLowerCase()}>
              {p.route ? (
                <Link to={p.route}>
                  <figure className="project-img">
                    <div className="project-item-icon-box"><span role="img" aria-label="eye">👁️</span></div>
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </figure>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-category">{p.category}</p>
                  <p style={{ color: '#9fffa6' }}>{p.description}</p>
                </Link>
              ) : (
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <figure className="project-img">
                    <div className="project-item-icon-box"><span role="img" aria-label="eye">👁️</span></div>
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </figure>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-category">{p.category}</p>
                  <p style={{ color: '#9fffa6' }}>{p.description}</p>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
