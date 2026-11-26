// Dock.jsx - Translucent macOS-style bottom application dock
import React from 'react';
import { User, FolderKanban, Mail, FileText } from 'lucide-react';
import { HireMeLogo, GitHubIcon, LinkedInIcon } from './Icons';

export default function Dock({ activeWin, onOpenWin }) {
  return (
    <div className="dock-wrap">
      <nav className="dock" aria-label="Application Dock">
        <button
          className={`dock-item ${activeWin === 'win-about' ? 'active-app' : ''}`}
          onClick={() => onOpenWin('win-about')}
          title="About Me"
        >
          <User size={21} color="#38DDF8" />
        </button>

        <button
          className={`dock-item ${activeWin === 'win-projects' ? 'active-app' : ''}`}
          onClick={() => onOpenWin('win-projects')}
          title="Projects"
        >
          <FolderKanban size={21} color="#60A5FA" />
        </button>

        <button
          className={`dock-item ${activeWin === 'win-resume' ? 'active-app' : ''}`}
          onClick={() => onOpenWin('win-resume')}
          title="Resume.pdf"
        >
          <FileText size={21} color="#F87171" />
        </button>

        <button
          className={`dock-item ${activeWin === 'win-contact' ? 'active-app' : ''}`}
          onClick={() => onOpenWin('win-contact')}
          title="Contact"
        >
          <Mail size={21} color="#A78BFA" />
        </button>

        <button
          className="dock-item"
          onClick={() => window.open('https://github.com/ahirSUMIT', '_blank', 'noopener,noreferrer')}
          title="GitHub"
        >
          <GitHubIcon size={20} />
        </button>

        <button
          className="dock-item"
          onClick={() => window.open('https://www.linkedin.com/in/sumit-raj-803888412', '_blank', 'noopener,noreferrer')}
          title="LinkedIn"
        >
          <LinkedInIcon size={20} />
        </button>

        <div className="dock-divider" />

        <button
          className="dock-ask-btn"
          onClick={() => onOpenWin('win-hireme')}
          title="Interview HireMeAI"
        >
          <HireMeLogo size={22} />
          <span>Ask Me</span>
        </button>
      </nav>
    </div>
  );
}
