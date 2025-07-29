import React, { useState, useEffect } from 'react'
import './About.css'

export default function About() {
  const [name, setName] = useState('')
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [items, setItems] = useState(["hehehehehe", "7ambola"])
  
  const [timer, setTimer] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    document.title = `Count: ${count}`
  })

  useEffect(() => {
    setMessage('Component loaded!')
  }, [])

  useEffect(() => {
    if (name) {
      console.log(`Name changed to: ${name}`)
    }
  }, [name])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }

  return (
    <div className="about-container">
      <h1>useState & useEffect Examples</h1>
      
      <div className="examples-grid">
        <div className="example-card">
          <h3>String State</h3>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
          />
          <p>Hello {name}!</p>
        </div>

        <div className="example-card">
          <h3>Number State</h3>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span>{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
          </div>
          <p>Page title updates with count</p>
        </div>

        <div className="example-card">
          <h3>Boolean State</h3>
          <button onClick={() => setIsVisible(!isVisible)}>
            Toggle
          </button>
          {isVisible && <p>بخ</p>}
        </div>

        <div className="example-card">
          <h3>Array State</h3>
          <button onClick={addItem}>Add Item</button>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="example-card">
          <h3>Timer Effect</h3>
          <p>Timer: {timer}s</p>
          <p>Runs every second</p>
        </div>

        <div className="example-card">
          <h3>Mount Effect</h3>
          <p>{message}</p>
          <p>Set when component first loads</p>
        </div>
      </div>
    </div>
  )
}