import React, { useState } from 'react';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import EdgeDeviceThreatDetection from './projectpages/EdgeDeviceThreatDetection';
import ThreeDReconstruction from './projectpages/ThreeDReconstruction';
import AIChatAssistantApp from './projectpages/AIChatAssistantApp';
import DeepFakeDetection from './projectpages/DeepFakeDetection';
import AICodingMentor from './projectpages/AICodingMentor';
import Vibe from './projectpages/Vibe';
import PerspectiveVR from './projectpages/PerspectiveVR';
import Uberlytics from './projectpages/Uberlytics';
import MicelloIntegrations from './projectpages/MicelloIntegrations';
import AICrash from './projectpages/AICrash';
import CustomCybersecurityLLM from './projectpages/CustomCybersecurityLLM';
import QuantumPasswordManager from './projectpages/QuantumPasswordManager';
import RealTimeVoiceCloning from './projectpages/RealTimeVoiceCloning';
import AIHedgeFund from './projectpages/AIHedgeFund';
import AINotesApp from './projectpages/AINotesApp';
import JobSeekAgent from './projectpages/JobSeekAgent';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import MatrixMorph from './components/MatrixMorph'; // <-- Add this import!
import './index.css';

export default function App() {
  const [activePage, setActivePage] = useState('about');
  const [showMatrixMorph, setShowMatrixMorph] = useState(true);

  return (
    <Router>
      {showMatrixMorph ? (
        <MatrixMorph onFinish={() => setShowMatrixMorph(false)} onSkip={() => setShowMatrixMorph(false)} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <main className="matrix-main">
                <Sidebar />
                <div className="main-content">
                  <Navbar activePage={activePage} setActivePage={setActivePage} />
                  <About show={activePage === 'about'} />
                  <Resume show={activePage === 'resume'} />
                  <Portfolio show={activePage === 'portfolio'} />
                  <Contact show={activePage === 'contact'} />
                </div>
              </main>
            }
          />
          <Route path="/projects/edge-threat-detection" element={<EdgeDeviceThreatDetection />} />
          <Route path="/projects/3d-reconstruction" element={<ThreeDReconstruction />} />
          <Route path="/projects/ai-chat-app" element={<AIChatAssistantApp />} />
          <Route path="/projects/deepfake-detection" element={<DeepFakeDetection />} />
          <Route path="/projects/ai-coding-mentor" element={<AICodingMentor />} />
          <Route path="/projects/vibe" element={<Vibe />} />
          <Route path="/projects/perspective" element={<PerspectiveVR />} />
          <Route path="/projects/uberlytics" element={<Uberlytics />} />
          <Route path="/projects/micello-integrations" element={<MicelloIntegrations />} />
          <Route path="/projects/ai-crash" element={<AICrash />} />
          <Route path="/projects/custom-cybersecurity-llm" element={<CustomCybersecurityLLM />} />
          <Route path="/projects/quantum-password-manager" element={<QuantumPasswordManager />} />
          <Route path="/projects/real-time-voice-cloning" element={<RealTimeVoiceCloning />} />
          <Route path="/projects/ai-hedge-fund" element={<AIHedgeFund />} />
          <Route path="/projects/ai-notes-app" element={<AINotesApp />} />
          <Route path="/projects/jobseek-agent" element={<JobSeekAgent />} />
        </Routes>
      )}
    </Router>
  );
}