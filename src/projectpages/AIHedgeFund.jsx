import React from "react";
import { useNavigate } from 'react-router-dom';

export default function AIHedgeFund() {
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
                <h2 className="h2">ai-hedge-fund</h2>
            </header>
            <section>
                <p>
                    <b>Overview:</b> <br />
                    An AI-powered hedge fund proof-of-concept that uses multiple AI agents to make trading decisions. It includes agents based on famous investors like Warren Buffett and Cathie Wood. The project has a command-line interface and a web application.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Multiple AI agents for trading decisions</li>
                    <li>Agents based on famous investors (Warren Buffett, Cathie Wood)</li>
                    <li>Command-line interface and web application</li>
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
