import { useCallback, useEffect, useRef, useState } from 'react'
import './intro-loader.css'

const COLORS = [
  [255, 59, 92],
  [25, 227, 255],
]

function IntroLoader({
  brand = 'HERI LARA',
  subtitle = 'PORTFOLIO · WEB DEVELOPER',
  duration = 2600,
  hold = 1200,
  fadeDuration = 650,
}) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const progressRef = useRef(0)
  const timeoutsRef = useRef([])
  const runIdRef = useRef(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  const clearTimers = useCallback(() => {
    timeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    timeoutsRef.current = []
    window.cancelAnimationFrame(progressRef.current)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotionPreference = () => setReduceMotion(mediaQuery.matches)

    syncMotionPreference()
    mediaQuery.addEventListener('change', syncMotionPreference)

    return () => mediaQuery.removeEventListener('change', syncMotionPreference)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    let width = 0
    let height = 0
    let dpr = 1
    let centerX = 0
    let centerY = 0
    let maxRadius = 0
    let rotation = 0
    let startTime = performance.now()
    let nodes = []

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      centerX = width / 2
      centerY = height / 2
      maxRadius = Math.min(width, height) * 0.46
    }

    const buildNodes = () => {
      const totalNodes = Math.max(34, Math.min(76, Math.round((width * height) / 24000)))
      nodes = Array.from({ length: totalNodes }, (_, index) => ({
        angle: Math.random() * Math.PI * 2,
        radius: Math.sqrt(Math.random()) * maxRadius,
        color: COLORS[index % 2],
        phase: Math.random() * Math.PI * 2,
        spin: 0.2 + Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 10,
      }))
    }

    const render = (now) => {
      const time = (now - startTime) / 1000
      rotation += reduceMotion ? 0 : 0.0016
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'

      const points = nodes.map((node) => {
        const angle = node.angle + rotation * node.spin
        const radius = node.radius + Math.sin(time * 0.6 + node.phase) * 8 + node.drift
        return {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          color: node.color,
          phase: node.phase,
        }
      })

      const threshold = Math.min(width, height) * 0.22

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance >= threshold) continue

          const weight = 0.5 + 0.5 * Math.sin(time * 1.6 + i * 0.7 + j * 0.3)
          const opacity = (1 - distance / threshold) * 0.42 * weight

          if (opacity < 0.02) continue

          const [red, green, blue] = points[i].color
          context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`
          context.lineWidth = 1
          context.beginPath()
          context.moveTo(points[i].x, points[i].y)
          context.lineTo(points[j].x, points[j].y)
          context.stroke()
        }
      }

      points.forEach((point) => {
        const pulse = 0.6 + 0.4 * Math.sin(time * 2 + point.phase)
        const [red, green, blue] = point.color
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.92)`
        context.shadowBlur = 10 * pulse
        context.shadowColor = `rgba(${red}, ${green}, ${blue}, 0.9)`
        context.beginPath()
        context.arc(point.x, point.y, 1.5 + pulse, 0, Math.PI * 2)
        context.fill()
      })

      context.shadowBlur = 0
      context.globalCompositeOperation = 'source-over'
      frameRef.current = window.requestAnimationFrame(render)
    }

    resize()
    buildNodes()
    frameRef.current = window.requestAnimationFrame(render)

    const handleResize = () => {
      resize()
      buildNodes()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [reduceMotion])

  const play = useCallback(() => {
    runIdRef.current += 1
    const currentRunId = runIdRef.current
    const effectiveDuration = reduceMotion ? 700 : duration

    clearTimers()
    setIsVisible(true)
    setIsFading(false)
    setIsPlaying(false)
    setProgress(0)

    const restartAnimation = window.setTimeout(() => {
      if (runIdRef.current !== currentRunId) return
      setIsPlaying(true)
    }, 30)

    timeoutsRef.current.push(restartAnimation)

    const progressStart = performance.now()
    const animateProgress = () => {
      if (runIdRef.current !== currentRunId) return

      const rawProgress = Math.min(1, (performance.now() - progressStart) / effectiveDuration)
      const easedProgress = 1 - (1 - rawProgress) ** 2
      setProgress(Math.round(easedProgress * 100))

      if (rawProgress < 1) {
        progressRef.current = window.requestAnimationFrame(animateProgress)
      }
    }

    progressRef.current = window.requestAnimationFrame(animateProgress)

    const fadeTimeout = window.setTimeout(() => {
      if (runIdRef.current !== currentRunId) return
      setIsFading(true)
    }, effectiveDuration + hold)

    const hideTimeout = window.setTimeout(() => {
      if (runIdRef.current !== currentRunId) return
      setIsVisible(false)
      setIsPlaying(false)
      setIsFading(false)
      setProgress(100)
    }, effectiveDuration + hold + fadeDuration)

    timeoutsRef.current.push(fadeTimeout, hideTimeout)
  }, [clearTimers, duration, fadeDuration, hold, reduceMotion])

  useEffect(() => {
    const kickoffId = window.requestAnimationFrame(() => {
      play()
    })

    return () => {
      window.cancelAnimationFrame(kickoffId)
      clearTimers()
      window.cancelAnimationFrame(frameRef.current)
    }
  }, [clearTimers, play])

  return (
    <>
      {isVisible && (
        <div
          className={`intro-loader${isPlaying ? ' is-playing' : ''}${isFading ? ' is-fading' : ''}`}
          role="img"
          aria-label="HL intro loader animation"
        >
          <canvas ref={canvasRef} className="intro-loader__net" />
          <div className="intro-loader__core">
            <div className="intro-loader__rings">
              <div className="intro-loader__halo" />
              <svg className="intro-loader__ring intro-loader__ring--one" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="94" />
              </svg>
              <svg className="intro-loader__ring intro-loader__ring--two" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" />
              </svg>
              <svg className="intro-loader__ring intro-loader__ring--three" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="66" />
              </svg>
              <svg className="intro-loader__logo" viewBox="0 0 360 200">
                <g className="intro-loader__logo-side intro-loader__logo-side--left">
                  <path d="M112 56 L74 100 L112 144" />
                </g>
                <g className="intro-loader__logo-side intro-loader__logo-side--right">
                  <path d="M248 56 L286 100 L248 144" />
                </g>
                <text className="intro-loader__logo-letter intro-loader__logo-letter--h" x="151" y="139">
                  H
                </text>
                <text className="intro-loader__logo-letter intro-loader__logo-letter--l" x="209" y="139">
                  L
                </text>
              </svg>
            </div>
            <div className="intro-loader__word">{brand}</div>
            <div className="intro-loader__sub">{subtitle}</div>
            <div className="intro-loader__bar">
              <span className="intro-loader__fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="intro-loader__pct">{progress}%</div>
          </div>
        </div>
      )}

      <button type="button" className="intro-loader__replay" onClick={play} title="Reproducir loader">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5V1L7 6l5 5V7a6 6 0 11-6 6H4a8 8 0 108-8z" />
        </svg>
        <span>Replay Intro</span>
      </button>
    </>
  )
}

export default IntroLoader
