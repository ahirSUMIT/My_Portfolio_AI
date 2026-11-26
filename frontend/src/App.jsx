// App.jsx - Sumit Raj's macOS-inspired AI Engineer Portfolio (synced with current backend resume)
import React, { useState, useEffect } from 'react';
import { Wifi, Search, FileText, Sparkles } from 'lucide-react';
import ChatWindow from './components/HireMeAI/ChatWindow';
import { DEFAULT_RESUME_PROFILE, fetchResumeProfileFromBackend } from './components/HireMeAI/api';
import DesktopFolders from './components/DesktopFolders';
import Dock from './components/Dock';
import { HireMeLogo } from './components/Icons';

export default function App() {
  const [activeWin, setActiveWin] = useState(null); // 'win-hireme', 'win-projects', 'win-resume', 'win-about', 'win-contact'
  const [isMaximized, setIsMaximized] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState(null);
  const [resumeProfile, setResumeProfile] = useState(DEFAULT_RESUME_PROFILE);
  const [time, setTime] = useState('');

  // Check backend resume on startup and populate projects/skills from the loaded resume
  useEffect(() => {
    let mounted = true;
    fetchResumeProfileFromBackend().then((profile) => {
      if (mounted && profile) {
        setResumeProfile(profile);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const opts = { weekday: 'short', month: 'short', day: 'numeric' };
      const dateStr = now.toLocaleDateString('en-US', opts);
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      setTime(`${dateStr}, ${h}:${m} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const openWin = (id) => {
    setActiveWin(id);
    if (id !== 'win-hireme') setIsMaximized(false);
  };

  const closeWin = () => {
    setActiveWin(null);
    setIsMaximized(false);
  };

  const askAboutProject = (prompt) => {
    setInitialQuestion(prompt);
    setActiveWin('win-hireme');
  };

  return (
    <div className="desktop-root">
      {/* BLUE-PURPLE GRADIENT WALLPAPER */}
      <div className="wallpaper">
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <path
            d="M-100,640 C300,480 520,860 920,580 C1220,380 1420,700 1700,480 L1700,1100 L-100,1100 Z"
            fill="rgba(255,255,255,0.06)"
          />
          <path
            d="M-100,760 C360,600 620,960 960,690 C1260,480 1460,790 1700,600 L1700,1100 L-100,1100 Z"
            fill="rgba(56,221,248,0.07)"
          />
        </svg>
      </div>
      <div className="grain" />

      {/* macOS TOP MENU BAR */}
      <header className="menu-bar">
        <div className="left">
          <div className="menu-bar-brand" onClick={closeWin} style={{ cursor: 'pointer' }}>
            <HireMeLogo size={16} />
            <span>Sumit's Portfolio</span>
          </div>
          <span className="menu-bar-item menu-bar-item-hide-sm" onClick={() => openWin('win-projects')}>
            Projects
          </span>
          <span className="menu-bar-item menu-bar-item-hide-sm" onClick={() => openWin('win-contact')}>
            Contact
          </span>
          <span className="menu-bar-item menu-bar-item-hide-sm" onClick={() => openWin('win-resume')}>
            Resume
          </span>
          <button
            type="button"
            className="menu-bar-ai-pill"
            onClick={() => openWin('win-hireme')}
          >
            <Sparkles size={11} />
            <span>HireMeAI</span>
          </button>
        </div>
        <div className="right">
          <Wifi size={14} style={{ opacity: 0.85 }} />
          <Search
            size={14}
            style={{ opacity: 0.85, cursor: 'pointer' }}
            onClick={() => openWin('win-hireme')}
            title="Ask HireMeAI"
          />
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
        </div>
      </header>

      {/* DESKTOP ICONS */}
      <DesktopFolders onOpenWin={openWin} />

      {/* HERO CENTERPIECE */}
      <section className="hero">
        <div className="hero-badge">
          <Sparkles size={13} />
          <span>AI Engineer · Generative AI · RAG · LLMs</span>
        </div>
        <div className="eyebrow">Hey, I'm Sumit! welcome to my</div>
        <h1>PORTFOLIO</h1>
        <p className="sub">
          Interview <strong>HireMeAI</strong> — my AI candidate assistant trained strictly on my current resume, projects, and technical skills.
        </p>
        <div className="hero-cta-row">
          <button
            type="button"
            className="hero-btn-primary"
            onClick={() => openWin('win-hireme')}
          >
            <HireMeLogo size={20} />
            <span>Ask HireMeAI</span>
          </button>
          <button
            type="button"
            className="hero-btn-secondary"
            onClick={() => openWin('win-resume')}
          >
            <FileText size={16} />
            <span>View Resume.pdf</span>
          </button>
        </div>
      </section>

      {/* TRANSLUCENT APPLICATION DOCK */}
      <Dock activeWin={activeWin} onOpenWin={openWin} />

      {/* WINDOW OVERLAY: HireMeAI Chat System */}
      <div
        className={`win-overlay ${activeWin === 'win-hireme' ? 'show' : ''}`}
        onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}
      >
        <div
          className={`window ${isMaximized ? 'window-maximized' : ''}`}
          style={{ width: 'min(1060px, 94vw)', height: 'min(700px, 86vh)', padding: 0 }}
        >
          <ChatWindow
            resumeProfile={resumeProfile}
            onClose={closeWin}
            onMinimize={closeWin}
            onMaximize={() => setIsMaximized((v) => !v)}
            onOpenProjects={() => openWin('win-projects')}
            onOpenResume={() => openWin('win-resume')}
            initialQuestion={initialQuestion}
            onClearInitialQuestion={() => setInitialQuestion(null)}
          />
        </div>
      </div>

      {/* WINDOW OVERLAY: Projects (synced from current resume) */}
      <div
        className={`win-overlay ${activeWin === 'win-projects' ? 'show' : ''}`}
        onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}
      >
        <div className="window">
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin} title="Close" />
            <div className="traffic yellow" onClick={closeWin} title="Minimize" />
            <div className="traffic green" />
            <div className="wtitle">Projects — Sumit Raj</div>
          </div>
          <div className="wbody">
            {resumeProfile.projects.map((proj) => (
              <div key={proj.name} className="project-card">
                <h2>{proj.name}</h2>
                <span className="tag">{proj.tags}</span>
                <p>{proj.description}</p>
                <div className="project-card-actions">
                  <button
                    type="button"
                    className="btn primary"
                    onClick={() => askAboutProject(proj.askPrompt)}
                  >
                    <Sparkles size={13} />
                    <span>Ask HireMeAI about this</span>
                  </button>
                  <a
                    className="btn ghost"
                    href="https://github.com/ahirSUMIT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ↗ GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WINDOW OVERLAY: Resume */}
      <div
        className={`win-overlay ${activeWin === 'win-resume' ? 'show' : ''}`}
        onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}
      >
        <div
          className="window"
          style={{ width: 'min(1000px, 94vw)', height: 'min(88vh, 880px)', padding: 0 }}
        >
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin} title="Close" />
            <div className="traffic yellow" onClick={closeWin} title="Minimize" />
            <div className="traffic green" />
            <div className="wtitle">Resume.pdf</div>
            <a
              href="/resume.pdf"
              download
              className="btn primary"
              style={{ marginLeft: 'auto', padding: '4px 12px' }}
            >
              ⬇ Download PDF
            </a>
          </div>

          <iframe
            src="/resume.pdf"
            title="Resume"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              borderBottomLeftRadius: '14px',
              borderBottomRightRadius: '14px',
              background: '#fff'
            }}
          />
        </div>
      </div>

      {/* WINDOW OVERLAY: About Me */}
      <div
        className={`win-overlay ${activeWin === 'win-about' ? 'show' : ''}`}
        onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}
      >
        <div className="window">
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin} title="Close" />
            <div className="traffic yellow" onClick={closeWin} title="Minimize" />
            <div className="traffic green" />
            <div className="wtitle">About Me — Sumit Raj</div>
          </div>
          <div className="wbody">
            <h2>Sumit Raj</h2>
            {resumeProfile.education.map((edu) => (
              <p key={edu}>{edu}</p>
            ))}
            <p>
              Building AI and full-stack applications with Python, FastAPI, Generative AI, LLMs, RAG, Qdrant, ChromaDB, Groq API, React, Node.js, Express.js, and MongoDB.
            </p>
            <div className="stack">
              {resumeProfile.skills.map((skill) => (
                <span key={skill} className="chip">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WINDOW OVERLAY: Contact */}
      <div
        className={`win-overlay ${activeWin === 'win-contact' ? 'show' : ''}`}
        onClick={(e) => e.target.classList.contains('win-overlay') && closeWin()}
      >
        <div className="window">
          <div className="titlebar">
            <div className="traffic red" onClick={closeWin} title="Close" />
            <div className="traffic yellow" onClick={closeWin} title="Minimize" />
            <div className="traffic green" />
            <div className="wtitle">Contact — Sumit Raj</div>
          </div>
          <div className="wbody">
            <h2>Let's talk</h2>
            <p>Open to AI Engineer / ML Engineer opportunities and interesting collaborations.</p>
            <div className="about-grid">
              <div className="about-card">
                <div className="k">Gmail</div>
                <div className="v">
                  <a href="mailto:ahirsumit0145@gmail.com">ahirsumit0145@gmail.com</a>
                </div>
              </div>
              <div className="about-card">
                <div className="k">Phone</div>
                <div className="v">
                  <a href="tel:+919102230641">+91 9102230641</a>
                </div>
              </div>
              <div className="about-card">
                <div className="k">LinkedIn</div>
                <div className="v">
                  <a
                    href="https://www.linkedin.com/in/sumit-raj-803888412"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/sumit-raj
                  </a>
                </div>
              </div>
              <div className="about-card">
                <div className="k">GitHub</div>
                <div className="v">
                  <a
                    href="https://github.com/ahirSUMIT"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/ahirSUMIT
                  </a>
                </div>
              </div>
              <div className="about-card">
                <div className="k">Location</div>
                <div className="v">Dehradun, Uttarakhand</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
