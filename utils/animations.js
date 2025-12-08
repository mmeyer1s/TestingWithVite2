// Utility functions for satisfying animations

export const createRipple = (event) => {
  const button = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`
  circle.classList.add('ripple')

  const ripple = button.getElementsByClassName('ripple')[0]
  if (ripple) {
    ripple.remove()
  }

  button.appendChild(circle)
}

export const addBounceEffect = (element) => {
  element.style.animation = 'bounce 0.6s ease-in-out'
  setTimeout(() => {
    element.style.animation = ''
  }, 600)
}

export const addConfetti = (x, y) => {
  const colors = ['#4A2C2A', '#8B4A3C', '#D4A574', '#FFF5E6']
  const confettiCount = 20

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    confetti.style.position = 'fixed'
    confetti.style.left = `${x}px`
    confetti.style.top = `${y}px`
    confetti.style.width = '10px'
    confetti.style.height = '10px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.borderRadius = '50%'
    confetti.style.pointerEvents = 'none'
    confetti.style.zIndex = '9999'
    confetti.style.opacity = '0.8'

    const angle = (Math.PI * 2 * i) / confettiCount
    const velocity = 100 + Math.random() * 50
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity

    document.body.appendChild(confetti)

    let xPos = x
    let yPos = y
    let opacity = 0.8
    const gravity = 0.5

    const animate = () => {
      xPos += vx * 0.1
      yPos += vy * 0.1 + gravity * 10
      opacity -= 0.02

      confetti.style.left = `${xPos}px`
      confetti.style.top = `${yPos}px`
      confetti.style.opacity = opacity
      confetti.style.transform = `rotate(${xPos * 0.1}deg)`

      if (opacity > 0 && yPos < window.innerHeight) {
        requestAnimationFrame(animate)
      } else {
        confetti.remove()
      }
    }

    requestAnimationFrame(animate)
  }
}

export const playSound = (type = 'click') => {
  // Create a satisfying click sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = type === 'click' ? 800 : 600
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.1)
}

