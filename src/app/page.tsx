'use client'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { ArrowRight, Zap, Shield, Globe, ChevronDown, Brain, Infinity, Activity, Target, Users, Star, Sparkles, Cpu, Waves, Lightbulb, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const neuralNetRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Neural network visualization
  useEffect(() => {
    setIsLoaded(true)
    const canvas = neuralNetRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth * 0.5
    let H = canvas.height = window.innerHeight * 0.7
    let animId: number

    // Create nodes for neural network
    const nodes: any[] = []
    const nodeCount = 40
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)'
      ctx.fillRect(0, 0, W, H)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 150) {
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 * (1 - dist / 150) * nodes[i].opacity})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x = (node.x + node.vx + W) % W
        node.y = (node.y + node.vy + H) % H
        node.pulse += 0.02

        const pulseScale = 1 + Math.sin(node.pulse) * 0.3
        
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * pulseScale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(124, 58, 237, ${node.opacity * (0.5 + Math.sin(node.pulse) * 0.5)})`
        ctx.fill()

        // Glow
        ctx.strokeStyle = `rgba(59, 130, 246, ${node.opacity * 0.4})`
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth * 0.5
      H = canvas.height = window.innerHeight * 0.7
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
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      
      <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(800px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124,58,237,0.08) 0%, transparent 60%)` }} />

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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
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
            <span className="text-lg font-bold tracking-tight">Personal AI Twin</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            {[['Home', '#'], ['Features', '#features'], ['Use Cases', '#'], ['Technology', '#'], ['Pricing', '#pricing'], ['About', '#']].map(([label, href]) => (
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

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup" className="text-sm font-semibold px-6 py-2.5 rounded-lg text-white flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}>
              <Sparkles size={16} />
              Join Waitlist
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative z-10 min-h-screen flex items-center px-6 pt-28 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT: TEXT CONTENT */}
          <motion.div 
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}>

            <motion.div 
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs"
              variants={itemVariants}
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', color: '#9370DB' }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>///</motion.span>
              <span style={{ color: '#A0A0A0' }}>The next evolution of AI is you</span>
            </motion.div>

            <motion.h1 
              className="leading-[0.95] tracking-tight mb-6"
              variants={itemVariants}
              style={{ fontSize: 'clamp(48px, 7vw, 84px)', fontWeight: 800 }}>
              <motion.span className="block" style={{ color: '#F8FAFC' }}>
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

          {/* RIGHT: 3D HOLOGRAPHIC HEAD WITH NEURAL NETWORK */}
          <motion.div 
            className="relative h-[700px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}>

            {/* Neural Network Canvas */}
            <canvas 
              ref={neuralNetRef}
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0 0 60px rgba(124,58,237,0.3))' }}
            />

            {/* Holographic Head Glow */}
            <motion.div
              className="absolute rounded-full"
              animate={{ 
                opacity: [0.2, 0.5, 0.2],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: '450px',
                height: '550px',
                background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.4) 0%, rgba(59,130,246,0.2) 30%, transparent 80%)',
                filter: 'blur(80px)',
                boxShadow: '0 0 150px rgba(124,58,237,0.3), 0 0 250px rgba(59,130,246,0.2)'
              }}
            />

            {/* Floating Cards */}
            {[
              { label: 'Memory', value: '24,320', desc: 'Interactions', angle: -45, distance: 180 },
              { label: 'Personality Sync', value: '98%', desc: 'Real-time Alignment', angle: 45, distance: 180 },
              { label: 'Knowledge', value: '∞', desc: 'Continuously Expanding', angle: 135, distance: 180 },
              { label: 'Learning', value: 'Live', desc: 'Adapting to you...', angle: -135, distance: 180 },
              { label: 'Goals', value: '12', desc: 'Active', angle: 225, distance: 180 },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="absolute rounded-xl px-5 py-4 w-48"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: Math.cos((card.angle * Math.PI) / 180) * card.distance,
                  y: Math.sin((card.angle * Math.PI) / 180) * card.distance
                }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                whileHover={{ scale: 1.12, y: -10 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(124,58,237,0.2)'
                }}>
                <div className="flex items-center gap-2 text-xs mb-2" style={{ color: '#9370DB' }}>
                  <Brain size={14} /> {card.label}
                </div>
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

      {/* ═══════════════ FEATURES SECTION ═══════════════ */}
      <section className="relative z-10 py-40 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}>
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
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
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

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative z-10 border-t py-16 px-6" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Product</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Features</a>
                <a href="#" className="block hover:text-white transition-colors">Pricing</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Company</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">About</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Legal</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block hover:text-white transition-colors">Terms</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Social</div>
              <div className="space-y-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white transition-colors">Twitter</a>
                <a href="#" className="block hover:text-white transition-colors">Discord</a>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-4" style={{ color: '#F8FAFC' }}>Status</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                All systems operational
              </div>
            </div>
          </div>
          <div className="border-t pt-8" style={{ borderColor: 'rgba(124,58,237,0.1)' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © 2026 Personal AI Twin. All rights reserved. Powered by Next-Gen AI
              </div>
              <motion.div 
                className="flex items-center gap-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED' }} />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>The year of your AI</span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
