import { useState, useEffect, useRef } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import gsap from 'gsap'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)

  const [review, setReview] = useState(``)
  const [fixedCode, setFixedCode] = useState(null)
  const [loading, setLoading] = useState(false)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])


  async function reviewCode() {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    if (!code.trim()) {
      setReview("### 💡 No code to review\nPlease paste some code in the editor on the left before clicking review.");
      return;
    }

    setLoading(true)
    setFixedCode(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:7011';
      const normalizedApiUrl = apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`;

      const response = await axios.post(`${normalizedApiUrl}/ai/get-review`, { code })
      const rawReview = response.data;

      const fixStartTag = "[IMPROVED_CODE_START]";
      const fixEndTag = "[IMPROVED_CODE_END]";

      if (rawReview.includes(fixStartTag) && rawReview.includes(fixEndTag)) {
        const start = rawReview.indexOf(fixStartTag) + fixStartTag.length;
        const end = rawReview.indexOf(fixEndTag);
        setFixedCode(rawReview.substring(start, end).trim());
        setReview(rawReview.split(fixStartTag)[0].trim());
      } else {
        setReview(rawReview);
      }
    } catch (error) {
      console.error("Review failed:", error)

      let friendlyMessage = "### ⚠️ Review Interrupted\nAn unexpected error occurred. Please try again.";

      if (!error.response) {
        friendlyMessage = "### 🌐 Connection Error\nCannot reach the AI server. Please check if your backend is running and your internet is active.";
      } else {
        const status = error.response.status;
        if (status === 429) {
          friendlyMessage = "### ⏳ Rate Limit Reached\nYou've sent many requests in a short time. Please wait a minute while the AI refuels.";
        } else if (status === 401 || status === 403) {
          friendlyMessage = "### 🔑 Authentication Error\nYour API key seems to be invalid or missing. Please check the backend `.env` file.";
        } else if (status >= 500) {
          friendlyMessage = "### 🧠 Brain Fog (Server Error)\nThe AI server encountered an internal issue while analyzing your code. Try simplifying the snippet.";
        }
      }

      setReview(friendlyMessage)
    } finally {
      setLoading(false)
      isLoadingRef.current = false;
    }
  }

  function applyFixes() {
    if (fixedCode) {
      setCode(fixedCode)
      setFixedCode(null)
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="badge">AI-Powered Code Reviewer</div>
        <h1>Smart <span className="text-gradient">Code Review</span> Assistant ✨</h1>
        <p>An intelligent code review tool that analyzes your code, provides detailed feedback,<br />and suggests improvements to help you write better code.</p>
      </header>
      <main>
        <div className="left">
          <div className="panel-header">
            <span className="panel-title">&lt;/&gt; Code Review Assistant</span>
          </div>
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                  reviewCode()
                }
              }}
              padding={20}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "100%",
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className={`review ${loading ? 'disabled' : ''}`}
          >
            Review Code
            <span className="key-hint">Ctrl + Enter</span>
          </div>
        </div>
        <div className="right">
          {fixedCode && (
            <div onClick={applyFixes} className="apply-fix-btn">Apply Recommended Fixes</div>
          )}
          {loading ? (
            <div className="skeleton-wrapper">
              <div className="skeleton-title shimmer"></div>
              <div className="skeleton-line shimmer"></div>
              <div className="skeleton-line shimmer" style={{ width: '85%' }}></div>
              <div className="skeleton-line shimmer" style={{ width: '60%' }}></div>
              
              <div className="skeleton-code shimmer"></div>
              
              <div className="skeleton-subtitle shimmer"></div>
              <div className="skeleton-bullet shimmer"></div>
              <div className="skeleton-bullet shimmer" style={{ width: '70%' }}></div>
              <div className="skeleton-bullet shimmer" style={{ width: '80%' }}></div>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>
              {review || "### Hello!\nPaste your code and click 'Review Code' to get AI-powered feedback."}
            </Markdown>
          )}
        </div>
      </main>
    </div>
  )
}

export default App