'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react'

export default function Signup() {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', password: '', username: '' })

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  return (
    <main className="min-h-screen bg-[#050508] text-white flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden border-r border-white/[0.06]">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)' }} />
        <div className="relative">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-xs font-bold">E</div>
            <span className="text-lg font-semibold">ekko<span className="text-[#a78bfa]">.</span></span>
          </Link>
        </div>
        <div className="relative space-y-8">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight leading-tight mb-4">
              Clone yourself.<br />
              <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Be everywhere.
              </span>
            </h2>
            <p className="text-white/40 leading-relaxed">Your twin learns your voice, your humor, your way of thinking — and chats with anyone, anytime.</p>
          </div>
          <div className="space-y-4">
            {[
              { icon: '⚡', text: 'Set up in under 5 minutes' },
              { icon: '🔒', text: 'Your data is never shared or sold' },
              { icon: '🌐', text: 'Shareable link — no app needed' },
              { icon: '🧠', text: 'Gets smarter the more you train it' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-sm flex-shrink-0">{item.icon}</div>
                <span className="text-sm text-white/60">{item.text}</span>
              </div>
            ))}
          </div>
          {/* PREVIEW CARD */}
          <div className="p-4 rounded-2xl border border-white/[0.08]"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(96,165,250,0.04))' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}>Y</div>
              <div>
                <div className="text-xs font-medium">Your twin</div>
                <div className="text-[10px] text-white/30">ekko.app/you</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                Online
              </div>
            </div>
            <div className="text-xs text-white/50 bg-white/[0.03] rounded-xl px-3 py-2.5 border border-white/[0.06]">
              "hey! i'm {form.name || 'your'}'s AI twin. ask me anything 👋"
            </div>
          </div>
        </div>
        <div className="relative text-xs text-white/20">© 2026 Ekko. All rights reserved.</div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-xs font-bold">E</div>
            <span className="text-lg font-semibold">ekko<span className="text-[#a78bfa]">.</span></span>
          </div>

          {/* STEP INDICATOR */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${s === step ? 'flex-1' : 'w-8'}`}
                style={{ background: s <= step ? 'linear-gradient(90deg, #a78bfa, #60a5fa)' : 'rgba(255,255,255,0.08)' }}></div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Create your account</h1>
                <p className="text-white/40 text-sm">Your twin is 2 steps away.</p>
              </div>

              {/* GOOGLE BUTTON */}
              <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all mb-5 text-sm font-medium">
                <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
                Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/[0.06]"></div>
                <span className="text-xs text-white/20">or</span>
                <div className="flex-1 h-px bg-white/[0.06]"></div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 block mb-1.5">Full name</label>
                  <input
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    placeholder="Arjun Sharma"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1.5">Email address</label>
                  <input
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    type="email"
                    placeholder="arjun@email.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.06] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 block mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      value={form.password}
                      onChange={e => update('password', e.target.value)}
                      type={show ? 'text' : 'password'}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/50 focus:bg-white/[0.06] transition-all pr-11"
                    />
                    <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                      {show ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}>
                Continue <ArrowRight size={16} />
              </button>

              <p className="text-center text-xs text-white/30 mt-4">
                Already have an account?{' '}
                <Link href="/login" className="text-[#a78bfa] hover:text-[#c4b5fd] transition-colors">Sign in</Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Claim your link</h1>
                <p className="text-white/40 text-sm">This is where people will find your twin.</p>
              </div>

              <div className="mb-6">
                <label className="text-xs text-white/40 block mb-1.5">Your twin username</label>
                <div className="flex items-center gap-0 rounded-xl border border-white/[0.08] bg-white/[0.04] overflow-hidden focus-within:border-[#a78bfa]/50 transition-all">
                  <span className="px-4 py-3 text-sm text-white/30 bg-white/[0.03] border-r border-white/[0.06] whitespace-nowrap">ekko.app/</span>
                  <input
                    value={form.username}
                    onChange={e => update('username', e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="yourname"
                    className="flex-1 px-4 py-3 bg-transparent text-sm text-white placeholder:text-white/20 outline-none"
                  />
                  {form.username.length > 2 && (
                    <span className="px-3 text-xs text-emerald-400">✓ available</span>
                  )}
                </div>
                {form.username && (
                  <p className="text-xs text-white/30 mt-2">Your twin link: <span className="text-[#a78bfa]">ekko.app/{form.username}</span></p>
                )}
              </div>

              <div className="p-4 rounded-xl border border-white/[0.06] mb-6"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-xs text-white/40 mb-3">Account summary</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Name</span>
                    <span className="text-white">{form.name || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Email</span>
                    <span className="text-white">{form.email || '—'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Twin link</span>
                    <span className="text-[#a78bfa]">ekko.app/{form.username || '...'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Plan</span>
                    <span className="text-emerald-400">Free · upgrade anytime</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.01]"
                style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}>
                <Sparkles size={16} />
                Create my twin
              </button>

              <button onClick={() => setStep(1)} className="w-full mt-3 py-3 text-sm text-white/30 hover:text-white/60 transition-colors">
                ← Back
              </button>

              <p className="text-center text-xs text-white/20 mt-4">
                By signing up you agree to our{' '}
                <a href="#" className="text-white/40 hover:text-white/60">Terms</a> and{' '}
                <a href="#" className="text-white/40 hover:text-white/60">Privacy Policy</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}