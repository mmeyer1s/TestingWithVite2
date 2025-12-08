import React, { useState, useEffect, useCallback, useRef } from 'react'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 15, y: 15 }
const GAME_SPEED = 150

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0')
  })
  const directionRef = useRef(INITIAL_DIRECTION)
  const gameLoopRef = useRef(null)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    return newFood
  }, [])

  const checkCollision = useCallback((head, snakeBody) => {
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    // Check self collision
    for (let segment of snakeBody) {
      if (head.x === segment.x && head.y === segment.y) {
        return true
      }
    }
    return false
  }, [])

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] }
      head.x += directionRef.current.x
      head.y += directionRef.current.y

      // Check collision
      if (checkCollision(head, prevSnake)) {
        setGameOver(true)
        if (score > highScore) {
          setHighScore(score)
          localStorage.setItem('snakeHighScore', score.toString())
        }
        return prevSnake
      }

      const newSnake = [head, ...prevSnake]

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10)
        setFood(generateFood())
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [food, gameOver, isPaused, score, highScore, checkCollision, generateFood])

  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      clearInterval(gameLoopRef.current)
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [moveSnake, gameOver, isPaused])

  const handleKeyPress = useCallback((e) => {
    if (gameOver) return

    const key = e.key
    const newDirection = { ...directionRef.current }

    switch (key) {
      case 'ArrowUp':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = -1
        }
        break
      case 'ArrowDown':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = 1
        }
        break
      case 'ArrowLeft':
        if (directionRef.current.x === 0) {
          newDirection.x = -1
          newDirection.y = 0
        }
        break
      case 'ArrowRight':
        if (directionRef.current.x === 0) {
          newDirection.x = 1
          newDirection.y = 0
        }
        break
      case ' ':
        e.preventDefault()
        setIsPaused(prev => !prev)
        return
      default:
        return
    }

    setDirection(newDirection)
  }, [gameOver])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setFood(INITIAL_FOOD)
    setScore(0)
    setGameOver(false)
    setIsPaused(false)
  }

  const togglePause = () => {
    setIsPaused(prev => !prev)
  }

  return (
    <div className="snake-game-container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '2rem',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg) 0%, #fff 100%)'
    }}>
      <div className="snake-game-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>
          🐍 Cocoa Snake Game
        </h1>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
            Score: {score}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
            High Score: {highScore}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            className="jelly-btn btn btn-primary"
            onClick={resetGame}
            style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
          >
            {gameOver ? 'Play Again' : 'Reset'}
          </button>
          {!gameOver && (
            <button 
              className="jelly-btn btn btn-secondary"
              onClick={togglePause}
              style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>

      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(74, 44, 42, 0.95)',
          color: 'white',
          padding: '2rem',
          borderRadius: '20px',
          textAlign: 'center',
          zIndex: 1000,
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Game Over!</h2>
          <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Final Score: {score}</p>
          {score === highScore && score > 0 && (
            <p style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>🎉 New High Score! 🎉</p>
          )}
        </div>
      )}

      {isPaused && !gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(74, 44, 42, 0.95)',
          color: 'white',
          padding: '2rem',
          borderRadius: '20px',
          textAlign: 'center',
          zIndex: 1000,
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          PAUSED
        </div>
      )}

      <div 
        className="snake-game-board"
        style={{
          position: 'relative',
          width: `${GRID_SIZE * CELL_SIZE}px`,
          height: `${GRID_SIZE * CELL_SIZE}px`,
          border: '4px solid var(--primary)',
          borderRadius: '10px',
          background: 'var(--card-bg)',
          boxShadow: '0 10px 30px var(--shadow)'
        }}
      >
        {/* Food */}
        <div
          style={{
            position: 'absolute',
            left: `${food.x * CELL_SIZE}px`,
            top: `${food.y * CELL_SIZE}px`,
            width: `${CELL_SIZE}px`,
            height: `${CELL_SIZE}px`,
            background: 'var(--accent)',
            borderRadius: '50%',
            boxShadow: '0 0 10px var(--accent)',
            animation: 'pulse 1s ease-in-out infinite'
          }}
        >
          🍫
        </div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${segment.x * CELL_SIZE}px`,
              top: `${segment.y * CELL_SIZE}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              background: index === 0 ? 'var(--primary)' : 'var(--secondary)',
              borderRadius: index === 0 ? '50% 50% 0 50%' : '5px',
              border: index === 0 ? '2px solid var(--primary-dark)' : 'none',
              transition: 'all 0.1s ease'
            }}
          >
            {index === 0 && (
              <span style={{ fontSize: '12px', display: 'block', textAlign: 'center', lineHeight: '20px' }}>
                👀
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
          Use Arrow Keys to move • Spacebar to pause
        </p>
        <a href="/" className="nav-link jelly-btn" style={{ 
          display: 'inline-block', 
          padding: '0.75rem 2rem',
          marginTop: '1rem'
        }}>
          ← Back to Store
        </a>
      </div>
    </div>
  )
}

export default SnakeGame

