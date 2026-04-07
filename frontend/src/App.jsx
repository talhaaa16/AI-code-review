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
  const [ code, setCode ] = useState(`function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)
  const [ loading, setLoading ] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  useEffect(() => {
    if (loading) {
      gsap.to(loaderRef.current, {
        opacity: 1,
        duration: 0.4,
        pointerEvents: 'all'
      })
      gsap.to(".loader-circle", {
        rotate: 360,
        repeat: -1,
        duration: 1.2,
        ease: "power2.inOut"
      })
      gsap.to(".loader-circle", {
        scale: 1.2,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "sine.inOut"
      })
      gsap.to(".loader-text", {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "sine.inOut"
      })
    } else {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: 'none'
      })
    }
  }, [ loading ])

  async function reviewCode() {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:7011/ai/get-review', { code })
      setReview(response.data)
    } catch (error) {
      console.error("Review failed:", error)
      setReview("### Error\nFailed to fetch review. Please check if the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={20}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                minHeight: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">Review Code</div>
        </div>
        <div className="right">
          <div ref={loaderRef} className="loader-container">
            <div className="loader-circle"></div>
            <div className="loader-text">AI is reviewing your code...</div>
          </div>
          <Markdown rehypePlugins={[ rehypeHighlight ]}>
            {review || "### Hello!\nPaste your code and click 'Review Code' to get AI-powered feedback."}
          </Markdown>
        </div>
      </main>
    </>
  )
}

export default App