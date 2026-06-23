'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Sparkles, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const headCanvasRef = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // 3D Head Visualization
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

    const particles: any[] = []
    const particleCount = 120

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 80 + Math.random() * 40
      particles.push({
        x: W / 2 + Math.cos(angle) * radius,
        y: H / 2.2 + Math.sin(angle) * radius,
        angle: angle,
        radius: radius,
        size: Math.random() * 2.5 + 1,
        colorIdx: Math.floor(Math.random() * 4),
        pulse: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.4,
      })
    }

    const nodes: any[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: W / 2 + (Math.random() - 0.5) * 200,
        y: H / 2.2 + (Math.random() - 0.5) * 250,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        colorIdx: Math.floor(Math.random() * 3),
      })
    }

    const colors = ['#7C3AED', '#3B82F6', '#06B6D4', '#EC4899']
    const nodeColors = ['#7C3AED', '#3B82F6', '#06B6D4']

    const draw = () => {
      const gradient = ctx.createLinearGradient(0, 0, W, H)
      gradient.addColorStop(0, 'rgba(10, 14, 39, 0.1)')
      gradient.addColorStop(0.5, 'rgba(10, 14, 39, 0.05)')
      gradient.addColorStop(1, 'rgba(10, 14, 39, 0.1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, W, H)

      time += 0.01

      // Draw particles
      particles.forEach((p, i) => {
        p.angle += 0.001
        p.radius = 80 + Math.sin(time * 0.5 + i * 0.1) * 20 + Math.random() * 15
        p.x = W / 2 + Math.cos(p.angle) * p.radius
        p.y = H / 2.2 + Math.sin(p.angle) * p.radius

        p.pulse += 0.05
        const pulseScale = 1 + Math.sin(p.pulse) * 0.4
        const pulseOpacity = p.opacity * (0.6 + Math.sin(p.pulse) * 0.4)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * pulseScale, 0, Math.PI * 2)
        const color = colors[p.colorIdx]
        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r},${g},${b},${pulseOpacity})`
        ctx.fill()

        ctx.strokeStyle = `rgba(${r},${g},${b},${pulseOpacity * 0.5})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 150) {
            const alpha = 0.2 * (1 - dist / 150) * nodes[i].opacity
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`
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
        node.pulse += 0.03

        const pulseScale = 1 + Math.sin(node.pulse) * 0.5
        const brightness = 0.5 + Math.sin(node.pulse) * 0.5

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * pulseScale, 0, Math.PI * 2)
        const color = nodeColors[node.colorIdx]
        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r},${g},${b},${node.opacity * brightness})`
        ctx.fill()

        ctx.strokeStyle = `rgba(${r},${g},${b},${node.opacity * 0.7})`
        ctx.lineWidth = 2
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(node.x - node.r * 0.3, node.y - node.r * 0.3, node.r * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.3 * brightness})`
        ctx.fill()
      })

      // Draw head outline
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(W / 2, H / 2.2, 120, 160, 0, 0, Math.PI * 2)
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      onMouseMove={(e) => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })}
    >
      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%)',
        }} />

      <div className="fixed inset-0 pointer-events-none z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(1000px circle at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(124,58,237,0.12) 0%, transparent 50%)`,
        }} />

      {/* NAVIGATION */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: scrollY > 50 ? 'rgba(10,14,39,0.95)' : 'transparent',
          borderBottom: scrollY > 50 ? '1px solid rgba(124,58,237,0.2)' : 'transparent',
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
            <span className="text-xl font-bold">Ekko</span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10 text-sm">
            {[['Features', '#'], ['How It Works', '#'], ['Pricing', '#']].map(([label]) => (
              <motion.a
                key={label}
                href="#"
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
              className="text-sm font-bold px-7 py-3 rounded-lg text-white flex items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                boxShadow: '0 0 40px rgba(124,58,237,0.6)',
              }}>
              <Sparkles size={16} />
              Launch Now
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex items-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            className="text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}>

            <motion.div
              className="inline-flex items-center gap-3 mb-10 px-5 py-3 rounded-full text-xs font-semibold"
              variants={itemVariants}
              style={{
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.3)',
                color: '#A78BFA',
              }}>
              <span>⚡ THE FUTURE OF AI</span>
            </motion.div>

            <motion.h1
              className="leading-[1.1] tracking-tight mb-8 font-black"
              variants={itemVariants}
              style={{ fontSize: 'clamp(48px, 8vw, 80px)', color: '#F8FAFC' }}>
              Your Mind.
              <motion.span
                className="block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity }}
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
              Meet Ekko—your intelligent digital companion that learns, adapts, and grows with you.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-5 mb-16"
              variants={itemVariants}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
                <Link href="/signup"
                  className="flex items-center gap-3 px-8 py-5 rounded-lg font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #3B82F6)',
                    boxShadow: '0 0 40px rgba(124,58,237,0.5)',
                  }}>
                  <Sparkles size={20} />
                  Start Journey
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#"
                  className="flex items-center gap-3 px-8 py-5 rounded-lg font-semibold"
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
              {[['2.5M+', 'Users'], ['98.9%', 'Satisfaction'], ['24/7', 'Online']].map(([val, label], i) => (
                <div key={i} className="flex items-center gap-6">
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
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: 3D HEAD */}
          <motion.div
            className="relative h-[750px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}>

            <canvas
              ref={headCanvasRef}
              className="absolute inset-0 w-full h-full"
              style={{
                filter: 'drop-shadow(0 0 80px rgba(124,58,237,0.4))',
              }}
            />

            {/* GLOW LAYERS */}
            <motion.div
              className="absolute rounded-full"
              animate={{
                opacity: [0.15, 0.4, 0.15],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{ duration: 7, repeat: Infinity }}
              style={{
                width: '550px',
                height: '700px',
                background: 'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.5) 0%, transparent 80%)',
                filter: 'blur(100px)',
                boxShadow: '0 0 200px rgba(124,58,237,0.4)',
              }}
            />

            {/* FLOATING CARDS */}
            {[
              { label: 'Memory', value: '∞', angle: -50, distance: 200 },
              { label: 'Personality', value: '100%', angle: 50, distance: 200 },
              { label: 'Learning', value: 'Live', angle: 170, distance: 200 },
              { label: 'Security', value: 'Max', angle: -170, distance: 200 },
              { label: 'Connection', value: '24/7', angle: 90, distance: 200 },
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
                  boxShadow: '0 20px 60px rgba(124,58,237,0.3)',
                }}>
                <div className="text-xs font-bold mb-3" style={{ color: '#A78BFA' }}>{card.label}</div>
                <motion.div
                  className="text-2xl font-black"
                  style={{ color: '#F8FAFC' }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}>
                  {card.value}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ color: 'rgba(224,224,224,0.4)' }}>
          <span className="text-xs tracking-widest font-mono font-bold">Scroll</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 py-48 px-6" style={{ borderTop: '1px solid rgba(124,58,237,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6" style={{ color: '#F8FAFC' }}>
              Powered by
              <motion.span
                className="block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity }}
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
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}>
            {[
              { icon: '🧠', title: 'Neural Learning', desc: 'Learns your patterns instantly' },
              { icon: '⚡', title: 'Lightning Fast', desc: 'Responds in milliseconds' },
              { icon: '🔒', title: 'Fort Knox Security', desc: 'Military-grade encryption' },
              { icon: '🌍', title: 'Global Reach', desc: 'Works everywhere' },
              { icon: '✨', title: 'Personality Perfect', desc: 'Captures your unique voice' },
              { icon: '🚀', title: 'Always Evolving', desc: 'Continuously improves' },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -12 }}
                className="rounded-2xl p-10 group"
                style={{
                  background: 'rgba(124,58,237,0.08)',
                  border: '1.5px solid rgba(124,58,237,0.25)',
                  boxShadow: '0 20px 60px rgba(124,58,237,0.15)',
                }}>
                <motion.div
                  className="text-5xl mb-6"
                  whileHover={{ scale: 1.3, rotate: 10 }}>
                  {f.icon}
                </motion.div>
                <div className="font-bold text-xl mb-3" style={{ color: '#F8FAFC' }}>{f.title}</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
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
          <p className="text-lg mb-12" style={{ color: '#CBD5E1' }}>
            Join thousands experiencing the future of AI
          </p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}>
            <Link href="/signup"
              className="inline-flex items-center gap-3 px-10 py-6 rounded-lg font-bold text-lg text-white"
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

      {/* FOOTER */}
      <footer className="relative z-10 border-t py-20 px-6" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Product</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white">Features</a>
                <a href="#" className="block hover:text-white">Pricing</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Company</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white">About</a>
                <a href="#" className="block hover:text-white">Blog</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Legal</div>
              <div className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <a href="#" className="block hover:text-white">Privacy</a>
                <a href="#" className="block hover:text-white">Terms</a>
              </div>
            </div>
            <div>
              <div className="font-bold mb-6" style={{ color: '#F8FAFC' }}>Status</div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                Operational
              </div>
            </div>
          </div>
          <div className="border-t pt-12" style={{ borderColor: 'rgba(124,58,237,0.15)' }}>
            <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              © 2026 Ekko. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
