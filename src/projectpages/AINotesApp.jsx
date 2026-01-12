import React from "react";
import { useNavigate } from 'react-router-dom';

export default function AINotesApp() {
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
                <h2 className="h2">AI-notes-app</h2>
            </header>
            <section>
                <p>
                    <b>Overview:</b> <br />
                    A Python application that listens to audio from a microphone and transcribes it into a Markdown file in real-time. It uses the <code>faster-whisper</code> model for transcription and <code>webrtcvad</code> for voice activity detection.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Real-time audio transcription</li>
                    <li>Output to Markdown file</li>
                    <li>Voice activity detection</li>
                </ul>
                <h3>Tech Stack</h3>
                <ul>
                    <li>Python, faster-whisper, webrtcvad</li>
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
                    marginBottom: '2rem',
                    textDecoration: 'underline',
                }}
            >
                ← Back to Portfolio
            </button>
        </article>
    );
}
