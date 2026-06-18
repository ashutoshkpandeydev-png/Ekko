'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight, Zap, Shield, Globe, ChevronDown, Brain, Infinity, Activity, Target, Users, Star, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)

  // Background particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId: number

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.05
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      pts.forEach((p) => {
        p.x = (p.x + p.vx + W) % W
        p.y = (p.y + p.vy + H) % H
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(260,70%,60%,${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: '#0A0E27' }}
      onMouseMove={onMouseMove}
    >
      {/* BACKGROUND LAYERS */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124,58,237,0.06) 0%, transparent 60%)` }} />

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrollY > 40 ? 'rgba(10,14,39,0.85)' : 'transparent',
          backdropFilter: scrollY > 40 ? 'blur(20px)' : 'none',
          borderBottom: scrollY > 40 ? '1px solid rgba(124,58,237,0.1)' : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)'
        }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }} />
              <div className="absolute inset-0 rounded-lg flex items-center justify-center font-bold text-sm text-white">
                AI
              </div>
            </div>
            <span className="text-lg font-bold tracking-tight">Personal AI Twin</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {[['How it works', '#how'], ['Features', '#features'], ['Pricing', '#pricing']].map(([label, href]) => (
              <a key={label} href={href} className="relative group hover:text-white transition-colors duration-300">
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-400"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #3B82F6)' }} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-sm px-4 py-2 rounded-lg hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Sign in
            </Link>
            <Link href="/signup" className="text-sm font-semibold px-5 py-2.5 rounded-lg text-white"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative z-10 min-h-screen flex items-center px-6 pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: TEXT CONTENT */}
          <motion.div className="text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>

            <motion.div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', color: '#9370DB' }}>
              <span>///</span>
              <span style={{ color: '#A0A0A0' }}>The next evolution of AI is you</span>
            </motion.div>

            <motion.h1 className="leading-[0.95] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{ fontSize: 'clamp(48px, 7vw, 84px)', fontWeight: 800 }}>
              <span className="block" style={{ color: '#F8FAFC' }}>Your world.</span>
              <motion.span 
                className="block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #EC4899, #7C3AED)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Your AI Twin.
              </motion.span>
            </motion.h1>

            <motion.p className="max-w-md mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ fontSize: '1.1rem', color: '#CBD5E1' }}>
              A true digital twin that understands you, learns with you, and evolves with you. Built for your world. By you.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-start gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}>
              <Link href="/signup"
                className="group flex items-center gap-3 px-7 py-4 rounded-lg font-semibold text-base text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
                Join Waitlist
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard"
                className="flex items-center gap-3 px-7 py-4 rounded-lg font-medium text-sm transition-all hover:scale-105"
                style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.4)', color: '#F8FAFC' }}>
                Watch Demo
              </Link>
            </motion.div>

            <motion.div className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}>
              {[['1.2M+', 'Early Members'], ['98.7%', 'Satisfaction Rate'], ['100%', 'Privacy First']].map(([val, label], i) => (
                <div key={i} className="flex items-center gap-6">
                  <div>
                    <div className="text-lg font-bold" style={{ color: '#F8FAFC' }}>{val}</div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>{label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-8" style={{ background: 'rgba(160,160,160,0.15)' }} />}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: ANIMATED GRADIENT ORB + FLOATING CARDS */}
          <motion.div className="relative h-[560px] hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}>

            {/* ANIMATED GRADIENT ORB */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Outer Glow Layer 1 */}
              <motion.div
                className="absolute w-96 h-96 rounded-full"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: 'radial-gradient(circle, rgba(124,58,237,0.8) 0%, rgba(59,130,246,0.4) 40%, transparent 70%)',
                  filter: 'blur(60px)',
                  boxShadow: '0 0 100px rgba(124,58,237,0.6), 0 0 200px rgba(59,130,246,0.3)'
                }}
              />

              {/* Outer Glow Layer 2 */}
              <motion.div
                className="absolute w-[420px] h-[420px] rounded-full"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, rgba(6,182,212,0.2) 50%, transparent 80%)',
                  filter: 'blur(80px)',
                  boxShadow: '0 0 150px rgba(59,130,246,0.4)'
                }}
              />

              {/* Main Orb */}
              <motion.div
                className="relative w-80 h-80 rounded-full overflow-hidden"
                animate={{ y: [0, -25, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  boxShadow: '0 0 80px rgba(124,58,237,0.8), 0 0 120px rgba(59,130,246,0.5), inset 0 0 80px rgba(255,255,255,0.1)'
                }}>

                {/* Main Gradient Background */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'linear-gradient(135deg, #7C3AED 0%, #3B82F6 25%, #06B6D4 50%, #EC4899 75%, #7C3AED 100%)',
                      'linear-gradient(135deg, #3B82F6 0%, #06B6D4 25%, #EC4899 50%, #7C3AED 75%, #3B82F6 100%)',
                      'linear-gradient(135deg, #06B6D4 0%, #EC4899 25%, #7C3AED 50%, #3B82F6 75%, #06B6D4 100%)',
                      'linear-gradient(135deg, #EC4899 0%, #7C3AED 25%, #3B82F6 50%, #06B6D4 75%, #EC4899 100%)',
                      'linear-gradient(135deg, #7C3AED 0%, #3B82F6 25%, #06B6D4 50%, #EC4899 75%, #7C3AED 100%)',
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />

                {/* Shine/Highlight Layer */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.25) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20 rounded-full"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    maskImage: 'radial-gradient(circle, black 70%, transparent 100%)'
                  }} />
              </motion.div>
            </div>

            {/* FLOATING CARDS */}
            <motion.div
              className="absolute top-4 left-0 rounded-lg px-4 py-3 w-44"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{ delay: 0.5, duration: 0.6, y: { duration: 3, repeat: Infinity } }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#9370DB' }}>
                <Brain size={13} /> Memory
              </div>
              <div className="text-lg font-bold" style={{ color: '#F8FAFC' }}>24,320</div>
              <div className="text-[10px]" style={{ color: '#94A3B8' }}>Interactions</div>
            </motion.div>

            <motion.div
              className="absolute top-0 right-0 rounded-lg px-4 py-3 w-44"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
              transition={{ delay: 0.6, duration: 0.6, y: { duration: 3.5, repeat: Infinity } }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#9370DB' }}>
                <Users size={13} /> Personality Sync
              </div>
              <div className="relative w-16 h-16 mx-auto mt-1">
                <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="6" />
                  <motion.circle cx="32" cy="32" r="28" fill="none" stroke="#9370DB" strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 28 * 0.98} ${2 * Math.PI * 28}`}
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: [0, -2 * Math.PI * 28 * 0.98] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: '#F8FAFC' }}>98%</div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-32 left-[-20px] rounded-lg px-4 py-3 w-44"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
              transition={{ delay: 0.7, duration: 0.6, y: { duration: 4, repeat: Infinity } }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#9370DB' }}>
                <Infinity size={13} /> Knowledge
              </div>
              <div className="text-lg font-bold" style={{ color: '#F8FAFC' }}>∞</div>
              <div className="text-[10px]" style={{ color: '#94A3B8' }}>Continuously Expanding</div>
            </motion.div>

            <motion.div
              className="absolute bottom-36 right-[-10px] rounded-lg px-4 py-3 w-44"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
              transition={{ delay: 0.8, duration: 0.6, y: { duration: 3.2, repeat: Infinity } }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#9370DB' }}>
                <Activity size={13} /> Learning
              </div>
              <svg viewBox="0 0 100 30" className="w-full h-6">
                <path d="M0,15 Q10,5 20,15 T40,15 T60,8 T80,18 T100,12" fill="none" stroke="#6A5ACD" strokeWidth="2" />
              </svg>
              <div className="text-[10px] mt-1" style={{ color: '#94A3B8' }}>Adapting to you...</div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 right-8 rounded-lg px-4 py-3 w-36"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
              transition={{ delay: 0.9, duration: 0.6, y: { duration: 3.8, repeat: Infinity } }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}>
              <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#9370DB' }}>
                <Target size={13} /> Goals
              </div>
              <div className="text-lg font-bold" style={{ color: '#F8FAFC' }}>12</div>
              <div className="text-[10px]" style={{ color: '#94A3B8' }}>Active</div>
            </motion.div>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ color: 'rgba(224,224,224,0.3)' }}>
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono">scroll to explore</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how" className="relative z-10 py-32 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ color: '#A78BFA', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <span style={{ color: 'rgba(124,58,237,0.6)' }}>01</span> HOW IT WORKS
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight" style={{ color: '#F8FAFC' }}>
              Three steps.<br />
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #EC4899, #7C3AED)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Infinite conversations.
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', icon: '📝', title: 'Upload Your Data', desc: 'Paste in your emails, texts, and journal entries. Our AI analyzes your communication patterns, tone, and unique personality traits.' },
              { n: '02', icon: '🧠', title: 'Refine Your Twin', desc: 'Review and fine-tune your AI Twin\'s responses. Answer a few questions to fill gaps and ensure your Twin captures your essence perfectly.' },
              { n: '03', icon: '🔗', title: 'Share & Interact', desc: 'Your AI Twin is ready. Share it with friends, family, or the world. Let them chat with your digital persona.' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="rounded-lg p-7 group transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124,58,237,0.2)',
                }}>
                <div className="absolute top-0 left-0 right-0 h-px rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)' }} />
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{item.icon}</div>
                  <div className="font-mono text-5xl font-bold" style={{ color: 'rgba(255,255,255,0.05)' }}>
                    {item.n}
                  </div>
                </div>
                <div className="text-base font-semibold text-white mb-3">{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="relative z-10 py-32 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ color: '#60A5FA', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <span style={{ color: 'rgba(59,130,246,0.6)' }}>02</span> FEATURES
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: '#F8FAFC' }}>
              Built different.<br />
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #EC4899, #7C3AED)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Feels real.
              </motion.span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: <Zap size={22} />, title: 'Instant style matching', desc: 'Captures your vocabulary, emoji patterns, humor level, energy and sentence rhythm in minutes.', color: '#EABF08', bg: 'rgba(234,179,8,0.06)', border: 'rgba(234,179,8,0.15)' },
              { icon: <Shield size={22} />, title: 'Full privacy controls', desc: 'Block any topic. Take your twin offline instantly. Your data never trains our model — ever.', color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)' },
              { icon: <Globe size={22} />, title: 'Shareable public link', desc: 'Your unique link works on any device, any browser. No app download. One link, infinite conversations.', color: '#3B82F6', bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.15)' },
              { icon: <Star size={22} />, title: 'Deep conversation memory', desc: 'Every visitor remembered. Twin builds context over time, recalls past conversations. Feels genuinely real.', color: '#A78BFA', bg: 'rgba(124,92,252,0.06)', border: 'rgba(124,92,252,0.2)' },
            ].map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="rounded-lg p-7 group cursor-default transition-all"
                style={{ background: f.bg, border: `1px solid ${f.border}` }}>
                <div className="flex gap-5">
                  <motion.div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                    whileHover={{ scale: 1.1 }}
                    style={{ background: f.bg, border: `1px solid ${f.border}`, color: f.color, boxShadow: `0 0 24px ${f.bg}` }}>
                    {f.icon}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white mb-2">{f.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="relative z-10 py-32 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ color: '#34D399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <span style={{ color: 'rgba(52,211,153,0.6)' }}>03</span> PRICING
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: '#F8FAFC' }}>
              Start free.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>Scale when ready.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Starter',
                price: 'Free',
                desc: 'Perfect for getting started',
                features: ['1 Persona', '50 chats/month', 'Basic analysis', 'Public link', 'Community support'],
                cta: 'Get Started',
                popular: false,
              },
              {
                name: 'Pro',
                price: '$14.99',
                period: '/mo',
                desc: 'Advanced features for power users',
                features: ['3 Personas', 'Unlimited chats', 'Advanced analysis', 'Voice cloning', 'Analytics', 'Priority support', 'Custom domain'],
                cta: 'Start Free Trial',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'Tailored for teams',
                features: ['Unlimited Personas', 'API access', 'Advanced analytics', 'Dedicated support', 'Custom integrations', 'SSO', 'SLA'],
                cta: 'Contact Sales',
                popular: false,
              },
            ].map((tier, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="rounded-lg p-8 relative transition-all"
                style={{
                  background: tier.popular ? 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(59,130,246,0.1) 100%)' : 'rgba(255, 255, 255, 0.05)',
                  border: tier.popular ? '2px solid rgba(124,58,237,0.4)' : '1px solid rgba(124,58,237,0.15)',
                  boxShadow: tier.popular ? '0 0 40px rgba(124,58,237,0.2)' : 'none',
                }}>
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold px-3 py-1.5 rounded-full font-mono"
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 20px rgba(124,58,237,0.5)' }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="text-sm font-mono mb-1" style={{ color: tier.popular ? '#A78BFA' : 'rgba(255,255,255,0.5)' }}>{tier.name}</div>
                <div className="flex items-end gap-1.5 mb-1">
                  <span className="text-5xl font-bold" style={{ color: '#F8FAFC' }}>{tier.price}</span>
                  {tier.period && <span className="mb-2 text-sm font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{tier.period}</span>}
                </div>
                <div className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>{tier.desc}</div>
                <div className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: tier.popular ? 'rgba(124,58,237,0.2)' : 'rgba(124,58,237,0.1)', border: `1px solid ${tier.popular ? 'rgba(124,58,237,0.4)' : 'rgba(124,58,237,0.2)'}` }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#A78BFA' }} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/signup" className="block text-center py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: tier.popular ? 'linear-gradient(135deg, #7C3AED, #3B82F6)' : 'transparent',
                    border: tier.popular ? 'none' : '1px solid rgba(124,58,237,0.3)',
                    color: '#F8FAFC',
                    boxShadow: tier.popular ? '0 0 20px rgba(124,58,237,0.3)' : 'none',
                  }}>
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative z-10 py-36 px-6 text-center" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

        <motion.div className="relative max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <motion.div className="text-7xl mb-8 inline-block"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}>
            ⚡
          </motion.div>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[0.95]" style={{ color: '#F8FAFC' }}>
            Be everywhere.<br />
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #EC4899, #7C3AED)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              At once.
            </motion.span>
          </h2>
          <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Your twin never sleeps. Never gets tired.<br />
            Always sounds exactly like you.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <Link href="/signup" className="inline-flex items-center gap-3 px-10 py-5 rounded-lg font-bold text-lg text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
              <Sparkles size={20} />
              Create your twin — it's free
              <ArrowRight size={20} />
            </Link>
          </motion.div>
          <p className="mt-6 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
            No credit card · Setup in 5 minutes · Cancel anytime
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative z-10 border-t py-12 px-6" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Product</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block hover:text-white transition-colors">Security</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Company</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Legal</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Social</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block hover:text-white transition-colors">Discord</a>
                <a href="#" className="block hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          <div className="border-t pt-8" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © 2026 Personal AI Twin. All rights reserved.
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Made with ❤️ by Manus</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}