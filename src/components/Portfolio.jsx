import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const projects = [
  { title: 'RISC-V C910 Redesign for x86 Compatibility', category: 'Hardware / Systems', group: 'Systems', img: 'assets/images/covers/riscv-c910.svg', description: 'Modified the C910 core\'s ALU and decode logic in Verilog, running x86-targeted workloads ~40% faster in QEMU co-simulation.', route: '/projects/riscv-c910' },
  { title: 'Custom Cybersecurity LLM', category: 'AI / Cybersecurity', group: 'Security', img: 'assets/images/covers/cybersecurity-llm.svg', description: 'Fine-tuned Qwen2.5 7B model for threat analysis with GPU-accelerated inference.', route: '/projects/custom-cybersecurity-llm' },
  { title: 'Quantum-Resistant Password Manager', category: 'Security / Rust', group: 'Security', img: 'assets/images/covers/quantum-password.svg', description: 'Hybrid post-quantum password manager using ML-KEM and AES-GCM.', route: '/projects/quantum-password-manager' },
  { title: 'Real-Time Voice Cloning', category: 'Deep Learning', group: 'AI & ML', img: 'assets/images/covers/voice-cloning.svg', description: 'Real-time multispeaker TTS with voice cloning capabilities.', route: '/projects/real-time-voice-cloning' },
  { title: 'AI Hedge Fund', category: 'AI / Finance', group: 'AI & ML', img: 'assets/images/covers/ai-hedge-fund.svg', description: 'AI-powered hedge fund POC with multiple investor agents.', route: '/projects/ai-hedge-fund' },
  { title: 'AI Notes App', category: 'AI / Productivity', group: 'AI & ML', img: 'assets/images/covers/ai-notes.svg', description: 'Real-time audio transcription to Markdown using faster-whisper.', route: '/projects/ai-notes-app' },
  { title: 'JobSeek Agent', category: 'AI Agent', group: 'AI & ML', img: 'assets/images/covers/jobseek-agent.svg', description: 'AI agent for job search automation and resume tailoring.', route: '/projects/jobseek-agent' },
  {
    title: 'Edge Device Cyber Threat Detection Using ML', category: 'AI / Cybersecurity', group: 'Security', img: 'assets/images/Raspi.png',
    description: 'Real-time network threat detection with Scapy and ML models, deployed on a Raspberry Pi 5.',
    route: '/projects/edge-threat-detection'
  },
  {
    title: 'Cloud-Based Source Code Vulnerability Detector', category: 'Cloud Security', group: 'Cloud', img: 'assets/images/cloudcode.jpeg',
    description: 'Serverless AWS pipeline scanning GitHub repos with Semgrep, plus AI-assisted remediation.',
    link: 'https://github.com/Abhi270600/Cloud-Based-Source-Code-Vulnerability-Detector'
  },
  {
    title: '3D Scene Reconstruction from Single Camera Video', category: 'Computer Vision', group: 'AI & ML', img: 'assets/images/3D_room.png',
    description: 'NeRF-based photorealistic 3D reconstruction pipeline built on COLMAP and PyTorch.',
    route: '/projects/3d-reconstruction'
  },
  {
    title: 'AI Code Assistant (Gemini Flash Edition)',
    category: 'AI / Productivity', group: 'AI & ML',
    img: 'assets/images/Gemini.png',
    description: 'Desktop AI coding assistant with PyQt6 GUI that reviews and auto-edits code via Gemini 2.5 Flash.',
    link: 'https://github.com/anish-vempaty/ai-code-assistant'
  },
  { title: 'AI Chat Assistant App (Android)', category: 'Mobile / AI', group: 'Web & Apps', img: 'assets/images/AI_android.png', description: 'Kotlin Android app using the Gemini API with voice and chat.', route: '/projects/ai-chat-app' },
  {
    title: 'Volcano Project Security Self-Assessment', category: 'Security Audit', group: 'Security', img: 'assets/images/Volcano.png',
    description: 'CNCF-handbook security assessment of Volcano: threat modeling, code review, and deployment risks.',
    link: 'https://github.com/volcano-sh/volcano'
  },
  {
    title: 'Linux Disk I/O & System Call Benchmark Suite',
    category: 'Systems / OS', group: 'Systems',
    img: 'assets/images/Linux_read.png',
    description: 'C benchmark suite for Linux file I/O, caching, and syscall overhead with graphed analysis.',
    link: 'https://github.com/anish-vempaty/Intro_to_OS_NYU_final_project'
  },
  { title: 'DeepFake Detection Using CNN-LSTM', category: 'Deep Learning', group: 'AI & ML', img: 'assets/images/Deepfake.png', description: 'Hybrid CNN-LSTM model with Flask UI and Grad-CAM.', route: '/projects/deepfake-detection' },
  { title: 'AI-Enhanced WiFi Decryption (Pwnagotchi)', category: 'Edge AI / Security', group: 'Security', img: 'assets/images/pwnogo.jpg', description: 'RL-powered handshake capture & decryption on Pi Zero.', link: 'https://github.com/anish-vempaty/pwnagotchi_v2' },
  { title: 'AI-Powered Coding Mentor', category: 'GenAI / EdTech', group: 'AI & ML', img: 'assets/images/AI_coding.png', description: 'GPT-3.5 assistant for code explainability & debugging.', route: '/projects/ai-coding-mentor' },
  {
    title: 'Dining Concierge Chatbot',
    category: 'Cloud / AWS', group: 'Cloud',
    img: 'assets/images/Chatbot.png',
    description: 'Serverless restaurant recommender on AWS Lex, Lambda, SQS, and DynamoDB with email matches.',
    link: 'https://github.com/anish-vempaty/Cloud_Computing_Assignment-1'
  },
  {
    title: 'AI Photo Album',
    category: 'Cloud / AI / Fullstack', group: 'Cloud',
    img: 'assets/images/AI_photo.png',
    description: 'AWS-powered photo album with Rekognition auto-labeling and natural-language search.',
    link: 'https://github.com/anish-vempaty/AI-photo-album'
  },
  { title: 'Vibe (Spotify-Clone)', category: 'Web Dev', group: 'Web & Apps', img: 'assets/images/Vibe.png', description: '"Instagram for music" full-stack app using the Spotify API.', route: '/projects/vibe' },
  { title: 'Perspective (VR Puzzle Game)', category: 'Game Dev', group: 'Web & Apps', img: 'assets/images/VR (2).png', description: 'Unity VR maze game with gravity-shifting puzzles.', route: '/projects/perspective' },
  { title: 'Uberlytics (Uber Surge Visualizer)', category: 'Frontend / Data Viz', group: 'Web & Apps', img: 'assets/images/Uberlitics.png', description: 'Website visualizing UberRUSH surge trends via Firebase.', route: '/projects/uberlytics' },
  { title: 'ChatBox (Community Chat Platform)', category: 'App Dev', group: 'Web & Apps', img: 'assets/images/Chatfire.png', description: 'Elegant group chat app for communities.', link: 'https://github.com/anish-vempaty/firechat_1' },
  {
    title: 'AI Crash',
    category: 'AI / Simulation', group: 'AI & ML',
    img: 'assets/images/AI_car_crash.png',
    description: 'Simulating AI crashes and analyzing the causes.',
    route: '/projects/ai-crash'
  },
  {
    title: 'Live Indian Railways Tweet Emergency Classifier',
    category: 'NLP / Streaming AI', group: 'AI & ML',
    img: 'assets/images/trainem.png',
    description: 'Kafka + Spark pipeline classifying live IRCTC tweets as emergencies from 5,000+ labeled samples.',
    link: 'https://github.com/anish-vempaty/major_proj'
  },
  {
    title: 'Twitter User Personality Classification (MBTI)',
    category: 'NLP / ML', group: 'AI & ML',
    img: 'assets/images/Persona.png',
    description: 'MBTI prediction from 8,000+ Twitter users comparing five classic ML models.',
    link: 'https://github.com/anish-vempaty/Personality-Classification-using-twitter'
  },
];

const FILTERS = ['All', 'AI & ML', 'Security', 'Cloud', 'Web & Apps', 'Systems'];

function ProjectCard({ p }) {
  return (
    <>
      <figure className="project-img">
        <div className="project-item-icon-box"><Eye size={22} aria-label="View project" /></div>
        <img src={p.img} alt={p.title} loading="lazy" />
      </figure>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-category">{p.category}</p>
      <p className="project-description">{p.description}</p>
    </>
  );
}

export default function Portfolio({ show }) {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? projects : projects.filter(p => p.group === filter);

  return (
    <article className={`portfolio${show ? ' active' : ''}`} data-page="portfolio">
      <header><h2 className="h2 article-title">Portfolio</h2></header>
      <section className="projects">
        <ul className="filter-list">
          {FILTERS.map(f => (
            <li className="filter-item" key={f}>
              <button
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            </li>
          ))}
        </ul>
        <ul className="project-list">
          {visible.map((p) => (
            <li key={p.title} className="project-item active" data-category={p.category.toLowerCase()}>
              {p.route ? (
                <Link to={p.route}><ProjectCard p={p} /></Link>
              ) : (
                <a href={p.link} target="_blank" rel="noopener noreferrer"><ProjectCard p={p} /></a>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
