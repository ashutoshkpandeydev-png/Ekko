'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Fingerprint,
  Globe2,
  LockKeyhole,
  MessageSquareText,
  Play,
  Radar,
  ShieldCheck,
  Sparkles,
  Waves,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'

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

const featureCards = [
  {
    icon: BrainCircuit,
    title: 'Learns from your actual history',
    body:
      'Import chats, emails, notes, and journal entries so Ekko understands the context behind how you think, write, and reply.',
  },
  {
    icon: MessageSquareText,
    title: 'Talks recognizably like you',
    body:
      'Ekko mirrors your tone, rhythm, humor, preferences, and recurring opinions so conversations feel genuinely yours.',
  },
  {
    icon: LockKeyhole,
    title: 'Shared on your terms',
    body:
      'Decide what your twin can answer, who can access it, and where it’s allowed to represent you.',
  },
]

const workflowSteps = [
  {
    title: 'Import your memory trail',
    body:
      'Bring in old chats, emails, notes, and journal entries. Ekko turns scattered personal history into structured memory.',
  },
  {
    title: 'Train your twin',
    body:
      'Ekko models your tone, preferences, recurring opinions, and communication habits until the responses feel like you.',
  },
  {
    title: 'Share it deliberately',
    body:
      'Publish your twin behind a private link, a controlled profile, or a public page — with clear boundaries around what it can say.',
  },
]

const trustItems = [
  { label: 'Training sources selected by you', icon: Fingerprint },
  { label: 'Response scope and topic controls', icon: ShieldCheck },
  { label: 'Share access and visibility controls', icon: LockKeyhole },
]

const useCases = [
  {
    title: 'Let people talk to a version of you',
    body:
      'Share a link and let friends, followers, clients, or collaborators talk to your AI twin — even when you’re offline.',
    icon: Globe2,
  },
  {
    title: 'Preserve your memory, opinions, and voice',
    body:
      'Turn years of writing into a living memory interface that remembers how you think and how you respond.',
    icon: BrainCircuit,
  },
  {
    title: 'Scale your presence without losing yourself',
    body:
      'Use Ekko as a personal front-end for your identity — one that stays available without becoming generic.',
    icon: Zap,
  },
]

const statCards = [
  { label: 'Training sources', value: 'Chats · Emails · Notes · Journals' },
  { label: 'Twin modes', value: 'Private · Public · Controlled sharing' },
  { label: 'Output', value: 'An AI version of you, online 24/7' },
]

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const requestedRef = useRef<Set<number>>(new Set())
  const targetFrameRef = useRef(1)
  const currentFrameRef = useRef(1)
  const lastDrawnRef = useRef(0)
  const visibleFrameRef = useRef(1)

  const [navSolid, setNavSolid] = useState(false)
  const [progressFrame, setProgressFrame] = useState(1)

  const frameList = useMemo(
    () => Array.from({ length: TOTAL_FRAMES }, (_, index) => index + 1),
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    let rafId = 0
    let resizeId = 0
    let idleId: number | undefined
    let disposed = false
    const win = window as IdleCapableWindow

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      canvas.width = Math.round(viewportWidth * dpr)
      canvas.height = Math.round(viewportHeight * dpr)
      canvas.style.width = `${viewportWidth}px`
      canvas.style.height = `${viewportHeight}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      lastDrawnRef.current = 0
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
        if (frame === 1) lastDrawnRef.current = 0
      }

      image.onerror = () => {
        requestedRef.current.delete(frame)
      }
    }

    const requestAround = (frame: number) => {
      for (let offset = -6; offset <= 18; offset += 1) {
        const next = frame + offset
        if (next >= 1 && next <= TOTAL_FRAMES) requestFrame(next)
      }
    }

    const preloadInitial = () => {
      for (let frame = 1; frame <= 28; frame += 1) {
        requestFrame(frame)
      }
    }

    const preloadRemaining = (startIndex = 28) => {
      if (disposed) return

      const batch = frameList.slice(startIndex, startIndex + 8)
      batch.forEach(requestFrame)

      if (startIndex + 8 < frameList.length) {
        const runNext = () => preloadRemaining(startIndex + 8)
        if (typeof win.requestIdleCallback === 'function') {
          idleId = win.requestIdleCallback(runNext, { timeout: 800 })
        } else {
          idleId = win.setTimeout(runNext, 180)
        }
      }
    }

    const updateTarget = () => {
      const hero = heroRef.current
      if (!hero) return

      const scrollable = hero.offsetHeight - window.innerHeight
      const progress = scrollable <= 0 ? 0 : clamp(-hero.getBoundingClientRect().top / scrollable)
      const nextFrame = 1 + progress * (TOTAL_FRAMES - 1)

      targetFrameRef.current = nextFrame
      setNavSolid(window.scrollY > 18)
      hero.style.setProperty('--hero-progress', String(progress))

      requestAround(Math.round(nextFrame))
    }

    const draw = () => {
      const target = targetFrameRef.current
      const current = currentFrameRef.current + (target - currentFrameRef.current) * 0.18
      currentFrameRef.current = Math.abs(target - current) < 0.05 ? target : current

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
          Math.abs(imageFrame - visibleFrameRef.current) >= 3 ||
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
          win.clearTimeout(idleId)
        }
      }

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [frameList])

  const progressPercent = Math.round((progressFrame / TOTAL_FRAMES) * 100)

  return (
    <main className="min-h-screen bg-[#070807] text-stone-50">
      {/* NAV */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          navSolid
            ? 'border-b border-white/10 bg-[#070807]/78 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ekko home">
            <span className="grid h-10 w-10 place-items-center rounded-md border border-white/15 bg-white text-sm font-black text-[#070807] shadow-[0_12px_35px_rgba(255,255,255,0.18)]">
              E
            </span>
            <span className="text-base font-semibold tracking-[0.18em] text-white">EKKO</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
            <a className="transition hover:text-white" href="#what-it-learns">
              What it learns
            </a>
            <a className="transition hover:text-white" href="#how-it-works">
              How it works
            </a>
            <a className="transition hover:text-white" href="#control">
              Control
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              className="hidden text-sm font-medium text-stone-300 transition hover:text-white sm:block"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-[#070807] transition hover:bg-stone-200"
              href="/signup"
            >
              <Sparkles size={16} />
              Start
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-[420vh] min-h-[2350px]"
        style={{ '--hero-progress': 0 } as CSSProperties}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-[#070807]">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

          {/* Motion-visible overlays */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.64)_0%,rgba(7,8,7,0.38)_22%,rgba(7,8,7,0.10)_52%,rgba(7,8,7,0.20)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.18)_0%,rgba(7,8,7,0.02)_36%,rgba(7,8,7,0.62)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(125,211,199,0.12),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_74%_74%,rgba(125,211,199,0.08),transparent_28%)]" />

          {/* floating ambient light */}
          <div className="pointer-events-none absolute left-[-12%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-[#7dd3c7]/8 blur-[120px]" />
          <div className="pointer-events-none absolute right-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-white/6 blur-[120px]" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pt-20 md:px-8">
            <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-end">
              {/* LEFT HERO COPY */}
              <motion.div
                className="max-w-5xl"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/15 bg-black/18 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-200 backdrop-blur-md">
                  <Radar size={14} />
                  Personal AI identity
                </div>

                <h1 className="max-w-5xl text-balance text-[3.15rem] font-black leading-[0.92] tracking-[-0.05em] text-white sm:text-[4.25rem] md:text-[5.55rem] lg:text-[7.2rem]">
                  An AI version of you,
                  <br />
                  built from your memories.
                </h1>

                <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-stone-200 md:text-[1.38rem] md:leading-9">
                  Upload chats, emails, notes, and journal entries. Ekko builds a digital twin that
                  sounds like you, remembers what matters to you, and can speak to other people on
                  your behalf.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/signup"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-5 text-sm font-bold text-[#070807] transition hover:bg-stone-200"
                  >
                    Build your twin
                    <ArrowRight size={17} />
                  </Link>

                  <a
                    href="#how-it-works"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/18 bg-white/7 px-5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/12"
                  >
                    <Play size={16} />
                    Watch how it works
                  </a>
                </div>

                {/* bottom hero stat strip */}
                <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
                  {statCards.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.08 * index + 0.2 }}
                      className="rounded-2xl border border-white/12 bg-black/20 p-4 backdrop-blur-md"
                    >
                      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-300">
                        {item.label}
                      </div>
                      <div className="mt-2 text-sm font-medium leading-6 text-white/90">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* RIGHT HERO FLOATING GLASS STACK */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.18 }}
              >
                <div className="relative">
                  {/* main twin card */}
                  <div className="rounded-[28px] border border-white/12 bg-black/24 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300">
                          Twin session
                        </p>
                        <p className="mt-2 text-xl font-semibold text-white">
                          Memory-backed identity layer
                        </p>
                      </div>
                      <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                        Live
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400">
                            Twin calibration
                          </span>
                          <span className="text-sm font-semibold text-stone-100">
                            {progressPercent}%
                          </span>
                        </div>

                        <div className="h-1.5 overflow-hidden rounded-full bg-white/12">
                          <div
                            className="h-full rounded-full bg-[#7dd3c7] transition-[width] duration-200"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-stone-300">
                          Ekko is building a voice model from selected conversations, notes, and
                          long-form writing.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">Share link</span>
                          <span className="text-xs text-stone-400">Private by default</span>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/18 px-3 py-3 text-sm text-stone-200">
                          ekko.app/your-twin
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* floating mini card 1 */}
                  <div className="absolute -left-10 top-8 w-48 rounded-2xl border border-white/12 bg-black/22 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#7dd3c7] text-[#071110]">
                        <BrainCircuit size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Voice model</p>
                        <p className="text-[11px] text-stone-400">Learning tone & rhythm</p>
                      </div>
                    </div>
                  </div>

                  {/* floating mini card 2 */}
                  <div className="absolute -right-6 bottom-8 w-52 rounded-2xl border border-white/12 bg-black/22 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#070807]">
                        <LockKeyhole size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Control layer</p>
                        <p className="text-[11px] text-stone-400">Access + response boundaries</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* bottom progress chip for smaller screens too */}
            <div className="absolute bottom-6 left-5 right-5 z-10 md:left-8 md:right-8 lg:hidden">
              <div className="mx-auto max-w-md rounded-2xl border border-white/12 bg-black/24 p-4 backdrop-blur-xl">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300">
                      Twin calibration
                    </p>
                    <p className="mt-1 text-sm font-medium text-stone-100">
                      Building your memory-backed voice model
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-stone-200">{progressPercent}%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/12">
                  <div
                    className="h-full rounded-full bg-[#7dd3c7] transition-[width] duration-200"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT LEARNS */}
      <section
        id="what-it-learns"
        className="border-y border-white/10 bg-[#f5f1e9] px-5 py-24 text-[#11110f] md:px-8 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#2f766e]">
              What Ekko learns
            </p>
            <h2 className="text-balance text-4xl font-black tracking-[-0.03em] md:text-6xl">
              Your history becomes the training ground for your digital self.
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-[#4d4a43]">
            Ekko is designed to feel like a continuation of you, not a generic assistant wearing
            your name. It learns from the language you already use, the memories you choose to
            share, and the patterns that make your communication recognizably yours.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-4 md:grid-cols-3">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.article
                key={feature.title}
                className="rounded-2xl border border-[#d8d0c2] bg-white p-7 shadow-[0_18px_50px_rgba(25,22,17,0.08)]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="mb-8 grid h-11 w-11 place-items-center rounded-xl bg-[#0e3733] text-[#a7f3d0]">
                  <Icon size={21} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="mt-4 leading-7 text-[#625e55]">{feature.body}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#070807] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#7dd3c7]">
              How it works
            </p>
            <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-white md:text-6xl">
              From scattered memory to a twin people can actually talk to.
            </h2>
          </div>

          <div className="grid gap-4">
            {workflowSteps.map((item, index) => (
              <motion.div
                key={item.title}
                className="grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#7dd3c7] text-sm font-black text-[#071110]">
                  {index + 1}
                </div>

                <div>
                  <p className="text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 leading-7 text-stone-400">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="bg-[#0b0d0c] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#7dd3c7]">
              Why this product exists
            </p>
            <h2 className="text-balance text-4xl font-black tracking-[-0.03em] text-white md:text-6xl">
              Your identity already lives online. Ekko turns it into an interface you control.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-400">
              Most people already leave behind enough writing to describe how they think. Ekko
              transforms that history into a usable digital twin — one that stays recognizably
              yours instead of becoming a generic chatbot.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {useCases.map((item, index) => {
              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#070807]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 leading-7 text-stone-400">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CONTROL */}
      <section
        id="control"
        className="bg-[#e9fbf6] px-5 py-24 text-[#071110] md:px-8 md:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#287166]">
              Control layer
            </p>
            <h2 className="text-balance text-4xl font-black tracking-[-0.03em] md:text-6xl">
              Your twin should be understandable to you — and controllable by you.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#35524c]">
              Ekko is built around the idea that digital identity needs boundaries. You should know
              what trained your twin, what it’s allowed to respond to, and where it’s allowed to
              represent you.
            </p>
          </div>

          <div className="rounded-2xl border border-[#bfe4db] bg-white p-7 shadow-[0_22px_70px_rgba(23,74,66,0.12)]">
            <div className="mb-7 flex items-center justify-between border-b border-[#dceee9] pb-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#287166]">
                  Twin controls
                </p>
                <p className="mt-2 text-2xl font-black">Ready for deliberate sharing</p>
              </div>
              <Waves className="text-[#287166]" size={28} />
            </div>

            <div className="space-y-4">
              {trustItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-xl bg-[#f5fbf9] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-[#287166]" size={18} />
                    <span className="font-semibold">{label}</span>
                  </div>
                  <Check className="text-[#287166]" size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#070807] px-5 py-24 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300">
            <Sparkles size={14} />
            EKKO
          </div>

          <h2 className="mt-6 text-balance text-4xl font-black tracking-[-0.03em] text-white md:text-6xl">
            Build the version of you that stays online.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-400">
            Turn your chats, notes, and memories into a living interface people can speak to —
            without giving up control over your identity.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-bold text-[#070807] transition hover:bg-stone-200"
            >
              Build your twin
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#070807] px-5 py-10 text-sm text-stone-500 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="font-semibold tracking-[0.18em] text-stone-300">EKKO</span>
          <span>An AI version of you, built from your memories.</span>
        </div>
      </footer>
    </main>
  )
}