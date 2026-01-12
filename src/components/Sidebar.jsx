import React, { useState } from 'react';
import photo from '../assets/images/Photo.jpg';
import { ChevronDown, Mail, Phone, Linkedin, Github, FileText } from 'lucide-react';

export default function Sidebar() {
  const [isActive, setIsActive] = useState(false);

  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src={photo} alt="Anish" width="80" />
        </figure>
        <div className="info-content">
          <h1 className="name" title="Anish Vempaty">Anish Vempaty</h1>
          <p className="title">Cybersecurity Engineer</p>
          <p className="tagline">M.S. Cybersecurity, NYU</p>
          <p className="status">🚀 Open to Work</p>
        </div>

        <button className="info_more-btn" onClick={() => setIsActive(!isActive)} data-sidebar-btn>
          <span>Show Contacts</span>
          <ChevronDown size={16} />
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <Mail size={18} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:anish.vempaty@gmail.com" className="contact-link">anish.vempaty@gmail.com</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Phone size={18} />
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+19296894564" className="contact-link">+1 (929) 689-4564</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Linkedin size={18} />
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
              <Github size={18} />
            </div>
            <div className="contact-info">
              <p className="contact-title">GitHub</p>
              <a href="https://github.com/anish-vempaty" className="contact-link" target="_blank" rel="noopener noreferrer">
                github.com/anish-vempaty
              </a>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <div className="sidebar-resume">
          <a href="Anish_resume_V5.pdf" download className="resume-btn">
            Download CV
          </a>
        </div>
      </div>
    </aside>
  );
}
