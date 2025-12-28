import React from "react";
import { useNavigate } from 'react-router-dom';

export default function QuantumPasswordManager() {
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
                <h2 className="h2">Quantum-Resistant Password Manager</h2>
            </header>
            <section>
                <p>
                    <b>Overview:</b> <br />
                    Designed a hybrid post-quantum password manager using ML-KEM and AES-GCM encryption. Implemented Argon2 key derivation and secure local storage with zero cloud dependency.
                </p>
                <h3>Key Features</h3>
                <ul>
                    <li>Hybrid post-quantum encryption (ML-KEM + AES-GCM)</li>
                    <li>Argon2 key derivation</li>
                    <li>Secure local storage</li>
                    <li>Zero cloud dependency</li>
                </ul>
                <h3>Tech Stack</h3>
                <ul>
                    <li>Rust, AES-GCM, ML-KEM, Argon2</li>
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
