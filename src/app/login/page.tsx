'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <main className="min-h-screen bg-[#050508] text-white flex">

      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden border-r border-white/[0.06]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-xs font-bold">E</div>
            <span className="text-lg font-semibold">ekko<span className="text-[#a78bfa]">.</span></span>
          </Link>
        </div>
        <div className="relative space-y-6">
          <h2 className="text-4xl font-semibold tracking-tight leading-tight">
            Welcome back.<br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your twin missed you.
            </span>
          </h2>
          <p className="text-white/40 leading-relaxed">Sign in to manage your twin, check conversations, and see who has been talking to you.</p>
          <div className="space-y-3">
            {[
              { icon: '💬', text: 'See every conversation your twin had' },
              { icon: '✏️', text: 'Retrain your twin anytime' },
              { icon: '📊', text: 'View your analytics dashboard' },
              { icon: '🔒', text: 'Update privacy and topic controls' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-sm flex-shrink-0">{item.icon}</div>
                <span className="text-sm text-white/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs text-white/20">2026 Ekko. All rights reserved.</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-xs font-bold">E</div>
            <span className="text-lg font-semibold">ekko<span className="text-[#a78bfa]">.</span></span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Sign in</h1>
            <p className="text-white/40 text-sm">Good to have you back.</p>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all mb-5 text-sm font-medium">
            <span className="font-bold text-blue-400">G</span>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/[0.06]"></div>
            <span className="text-xs text-white/20">or</span>
            <div className="flex-1 h-px bg-white/[0.06]"></div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-white/40 block mb-1.5">Email address</label>
              <input
                value={form.email}
                onChange={e => update('email', e.target.value)}
                type="email"
                placeholder="arjun@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/50 transition-all"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs text-white/40">Password</label>
                <a href="#" className="text-xs text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  type={show ? 'text' : 'password'}
                  placeholder="Your password"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/50 transition-all pr-11"
                />
                <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full mt-6 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}>
            Sign in <ArrowRight size={16} />
          </button>

          <p className="text-center text-xs text-white/30 mt-5">
            No account yet?{' '}
            <Link href="/signup" className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Create one free</Link>
          </p>

        </div>
      </div>
    </main>
  )
}