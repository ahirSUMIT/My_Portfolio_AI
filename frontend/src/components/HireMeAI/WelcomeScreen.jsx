// WelcomeScreen.jsx - Home view when no messages exist in current session
import React from 'react';
import { HireMeLogo } from '../Icons';
import SuggestedQuestions from './SuggestedQuestions';

export default function WelcomeScreen({ projects, onSelectQuestion }) {
  return (
    <div className="welcome-screen-container">
      <div className="welcome-bot-icon">
        <HireMeLogo size={54} />
      </div>
      <h1 className="welcome-title">Hi, I'm HireMeAI</h1>
      <p className="welcome-subtitle">
        AI candidate assistant representing <strong>Sumit Raj</strong> — grounded strictly in his current resume.
      </p>
      <SuggestedQuestions projects={projects} onSelectQuestion={onSelectQuestion} />
    </div>
  );
}
