// api.js - HireMeAI API integration, startup resume sync, and verified fallback

const CHAT_URL = "http://127.0.0.1:8000/chat";
const STREAM_URL = "http://127.0.0.1:8000/chat-stream";

// Strictly verified baseline matching the current backend resume
export const DEFAULT_RESUME_PROFILE = {
  projects: [
    {
      name: "YTScraper_RAG — YouTube Playlist Knowledge Assistant",
      tags: "Python · RAG · Qdrant · LLMs · yt-dlp · faster-whisper",
      description: "Listed on my current resume. Ask HireMeAI for details based on my verified profile.",
      askPrompt: "Explain your YTScraper_RAG project."
    },
    {
      name: "My_Portfolio_AI — AI Recruiter Application",
      tags: "FastAPI · Groq API · Pydantic · React · SSE",
      description: "Listed on my current resume. Ask HireMeAI for details based on my verified profile.",
      askPrompt: "Explain your My_Portfolio_AI project."
    },
    {
      name: "AI Resume Parser",
      tags: "Python · PyPDF · python-docx · Pydantic · NLP",
      description: "Listed on my current resume. Ask HireMeAI for details based on my verified profile.",
      askPrompt: "Explain your AI Resume Parser project."
    }
  ],
  skills: ["Python", "FastAPI", "RAG", "Qdrant", "Groq API", "React"],
  education: [
    "B.Tech, Computer Science and Engineering — Veer Madho Singh Bhandari Uttarakhand Technical University (2023–2027, Expected)",
    "AI/ML Program (9 months) — IIT Patna-associated program (In Progress)"
  ],
  backendConnected: false
};

/**
 * Checks the running FastAPI backend on startup and extracts only the projects,
 * skills, and education present in the currently loaded resume.
 */
export async function fetchResumeProfileFromBackend() {
  try {
    const res = await fetch(CHAT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question:
          "List every single project, internship or experience, skill, and education item on my resume."
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const answer = data?.answer || "";

    // Parse projects from the backend response
    const parsedProjects = [];
    const projectCandidates = [
      {
        match: "YTScraper_RAG",
        name: "YTScraper_RAG — YouTube Playlist Knowledge Assistant",
        tags: "Python · RAG · Qdrant · LLMs · yt-dlp · faster-whisper",
        askPrompt: "Explain your YTScraper_RAG project."
      },
      {
        match: "My_Portfolio_AI",
        name: "My_Portfolio_AI — AI Recruiter Application",
        tags: "FastAPI · Groq API · Pydantic · React · SSE",
        askPrompt: "Explain your My_Portfolio_AI project."
      },
      {
        match: "AI Resume Parser",
        name: "AI Resume Parser",
        tags: "Python · PyPDF · python-docx · Pydantic · NLP",
        askPrompt: "Explain your AI Resume Parser project."
      }
    ];

    for (const cand of projectCandidates) {
      if (answer.includes(cand.match)) {
        parsedProjects.push({
          name: cand.name,
          tags: cand.tags,
          description: "Verified project from the live backend resume.",
          askPrompt: cand.askPrompt
        });
      }
    }

    const skillCandidates = [
      "Python", "FastAPI", "RAG", "Qdrant", "ChromaDB", "Groq API",
      "Pydantic", "Sentence Transformers", "React", "Node.js", "SQL"
    ];
    const parsedSkills = skillCandidates.filter((s) =>
      answer.toLowerCase().includes(s.toLowerCase())
    );

    return {
      projects: parsedProjects.length > 0 ? parsedProjects : DEFAULT_RESUME_PROFILE.projects,
      skills: parsedSkills.length > 0 ? parsedSkills.slice(0, 6) : DEFAULT_RESUME_PROFILE.skills,
      education: DEFAULT_RESUME_PROFILE.education,
      backendConnected: true
    };
  } catch (err) {
    console.log("Backend startup check unavailable, using verified resume baseline:", err?.message || err);
    return DEFAULT_RESUME_PROFILE;
  }
}

const KNOWLEDGE_BASE = {
  projects: `I have built three main AI projects. The first is YTScraper_RAG, a YouTube playlist knowledge assistant built with Python, RAG, and Qdrant. The second is My_Portfolio_AI, this AI recruiter application built with FastAPI, the Groq API, Pydantic, React, and Server-Sent Events. The third is an AI Resume Parser using PyPDF, python-docx, and Pydantic to extract structured candidate profiles. Each project focuses on turning LLMs and retrieval pipelines into practical, working applications.`,

  whyHire: `I bring hands-on experience building end-to-end AI applications rather than just studying theory. I have worked with Python, FastAPI, RAG, Qdrant, ChromaDB, and the Groq API across projects like YTScraper_RAG and My_Portfolio_AI. I am also pursuing my B.Tech in Computer Science and Engineering alongside a 9-month IIT Patna-associated AI/ML program. I learn fast, write clean backend and React code, and focus on shipping reliable, grounded AI systems.`,

  resumeSummary: `I am currently pursuing a B.Tech in Computer Science and Engineering at Veer Madho Singh Bhandari Uttarakhand Technical University, expected to graduate in 2027, along with a 9-month AI/ML program associated with IIT Patna. My core focus is Generative AI, LLMs, RAG, and backend development using Python, FastAPI, Pydantic, Qdrant, and the Groq API. I also work with React, Node.js, Express.js, MongoDB, and SQL, and I have built YTScraper_RAG, My_Portfolio_AI, and an AI Resume Parser.`,

  contact: `You can reach me by email at ahirsumit0145@gmail.com or by phone at +91 9102230641. I am also active on GitHub at github.com/ahirSUMIT and on LinkedIn at linkedin.com/in/sumit-raj.`,

  default: `I don't have enough information to answer that. You can ask me about my education, my AI and full-stack skills, or my projects like YTScraper_RAG, My_Portfolio_AI, and AI Resume Parser.`
};

/**
 * Sends a message and streams the AI response back via callbacks.
 */
export async function sendMessageStream({ message, history = [], onChunk, onDone, signal }) {
  const lowerMsg = message.toLowerCase();

  try {
    const response = await fetch(STREAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message, message: message, history }),
      signal
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        if (onChunk) onChunk(chunk, fullText);
      }

      if (onDone) onDone(fullText);
      return;
    }
  } catch (err) {
    if (err?.name === 'AbortError') {
      if (onDone) onDone("");
      return;
    }
    console.log("Using resume-grounded fallback due to:", err?.message || err);
  }

  let responseText = KNOWLEDGE_BASE.default;

  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("gmail") || lowerMsg.includes("phone") || lowerMsg.includes("linkedin") || lowerMsg.includes("github")) {
    responseText = KNOWLEDGE_BASE.contact;
  } else if (lowerMsg.includes("project") || lowerMsg.includes("ytscraper") || lowerMsg.includes("portfolio") || lowerMsg.includes("parser")) {
    responseText = KNOWLEDGE_BASE.projects;
  } else if (lowerMsg.includes("why") || lowerMsg.includes("hire")) {
    responseText = KNOWLEDGE_BASE.whyHire;
  } else if (lowerMsg.includes("resume") || lowerMsg.includes("summary") || lowerMsg.includes("skill") || lowerMsg.includes("education") || lowerMsg.includes("tell me about yourself") || lowerMsg.includes("ai/ml")) {
    responseText = KNOWLEDGE_BASE.resumeSummary;
  }

  const words = responseText.split(" ");
  let accumulated = "";

  for (let i = 0; i < words.length; i++) {
    if (signal && signal.aborted) {
      break;
    }
    const word = words[i] + (i === words.length - 1 ? "" : " ");
    accumulated += word;
    if (onChunk) onChunk(word, accumulated);
    await new Promise((res) => setTimeout(res, 18));
  }

  if (onDone) onDone(accumulated);
}
