import React from "react";
import { useNavigate } from 'react-router-dom';

export default function RealTimeVoiceCloning() {
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
                <h2 className="h2">Real-Time Voice Cloning</h2>
            </header>
            <section>
                <p>
                    <b>Overview:</b> <br />
                    Implementation of Transfer Learning from Speaker Verification to Multispeaker Text-To-Speech Synthesis with a vocoder that works in real-time. V2TTS is a deep learning framework in three stages: creating a digital representation of a voice, and using it to generate speech from arbitrary text.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Real-time vocoder</li>
                    <li>Multispeaker Text-To-Speech Synthesis</li>
                    <li>Transfer Learning from Speaker Verification</li>
                    <li>3-stage deep learning framework</li>
                </ul>
                <h3>Tech Stack</h3>
                <ul>
                    <li>Deep Learning, V2TTS, Python</li>
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
