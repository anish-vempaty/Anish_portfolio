import React from "react";
import { useNavigate } from 'react-router-dom';

export default function CustomCybersecurityLLM() {
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
                <h2 className="h2">Custom Cybersecurity LLM</h2>
            </header>
            <section>
                <p>
                    <b>Overview:</b> <br />
                    Fine-tuned a Qwen2.5 7B model on curated cybersecurity datasets for threat and secure code analysis. Integrated an optimized GPU-accelerated inference pipeline with quantized deployment.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Fine-tuned Qwen2.5 7B model</li>
                    <li>Curated cybersecurity datasets</li>
                    <li>Threat and secure code analysis</li>
                    <li>GPU-accelerated inference pipeline</li>
                    <li>Quantized deployment</li>
                </ul>
                <h3>Tech Stack</h3>
                <ul>
                    <li>HuggingFace, CUDA, Python, Qwen2.5 7B</li>
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
