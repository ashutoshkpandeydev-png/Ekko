'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react'
import AuthShowcase from '@/components/auth/AuthShowcase'

export default function Signup() {
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  })

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="flex min-h-screen">
        {/* LEFT SHOWCASE */}
        <AuthShowcase mode="signup" liveName={form.name} liveUsername={form.username} />

        {/* RIGHT FORM PANEL */}
        <div className="relative flex min-h-screen flex-1 items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:w-[48%] xl:w-[45%]">
          {/* premium background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(125,211,199,0.12),transparent_30%),linear-gradient(180deg,#08080c_0%,#07070a_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.5px,transparent_0.5px)] [background-size:7px_7px]" />
          <div className="pointer-events-none absolute inset-y-0 left-[-30%] w-[46%] rotate-[18deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)] blur-2xl animate-[authPanelSweep_9s_linear_infinite]" />

          <div className="relative z-10 w-full max-w-[520px]">
            {/* mobile brand */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/15 bg-white text-sm font-black text-[#070807]">
                  E
                </span>
                <span className="text-base font-semibold tracking-[0.18em] text-white">EKKO</span>
              </Link>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-7 md:p-8">
              {/* top row */}
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-300">
                    <Sparkles size={12} />
                    Create your twin
                  </div>
                </div>

                <div className="hidden text-right sm:block">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">2-step setup</p>
                  <p className="mt-1 text-sm text-stone-300">Launch your AI identity</p>
                </div>
              </div>

              {/* step indicator */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
                  <span>Step {step} of 2</span>
                  <span>{step === 1 ? 'Account details' : 'Claim your link'}</span>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        s === step ? 'flex-1' : 'w-12'
                      }`}
                      style={{
                        background:
                          s <= step
                            ? 'linear-gradient(90deg, #a78bfa, #7dd3c7)'
                            : 'rgba(255,255,255,0.08)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {step === 1 && (
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-[2.35rem]">
                      Create your account
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-stone-400">
                      Ekko turns your memories into a digital twin that sounds like you and speaks on
                      your behalf.
                    </p>
                  </div>

                  {/* Google */}
                  <button className="group mb-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.08]">
                    <svg width="18" height="18" viewBox="0 0 18 18">
                      <path
                        fill="#4285F4"
                        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                      />
                      <path
                        fill="#34A853"
                        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                      />
                      <path
                        fill="#EA4335"
                        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/[0.08]" />
                    <span className="text-[11px] uppercase tracking-[0.22em] text-stone-500">or</span>
                    <div className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-stone-400">Full name</label>
                      <input
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Arjun Sharma"
                        className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#a78bfa]/50 focus:bg-white/[0.06]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-stone-400">Email address</label>
                      <input
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        type="email"
                        placeholder="arjun@email.com"
                        className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#a78bfa]/50 focus:bg-white/[0.06]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium text-stone-400">Password</label>
                      <div className="relative">
                        <input
                          value={form.password}
                          onChange={(e) => update('password', e.target.value)}
                          type={show ? 'text' : 'password'}
                          placeholder="Min. 8 characters"
                          className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3.5 pr-11 text-sm text-white placeholder:text-white/20 outline-none transition-all focus:border-[#a78bfa]/50 focus:bg-white/[0.06]"
                        />
                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
                        >
                          {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#a78bfa,#7c3aed)] px-5 text-sm font-bold text-white shadow-[0_18px_50px_rgba(124,58,237,0.42)] transition-all hover:scale-[1.01] hover:opacity-95"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>

                  <p className="mt-5 text-center text-sm text-stone-400">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="font-medium text-[#c4b5fd] transition-colors hover:text-white"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-[2.35rem]">
                      Claim your twin link
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-stone-400">
                      This is the identity people will use to talk to your twin.
                    </p>
                  </div>

                  <div className="mb-6">
                    <label className="mb-2 block text-xs font-medium text-stone-400">
                      Your twin username
                    </label>

                    <div className="flex items-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] transition-all focus-within:border-[#a78bfa]/50">
                      <span className="border-r border-white/[0.06] bg-white/[0.03] px-4 py-3.5 text-sm text-stone-400">
                        ekko.app/
                      </span>
                      <input
                        value={form.username}
                        onChange={(e) =>
                          update(
                            'username',
                            e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''),
                          )
                        }
                        placeholder="yourname"
                        className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none"
                      />
                      {form.username.length > 2 && (
                        <span className="px-4 text-xs font-semibold text-emerald-300">✓ available</span>
                      )}
                    </div>

                    {form.username && (
                      <p className="mt-2 text-xs text-stone-400">
                        Your twin link:{' '}
                        <span className="font-medium text-[#c4b5fd]">
                          ekko.app/{form.username}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="mb-6 rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                          Account summary
                        </p>
                        <p className="mt-1 text-sm text-stone-300">What your twin will launch with</p>
                      </div>
                      <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                        Free plan
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
                        <span className="text-stone-400">Name</span>
                        <span className="text-white">{form.name || '—'}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
                        <span className="text-stone-400">Email</span>
                        <span className="text-white">{form.email || '—'}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] px-4 py-3 text-sm">
                        <span className="text-stone-400">Twin link</span>
                        <span className="text-[#c4b5fd]">ekko.app/{form.username || '...'}</span>
                      </div>
                    </div>
                  </div>

                  <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#a78bfa,#7c3aed)] px-5 text-sm font-bold text-white shadow-[0_18px_50px_rgba(124,58,237,0.42)] transition-all hover:scale-[1.01] hover:opacity-95">
                    <Sparkles size={16} />
                    Create my twin
                  </button>

                  <button
                    onClick={() => setStep(1)}
                    className="mt-3 w-full py-3 text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    ← Back
                  </button>

                  <p className="mt-5 text-center text-xs leading-6 text-stone-500">
                    By signing up you agree to our{' '}
                    <a href="#" className="text-stone-300 transition-colors hover:text-white">
                      Terms
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-stone-300 transition-colors hover:text-white">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes authPanelSweep {
              0% {
                transform: translateX(-18%) rotate(18deg);
                opacity: 0;
              }
              18% {
                opacity: 0.6;
              }
              50% {
                opacity: 0.38;
              }
              100% {
                transform: translateX(260%) rotate(18deg);
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </main>
  )
}