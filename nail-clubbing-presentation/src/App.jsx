import { useState, useEffect, useCallback } from 'react'
import Slide from './components/Slide'
import { slides } from './data/slides'
import './styles/presentation.css'

function App() {
  const [current, setCurrent] = useState(0)
  const [notesVisible, setNotesVisible] = useState(false)
  const total = slides.length

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total])
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next() }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev() }
      if (e.key === 'n' || e.key === 'N') setNotesVisible(v => !v)
      if (e.key === 'Home') setCurrent(0)
      if (e.key === 'End') setCurrent(total - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [next, prev, total])

  const slideData = slides[current]

  return (
    <div className="presentation">
      <Slide data={slideData} index={current} total={total} />

      {/* Navigation */}
      <div className="nav-controls">
        <button className="nav-btn" onClick={prev} aria-label="Previous">‹</button>
        <span className="slide-counter">{current + 1} / {total}</span>
        <button className="nav-btn" onClick={next} aria-label="Next">›</button>
      </div>

      {/* Speaker Notes Toggle */}
      <button
        className="notes-btn"
        onClick={() => setNotesVisible(v => !v)}
      >
        {notesVisible ? 'Hide Notes' : 'Notes'}
      </button>

      {/* Speaker Notes Panel */}
      {notesVisible && (
        <div className="speaker-notes">
          <span className="notes-label">Speaker Notes</span>
          <p>{slideData.notes}</p>
        </div>
      )}
    </div>
  )
}

export default App
