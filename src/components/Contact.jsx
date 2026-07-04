import React from 'react';
import { Mail, Phone, Linkedin, Github, FileText } from 'lucide-react';

export default function Contact({ show }) {
  return (
    <article className={`contact${show ? ' active' : ''}`} data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      <section className="contact-form" style={{ marginBottom: '30px' }}>
        <p style={{ color: '#a6a6a6', textAlign: 'center', fontStyle: 'italic' }}>
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
        </p>
      </section>

      <section>
        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <Mail size={18} aria-label="Email" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:anish.vempaty@gmail.com" className="contact-link">anish.vempaty@gmail.com</a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <Phone size={18} aria-label="Phone" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+19296894564" className="contact-link">+1 (929) 689-4564</a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <Linkedin size={18} aria-label="LinkedIn" />
            </div>
            <div className="contact-info">
              <p className="contact-title">LinkedIn</p>
              <a href="https://www.linkedin.com/in/anish-vempaty/" className="contact-link" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/anish-vempaty/
              </a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <Github size={18} aria-label="GitHub" />
            </div>
            <div className="contact-info">
              <p className="contact-title">GitHub</p>
              <a href="https://github.com/anish-vempaty" className="contact-link" target="_blank" rel="noopener noreferrer">
                github.com/anish-vempaty
              </a>
            </div>
          </li>
          <li className="contact-item">
            <div className="icon-box">
              <FileText size={18} aria-label="Resume" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Resume</p>
              <a href="/Anish%20Vempaty_Software%20Development%20Engineer.pdf" className="contact-link" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </div>
          </li>
        </ul>
      </section>
    </article>
  );
}
