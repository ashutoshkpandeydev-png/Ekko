'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Copy, ExternalLink, Zap, BarChart2, Settings, MessageCircle, Sparkles, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const [tab, setTab] = useState<'train' | 'chats' | 'analytics' | 'settings'>('train')
  const [text, setText] = useState('')
  const [name] = useState('Arjun')
  const [trained, setTrained] = useState(false)
  const [training, setTraining] = useState(false)
  const [copied, setCopied] = useState(false)
  const [traits] = useState(['Chill', 'Direct', 'Funny', 'Thoughtful'])
  const [visibility, setVisibility] = useState('public')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [hasPII, setHasPII] = useState(false)

  const twinLink = `ekko.app/${name.toLowerCase()}`

  const copy = () => {
    navigator.clipboard.writeText(twinLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const train = async () => {
    if (text.length < 50) return
    setTraining(true)
    await new Promise(r => setTimeout(r, 2500))
    setTraining(false)
    setTrained(true)
  }

  return (
    <main className="min-h-screen bg-[#050508] text-white flex">

      {/* SIDEBAR */}
      <div className="w-16 lg:w-60 flex flex-col border-r border-white/[0.06] p-3 lg:p-4 flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.01)' }}>

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 px-2 py-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#a78bfa] to-[#60a5fa] flex items-center justify-center text-xs font-bold flex-shrink-0">E</div>
          <span className="hidden lg:block text-base font-semibold">ekko<span className="text-[#a78bfa]">.</span></span>
        </Link>

        {/* NAV */}
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { id: 'train', icon: <Sparkles size={16} />, label: 'Train twin' },
            { id: 'chats', icon: <MessageCircle size={16} />, label: 'Conversations' },
            { id: 'analytics', icon: <BarChart2 size={16} />, label: 'Analytics' },
            { id: 'settings', icon: <Settings size={16} />, label: 'Settings' },
          ].map(item => (
            <button key={item.id}
              onClick={() => setTab(item.id as any)}
              className={`flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                tab === item.id
                  ? 'bg-white/[0.08] text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
              }`}>
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden lg:block">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* USER */}
        <div className="flex items-center gap-2.5 px-2 py-2 mt-4 rounded-xl border border-white/[0.06]"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}>
            {name[0]}
          </div>
          <div className="hidden lg:block min-w-0">
            <div className="text-xs font-medium truncate">{name}</div>
            <div className="text-[10px] text-white/30 truncate">Free plan</div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOP BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div>
            <h1 className="text-base font-medium">
              {tab === 'train' && 'Train your twin'}
              {tab === 'chats' && 'Conversations'}
              {tab === 'analytics' && 'Analytics'}
              {tab === 'settings' && 'Settings'}
            </h1>
            <p className="text-xs text-white/30 mt-0.5">
              {tab === 'train' && 'Paste messages to teach your twin how you communicate'}
              {tab === 'chats' && 'See what people have been asking your twin'}
              {tab === 'analytics' && 'Track how your twin is performing'}
              {tab === 'settings' && 'Manage your twin and account settings'}
            </p>
          </div>

          {/* TWIN LINK PILL */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.03]">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></div>
            <span className="text-xs text-white/50 hidden sm:block">{twinLink}</span>
            <button onClick={copy} className="text-white/30 hover:text-white/70 transition-colors">
              {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
            </button>
            <a href="#" className="text-white/30 hover:text-white/70 transition-colors">
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* TRAIN TAB */}
          {tab === 'train' && (
            <div className="max-w-3xl mx-auto space-y-5">

              {trained && (
                <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <CheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-emerald-400">Twin trained successfully</div>
                    <div className="text-xs text-white/40 mt-0.5">Your twin now reflects your latest writing style</div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { label: 'Style match', val: trained ? '89%' : '—', color: 'text-[#a78bfa]' },
                  { label: 'Traits found', val: trained ? '6' : '—', color: 'text-blue-400' },
                  { label: 'Vocab size', val: trained ? '340' : '—', color: 'text-yellow-400' },
                  { label: 'Chats left', val: '50', color: 'text-emerald-400' },
                ].map((s, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/[0.07]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className={`text-xl font-semibold ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-white/30 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {trained && (
                <div className="p-4 rounded-xl border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="text-xs text-white/40 mb-3">Detected personality traits</div>
                  <div className="flex flex-wrap gap-2">
                    {traits.map(t => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs border border-[#a78bfa]/20 bg-[#a78bfa]/5 text-[#a78bfa]">{t}</span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-medium block mb-2">Paste your messages</label>
                <p className="text-xs text-white/40 mb-3">WhatsApp chats, tweets, emails — anything written in your natural voice. More text = better twin.</p>
                {hasPII && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 mb-3">
                    <span className="text-yellow-400 text-xs">⚠️</span>
                    <span className="text-xs text-yellow-400/80">We noticed what might be a phone number or email in your text. Consider removing personal contact details before training.</span>
                  </div>
                )}
                <textarea
                  value={text}
                  onChange={e => {
                    const v = e.target.value
                    setText(v)
                    setHasPII(/\b\d{10}\b|\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(v))
                  }}
                  placeholder={`Paste your messages here...\n\nExample:\n"yo did you watch the match last night lmao\nbro I was not expecting that at all\nhonestly been obsessed with cricket lately\nanyway what time works for you tmrw?"`}
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-sm text-white placeholder:text-white/20 outline-none focus:border-[#a78bfa]/40 transition-all resize-none font-mono leading-relaxed"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-white/20">{text.length} characters {text.length < 50 && text.length > 0 ? '· add more for better results' : ''}</span>
                  <span className="text-xs text-white/20">min. 50 characters</span>
                </div>
              </div>

              <button
                onClick={train}
                disabled={text.length < 50 || training}
                className="w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)', boxShadow: text.length >= 50 ? '0 0 30px rgba(139,92,246,0.3)' : 'none' }}>
                {training ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Analysing your style...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    {trained ? 'Retrain twin' : 'Train my twin'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          )}

          {/* CHATS TAB */}
          {tab === 'chats' && (
            <div className="max-w-3xl mx-auto space-y-3">
              {[
                { name: 'Priya', msg: 'What kind of music do you listen to?', time: '2h ago', count: 4 },
                { name: 'Rahul', msg: 'Hot take on AI startups?', time: '5h ago', count: 7 },
                { name: 'Anonymous', msg: 'What are you working on?', time: '1d ago', count: 2 },
                { name: 'Zara', msg: 'Recommend a good book?', time: '2d ago', count: 5 },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.07] hover:border-white/12 cursor-pointer transition-all"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }}>
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{c.name}</span>
                      <span className="text-xs text-white/30">{c.time}</span>
                    </div>
                    <div className="text-xs text-white/40 truncate">{c.msg}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-white/30">
                    <MessageCircle size={12} />
                    {c.count}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ANALYTICS TAB */}
          {tab === 'analytics' && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { label: 'Total chats', val: '14', change: '+3 this week', color: 'text-[#a78bfa]' },
                  { label: 'Messages sent', val: '89', change: '+12 this week', color: 'text-blue-400' },
                  { label: 'Unique visitors', val: '7', change: '+2 this week', color: 'text-emerald-400' },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-xl border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <div className={`text-3xl font-semibold ${s.color} mb-1`}>{s.val}</div>
                    <div className="text-sm text-white/60">{s.label}</div>
                    <div className="text-xs text-emerald-400 mt-2">{s.change}</div>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-sm font-medium mb-4">Top questions asked</div>
                {[
                  { q: 'What kind of music do you listen to?', count: 4 },
                  { q: 'Hot take on AI?', count: 3 },
                  { q: 'What are you working on?', count: 2 },
                  { q: 'Recommend a good book?', count: 2 },
                ].map((q, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                    <span className="text-sm text-white/60">{q.q}</span>
                    <span className="text-xs text-white/30 ml-4 flex-shrink-0">{q.count}x</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {tab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-5">

              {/* PRIVACY TIER */}
              <div className="p-5 rounded-xl border border-white/[0.07]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-sm font-medium mb-1">Twin visibility</div>
                <div className="text-xs text-white/40 mb-4">Control exactly who can chat with your twin</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'private', label: 'Private', desc: 'Only you', icon: '🔒' },
                    { id: 'inner', label: 'Inner Circle', desc: 'Approved contacts', icon: '👥' },
                    { id: 'public', label: 'Public', desc: 'Anyone with link', icon: '🌐' },
                  ].map(v => (
                    <button key={v.id}
                      onClick={() => setVisibility(v.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        visibility === v.id
                          ? 'border-[#a78bfa]/40 bg-[#a78bfa]/10'
                          : 'border-white/[0.07] hover:border-white/15'
                      }`}>
                      <div className="text-lg mb-1">{v.icon}</div>
                      <div className={`text-xs font-medium ${visibility === v.id ? 'text-[#a78bfa]' : 'text-white/60'}`}>{v.label}</div>
                      <div className="text-[10px] text-white/30 mt-0.5">{v.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* BLOCKED TOPICS */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.07] hover:border-white/12 transition-all"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div className="text-sm font-medium">Blocked topics</div>
                  <div className="text-xs text-white/40 mt-0.5">Topics your twin will refuse to discuss</div>
                </div>
                <span className="text-xs text-white/40">None set</span>
              </div>

              {/* TWIN USERNAME */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.07] hover:border-white/12 transition-all"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div className="text-sm font-medium">Twin username</div>
                  <div className="text-xs text-white/40 mt-0.5">Your link: ekko.app/{name.toLowerCase()}</div>
                </div>
                <span className="text-xs text-[#a78bfa] cursor-pointer">Change</span>
              </div>

              {/* UPGRADE TO PRO */}
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.07] hover:border-white/12 transition-all"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div className="text-sm font-medium">Upgrade to Pro</div>
                  <div className="text-xs text-white/40 mt-0.5">Unlimited chats, voice mode, analytics</div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium cursor-pointer" style={{ background: 'linear-gradient(135deg, #a78bfa, #7c3aed)' }}>
                  Upgrade
                </span>
              </div>

              {/* DANGER ZONE */}
              <div className="p-5 rounded-xl border border-red-500/20 mt-8" style={{ background: 'rgba(239,68,68,0.04)' }}>
                <div className="text-sm font-medium text-red-400 mb-1">Danger zone</div>
                <div className="text-xs text-white/40 mb-4">Permanently delete your twin, all training data, and conversation history. This cannot be undone.</div>
                {!confirmDelete ? (
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="text-xs px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
                    Delete everything
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-red-400">Are you sure? This is permanent.</span>
                    <button className="text-xs px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all">
                      Yes, delete my twin
                    </button>
                    <button onClick={() => setConfirmDelete(false)} className="text-xs px-4 py-2 rounded-lg border border-white/10 text-white/40 hover:text-white/70 transition-all">
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  )
}