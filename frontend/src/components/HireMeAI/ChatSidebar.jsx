// ChatSidebar.jsx - Candidate profile card (synced from current resume), shortcuts, and conversation history
import React from 'react';
import { FileText, FolderKanban } from 'lucide-react';
import NewChatButton from './NewChatButton';
import ChatHistory from './ChatHistory';

export default function ChatSidebar({
  skills = [],
  backendConnected = false,
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
  onDeleteSession,
  onOpenProjects,
  onOpenResume
}) {
  return (
    <aside className="chat-sidebar">
      {/* Candidate Profile Card */}
      <div className="candidate-profile-card">
        <div className="candidate-header">
          <div className="candidate-monogram">SR</div>
          <div>
            <div className="candidate-name">Sumit Raj</div>
            <div className="candidate-role">
              {backendConnected ? '● Live Resume Synced' : 'AI & Full-Stack Engineer'}
            </div>
          </div>
        </div>
        <div className="candidate-skills-row">
          {skills.map((skill) => (
            <span key={skill} className="candidate-skill-pill">{skill}</span>
          ))}
        </div>
        <div className="candidate-shortcuts">
          <button
            type="button"
            className="sidebar-shortcut-btn"
            onClick={onOpenResume}
            title="View / Download Resume"
          >
            <FileText size={12} color="#38DDF8" />
            <span>Resume</span>
          </button>
          <button
            type="button"
            className="sidebar-shortcut-btn"
            onClick={onOpenProjects}
            title="Explore Projects"
          >
            <FolderKanban size={12} color="#38DDF8" />
            <span>Projects</span>
          </button>
        </div>
      </div>

      <NewChatButton onClick={onNewChat} />

      <ChatHistory
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={onSelectSession}
        onDeleteSession={onDeleteSession}
      />
    </aside>
  );
}
