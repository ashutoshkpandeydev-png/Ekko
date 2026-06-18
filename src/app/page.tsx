'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight, Zap, Shield, Globe, ChevronDown, Brain, Infinity, Activity, Target, Users, Star, Sparkles, Cpu, Waves, Lightbulb, Rocket, Lock, Zap as ZapIcon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headCanvasRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // 3D Head Visualization with Advanced Rendering
  useEffect(() => {
    setIsLoaded(true)
    const canvas = headCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth * 0.55
    let H = canvas.height = window.innerHeight * 0.75
    let animId: number
    let time = 0

    // Advanced particle system for head outline
    const particles: any[] = []
    const particleCount = 150

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 80 + Math.random() * 40
      particles.push({
        x: W / 2 + Math.cos(angle) * radius,
        y: H / 2.2 + Math.sin(angle) * radius,
        baseX: W / 2 + Math.cos(angle) * radius,
        baseY: H / 2.2 + Math.sin(angle) * radius,
        angle: angle,
        radius: radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: Math.random(),
        size: Math.random() * 3 + 1,
        color: ['#7C3AED', '#3B82F6', '#06B6D4', '#EC4899'][Math.floor(Math.random() * 4)],
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Neural network nodes
    const nodes: any[] = []
    const nodeCount = 60

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: W / 2 + (Math.random() - 0.5) * 200,
        y: H / 2.2 + (Math.random() - 0.5) * 250,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        color: ['#7C3AED', '#3B82F6', '#06B6D4'][Math.floor(Math.random() * 3)],
      })
    }

    const draw = () => {
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, W, H)
      gradient.addColorStop(0, 'rgba(10, 14, 39, 0.1)')
      gradient.addColorStop(0.5, 'rgba(10, 14, 39, 0.05)')
      gradient.addColorStop(1, 'rgba(10, 14, 39, 0.1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)

      time += 0.01

      // Draw head outline with particles
      particles.forEach((p, i) => {
        p.angle += 0.001
        p.radius = 80 + Math.sin(time * 0.5 + i * 0.1) * 20 + Math.random() * 20
        p.x = W / 2 + Math.cos(p.angle) * p.radius
        p.y = H / 2.2 + Math.sin(p.angle) * p.radius

        p.pulse += 0.05
        const pulseScale = 1 + Math.sin(p.pulse) * 0.4

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pulseScale, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(')', `, ${p.opacity * (0.6 + Math.sin(p.pulse) * 0.4)})`).replace('rgb', 'rgba')
        ctx.fill()

        // Glow effect
        ctx.strokeStyle = p.color.replace(')', `, ${p.opacity * 0.3})`).replace('rgb', 'rgba')
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // Draw neural network connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 180) {
            const alpha = 0.25 * (1 - dist / 180) * nodes[i].opacity
            ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw neural network nodes with advanced effects
      nodes.forEach((node) => {
        node.x = (node.x + node.vx + W) % W
        node.y = (node.y + node.vy + H) % H
        node.pulse += 0.03

        const pulseScale = 1 + Math.sin(node.pulse) * 0.5
        const brightness = 0.5 + Math.sin(node.pulse) * 0.5

        // Main node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * pulseScale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${node.color === '#7C3AED' ? '124,58,237' : node.color === '#3B82F6' ? '59,130,246' : '6,182,212'}, ${node.opacity * brightness})`
        ctx.fill()

        // Outer glow
        ctx.strokeStyle = `rgba(${node.color === '#7C3AED' ? '124,58,237' : node.color === '#3B82F6' ? '59,130,246' : '6,182,212'}, ${node.opacity * 0.5})`
        ctx.lineWidth = 2.5
        ctx.stroke()

        // Inner highlight
        ctx.beginPath()
        ctx.arc(node.x - node.r * 0.3, node.y - node.r * 0.3, node.r * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * brightness})`
        ctx.fill()
      })

      // Draw head shape outline
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(W / 2, H / 2.2, 120, 160, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Draw face features outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)'
      ctx.lineWidth = 1.5
      // Eyes
      ctx.beginPath()
      ctx.arc(W / 2 - 40, H / 2.2 - 40, 15, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(W / 2 + 40, H / 2.2 - 40, 15, 0, Math.PI * 2)
      ctx.stroke()

      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth * 0.55
      H = canvas.height = window.innerHeight * 0.75
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
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  }

  return (
    <main
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: '#0A0E27' }}
      onMouseMove={onMouseMove}
    >
      {/* PREMIUM BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%)',
        }} />

      <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(1000px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124,58,237,0.12) 0%, transparent 50%)`,
        }} />

      {/* Animated grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

      {/* ═══════════════ PREMIUM NAVIGATION ═══════════════ */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          background: scrollY > 50 ? 'rgba(10,14,39,0.95)' : 'transparent',
          borderBottom: scrollY > 50 ? '1px solid rgba(124,58,237,0.2)' : '1px solid transparent',
          boxShadow: scrollY > 50 ? '0 20px 60px rgba(124,58,237,0.15)' : 'none',
          transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.08 }}>
            <motion.div
              className="relative w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}>
              ∞
            </motion.div>
            <span className="text-xl font-bold tracking-tight">Ekko</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 text-sm">
            {[['Features', '#features'], ['How It Works', '#works'], ['Pricing', '#pricing'], ['About', '#about']].map(([label, href]) => (
              <motion.a
                key={label}
                href={href}
                className="relative group"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                whileHover={{ color: '#F8FAFC' }}>
                {label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup"
              className="text-sm font-bold px-7 py-3 rounded-lg text-white flex items-center gap-2 group"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                boxShadow: '0 0 40px rgba(124,58,237,0.6)',
              }}>
              <Sparkles size={16} />
              <span>Launch Now</span>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative z-10 min-h-screen flex items-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: PREMIUM TEXT CONTENT */}
          <motion.div
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}>

            <motion.div
              className="inline-flex items-center gap-3 mb-10 px-5 py-3 rounded-full text-xs font-semibold tracking-wider"
              variants={itemVariants}
              style={{
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: '#A78BFA',
              }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                ⚡
              </motion.span>
              <span>THE FUTURE OF AI INTERACTION</span>
            </motion.div>

            <motion.h1
              className="leading-[1.1] tracking-tight mb-8"
              variants={itemVariants}
              style={{ fontSize: 'clamp(52px, 8vw, 92px)', fontWeight: 900 }}>
              <motion.span className="block" style={{ color: '#F8FAFC' }}>
                Your Mind.
              </motion.span>
              <motion.span
                className="block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7C3AED 0%, #3B82F6 25%, #06B6D4 50%, #EC4899 75%, #7C3AED 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Your Twin.
              </motion.span>
            </motion.h1>

            <motion.p
              className="max-w-lg mb-12 leading-relaxed text-lg"
              variants={itemVariants}
              style={{ color: '#CBD5E1' }}>
              Meet Ekko—your intelligent digital companion that learns, adapts, and grows with you. Experience conversations that feel genuinely human, powered by cutting-edge AI technology.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-5 mb-16"
              variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
                <Link href="/signup"
                  className="group flex items-center gap-3 px-8 py-5 rounded-lg font-bold text-base text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                    boxShadow: '0 0 40px rgba(124,58,237,0.5)',
                  }}>
                  <Sparkles size={20} />
                  Start Your Journey
                  <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/dashboard"
                  className="flex items-center gap-3 px-8 py-5 rounded-lg font-semibold text-base transition-all"
                  style={{
                    background: 'rgba(124,58,237,0.15)',
                    border: '2px solid rgba(124,58,237,0.4)',
                    color: '#F8FAFC',
                  }}>
                  <Rocket size={18} />
                  Watch Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center gap-8"
              variants={itemVariants}>
              {[['2.5M+', 'Active Users'], ['98.9%', 'Satisfaction'], ['24/7', 'Always On']].map(([val, label], i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-6"
                  whileHover={{ scale: 1.08 }}>
                  <div>
                    <motion.div
                      className="text-2xl font-black"
                      style={{ color: '#F8FAFC' }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}>
                      {val}
                    </motion.div>
                    <div className="text-xs font-semibold" style={{ color: '#94A3B8' }}>{label}</div>
                  </div>
                  {i < 2 && <div className="w-px h-10" style={{ background: 'rgba(160,160,160,0.2)' }} />}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D HEAD VISUALIZATION */}
          <motion.div
            className="relative h-[750px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1.1 }}>

            {/* Advanced 3D Head Canvas */}
            <canvas
              ref={headCanvasRef}
              className="absolute inset-0 w-full h-full"
              style={{
                filter: 'drop-shadow(0 0 80px rgba(124,58,237,0.4))',
              }}
            />

            {/* Premium Holographic Glow Layers */}
            <motion.div
              className="absolute rounded-full"
              animate={{
                opacity: [0.15, 0.4, 0.15],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '550px',
                height: '700px',
                background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.5) 0%, rgba(59,130,246,0.2) 25%, transparent 80%)',
                filter: 'blur(100px)',
                boxShadow: '0 0 200px rgba(124,58,237,0.4), 0 0 350px rgba(59,130,246,0.2)',
              }}
            />

            <motion.div
              className="absolute rounded-full"
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{
                width: '480px',
                height: '620px',
                background: 'radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.4) 0%, rgba(236,72,153,0.2) 40%, transparent 80%)',
                filter: 'blur(80px)',
                boxShadow: '0 0 150px rgba(6,182,212,0.3), 0 0 250px rgba(236,72,153,0.2)',
              }}
            />

            {/* Floating Premium Cards */}
            {[
              { label: 'Memory', value: '∞', desc: 'Infinite Recall', angle: -50, distance: 200, icon: '🧠' },
              { label: 'Personality', value: '100%', desc: 'Perfect Match', angle: 50, distance: 200, icon: '✨' },
              { label: 'Learning', value: 'Live', desc: 'Real-time Growth', angle: 170, distance: 200, icon: '⚡' },
              { label: 'Security', value: 'Max', desc: 'Fully Protected', angle: -170, distance: 200, icon: '🔒' },
              { label: 'Connection', value: '24/7', desc: 'Always Ready', angle: 90, distance: 200, icon: '💫' },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="absolute rounded-2xl px-6 py-5 w-56 backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  x: Math.cos((card.angle * Math.PI) / 180) * card.distance,
                  y: Math.sin((card.angle * Math.PI) / 180) * card.distance,
                }}
                transition={{ delay: 0.6 + i * 0.12, duration: 0.9 }}
                whileHover={{ scale: 1.2, y: -15 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 60px rgba(124,58,237,0.3), inset 0 1px 1px rgba(255,255,255,0.2)',
                }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{card.icon}</span>
                  <div className="text-xs font-bold tracking-wider" style={{ color: '#A78BFA' }}>{card.label}</div>
                </div>
                <motion.div
                  className="text-2xl font-black mb-1"
                  style={{ color: '#F8FAFC' }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}>
                  {card.value}
                </motion.div>
                <div className="text-xs" style={{ color: '#94A3B8' }}>{card.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ANIMATED SCROLL INDICATOR */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ color: 'rgba(224,224,224,0.4)' }}>
          <span className="text-xs tracking-[0.4em] uppercase font-mono font-bold">Scroll to Explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ FEATURES SECTION ═══════════════ */}
      <section className="relative z-10 py-48 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.15)' }} id="features">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={{ color: '#F8FAFC' }}>
              Powered by<br />
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage: 'linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4, #EC4899, #7C3AED)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                Next-Gen Intelligence
              </motion.span>
            </h2>
            <p className="text-lg" style={{ color: '#CBD5E1', maxWidth: '600px', margin: '0 auto' }}>
              Experience the pinnacle of AI technology with features designed for the future
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}>
            {[
              { icon: '🧠', title: 'Neural Learning', desc: 'Learns your patterns, preferences, and communication style instantly', color: '#7C3AED' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Responds in milliseconds with contextual, relevant answers', color: '#3B82F6' },
              { icon: '🔒', title: 'Fort Knox Security', desc: 'Military-grade encryption keeps your data completely private', color: '#06B6D4' },
              { icon: '🌍', title: 'Global Reach', desc: 'Works seamlessly across all devices and platforms worldwide', color: '#EC4899' },
              { icon: '✨', title: 'Personality Perfect', desc: 'Captures your unique voice, humor, and communication style', color: '#EABF08' },
              { icon: '🚀', title: 'Always Evolving', desc: 'Continuously improves and adapts to your changing needs', color: '#10B981' },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -12 }}
                className="rounded-2xl p-10 group cursor-default transition-all"
                style={{
                  background: `linear-gradient(135deg, rgba(${f.color === '#7C3AED' ? '124,58,237' : f.color === '#3B82F6' ? '59,130,246' : f.color === '#06B6D4' ? '6,182,212' : f.color === '#EC4899' ? '236,72,153' : f.color === '#EABF08' ? '234,179,8' : '16,185,129'},0.1), rgba(${f.color === '#7C3AED' ? '124,58,237' : f.color === '#3B82F6' ? '59,130,246' : f.color === '#06B6D4' ? '6,182,212' : f.color === '#EC4899' ? '236,72,153' : f.color === '#EABF08' ? '234,179,8' : '16,185,129'},0.05))`,
                  border: `1.5px solid rgba(${f.color === '#7C3AED' ? '124,58,237' : f.color === '#3B82F6' ? '59,130,246' : f.color === '#06B6D4' ? '6,182,212' : f.color === '#EC4899' ? '236,72,153' : f.color === '#EABF08' ? '234,179,8' : '16,185,129'},0.25)`,
                  boxShadow: `0 20px 60px rgba(${f.color === '#7C3AED' ? '124,58,237' : f.color === '#3B82F6' ? '59,130,246' : f.color === '#06B6D4' ? '6,182,212' : f.color === '#EC4899' ? '236,72,153' : f.color === '#EABF08' ? '234,179,8' : '16,185,129'},0.15)`,
                }}>
                <motion.div
                  className="text-5xl mb-6"
                  whileHover={{ scale: 1.3, rotate: 10 }}>
                  {f.icon}
                </motion.div>
                <div className="font-bold text-xl mb-3" style={{ color: '#F8FAFC' }}>{f.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="relative z-10 py-40 px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8" style={{ color: '#F8FAFC' }}>
            Ready to Meet Your Twin?
          </h2>
          <p className="text-lg mb-12" style={{ color: '#CBD5E1', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Join thousands of users experiencing the future of AI interaction today
          </p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
            <Link href="/signup"
              className="inline-flex items-center gap-3 px-10 py-6 rounded-lg font-bold text-lg text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                boxShadow: '0 0 60px rgba(124,58,237,0.6)',
              }}>
              <Sparkles size={24} />
              Launch Ekko Now
              <ArrowRight size={24} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ PREMIUM FOOTER ═══════════════ */}
      <footer className="relative z-10 border-t py-20 px-6" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-16">
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Product</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Company</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Legal</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Social</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block hover:text-white transition-colors">Discord</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Status</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                All Systems Operational
              </div>
            </div>
          </div>
          <div className="border-t pt-12" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © 2026 Ekko. All rights reserved. Powered by Next-Gen AI Technology.
              </div>
              <motion.div
                className="flex items-center gap-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>The Year of Your AI Twin</span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
