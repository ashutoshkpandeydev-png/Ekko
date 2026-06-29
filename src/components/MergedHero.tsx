'use client'

/* =========================================================
   EKKO V8 — MERGED HERO + CINEMATIC SCRUB
   ========================================================= */

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, BrainCircuit, Play, Radar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TOTAL_FRAMES = 240
const FRAME_ROOT = '/ai-twin-frames'

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function frameSrc(frame: number) {
  const safeFrame = Math.min(TOTAL_FRAMES, Math.max(1, frame))
  const part = Math.ceil(safeFrame / 60)
  return `${FRAME_ROOT}/frames_part_${part}/frame_${String(safeFrame).padStart(5, '0')}.png`
}

function drawCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageWidth = image.naturalWidth || image.width
  const imageHeight = image.naturalHeight || image.height
  if (!imageWidth || !imageHeight) return
  const scale = Math.max(width / imageWidth, height / imageHeight)
  const drawWidth = imageWidth * scale
  const drawHeight = imageHeight * scale
  const x = (width - drawWidth) / 2
  const y = (height - drawHeight) / 2
  context.clearRect(0, 0, width, height)
  context.drawImage(image, x, y, drawWidth, drawHeight)
}

type IdleCapableWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
    cancelIdleCallback?: (handle: number) => void
  }

const heroTimeline = [
  { title: 'Memory ingestion', text: 'Chats, notes, emails, journals' },
  { title: 'Voice calibration', text: 'Tone, humor, rhythm, opinions' },
  { title: 'Twin deployment', text: 'Private link, public profile, controlled access' },
]

const GARBLED_FRAME_START = 90
const GARBLED_FRAME_END = 170

export default function MergedHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const requestedRef = useRef<Set<number>>(new Set())
  const targetFrameRef = useRef(1)
  const currentFrameRef = useRef(1)
  const lastDrawnRef = useRef(0)
  const visibleFrameRef = useRef(1)

  const [progress, setProgress] = useState(0)
  const [progressFrame, setProgressFrame] = useState(1)
  const [loaderProgress, setLoaderProgress] = useState(0)
  const [heroReady, setHeroReady] = useState(false)
  const [calibration, setCalibration] = useState(0)

  const frameList = useMemo(
    () => Array.from({ length: TOTAL_FRAMES }, (_, index) => index + 1),
    [],
  )

  useEffect(() => {
    let raf: number
    const start = performance.now()
    const duration = 1800
    const tick = (now: number) => {
      const p = clamp((now - start) / duration)
      setCalibration(Math.round(p * 96))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    let rafId = 0
    let resizeId = 0
    let idleId: number | undefined
    let disposed = false
    let loadedCount = 0
    const win = window as IdleCapableWindow

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastDrawnRef.current = 0
    }

    const markLoaded = () => {
      loadedCount += 1
      const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100)
      setLoaderProgress(Math.min(100, percent))
      if (loadedCount >= 18) setHeroReady(true)
    }

    const requestFrame = (frame: number) => {
      if (imagesRef.current.has(frame) || requestedRef.current.has(frame)) return
      requestedRef.current.add(frame)
      const image = new Image()
      image.decoding = 'async'
      image.src = frameSrc(frame)
      image.onload = () => {
        imagesRef.current.set(frame, image)
        requestedRef.current.delete(frame)
        markLoaded()
        if (frame === 1) lastDrawnRef.current = 0
      }
      image.onerror = () => {
        requestedRef.current.delete(frame)
      }
    }

    const requestAround = (frame: number) => {
      for (let offset = -8; offset <= 18; offset += 1) {
        const next = frame + offset
        if (next >= 1 && next <= TOTAL_FRAMES) requestFrame(next)
      }
    }

    const preloadInitial = () => {
      for (let frame = 1; frame <= 28; frame += 1) requestFrame(frame)
    }

    const preloadRemaining = (startIndex = 28) => {
      if (disposed) return
      const batch = frameList.slice(startIndex, startIndex + 8)
      batch.forEach(requestFrame)
      if (startIndex + 8 < frameList.length) {
        const runNext = () => preloadRemaining(startIndex + 8)
        if (typeof win.requestIdleCallback === 'function') {
          idleId = win.requestIdleCallback(runNext, { timeout: 900 })
        } else {
          idleId = window.setTimeout(runNext, 160)
        }
      }
    }

    const updateTarget = () => {
      const section = sectionRef.current
      if (!section) return
      const scrollable = section.offsetHeight - window.innerHeight
      const p = scrollable <= 0 ? 0 : clamp(-section.getBoundingClientRect().top / scrollable)
      const nextFrame = 1 + p * (TOTAL_FRAMES - 1)
      targetFrameRef.current = nextFrame
      setProgress(p)
      requestAround(Math.round(nextFrame))
    }

    const draw = () => {
      const target = targetFrameRef.current
      const current = currentFrameRef.current + (target - currentFrameRef.current) * 0.16
      currentFrameRef.current = Math.abs(target - current) < 0.04 ? target : current
      const requestedFrame = Math.round(currentFrameRef.current)
      const exactImage = imagesRef.current.get(requestedFrame)
      const fallbackImage = imagesRef.current.get(lastDrawnRef.current)
      const image = exactImage ?? fallbackImage
      if (image) {
        const imageFrame = exactImage ? requestedFrame : lastDrawnRef.current
        if (imageFrame !== lastDrawnRef.current || exactImage) {
          drawCover(context, image, window.innerWidth, window.innerHeight)
          lastDrawnRef.current = imageFrame
        }
        if (
          Math.abs(imageFrame - visibleFrameRef.current) >= 2 ||
          imageFrame === 1 ||
          imageFrame === TOTAL_FRAMES
        ) {
          visibleFrameRef.current = imageFrame
          setProgressFrame(imageFrame)
        }
      }
      rafId = window.requestAnimationFrame(draw)
    }

    sizeCanvas()
    preloadInitial()
    requestAround(1)
    updateTarget()
    preloadRemaining()
    rafId = window.requestAnimationFrame(draw)

    const onScroll = () => updateTarget()
    const onResize = () => {
      window.clearTimeout(resizeId)
      resizeId = window.setTimeout(() => {
        sizeCanvas()
        updateTarget()
      }, 80)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(resizeId)
      if (idleId !== undefined) {
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleId)
        } else {
          window.clearTimeout(idleId)
        }
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [frameList])

  const copyOpacity = clamp(1 - progress / 0.22, 0, 1)
  const copyShiftY = -progress * 60

  const inGarbledRange = progressFrame >= GARBLED_FRAME_START && progressFrame <= GARBLED_FRAME_END
  const canvasDim = inGarbledRange ? 0.62 : 1

  return (
    <section ref={sectionRef} className="relative h-[420vh] min-h-[2600px]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050607]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: canvasDim }}
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 ekko-hero-vignette" />
        <div className="pointer-events-none absolute inset-0 ekko-vignette-dark" />
        <div className="pointer-events-none absolute inset-0 ekko-noise" />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] z-10 transition-opacity duration-500"
          style={{ opacity: inGarbledRange ? 1 : 0 }}
        >
          <div className="ekko-container">
            <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                { label: 'Texts', text: 'Learns rhythm and tone from real conversations.' },
                { label: 'Emails', text: 'Captures structure, formality, and word choice.' },
                { label: 'Journals', text: 'Surfaces recurring opinions and personal context.' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[18px] border border-white/10 bg-[#0a0c10]/85 p-4 backdrop-blur-xl"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/52">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/82">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!heroReady && (
            <motion.div
              className="absolute inset-0 z-[25] flex items-center justify-center bg-[#050607]/96"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.7 } }}
            >
              <div className="w-[min(92vw,480px)] rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#071110]">
                    <BrainCircuit size={22} />
                  </div>
                  <p className="text-sm font-semibold text-white">Preparing your twin</p>
                </div>
                <div className="mt-6 ekko-loader-ring h-2.5 w-full">
                  <span style={{ width: `${Math.max(loaderProgress, 6)}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex h-full items-center pt-[var(--nav-height)]">
          <div
            className="ekko-container w-full"
            style={{
              opacity: copyOpacity,
              transform: `translate3d(0, ${copyShiftY}px, 0)`,
              transition: 'opacity 0.05s linear',
            }}
          >
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="ekko-pill ekko-pill-dark w-fit">
                  <Radar size={14} />
                  Personal AI identity
                </div>

                <h1 className="ekko-hero-v7-heading mt-7 max-w-[13ch] font-black text-white">
                  <span className="ekko-gradient-text">An AI version of you,</span>
                  <br />
                  built from your memories.
                </h1>

                <p className="mt-6 max-w-[500px] ekko-body-lg text-white/72">
                  Upload chats, emails, notes, and journal entries. Ekko learns how you sound
                  and can speak to other people on your behalf.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href="/signup" className="ekko-btn ekko-btn-primary">
                    Build your twin
                    <ArrowRight size={17} />
                  </Link>
                  <a href="#how-it-works" className="ekko-btn ekko-btn-secondary">
                    <Play size={16} />
                    Watch how it works
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:block"
              >
                <div className="ekko-hero-v7-card">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                      Twin session
                    </p>
                    <div className="rounded-full border border-emerald-300/24 bg-emerald-300/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
                      Live
                    </div>
                  </div>

                  <div className="mt-7 flex items-center gap-7">
                    <div className="ekko-hero-v7-ring">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                        <circle
                          cx="50" cy="50" r="44" fill="none" stroke="white" strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 44}`}
                          strokeDashoffset={`${2 * Math.PI * 44 * (1 - calibration / 100)}`}
                          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">{calibration}%</span>
                        <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                          calibrated
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Twin calibration</p>
                      <p className="mt-2 text-sm leading-6 text-white/56">
                        Building a voice model from selected conversations and writing.
                      </p>
                    </div>
                  </div>

                  <div className="my-7 h-px w-full bg-white/8" />

                  <div className="space-y-3">
                    {heroTimeline.map((item, index) => (
                      <div key={item.title} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-xl bg-white text-xs font-black text-[#071110]">
                            {index + 1}
                          </div>
                          {index !== heroTimeline.length - 1 ? (
                            <div className="mt-2 h-full w-px bg-white/10" />
                          ) : null}
                        </div>
                        <div className="pb-3">
                          <div className="text-sm font-semibold text-white">{item.title}</div>
                          <div className="mt-1 text-sm leading-6 text-white/52">{item.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-6 right-6 z-10 text-xs text-white/30">
          {Math.round((progressFrame / TOTAL_FRAMES) * 100)}% · scroll
        </div>
      </div>
    </section>
  )
}