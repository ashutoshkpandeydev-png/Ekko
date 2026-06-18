'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight, Zap, Shield, Globe, ChevronDown, Brain, Infinity, Activity, Target, Users, Star, Sparkles, Cpu, Waves, Lightbulb, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Advanced particle canvas with 3D-like effects
  useEffect(() => {
    setIsLoaded(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId: number

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: ['#7C3AED', '#3B82F6', '#06B6D4', '#EC4899'][Math.floor(Math.random() * 4)],
      life: Math.random() * 100 + 50,
      maxLife: Math.random() * 100 + 50,
    }))

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.1)'
      ctx.fillRect(0, 0, W, H)

      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W
        p.y = (p.y + p.vy + H) % H
        p.life--

        if (p.life <= 0) {
          p.life = p.maxLife
          p.x = Math.random() * W
          p.y = Math.random() * H
        }

        const lifeRatio = p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * lifeRatio, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(')', `,${p.opacity * lifeRatio})`)
        ctx.fill()

        // Add glow effect
        ctx.strokeStyle = p.color.replace(')', `,${p.opacity * 0.3 * lifeRatio})`)
        ctx.lineWidth = 1
        ctx.stroke()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: '#0A0E27' }}
      onMouseMove={onMouseMove}
    >
      {/* ADVANCED BACKGROUND LAYERS */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />
      
      {/* Multiple gradient layers for depth */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
      
      <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124,58,237,0.08) 0%, transparent 60%)` }} />

      {/* Animated mesh gradient background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* ═══════════════ NAVIGATION ═══════════════ */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: scrollY > 40 ? 'rgba(10,14,39,0.95)' : 'transparent',
          backdropFilter: scrollY > 40 ? 'blur(20px)' : 'none',
          borderBottom: scrollY > 40 ? '1px solid rgba(124,58,237,0.15)' : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: scrollY > 40 ? '0 10px 40px rgba(124,58,237,0.1)' : 'none'
        }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <motion.div className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}>
            <motion.div className="relative w-10 h-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              <div className="absolute inset-0 rounded-lg"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }} />
              <div className="absolute inset-0 rounded-lg flex items-center justify-center font-bold text-sm text-white">
                ∞
              </div>
            </motion.div>
            <span className="text-lg font-bold tracking-tight">Ekko</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {[['How it works', '#how'], ['Features', '#features'], ['Pricing', '#pricing']].map(([label, href]) => (
              <motion.a 
                key={label} 
                href={href} 
                className="relative group hover:text-white transition-colors duration-300"
                whileHover={{ y: -2 }}>
                {label}
                <motion.span 
                  className="absolute -bottom-0.5 left-0 h-px group-hover:w-full transition-all duration-400"
                  style={{ background: 'linear-gradient(90deg, #7C3AED, #3B82F6)', width: 0 }}
                  whileHover={{ width: '100%' }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-sm px-4 py-2 rounded-lg hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/signup" className="text-sm font-semibold px-6 py-2.5 rounded-lg text-white"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}>
                Get started free
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative z-10 min-h-screen flex items-center px-6 pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: TEXT CONTENT WITH STAGGER ANIMATION */}
          <motion.div 
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}>

            <motion.div 
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs"
              variants={itemVariants}
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', color: '#9370DB' }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>⚙️</motion.span>
              <span style={{ color: '#A0A0A0' }}>The next evolution of AI is you</span>
            </motion.div>

            <motion.h1 
              className="leading-[0.95] tracking-tight mb-6"
              variants={itemVariants}
              style={{ fontSize: 'clamp(48px, 7vw, 84px)', fontWeight: 800 }}>
              <motion.span className="block" style={{ color: '#F8FAFC' }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}>
                Your world.
              </motion.span>
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

            <motion.p 
              className="max-w-md mb-10 leading-relaxed"
              variants={itemVariants}
              style={{ fontSize: '1.1rem', color: '#CBD5E1' }}>
              A true digital twin that understands you, learns with you, and evolves with you. Built for your world. By you.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-start gap-4 mb-12"
              variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup"
                  className="group flex items-center gap-3 px-7 py-4 rounded-lg font-semibold text-base text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}>
                  <Sparkles size={18} />
                  Join Waitlist
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={18} />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard"
                  className="flex items-center gap-3 px-7 py-4 rounded-lg font-medium text-sm transition-all"
                  style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.4)', color: '#F8FAFC' }}>
                  <Rocket size={16} />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex items-center gap-6"
              variants={itemVariants}>
              {[['1.2M+', 'Early Members'], ['98.7%', 'Satisfaction Rate'], ['100%', 'Privacy First']].map(([val, label], i) => (
                <motion.div 
                  key={i} 
                  className="flex items-center gap-6"
                  whileHover={{ scale: 1.05 }}>
                  <div>
                    <motion.div 
                      className="text-lg font-bold" 
                      style={{ color: '#F8FAFC' }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                      {val}
                    </motion.div>
                    <div className="text-xs" style={{ color: '#94A3B8' }}>{label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-8" style={{ background: 'rgba(160,160,160,0.15)' }} />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: ULTRA-PREMIUM ANIMATED GRADIENT ORB */}
          <motion.div 
            className="relative h-[600px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}>

            {/* Multiple glow layers for extreme depth */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Outer glow layer 3 - Largest */}
              <motion.div
                className="absolute rounded-full"
                animate={{ 
                  opacity: [0.15, 0.35, 0.15],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '500px',
                  height: '500px',
                  background: 'radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(59,130,246,0.2) 30%, transparent 80%)',
                  filter: 'blur(100px)',
                  boxShadow: '0 0 200px rgba(124,58,237,0.4), 0 0 300px rgba(59,130,246,0.2)'
                }}
              />

              {/* Outer glow layer 2 */}
              <motion.div
                className="absolute rounded-full"
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.9, 1.05, 0.9]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                style={{
                  width: '420px',
                  height: '420px',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(6,182,212,0.3) 40%, transparent 80%)',
                  filter: 'blur(80px)',
                  boxShadow: '0 0 150px rgba(59,130,246,0.5), 0 0 200px rgba(6,182,212,0.3)'
                }}
              />

              {/* Outer glow layer 1 */}
              <motion.div
                className="absolute rounded-full"
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  scale: [0.95, 1.02, 0.95]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{
                  width: '360px',
                  height: '360px',
                  background: 'radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(124,58,237,0.3) 35%, transparent 80%)',
                  filter: 'blur(60px)',
                  boxShadow: '0 0 120px rgba(236,72,153,0.4), 0 0 180px rgba(124,58,237,0.3)'
                }}
              />

              {/* Main Orb */}
              <motion.div
                className="relative rounded-full overflow-hidden"
                animate={{ 
                  y: [0, -30, 0],
                  scale: [1, 1.03, 1],
                  rotateX: [0, 5, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '320px',
                  height: '320px',
                  boxShadow: '0 0 100px rgba(124,58,237,0.9), 0 0 150px rgba(59,130,246,0.6), inset 0 0 100px rgba(255,255,255,0.15), inset -50px -50px 100px rgba(0,0,0,0.3)',
                  perspective: '1000px'
                }}>

                {/* Main animated gradient with conic gradient for swirl effect */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'conic-gradient(from 0deg, #7C3AED, #3B82F6, #06B6D4, #EC4899, #7C3AED)',
                  }}
                />
                
                {/* Secondary animated gradient layer */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.8) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.6) 0%, transparent 50%)',
                      'radial-gradient(circle at 70% 30%, rgba(59,130,246,0.8) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(6,182,212,0.6) 0%, transparent 50%)',
                      'radial-gradient(circle at 70% 70%, rgba(6,182,212,0.8) 0%, transparent 50%), radial-gradient(circle at 30% 30%, rgba(124,58,237,0.6) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 70%, rgba(236,72,153,0.8) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(59,130,246,0.6) 0%, transparent 50%)',
                      'radial-gradient(circle at 30% 30%, rgba(124,58,237,0.8) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(236,72,153,0.6) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    mixBlendMode: 'screen',
                  }}
                />

                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    background: [
                      'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                      'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 rounded-full opacity-25"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    maskImage: 'radial-gradient(circle, black 75%, transparent 100%)'
                  }} />

                {/* Rotating border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    border: '2px solid transparent',
                    borderImage: 'linear-gradient(135deg, #7C3AED, #3B82F6, #06B6D4, #EC4899) 1',
                    opacity: 0.3
                  }}
                />
              </motion.div>
            </div>

            {/* FLOATING DATA CARDS WITH ADVANCED ANIMATIONS */}
            {[
              { icon: Brain, label: 'Memory', value: '24,320', desc: 'Interactions', delay: 0.5, angle: 45, distance: 220 },
              { icon: Users, label: 'Personality Sync', value: '98%', desc: 'Accuracy', delay: 0.6, angle: 135, distance: 220 },
              { icon: Infinity, label: 'Knowledge', value: '∞', desc: 'Expanding', delay: 0.7, angle: 225, distance: 220 },
              { icon: Activity, label: 'Learning', value: 'Live', desc: 'Adapting', delay: 0.8, angle: 315, distance: 220 },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="absolute rounded-xl px-5 py-4 w-48 top-1/2 left-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: Math.cos((card.angle * Math.PI) / 180) * card.distance - 96,
                  y: Math.sin((card.angle * Math.PI) / 180) * card.distance - 40
                }}
                transition={{ delay: card.delay, duration: 0.8 }}
                whileHover={{ scale: 1.15, transition: { duration: 0.3 } }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(124,58,237,0.2)'
                }}>
                <motion.div 
                  className="flex items-center gap-2 text-xs mb-2" 
                  style={{ color: '#9370DB' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                  <card.icon size={14} /> {card.label}
                </motion.div>
                <motion.div 
                  className="text-xl font-bold" 
                  style={{ color: '#F8FAFC' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {card.value}
                </motion.div>
                <div className="text-[10px]" style={{ color: '#94A3B8' }}>{card.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ANIMATED SCROLL INDICATOR */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ color: 'rgba(224,224,224,0.4)' }}>
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono">scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how" className="relative z-10 py-40 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <motion.div 
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ color: '#A78BFA', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity }}>⚡</motion.span>
              HOW IT WORKS
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4" style={{ color: '#F8FAFC' }}>
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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {[
              { n: '01', icon: '📝', title: 'Upload Your Data', desc: 'Paste in your emails, texts, and journal entries. Our AI analyzes your communication patterns, tone, and unique personality traits.' },
              { n: '02', icon: '🧠', title: 'Refine Your Twin', desc: 'Review and fine-tune your AI Twin\'s responses. Answer a few questions to fill gaps and ensure your Twin captures your essence perfectly.' },
              { n: '03', icon: '🔗', title: 'Share & Interact', desc: 'Your AI Twin is ready. Share it with friends, family, or the world. Let them chat with your digital persona.' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.02 }}
                className="rounded-2xl p-8 group transition-all relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  boxShadow: '0 8px 32px rgba(124,58,237,0.1)'
                }}>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(59,130,246,0.05) 100%)',
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-5xl">{item.icon}</div>
                    <motion.div 
                      className="font-mono text-6xl font-bold" 
                      style={{ color: 'rgba(255,255,255,0.08)' }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}>
                      {item.n}
                    </motion.div>
                  </div>
                  <div className="text-lg font-semibold text-white mb-3">{item.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="relative z-10 py-40 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <motion.div 
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ color: '#60A5FA', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>✨</motion.span>
              FEATURES
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4" style={{ color: '#F8FAFC' }}>
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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            {[
              { icon: <Zap size={24} />, title: 'Instant style matching', desc: 'Captures your vocabulary, emoji patterns, humor level, energy and sentence rhythm in minutes.', color: '#EABF08', bg: 'rgba(234,179,8,0.06)', border: 'rgba(234,179,8,0.15)' },
              { icon: <Shield size={24} />, title: 'Full privacy controls', desc: 'Block any topic. Take your twin offline instantly. Your data never trains our model — ever.', color: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)' },
              { icon: <Globe size={24} />, title: 'Shareable public link', desc: 'Your unique link works on any device, any browser. No app download. One link, infinite conversations.', color: '#3B82F6', bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.15)' },
              { icon: <Star size={24} />, title: 'Deep conversation memory', desc: 'Every visitor remembered. Twin builds context over time, recalls past conversations. Feels genuinely real.', color: '#A78BFA', bg: 'rgba(124,92,252,0.06)', border: 'rgba(124,92,252,0.2)' },
            ].map((f, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                className="rounded-2xl p-8 group cursor-default transition-all"
                style={{ background: f.bg, border: `1px solid ${f.border}`, boxShadow: '0 8px 32px rgba(124,58,237,0.1)' }}>
                <div className="flex gap-6">
                  <motion.div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    style={{ background: f.bg, border: `1px solid ${f.border}`, color: f.color, boxShadow: `0 0 24px ${f.bg}` }}>
                    {f.icon}
                  </motion.div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-lg">{f.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{f.desc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="relative z-10 py-40 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
            <motion.div 
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ color: '#34D399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
              <motion.span animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>💰</motion.span>
              PRICING
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4" style={{ color: '#F8FAFC' }}>
              Start free.<br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>Scale when ready.</span>
            </h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
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
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -16, scale: 1.02 }}
                className="rounded-2xl p-8 relative transition-all overflow-hidden group"
                style={{
                  background: tier.popular ? 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(59,130,246,0.1) 100%)' : 'rgba(255, 255, 255, 0.05)',
                  border: tier.popular ? '2px solid rgba(124,58,237,0.5)' : '1px solid rgba(124,58,237,0.15)',
                  boxShadow: tier.popular ? '0 20px 60px rgba(124,58,237,0.3)' : '0 8px 32px rgba(124,58,237,0.1)'
                }}>
                {tier.popular && (
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold px-4 py-2 rounded-full font-mono"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.6)' }}>
                    ⭐ MOST POPULAR
                  </motion.div>
                )}
                <div className="text-sm font-mono mb-2" style={{ color: tier.popular ? '#A78BFA' : 'rgba(255,255,255,0.5)' }}>{tier.name}</div>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="text-5xl font-bold" style={{ color: '#F8FAFC' }}>{tier.price}</span>
                  {tier.period && <span className="mb-2 text-sm font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{tier.period}</span>}
                </div>
                <div className="text-xs mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>{tier.desc}</div>
                <div className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <motion.div 
                      key={j} 
                      className="flex items-center gap-3 text-sm" 
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                      whileHover={{ x: 5 }}>
                      <motion.div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: j * 0.1 }}
                        style={{ background: tier.popular ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.1)', border: `1px solid ${tier.popular ? 'rgba(124,58,237,0.5)' : 'rgba(124,58,237,0.2)'}` }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: '#A78BFA' }} />
                      </motion.div>
                      {f}
                    </motion.div>
                  ))}
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/signup" className="block text-center py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: tier.popular ? 'linear-gradient(135deg, #7C3AED, #3B82F6)' : 'transparent',
                      border: tier.popular ? 'none' : '1px solid rgba(124,58,237,0.3)',
                      color: '#F8FAFC',
                      boxShadow: tier.popular ? '0 0 30px rgba(124,58,237,0.4)' : 'none',
                    }}>
                    {tier.cta}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative z-10 py-40 px-6 text-center overflow-hidden" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />

        <motion.div 
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <motion.div 
            className="text-8xl mb-8 inline-block"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}>
            🚀
          </motion.div>
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[0.95]" style={{ color: '#F8FAFC' }}>
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
          <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Your twin never sleeps. Never gets tired.<br />
            Always sounds exactly like you.
          </p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}>
            <Link href="/signup" className="inline-flex items-center gap-3 px-12 py-6 rounded-xl font-bold text-xl text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 50px rgba(124,58,237,0.5)' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles size={24} />
              </motion.div>
              Create your twin — it's free
              <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={24} />
              </motion.div>
            </Link>
          </motion.div>
          <p className="mt-8 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
            No credit card · Setup in 5 minutes · Cancel anytime
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative z-10 border-t py-16 px-6" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
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
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Resources</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Docs</a>
                <a href="#" className="block hover:text-white transition-colors">API</a>
                <a href="#" className="block hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
          <div className="border-t pt-8" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © 2026 Ekko. All rights reserved. Built with ❤️ by Manus.
              </div>
              <motion.div 
                className="flex items-center gap-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Powered by AI</span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
