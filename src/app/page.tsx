'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Fingerprint,
  Globe2,
  LockKeyhole,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Waves,
  X,
  Zap,
  Quote,
  Star,
  Database,
  ScrollText,
  Users,
  BrainCircuit,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import MergedHero from '@/components/MergedHero'

/* =========================================================
   EKKO V8 — HOMEPAGE (hero + cinematic merged into MergedHero)
   ========================================================= */

const featureCards = [
  {
    icon: BrainCircuit,
    title: 'Learns from your actual history',
    body:
      'Import chats, emails, notes, and journal entries so Ekko understands the context behind how you think, write, and reply.',
  },
  {
    icon: MessageSquareText,
    title: 'Talks recognizably like you',
    body:
      'Ekko mirrors your tone, rhythm, humor, preferences, and recurring opinions so conversations feel genuinely yours.',
  },
  {
    icon: LockKeyhole,
    title: 'Shared on your terms',
    body:
      'Decide what your twin can answer, who can access it, and where it’s allowed to represent you.',
  },
]

const workflowSteps = [
  {
    title: 'Import your memory trail',
    body:
      'Bring in old chats, emails, notes, and journal entries. Ekko turns scattered personal history into structured memory.',
    icon: Database,
  },
  {
    title: 'Train your twin',
    body:
      'Ekko models your tone, preferences, recurring opinions, and communication habits until the responses feel like you.',
    icon: BrainCircuit,
  },
  {
    title: 'Share it deliberately',
    body:
      'Publish your twin behind a private link, a controlled profile, or a public page — with clear boundaries around what it can say.',
    icon: Globe2,
  },
]

const trustItems = [
  { label: 'Training sources selected by you', icon: Fingerprint },
  { label: 'Response scope and topic controls', icon: ShieldCheck },
  { label: 'Share access and visibility controls', icon: LockKeyhole },
]

const useCases = [
  {
    title: 'Let people talk to a version of you',
    body:
      'Share a link and let friends, followers, clients, or collaborators talk to your AI twin — even when you’re offline.',
    icon: Globe2,
  },
  {
    title: 'Preserve your memory, opinions, and voice',
    body:
      'Turn years of writing into a living memory interface that remembers how you think and how you respond.',
    icon: BrainCircuit,
  },
  {
    title: 'Scale your presence without losing yourself',
    body:
      'Use Ekko as a personal front-end for your identity — one that stays available without becoming generic.',
    icon: Zap,
  },
]

const memoryCards = [
  {
    title: 'Imported memory',
    subtitle: '12,482 messages · 311 notes · 41 emails',
    icon: ScrollText,
  },
  {
    title: 'Voice signature',
    subtitle: 'Tone, humor, rhythm, recurring opinions',
    icon: BrainCircuit,
  },
  {
    title: 'Access controls',
    subtitle: 'Private by default · scoped replies · public links',
    icon: ShieldCheck,
  },
]

const pricingPlans = [
  {
    name: 'Personal',
    price: '$19',
    description: 'Build a private AI twin from your own writing and memories.',
    badge: 'For individuals',
    cta: 'Start personal',
    featured: false,
    features: [
      'Import chats, notes, emails, journals',
      'Private twin training',
      'Controlled sharing link',
      'Memory-backed conversations',
      'Basic twin controls',
    ],
  },
  {
    name: 'Creator',
    price: '$49',
    description: 'Turn your voice and identity into a public-facing interface.',
    badge: 'Most popular',
    cta: 'Start creator',
    featured: true,
    features: [
      'Everything in Personal',
      'Public twin profile',
      'Audience chat experience',
      'Advanced tone calibration',
      'Custom response boundaries',
      'Priority training + analytics',
    ],
  },
  {
    name: 'Studio',
    price: 'Custom',
    description: 'For founders, teams, public figures, and premium identity deployments.',
    badge: 'Enterprise / white-glove',
    cta: 'Talk to us',
    featured: false,
    features: [
      'Everything in Creator',
      'Custom onboarding',
      'Team / legacy memory pipelines',
      'High-scale twin infrastructure',
      'Security review + access controls',
      'Dedicated support',
    ],
  },
]

const testimonials = [
  {
    quote:
      'Ekko feels less like a chatbot and more like a continuity layer for my brain. It actually sounds like me.',
    name: 'Aarav Mehta',
    role: 'Founder, design tooling startup',
  },
  {
    quote:
      'We tested it with years of writing and the result was eerie in the best way — the tone, references, and humor were all there.',
    name: 'Maya Shah',
    role: 'Creator & newsletter operator',
  },
  {
    quote:
      'The product doesn’t just answer questions. It preserves context. That changes the value of personal AI completely.',
    name: 'Rohan Bhatia',
    role: 'Angel investor',
  },
]

const faqs = [
  {
    q: 'What exactly does Ekko train on?',
    a:
      'Only the sources you explicitly choose to upload or connect — such as chats, emails, notes, and journals. The product is designed around selective memory import, not uncontrolled scraping of your life.',
  },
  {
    q: 'Can I control what my twin is allowed to talk about?',
    a:
      'Yes. Ekko is designed with response boundaries, access controls, and sharing controls so your twin can be public, private, or limited to certain topics and contexts.',
  },
  {
    q: 'Is this supposed to replace me?',
    a:
      'No. The core idea is continuity, not replacement. Ekko gives people a way to interact with a memory-backed version of your voice when you are unavailable, without flattening you into a generic assistant.',
  },
  {
    q: 'Can I keep my twin fully private?',
    a:
      'Yes. Private mode is a first-class use case. You can train a twin for your own use only, share it selectively, or publish it publicly later.',
  },
]

const mobileNavLinks = [
  { label: 'What it learns', href: '#what-it-learns' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Control', href: '#control' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

function SectionHeading({
  pill,
  title,
  body,
  light = false,
}: {
  pill: string
  title: string
  body?: string
  light?: boolean
}) {
  return (
    <div className="max-w-3xl">
      <div className={`ekko-pill ${light ? 'ekko-pill-light' : 'ekko-pill-dark'}`}>{pill}</div>
      <h2
        className={`mt-6 ekko-heading-lg text-balance font-black ${
          light ? 'text-[#11110f]' : 'text-white'
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p className={`mt-6 max-w-2xl ekko-body-lg ${light ? 'text-[#4b4a45]' : 'text-white/64'}`}>
          {body}
        </p>
      ) : null}
    </div>
  )
}

function MobileNavLink({
  label,
  href,
  onNavigate,
}: {
  label: string
  href: string
  onNavigate: () => void
}) {
  const anchorClassName =
    'block rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/84 transition hover:bg-white/[0.06]'

  return (
    <a href={href} onClick={onNavigate} className={anchorClassName}>
      {label}
    </a>
  )
}

export default function Home() {
  const [navSolid, setNavSolid] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="ekko-shell ekko-page-with-nav min-h-screen text-white">
      {/* =========================================================
          PREMIUM NAVBAR
         ========================================================= */}
      <nav
        className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 md:px-6"
        onScroll={() => {}}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between rounded-full px-4 py-3 transition-all duration-300 md:px-5 ${
            navSolid ? 'ekko-nav-shell' : 'bg-transparent'
          }`}
          onMouseEnter={() => setNavSolid(true)}
        >
          <Link href="/" className="flex items-center gap-3" aria-label="Ekko home">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/12 bg-white text-sm font-black text-[#071110] shadow-[0_12px_34px_rgba(255,255,255,0.12)]">
              E
            </div>
            <div className="leading-none">
              <div className="text-sm font-black tracking-[0.28em] text-white">EKKO</div>
              <div className="mt-1 hidden text-[10px] uppercase tracking-[0.22em] text-white/42 sm:block">
                Memory-backed identity
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-7 text-sm text-white/70 lg:flex">
            <a className="transition hover:text-white" href="#what-it-learns">
              What it learns
            </a>
            <a className="transition hover:text-white" href="#how-it-works">
              How it works
            </a>
            <a className="transition hover:text-white" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-white" href="#faq">
              FAQ
            </a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              className="text-sm font-medium text-white/70 transition hover:text-white"
              href="/login"
            >
              Login
            </Link>
            <Link href="/signup" className="ekko-btn ekko-btn-primary">
              Start building
              <ArrowRight size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white lg:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[72] bg-black/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="ekko-mobile-sheet fixed inset-x-3 top-[82px] z-[73] rounded-[28px] border border-white/10 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] lg:hidden"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-2">
                {mobileNavLinks.map((link) => (
                  <MobileNavLink
                    key={link.label}
                    label={link.label}
                    href={link.href}
                    onNavigate={() => setMobileOpen(false)}
                  />
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="ekko-btn ekko-btn-secondary w-full"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="ekko-btn ekko-btn-primary w-full"
                >
                  Start
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================
          HERO + CINEMATIC SCRUB — single merged component
         ========================================================= */}
      <MergedHero />

      {/* =========================================================
          MEMORY DETAIL STRIP
         ========================================================= */}
      <section className="ekko-section bg-[#06080a] px-5 py-16 md:px-8">
        <div className="ekko-container">
          <div className="grid gap-3 sm:grid-cols-3">
            {memoryCards.map((card) => {
              const Icon = card.icon
              return (
                <div key={card.title} className="ekko-glass-soft rounded-[22px] p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-2xl bg-white text-[#071110]">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{card.title}</p>
                      <p className="mt-1 truncate text-[11px] leading-5 text-white/48">{card.subtitle}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT IT LEARNS
         ========================================================= */}
      <section
        id="what-it-learns"
        className="ekko-section ekko-surface-light px-5 py-24 md:px-8 md:py-32"
      >
        <div className="ekko-container">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              pill="What Ekko learns"
              title="Your history becomes the training ground for your digital self."
              light
            />
            <p className="max-w-2xl ekko-body-lg text-[#4d4a43]">
              Ekko is designed to feel like a continuation of you, not a generic assistant wearing
              your name. It learns from the language you already use, the memories you choose to
              share, and the patterns that make your communication recognizably yours.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.article
                  key={feature.title}
                  className="ekko-card-light rounded-[28px] p-7"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                >
                  <div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-[#0f3c37] text-[#b6fff1]">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-xl font-bold text-[#11110f]">{feature.title}</h3>
                  <p className="mt-4 leading-7 text-[#625e55]">{feature.body}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
         ========================================================= */}
      <section
        id="how-it-works"
        className="ekko-section ekko-surface-dark px-5 py-24 md:px-8 md:py-32"
      >
        <div className="ekko-container">
          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <SectionHeading
              pill="How it works"
              title="From scattered memory to a twin people can actually talk to."
              body="The product flow is designed to feel deliberate: import your history, calibrate your voice, then decide how and where your twin appears."
            />
            <div className="grid gap-4">
              {workflowSteps.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    className="ekko-card rounded-[28px] p-6"
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#071110]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-sm font-black text-[#071110]">
                            {index + 1}
                          </div>
                          <p className="text-lg font-semibold text-white">{item.title}</p>
                        </div>
                        <p className="mt-4 leading-7 text-white/62">{item.body}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY / USE CASES
         ========================================================= */}
      <section className="ekko-section ekko-surface-dark-2 px-5 py-24 md:px-8 md:py-32">
        <div className="ekko-container">
          <SectionHeading
            pill="Why this product exists"
            title="Your identity already lives online. Ekko turns it into an interface you control."
            body="Most people already leave behind enough writing to describe how they think. Ekko transforms that history into a usable digital twin — one that stays recognizably yours instead of becoming a generic chatbot."
          />
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {useCases.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="ekko-card rounded-[30px] p-7"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#070807]">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-4 leading-7 text-white/62">{item.body}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTROL
         ========================================================= */}
      <section
        id="control"
        className="ekko-section ekko-surface-mint px-5 py-24 text-[#071110] md:px-8 md:py-32"
      >
        <div className="ekko-container grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="ekko-pill ekko-pill-light">Control layer</div>
            <h2 className="mt-6 ekko-heading-lg text-balance font-black text-[#071110]">
              Your twin should be understandable to you — and controllable by you.
            </h2>
            <p className="mt-7 max-w-2xl ekko-body-lg text-[#35524c]">
              Ekko is built around the idea that digital identity needs boundaries. You should know
              what trained your twin, what it’s allowed to respond to, and where it’s allowed to
              represent you.
            </p>
          </div>

          <div className="ekko-card-light rounded-[30px] p-7">
            <div className="mb-7 flex items-center justify-between border-b border-[#dceee9] pb-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#287166]">
                  Twin controls
                </p>
                <p className="mt-2 text-2xl font-black text-[#071110]">
                  Ready for deliberate sharing
                </p>
              </div>
              <Waves className="text-[#287166]" size={28} />
            </div>
            <div className="space-y-4">
              {trustItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-[#f5fbf9] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="text-[#287166]" size={18} />
                    <span className="font-semibold text-[#071110]">{label}</span>
                  </div>
                  <Check className="text-[#287166]" size={18} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SOCIAL PROOF STRIP
         ========================================================= */}
      <section className="ekko-section bg-[#06080a] px-5 py-12 md:px-8">
        <div className="ekko-container">
          <div className="rounded-[28px] border border-white/8 bg-white/[0.03] px-5 py-5 backdrop-blur-xl md:px-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">
                  Built for the future of identity
                </p>
                <p className="mt-2 max-w-3xl text-base leading-7 text-white/70">
                  Ekko sits between personal memory, AI voice modeling, and digital presence — a
                  product category for people who want their online identity to be interactive,
                  recognizable, and controlled.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-white/34">
                {['Creators', 'Founders', 'Writers', 'Teams', 'Public profiles'].map((item) => (
                  <div key={item} className="text-sm font-semibold tracking-[0.12em]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
         ========================================================= */}
      <section className="ekko-section ekko-surface-dark px-5 py-24 md:px-8 md:py-32">
        <div className="ekko-container">
          <SectionHeading
            pill="Testimonials"
            title="What early users and operators say after trying the twin."
            body="Position this section as premium social proof. Replace the names and roles below with your real early testers, founder friends, or pilot users once you have them."
          />
          <div className="mt-16 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                className="ekko-card rounded-[30px] p-7"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#071110]">
                    <Quote size={20} />
                  </div>
                  <div className="flex items-center gap-1 text-white/80">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
                <p className="text-lg leading-8 text-white/86">“{item.quote}”</p>
                <div className="mt-8">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="mt-1 text-sm text-white/48">{item.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PRICING
         ========================================================= */}
      <section
        id="pricing"
        className="ekko-section ekko-surface-light px-5 py-24 md:px-8 md:py-32"
      >
        <div className="ekko-container">
          <SectionHeading
            pill="Pricing"
            title="Start private. Go public when your identity layer is ready."
            body="These tiers are structured to feel premium and startup-ready. You can keep these as placeholder pricing or swap in your real launch pricing later."
            light
          />
          <div className="mt-16 grid gap-5 xl:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-[32px] p-7 ${
                  plan.featured
                    ? 'ekko-card-light ring-1 ring-[#8de7d8]/70 shadow-[0_30px_90px_rgba(20,70,60,0.12)]'
                    : 'ekko-card-light'
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                {plan.featured ? (
                  <div className="absolute right-6 top-6 rounded-full bg-[#0f3c37] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b8fff2]">
                    Most popular
                  </div>
                ) : null}

                <div className="max-w-[18rem]">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#287166]">
                    {plan.name}
                  </p>
                  <p className="mt-4 text-5xl font-black tracking-[-0.05em] text-[#071110]">
                    {plan.price}
                    {plan.price !== 'Custom' ? (
                      <span className="ml-1 text-base font-semibold text-[#50605b]">/mo</span>
                    ) : null}
                  </p>
                  <p className="mt-4 leading-7 text-[#5c5b56]">{plan.description}</p>
                </div>

                <div className="mt-6 rounded-2xl bg-[#f5fbf9] px-4 py-3 text-sm font-medium text-[#1f5b53]">
                  {plan.badge}
                </div>

                <div className="my-7 h-px w-full bg-[#dceee9]" />

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[#232825]">
                      <div className="mt-1 grid h-5 w-5 place-items-center rounded-full bg-[#0f3c37] text-[#b8fff2]">
                        <Check size={12} />
                      </div>
                      <span className="leading-7">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Studio' ? '/login' : '/signup'}
                  className={`mt-8 inline-flex w-full justify-center ${
                    plan.featured ? 'ekko-btn ekko-btn-primary' : 'ekko-btn ekko-btn-ghost-light'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
         ========================================================= */}
      <section
        id="faq"
        className="ekko-section ekko-surface-dark-2 px-5 py-24 md:px-8 md:py-32"
      >
        <div className="ekko-container">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              pill="FAQ"
              title="Questions people will ask before trusting a product like this."
              body="This section matters a lot for a product like Ekko because the first objections are almost always about privacy, boundaries, and what the twin is actually allowed to do."
            />
            <div className="space-y-4">
              {faqs.map((item, index) => {
                const open = openFaq === index
                return (
                  <motion.div
                    key={item.q}
                    className="ekko-card overflow-hidden rounded-[28px]"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.04 }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-lg font-semibold text-white">{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-white/64 transition-transform duration-300 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <div className="px-6 pb-6 text-[15px] leading-8 text-white/64">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
         ========================================================= */}
      <section className="ekko-section bg-[#050607] px-5 py-24 text-center md:px-8 md:py-32">
        <div className="ekko-container">
          <div className="mx-auto max-w-5xl rounded-[36px] border border-white/10 bg-white/[0.04] px-6 py-12 shadow-[0_30px_120px_rgba(0,0,0,0.36)] backdrop-blur-2xl md:px-10 md:py-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
              <Sparkles size={14} />
              EKKO
            </div>
            <h2 className="mt-6 ekko-heading-lg text-balance font-black text-white">
              Build the version of you that stays online.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl ekko-body-lg text-white/64">
              Turn your chats, notes, and memories into a living interface people can speak to —
              without giving up control over your identity.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="ekko-btn ekko-btn-primary">
                Build your twin
                <ArrowRight size={17} />
              </Link>
              <Link href="/login" className="ekko-btn ekko-btn-secondary">
                Login
              </Link>
            </div>
            <div className="mt-10 grid gap-4 border-t border-white/8 pt-8 sm:grid-cols-3">
              {[
                { label: 'Private by default', icon: LockKeyhole },
                { label: 'Memory-backed voice', icon: BrainCircuit },
                { label: 'Controlled sharing', icon: Users },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center justify-center gap-3 text-white/62">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-[#071110]">
                    <Icon size={18} />
                  </div>
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
         ========================================================= */}
      <footer className="border-t border-white/8 bg-[#050607] px-5 py-10 text-sm text-white/42 md:px-8">
        <div className="ekko-container flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-semibold tracking-[0.18em] text-white/72">EKKO</div>
            <div className="mt-1">An AI version of you, built from your memories.</div>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/login" className="transition hover:text-white">
              Login
            </Link>
            <Link href="/signup" className="transition hover:text-white">
              Sign up
            </Link>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}