// ChatWindow.jsx - Complete HireMeAI window assembly
import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, Download } from 'lucide-react';
import { HireMeLogo } from '../Icons';
import ChatSidebar from './ChatSidebar';
import WelcomeScreen from './WelcomeScreen';
import ChatArea from './ChatArea';
import ChatInput from './ChatInput';
import { sendMessageStream } from './api';
import './chat.css';

export default function ChatWindow({
  resumeProfile,
  onClose,
  onMinimize,
  onMaximize,
  onOpenProjects,
  onOpenResume,
  initialQuestion,
  onClearInitialQuestion
}) {
  const [sessions, setSessions] = useState([
    {
      id: 'session-1',
      title: 'Recruiter Interview',
      messages: []
    }
  ]);
  const [activeSessionId, setActiveSessionId] = useState('session-1');
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const handleNewChat = () => {
    if (isStreaming) handleStopStream();
    const newId = `session-${Date.now()}`;
    const newSession = {
      id: newId,
      title: 'New Conversation',
      messages: []
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newId);
  };

  const handleClearCurrentChat = () => {
    if (isStreaming) handleStopStream();
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, title: 'New Conversation', messages: [] }
          : s
      )
    );
  };

  const handleSelectSession = (id) => {
    if (isStreaming) handleStopStream();
    setActiveSessionId(id);
  };

  const handleDeleteSession = (id) => {
    if (isStreaming && id === activeSessionId) handleStopStream();
    const updated = sessions.filter((s) => s.id !== id);
    if (updated.length === 0) {
      handleNewChat();
    } else {
      setSessions(updated);
      if (activeSessionId === id) {
        setActiveSessionId(updated[0].id);
      }
    }
  };

  const handleSendMessage = async (userText) => {
    if (!userText.trim() || isStreaming) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText
    };

    const targetSessionId = activeSessionId;

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === targetSessionId) {
          const isFirstMessage = s.messages.length === 0;
          return {
            ...s,
            title: isFirstMessage ? userText.slice(0, 26) + (userText.length > 26 ? '...' : '') : s.title,
            messages: [...s.messages, userMessage]
          };
        }
        return s;
      })
    );

    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const aiMessageId = `msg-ai-${Date.now()}`;

    await sendMessageStream({
      message: userText,
      history: activeSession ? activeSession.messages : [],
      signal: abortController.signal,
      onChunk: (chunk, accumulatedText) => {
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === targetSessionId) {
              const existingIdx = s.messages.findIndex((m) => m.id === aiMessageId);
              if (existingIdx === -1) {
                return {
                  ...s,
                  messages: [
                    ...s.messages,
                    { id: aiMessageId, sender: 'ai', text: accumulatedText }
                  ]
                };
              } else {
                const newMsgs = [...s.messages];
                newMsgs[existingIdx] = {
                  ...newMsgs[existingIdx],
                  text: accumulatedText
                };
                return {
                  ...s,
                  messages: newMsgs
                };
              }
            }
            return s;
          })
        );
      },
      onDone: () => {
        setIsStreaming(false);
        abortControllerRef.current = null;
      },
      onError: (err) => {
        console.error('Stream error:', err);
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    });
  };

  const handleStopStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  // Trigger initial question when launched from a project card
  useEffect(() => {
    if (initialQuestion && !isStreaming) {
      handleSendMessage(initialQuestion);
      if (onClearInitialQuestion) onClearInitialQuestion();
    }
  }, [initialQuestion]);

  const hasMessages = activeSession && activeSession.messages.length > 0;

  return (
    <div className="hireme-window-container">
      {/* Window Title Bar */}
      <div className="hireme-titlebar">
        <div className="window-dots">
          <span className="dot dot-close" onClick={onClose} title="Close window" />
          <span className="dot dot-minimize" onClick={onMinimize} title="Minimize window" />
          <span className="dot dot-maximize" onClick={onMaximize} title="Maximize / Restore" />
        </div>

        <div className="window-title">
          <HireMeLogo size={18} />
          <span>HireMeAI — Sumit Raj</span>
          {isStreaming && <span className="streaming-badge">● Streaming</span>}
        </div>

        <div className="titlebar-actions">
          {hasMessages && (
            <button
              type="button"
              className="titlebar-action-btn"
              onClick={handleClearCurrentChat}
              title="Clear current conversation"
            >
              <RotateCcw size={12} />
              <span>Clear</span>
            </button>
          )}
          <a
            href="/resume.pdf"
            download
            className="titlebar-action-btn"
            title="Download Resume.pdf"
          >
            <Download size={12} />
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="hireme-main-layout">
        <ChatSidebar
          skills={resumeProfile?.skills || []}
          backendConnected={Boolean(resumeProfile?.backendConnected)}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onNewChat={handleNewChat}
          onSelectSession={handleSelectSession}
          onDeleteSession={handleDeleteSession}
          onOpenProjects={onOpenProjects}
          onOpenResume={onOpenResume}
        />

        <main className="chat-content-pane">
          {!hasMessages ? (
            <WelcomeScreen
              projects={resumeProfile?.projects || []}
              onSelectQuestion={handleSendMessage}
            />
          ) : (
            <ChatArea
              messages={activeSession.messages}
              isStreaming={isStreaming && activeSession.messages[activeSession.messages.length - 1]?.sender === 'user'}
            />
          )}

          <ChatInput
            onSendMessage={handleSendMessage}
            isStreaming={isStreaming}
            onStopStream={handleStopStream}
          />
        </main>
      </div>
    </div>
  );
}
