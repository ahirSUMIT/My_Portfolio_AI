// SuggestedQuestions.jsx - Recruiter prompt suggestion cards generated from current resume
import React from 'react';

export default function SuggestedQuestions({ projects = [], onSelectQuestion }) {
  const projectSuggestions = projects.slice(0, 3).map((proj, idx) => ({
    id: `proj-${idx}`,
    icon: idx === 0 ? '🎥' : idx === 1 ? '🤖' : '📄',
    title: proj.askPrompt || `Explain your ${proj.name} project`
  }));

  const suggestions = [
    { id: 'about', icon: '👋', title: 'Tell me about yourself' },
    ...projectSuggestions,
    { id: 'aiml', icon: '🎓', title: 'What have you learned in your AI/ML program?' },
    { id: 'why-hire', icon: '🎯', title: 'Why should we hire you?' }
  ];

  return (
    <div className="suggested-questions-grid">
      {suggestions.map((item) => (
        <button
          key={item.id}
          className="suggestion-card"
          onClick={() => onSelectQuestion(item.title)}
        >
          <span className="suggestion-icon">{item.icon}</span>
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
}
