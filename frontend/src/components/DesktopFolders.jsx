// DesktopFolders.jsx - macOS-style desktop icons with custom SVG folders & PDF
import React from 'react';
import { MacFolderIcon, PdfFileIcon, GitHubIcon, LinkedInIcon } from './Icons';

export default function DesktopFolders({ onOpenWin }) {
  return (
    <div className="desktop-icons">
      <div
        className="dicon"
        onClick={() => onOpenWin('win-hireme')}
        onDoubleClick={() => onOpenWin('win-hireme')}
        title="Open HireMeAI Assistant"
      >
        <div className="glyph">
          <MacFolderIcon size={50} badge />
        </div>
        <div className="label">HireMeAI</div>
      </div>

      <div
        className="dicon"
        onClick={() => onOpenWin('win-resume')}
        onDoubleClick={() => onOpenWin('win-resume')}
        title="View Resume.pdf"
      >
        <div className="glyph">
          <PdfFileIcon size={48} />
        </div>
        <div className="label">Resume.pdf</div>
      </div>

      <div
        className="dicon"
        onClick={() => onOpenWin('win-projects')}
        onDoubleClick={() => onOpenWin('win-projects')}
        title="Explore Projects"
      >
        <div className="glyph">
          <MacFolderIcon size={50} />
        </div>
        <div className="label">Projects</div>
      </div>

      <div
        className="dicon"
        onClick={() => onOpenWin('win-about')}
        onDoubleClick={() => onOpenWin('win-about')}
        title="About Sumit Raj"
      >
        <div className="glyph">
          <MacFolderIcon size={50} />
        </div>
        <div className="label">About Me</div>
      </div>

      <div
        className="dicon"
        onClick={() => window.open('https://github.com/ahirSUMIT', '_blank', 'noopener,noreferrer')}
        title="GitHub Profile"
      >
        <div className="glyph" style={{ color: '#FFFFFF' }}>
          <GitHubIcon size={36} />
        </div>
        <div className="label">GitHub</div>
      </div>

      <div
        className="dicon"
        onClick={() => window.open('https://www.linkedin.com/in/sumit-raj-803888412', '_blank', 'noopener,noreferrer')}
        title="LinkedIn Profile"
      >
        <div className="glyph" style={{ color: '#38DDF8' }}>
          <LinkedInIcon size={36} />
        </div>
        <div className="label">LinkedIn</div>
      </div>
    </div>
  );
}
