import React from 'react';
import { useNavigate } from 'react-router-dom';

// Shared layout for project detail pages: back links top and bottom around the content.
export default function ProjectPage({ title, children }) {
  const navigate = useNavigate();
  const backButton = (
    <button className="back-btn" onClick={() => navigate('/')}>
      ← Back to Portfolio
    </button>
  );

  return (
    <article className="project-detail active">
      {backButton}
      <header>
        <h2 className="h2">{title}</h2>
      </header>
      {children}
      {backButton}
    </article>
  );
}
