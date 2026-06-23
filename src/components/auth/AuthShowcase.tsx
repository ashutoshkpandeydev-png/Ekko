'use client'

import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle2, Sparkles } from 'lucide-react'

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

type AuthShowcaseProps = {
  mode: 'signup' | 'login'
  liveName?: string
  liveUsername?: string
}

export default function AuthShowcase({
  mode,
  liveName = '',
  liveUsername = '',
}: AuthShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
  const requestedRef = useRef<Set<number>>(new Set())
  const frameRef = useRef(1)
  const lastDrawnRef = useRef(0)
  const [visibleFrame, setVisibleFrame] = useState(1)

  const frameList = useMemo(
    () => Array.from({ length: TOTAL_FRAMES }, (_, index) => index + 1),
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const host = containerRef.current
    if (!canvas || !host) return

    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    let rafId = 0
    let resizeTimer = 0
    let idleId: number | undefined
    let disposed = false
    const win = window as IdleCapableWindow

    const sizeCanvas = () => {
      const rect = host.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

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

    const preloadInitial = () => {
      for (let frame = 1; frame <= 32; frame += 1) requestFrame(frame)
    }

    const preloadRemaining = (startIndex = 32) => {
      if (disposed) return
      const batch = frameList.slice(startIndex, startIndex + 10)
      batch.forEach(requestFrame)

      if (startIndex + 10 < frameList.length) {
        const runNext = () => preloadRemaining(startIndex + 10)
        if (typeof win.requestIdleCallback === 'function') {
          idleId = win.requestIdleCallback(runNext, { timeout: 900 })
        } else {
          idleId = window.setTimeout(runNext, 180)
        }
      }
    }

    const draw = () => {
      const next = frameRef.current + 0.22
      frameRef.current = next > TOTAL_FRAMES ? 1 : next

      const rounded = Math.round(frameRef.current)
      const exact = imagesRef.current.get(rounded)
      const fallback = imagesRef.current.get(lastDrawnRef.current) || imagesRef.current.get(1)
      const image = exact ?? fallback

      if (image) {
        const rect = host.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const frameToPaint = exact ? rounded : lastDrawnRef.current || 1

        if (frameToPaint !== lastDrawnRef.current || exact) {
          drawCover(context, image, width, height)
          lastDrawnRef.current = frameToPaint
        }

        if (Math.abs(frameToPaint - visibleFrame) >= 4) {
          setVisibleFrame(frameToPaint)
        }
      }

      rafId = window.requestAnimationFrame(draw)
    }

    sizeCanvas()
    preloadInitial()
    preloadRemaining()
    rafId = window.requestAnimationFrame(draw)

    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        sizeCanvas()
      }, 80)
    }

    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(resizeTimer)

      if (idleId !== undefined) {
        if (typeof win.cancelIdleCallback === 'function') {
          win.cancelIdleCallback(idleId)
        } else {
          win.clearTimeout(idleId)
        }
      }

      window.removeEventListener('resize', onResize)
    }
  }, [frameList, visibleFrame])

  const progressPercent = Math.round(clamp(visibleFrame / TOTAL_FRAMES) * 100)

  const title =
    mode === 'signup'
      ? 'Clone yourself.\nBe everywhere.'
      : 'Welcome back.\nYour twin missed you.'

  const subtitle =
    mode === 'signup'
      ? 'Your twin learns your voice, humor, opinions, and way of thinking — then speaks to the world as a version of you.'
      : 'Sign in to manage your twin, retrain its memory, and see every conversation it has had on your behalf.'

  const bullets =
    mode === 'signup'
      ? [
          'Set up your twin in minutes',
          'Import chats, notes, emails, and memory',
          'Share a personal link anyone can talk to',
          'Control what your twin can and cannot say',
        ]
      : [
          'See every conversation your twin had',
          'Retrain tone, opinions, and memory',
          'View profile, usage, and engagement',
          'Adjust privacy, scope, and sharing controls',
        ]

  const previewName = liveName?.trim() || 'your'
  const previewUser = liveUsername?.trim() || 'you'

  return (
    <div
      ref={containerRef}
      className="relative hidden h-full min-h-screen overflow-hidden lg:flex lg:w-[52%] xl:w-[55%]"
      style={{ '--auth-progress': progressPercent / 100 } as CSSProperties}
    >
      {/* moving cinematic canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(125,211,199,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(168,139,250,0.18),transparent_30%),radial-gradient(circle_at_72%_76%,rgba(96,165,250,0.14),transparent_28%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,9,0.88)_0%,rgba(6,7,9,0.68)_28%,rgba(6,7,9,0.28)_58%,rgba(6,7,9,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,9,0.18)_0%,rgba(6,7,9,0.02)_32%,rgba(6,7,9,0.68)_100%)]" />

      {/* premium noise / shine */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.9)_0.5px,transparent_0.5px)] [background-size:6px_6px]" />
      <div className="pointer-events-none absolute inset-y-0 left-[-20%] w-[42%] rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent)] blur-2xl animate-[authSweep_8s_linear_infinite]" />

      <div className="relative z-10 flex h-full w-full flex-col justify-between p-10 xl:p-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Ekko home">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white text-sm font-black text-[#070807] shadow-[0_12px_35px_rgba(255,255,255,0.12)]">
              E
            </span>
            <span className="text-base font-semibold tracking-[0.18em] text-white">EKKO</span>
          </Link>

          <div className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-200 backdrop-blur-md">
            AI TWIN
          </div>
        </div>

        <div className="max-w-[560px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-200 backdrop-blur-md">
            <Sparkles size={13} />
            Memory-backed identity
          </div>

          <h2 className="whitespace-pre-line text-[3.1rem] font-black leading-[0.92] tracking-[-0.05em] text-white xl:text-[4.1rem]">
            {title}
          </h2>

          <p className="mt-6 max-w-[46rem] text-[1.04rem] leading-8 text-stone-200/90 xl:text-[1.12rem]">
            {subtitle}
          </p>

          <div className="mt-8 space-y-3">
            {bullets.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-md"
              >
                <CheckCircle2 className="text-[#7dd3c7]" size={18} />
                <span className="text-sm text-stone-100/90">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[28px] border border-white/12 bg-black/30 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#a78bfa,#60a5fa)] text-sm font-bold text-white shadow-[0_12px_30px_rgba(124,58,237,0.35)]">
                {previewName.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">{previewName}'s twin</p>
                <p className="text-xs text-stone-400">ekko.app/{previewUser}</p>
              </div>

              <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                Online
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                Live preview
              </p>
              <div className="mt-3 space-y-3 text-sm leading-6 text-stone-200">
                <div className="rounded-2xl bg-white/[0.04] px-4 py-3 text-stone-300">
                  “hey! i’m {previewName}'s AI twin. ask me anything 👋”
                </div>
                <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(167,139,250,0.16),rgba(96,165,250,0.12))] px-4 py-3 text-white">
                  “i answer in {previewName}'s tone, remember context, and stay inside the
                  boundaries they set.”
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/12 bg-black/30 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                  Twin calibration
                </p>
                <p className="mt-1 text-sm font-medium text-stone-100">
                  Building your memory-backed voice model
                </p>
              </div>
              <span className="text-sm font-semibold text-stone-200">{progressPercent}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/12">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3c7,#a78bfa)] transition-[width] duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-5 space-y-3">
              {[
                'Training sources selected',
                'Voice pattern mapped',
                'Memory boundaries active',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3"
                >
                  <span className="text-sm text-stone-200">{item}</span>
                  <span
                    className={`text-xs font-semibold ${
                      progressPercent > 28 + index * 20 ? 'text-emerald-300' : 'text-stone-500'
                    }`}
                  >
                    {progressPercent > 28 + index * 20 ? 'Ready' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-stone-500">
          © 2026 Ekko. An AI version of you, built from your memories.
        </div>
      </div>

      <style jsx>{`
        @keyframes authSweep {
          0% {
            transform: translateX(-18%) rotate(18deg);
            opacity: 0;
          }
          18% {
            opacity: 0.65;
          }
          50% {
            opacity: 0.45;
          }
          100% {
            transform: translateX(260%) rotate(18deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}