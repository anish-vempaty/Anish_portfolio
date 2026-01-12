import React from "react";
import { useNavigate } from 'react-router-dom';

export default function JobSeekAgent() {
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
                <h2 className="h2">JObseek-agent</h2>
            </header>
            <section>
                <p>
                    <b>Overview:</b> <br />
                    An AI agent designed to help find and apply for jobs. The agent can search for jobs, tailor the resume, generate cover letters, and create a complete application package.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Job search automation</li>
                    <li>Resume tailoring</li>
                    <li>Cover letter generation</li>
                    <li>Application package creation</li>
                </ul>
                <h3>Tech Stack</h3>
                <ul>
                    <li>AI Agents, Python</li>
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
