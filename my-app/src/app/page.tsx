'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope, FaBehance, FaInstagram, FaDownload } from 'react-icons/fa';

// Put your CV in the /public folder with this exact name
const CV_URL = '/Fana-Asmelash-CV.pdf';

const roles = ['Software Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Mobile Developer'];

const nav = [['About', '#about'], ['Skills', '#skills'], ['Projects', '#projects'], ['Design', '#design'], ['Education', '#education'], ['Contact', '#contact']];

const projects = [
  {
    name: 'IddirNet', short: 'Digitizing Ethiopian community support systems',
    full: 'A comprehensive platform digitizing Ethiopian Iddir communities with secure digital payments and fair resource management.',
    impact: 'Helping community members with secure financial management',
    tags: ['Web Development', 'System Architecture', 'UI/UX Design'],
    tech: ['React', 'Node.js', 'MongoDB', 'LocationIQ API'],
    image: '/images/phones.png', live: 'https://play.google.com/store/apps/details?id=com.iddirnet.iddirnet&pcampaignid=web_share', bg: 'bg-[#6b2d08]',
    links: { Research: 'https://docs.google.com/document/d/1jJE2k4O-OxqpKgJdT_ZRPFLkquj1qkjuHtBVS743ehw/edit?tab=t.pg149zfd6mjv', PRD: 'https://docs.google.com/document/d/1pkJKPZGg1qWEkooqQIQneOj7-L8N44GgH6TaoJiF01g/edit?tab=t.0', Architecture: 'https://lucid.app/lucidchart/5b591621-374c-4fe3-8fe9-f8877f7ce3ba/edit?invitationId=inv_5efca279-a249-403a-819a-90fb701e0782&page=0_0#', Design: 'https://www.figma.com/design/kijpne0VzuMYGqYBwrlJin/IddirNet?node-id=28-2&t=KTx5HRHDbjYs77QP-1', Schema: 'https://docs.google.com/document/d/1xyHtdBWPOs8s2bPTpdCc5FZ2CyJ2FYp98epjawF02FE/edit?tab=t.0', Website: 'https://iddirnet.vercel.app/' },
  },
  {
    name: 'SafiGreens', short: 'Connecting local vendors with customers',
    full: 'An end-to-end mobile app connecting local vegetable vendors with customers to increase sales and improve food accessibility.',
    impact: 'Increased vendor sales and expanded customer reach.',
    tags: ['Mobile Development', 'API Development', 'Dashboard'],
    tech: ['Kotlin', 'React', 'PostgreSQL', 'Google Maps API'],
    image: '/images/safi.png', live: 'https://safigreeens.netlify.app/', bg: 'bg-[#260e03]',
    links: { Report: 'https://docs.google.com/document/d/1jLrwFGQpjFNA2cP-ozGEM6GJqe01_O6QaKO8UjF4DJc/edit?tab=t.0', Design: 'https://www.figma.com/design/neV9t33HSy5WE2IHlVgwNH/Big_Minds-Design?node-id=424-128&p=f&t=g543HeO23WnsQAPW-0', Website: 'https://safigreeens.netlify.app/', Architecture: 'https://lucid.app/lucidchart/7263de22-187a-420f-a047-80f08c20bb45/edit?page=0_0#', Schema: 'https://docs.google.com/document/d/1nBUwGl-M9WPPRQFyOyziClrIzs7n2JW9W98e9jOl9_Y/edit?usp=sharing', API: 'https://safigreens-ae7369bd05fc.herokuapp.com/api/', Dashboard: 'https://safiigreens-admins.vercel.app/' },
  },
];

const designs = [
  { name: 'The Road Not Taken', details: "This design combines modern typography with artistic illustration to create a visually striking book cover that captures the essence of the literary work.", cat: 'Book Design', image: '/images/bookcover.jpg', link: 'https://www.behance.net/gallery/237913805/Book-cover', tags: ['Book Cover Design', 'Typography', 'Illustration'],
    desc: 'Designed a book cover by blending illustration, typography, and branding, presented in professional mockup formats.' },
  { name: "Depy's Crisps", details: "Created vibrant, child-friendly packaging designs that stand out on shelves while maintaining brand consistency across all three flavor variants.", cat: 'Packaging Design', image: '/images/snack.png', link: 'https://www.behance.net/gallery/237914507/Depsys-Snack', tags: ['Packaging Design', 'Logo Design', 'Brand Identity'],
    desc: 'Designed a logo, landing page, and promotional adverts to showcase a new product line, with packaging for three flavors tailored for children.' },
  { name: 'Kilimanjaro Energies', details: "Developed a comprehensive brand identity that reflects the company's values and energy sector focus, including a user-friendly mobile app for customer engagement.", cat: 'Branding & Product Design', image: '/images/jerrycan.png', link: 'https://www.behance.net/gallery/233940763/Kilimanjaro', tags: ['Brand Identity', 'Logo Design', 'Mobile App Design'],
    desc: 'Created a brand identity by crafting a distinctive logo and cohesive branded materials, along with a loyalty program mobile app design.' },
];

const skills = [
  ['Frontend Development', 'React, Next.js, Typescript'],
  ['Mobile Development', 'Kotlin'],
  ['Database Design', 'SQL, NoSQL, sqlite'],
  ['UI/UX Design', 'Figma, Adobe Photoshop and Illustrator'],
  ['System Architecture', 'Lucid charts'],
  ['AI Integration', 'TensorFlow, PyTorch'],
];

const tags = ['Web', 'Mobile', 'Data', 'Design', 'Systems', 'AI'];

const values = [
  ['Passion driven', 'My journey began with a love for gaming, sparking curiosity about how technology creates immersive experiences.'],
  ['Creative problem solver', 'I approach challenges with innovative thinking, always seeking elegant solutions to complex problems.'],
  ['Full stack', 'From frontend aesthetics to backend architecture, I build complete, robust applications.'],
  ['Design focused', 'I believe great code deserves great design, creating experiences that users love.'],
];

const study = [
  { school: 'MIT', degree: 'Computer Science and Engineering', when: 'September 2023 – January 2025',
    desc: 'Comprehensive curriculum covering digital logic design, circuit analysis, and programming. Developed strong foundational skills in C programming and electronic principles.',
    items: ['Digital and Logic Design', 'ECA (Circuit Course)', 'C Programming Language', 'Microprocessors'] },
  { school: 'AkiraChix', degree: 'Diploma in Information Technology', when: 'February 2025 – November 2025',
    desc: 'CodeHive program specializing in Backend Development, Frontend Web Development, Mobile Development, Data and Machine Learning, User Experience (UX) Research, UI/UX Design, Product Management, and Quality Assurance.',
    items: ['Backend Development', 'Frontend Web Development', 'Mobile Development', 'Data & ML', 'UX Research', 'UI/UX Design', 'Product Management', 'Quality Assurance'] },
];

const contacts = [
  { label: 'Email', text: 'fanabezabih@gmail.com', href: 'mailto:fanabezabih@gmail.com', Icon: FaEnvelope },
  { label: 'LinkedIn', text: 'Connect with me', href: 'https://www.linkedin.com/in/fana-bezabih-027713326', Icon: FaLinkedin },
  { label: 'GitHub', text: 'Check my work', href: 'https://github.com/fanabezabih', Icon: FaGithub },
  { label: 'Behance', text: 'View design', href: 'https://www.behance.net/fanabezabih', Icon: FaBehance },
  { label: 'Instagram', text: 'See more photos', href: 'https://www.instagram.com/fanu_nti', Icon: FaInstagram },
];

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">{children}</h2>
);

function ProjectPanel({ p }: { p: (typeof projects)[0] }) {
  const [tab, setTab] = useState<'overview' | 'tech' | 'links'>('overview');
  return (
    <div className="mx-auto h-full max-w-6xl overflow-y-auto rounded-[2rem] border border-white/15 bg-black/40 backdrop-blur-xl p-5 md:p-10 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
      <div className={`${p.bg} relative h-56 lg:h-full max-h-[34rem] overflow-hidden rounded-2xl`}>
        <Image src={p.image} alt={`${p.name} preview`} fill className="object-contain p-6" sizes="(max-width:1024px) 100vw, 55vw" />
      </div>
      <div>
        <h3 className="font-display text-4xl font-bold">{p.name}</h3>
        <p className="mt-2 text-xl">{p.short}</p>
        <p className="mt-3 text-muted">{p.full}</p>
        <p className="mt-4 bg-sun/30 border-l-4 border-sun px-4 py-3"><strong>Impact:</strong> {p.impact}</p>
        <div className="mt-6 flex gap-6 border-b border-line">
          {([['overview', 'Overview'], ['tech', 'Technology'], ['links', 'Resources']] as const).map(([k, l]) => (
            <button key={k} suppressHydrationWarning onClick={() => setTab(k)} className={`pb-2 font-medium -mb-px border-b-2 ${tab === k ? 'border-cobalt text-cobalt' : 'border-transparent text-muted hover:text-ink'}`}>{l}</button>
          ))}
        </div>
        <div className="mt-4 min-h-[170px]">
          {tab === 'overview' && (
            <>
              <ul className="flex flex-wrap gap-2">{p.tags.map(t => <li key={t} className="border border-ink px-3 py-1 text-sm">{t}</li>)}</ul>
              <a href={p.live} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block bg-cobalt text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-paper transition-colors">View live project</a>
            </>
          )}
          {tab === 'tech' && <ul className="grid grid-cols-2 gap-2">{p.tech.map(t => <li key={t} className="bg-white/5 border border-line px-4 py-3">{t}</li>)}</ul>}
          {tab === 'links' && (
            <ul className="grid grid-cols-2 gap-x-6 border-t border-line">
              {Object.entries(p.links).map(([k, v]) => (
                <li key={k} className="border-b border-line"><a href={v} target="_blank" rel="noopener noreferrer" className="flex justify-between py-2 hover:text-cobalt"><span>{k}</span><span aria-hidden>↗</span></a></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactFooter() {
  const [msg, setMsg] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:fanabezabih@gmail.com?subject=${encodeURIComponent('Hello Fana')}&body=${encodeURIComponent(msg)}`;
  };

  return (
    <footer id="contact" className="relative z-10 pt-10 scroll-mt-20">
      {/* Big gradient card */}
      <div
        className="relative w-full overflow-hidden rounded-t-[2rem] min-h-[26rem] md:min-h-[30rem] px-6 py-6 md:px-12 md:py-8 flex flex-col justify-between text-[#1a0a02]"
        style={{
          background:
            'radial-gradient(110% 80% at 0% 100%, #4a2006 0%, rgba(74,32,6,0) 60%), radial-gradient(80% 90% at 100% 0%, #ffeaa8 0%, rgba(255,234,168,0) 65%), linear-gradient(135deg, #ff9a3d 0%, #ffb85c 100%)',
        }}
      >
        {/* top label */}
        <p className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-wide">
          <span aria-hidden className="h-2 w-2 rounded-full bg-[#1a0a02]" />
          The connections we build make us who we are
        </p>

        {/* headline */}
        <h2 className="font-display font-extrabold uppercase text-center leading-[0.9] tracking-tighter text-[clamp(2.75rem,9vw,7.5rem)] my-6">
          Let&apos;s <br className="sm:hidden" />connect
        </h2>

        {/* social icons */}
        <ul className="flex justify-center gap-6 -mt-2 mb-6">
          {contacts.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-2xl text-[#1a0a02] hover:text-white transition-colors"
              >
                <Icon aria-hidden />
              </a>
            </li>
          ))}
        </ul>

        {/* email form */}
        <form onSubmit={send} className="mx-auto flex w-full max-w-md items-center gap-3">
          <input
            suppressHydrationWarning
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="SAY HELLO..."
            aria-label="Your message"
            className="flex-1 rounded-full bg-white/35 backdrop-blur px-5 py-3 font-mono text-xs uppercase placeholder:text-[#1a0a02]/60 outline-none focus:bg-white/50"
          />
          <button suppressHydrationWarning className="rounded-full bg-[#1a0a02] px-6 py-3 font-mono text-xs uppercase text-white hover:bg-white hover:text-[#1a0a02] transition-colors">
            Send
          </button>
        </form>

        {/* footer bar inside card */}
        <div className="mt-6 pt-5 border-t border-[#1a0a02]/25 flex flex-col md:flex-row gap-4 md:justify-between items-center">
          <a href="#top" className="font-display text-3xl font-bold flex items-center gap-2 justify-center md:justify-start">
            fana<span aria-hidden className="h-4 w-4 rounded-full bg-[#1a0a02]" />
          </a>
          <p className="text-center md:text-right text-xs text-[#1a0a02]/80">
            Building software with thoughtful design.<br />
            &copy; {new Date().getFullYear()} Fana Asmelash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function CursorEffects() {
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // desktop / mouse only
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('custom-cursor');

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let gx = mx, gy = my, rx = mx, ry = my, scale = 1, target = 1;
    let raf = 0, shown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      target = (e.target as HTMLElement | null)?.closest('a,button,input,textarea,[role="button"]') ? 2.2 : 1;
      if (!shown) {
        shown = true;
        [glow, ring, dot].forEach((r) => r.current && (r.current.style.opacity = '1'));
      }
    };
    const onLeave = () => { shown = false; [glow, ring, dot].forEach((r) => r.current && (r.current.style.opacity = '0')); };

    const tick = () => {
      gx += (mx - gx) * 0.07; gy += (my - gy) * 0.07;   // slow, floaty glow
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;   // ring follows a bit behind
      scale += (target - scale) * 0.15;
      if (glow.current) glow.current.style.transform = `translate3d(${gx - 300}px, ${gy - 300}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale})`;
      if (dot.current) dot.current.style.transform = `translate3d(${mx - 5}px, ${my - 5}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);

  return (
    <>
      <style>{`.custom-cursor, .custom-cursor * { cursor: none !important; }`}</style>
      {/* soft light that trails the cursor */}
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-20 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500 will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(255,154,61,.30) 0%, rgba(255,154,61,.12) 35%, rgba(255,154,61,0) 65%)', mixBlendMode: 'screen' }}
      />
      {/* trailing ring */}
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full border-[1.5px] border-white/70 opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ boxShadow: '0 0 12px rgba(255,154,61,.5)' }}
      />
      {/* dot */}
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2.5 w-2.5 rounded-full border-2 border-white bg-[#ff9a3d] opacity-0 transition-opacity duration-300 will-change-transform"
      />
    </>
  );
}

export default function Home() {
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const projRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);
  const [side, setSide] = useState(false); // nav moves to the left after the hero
  const [active, setActive] = useState(''); // id of the section currently in view

  useEffect(() => {
    const onScroll = () => {
      setSide(window.scrollY > window.innerHeight - 120);
      let cur = '';
      for (const [, h] of nav) {
        const sec = document.getElementById(h.slice(1));
        if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.4) cur = h.slice(1);
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = 'contact';
      setActive(cur);
      const el = projRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      setProg(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  useEffect(() => {
    const full = roles[loop % roles.length];
    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === '') { setDeleting(false); return setLoop(loop + 1); }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, !deleting && text === full ? 1800 : deleting ? 40 : 90);
    return () => clearTimeout(t);
  }, [text, deleting, loop]);

  return (
    <div className="relative min-h-screen bg-[#180a02]">
      <CursorEffects />
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[
          ['8%', '-left-[20vw]', 'bg-gradient-to-b from-black to-[#3a1604]', 'w-[70vw]'],
          ['17%', '-right-[28vw]', 'bg-gradient-to-br from-[#4a2006] to-[#5c2808]', 'w-[65vw]'],
          ['31%', '-left-[32vw]', 'bg-[#2a0e02]', 'w-[70vw]'],
          ['44%', '-right-[22vw]', 'bg-gradient-to-br from-[#4a2006] to-[#5c2808]', 'w-[60vw]'],
          ['57%', '-left-[26vw]', 'bg-gradient-to-br from-[#4a2006] to-[#5c2808]', 'w-[65vw]'],
          ['70%', '-right-[30vw]', 'bg-gradient-to-b from-black to-[#3a1604]', 'w-[70vw]'],
          ['82%', '-left-[22vw]', 'bg-gradient-to-br from-[#4a2006] to-[#5c2808]', 'w-[60vw]'],
          ['93%', '-right-[12vw]', 'bg-[#3a1604]', 'w-[50vw]'],
        ].map(([top, side, bg, w], i) => (
          <div key={i} className={`absolute aspect-square rounded-full ${side} ${bg} ${w}`} style={{ top }} />
        ))}
      </div>
      <header>
        <nav
          aria-label="Main"
          className={`fixed z-30 max-w-[calc(100%-1.5rem)] overflow-x-auto border border-white/10 bg-[#1a0a02]/90 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 ease-in-out
            top-4 left-1/2 -translate-x-1/2
            ${side
              ? 'rounded-full px-2 py-2 lg:top-1/2 lg:left-4 lg:translate-x-0 lg:-translate-y-1/2 lg:rounded-[2rem] lg:overflow-visible lg:px-2 lg:py-3'
              : 'rounded-full px-2 py-2'}`}
        >
          <ul className={`flex items-center gap-0.5 sm:gap-1 ${side ? 'lg:flex-col lg:items-stretch lg:gap-1' : ''}`}>
            {nav.map(([n, h]) => (
              <li key={h}>
                <a
                  href={h}
                  aria-current={active === h.slice(1) ? 'true' : undefined}
                  className={`block whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-colors sm:px-5 sm:text-sm ${side ? 'lg:px-4 lg:text-center' : ''} ${active === h.slice(1) ? 'bg-cobalt text-white' : 'hover:bg-white/10 hover:text-cobalt'}`}
                >
                  {n}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-screen bg-[#3a1604] px-5 pb-16 pt-28 flex items-center justify-center">
          <div aria-hidden className="absolute -top-[22%] left-[4%] w-[32%] aspect-square rounded-full bg-gradient-to-b from-black to-[#3a1604]" />
          <div aria-hidden className="absolute -top-[18%] right-[6%] w-[26%] aspect-square rounded-full bg-gradient-to-br from-[#3d1a05] to-[#522407]" />
          <div aria-hidden className="absolute -bottom-[30%] left-[30%] w-[40%] aspect-square rounded-full bg-gradient-to-br from-[#4a2006] to-[#5c2808]" />
          <div className="relative w-full max-w-7xl rounded-[2rem] border border-white/25 bg-white/10 backdrop-blur-2xl shadow-[0_30px_80px_rgba(0,0,0,0.5)] p-7 md:p-14 rise">
            <h1 className="font-display font-bold tracking-tight leading-[1.02] text-4xl sm:text-5xl md:text-7xl lg:text-8xl sm:whitespace-nowrap mt-16 md:mt-24">
              Hello, I&apos;m Fana.
            </h1>
            <p className="mt-5 font-display text-xl md:text-2xl font-semibold min-h-[2lh]">
              {text}<span aria-hidden className="ml-0.5 animate-pulse">|</span>
            </p>
            <p className="mt-4 max-w-2xl text-sm md:text-base text-white/80">
              Passionate about creating innovative tech solutions that bridge gaps and enhance user experiences. From gaming inspiration to real-world applications, I love turning ideas into reality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="bg-white text-[#3a1604] px-6 py-3 font-semibold rounded-full hover:bg-sun hover:text-white transition-colors">View my work</a>
              <a href="#contact" className="border border-white/60 px-6 py-3 font-semibold rounded-full hover:bg-white/15 transition-colors">Get in touch</a>
              <a href={CV_URL} download className="inline-flex items-center gap-2 bg-cobalt text-white px-6 py-3 font-semibold rounded-full hover:bg-white hover:text-[#3a1604] transition-colors">
                <FaDownload aria-hidden className="text-sm" />Download CV
              </a>
            </div>
            <a href="https://www.instagram.com/fanu_nti" target="_blank" rel="noopener noreferrer" className="mt-10 block text-sm hover:underline">@fanu_nti</a>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 md:py-24 px-5 scroll-mt-20"><div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
            <H2>Crafting digital experiences</H2>
            <div className="mt-10 space-y-5 text-lg text-muted max-w-prose">
              <p>I&apos;m a <strong className="text-ink">Software Engineer</strong> who transforms ideas into elegant digital solutions. My journey began with a fascination for gaming, where I discovered the magic of creating immersive experiences through code.</p>
              <p>Today, I specialize in <strong className="text-ink">full-stack development</strong> and <strong className="text-ink">UI/UX design</strong>, building applications that not only work flawlessly but also delight users with thoughtful design.</p>
              <p>My philosophy is simple: great code deserves great design. Whether I&apos;m architecting scalable backend systems or crafting pixel-perfect interfaces, I bring the same level of passion and attention to detail.</p>
              <p>
                <a href={CV_URL} download className="inline-flex items-center gap-2 bg-cobalt text-white px-6 py-3 font-semibold rounded-full hover:bg-white hover:text-[#3a1604] transition-colors">
                  <FaDownload aria-hidden className="text-sm" />Download my CV
                </a>
              </p>
            </div>
            </div>
            <div className="md:-mt-2">
              {/* small screens: simple list */}
              <dl className="md:hidden divide-y divide-white/15 border-y border-white/15">
                {values.map(([t, d]) => (
                  <div key={t} className="py-5">
                    <dt className="font-display text-xl font-semibold text-sun">{t}</dt>
                    <dd className="mt-1 text-muted">{d}</dd>
                  </div>
                ))}
              </dl>
              {/* md and up: glowing ring with four labelled boxes */}
              <div className="hidden md:block relative mx-auto w-full max-w-[34rem] aspect-[520/600]">
                <svg viewBox="0 0 520 600" className="absolute inset-0 w-full h-full" aria-hidden>
                  <defs>
                    <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd86b" /><stop offset="1" stopColor="#ff9a3d" /></linearGradient>
                    <linearGradient id="baseG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff9a3d" stopOpacity=".55" /><stop offset="1" stopColor="#c4560c" stopOpacity=".35" /></linearGradient>
                    <filter id="glow" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="10" /></filter>
                  </defs>
                  <ellipse cx="260" cy="505" rx="240" ry="78" fill="url(#baseG)" />
                  <ellipse cx="260" cy="474" rx="128" ry="34" fill="#140a04" />
                  {['M208 98 H238 Q250 98 250 110 V452', 'M208 268 H212 Q224 268 224 280 V460', 'M312 148 H282 Q270 148 270 160 V450', 'M312 318 H310 Q298 318 298 330 V460'].map((d) => (
                    <path key={d} d={d} fill="none" stroke="white" strokeOpacity=".7" strokeWidth="1" />
                  ))}
                </svg>
                <div aria-hidden className="absolute left-1/2 top-[78.3%] w-[66%] aspect-square" style={{ transform: 'translate(-50%,-50%) rotateX(72.5deg)', WebkitMaskImage: 'radial-gradient(circle closest-side, transparent 85%, #000 86%)', maskImage: 'radial-gradient(circle closest-side, transparent 85%, #000 86%)', filter: 'drop-shadow(0 0 14px rgba(255,170,60,.7))' }}>
                  <div className="ring-rot absolute inset-0 rounded-full" style={{ background: 'conic-gradient(#ffeaa8 0deg, #ff9a3d 70deg, #4a2006 160deg, #4a2006 200deg, #ff9a3d 290deg, #ffeaa8 360deg)' }} />
                </div>
                {values.map(([t, d], i) => (
                  <div key={t} className={`absolute w-[40%] min-h-[7.25rem] rounded-xl border border-white/30 bg-white/5 backdrop-blur-md px-3.5 py-3 text-left ${i < 2 ? 'left-0' : 'right-0'}`}
                    style={{ top: `${[60, 230, 110, 280][i] / 6}%` }}>
                    <h4 className="font-display text-sm font-semibold text-sun leading-tight whitespace-nowrap">{t}</h4>
                    <p className="mt-2 text-xs text-muted leading-relaxed">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div></section>

        {/* Quote */}
        <section className="relative px-5 py-28 md:py-44">
          <blockquote className="mx-auto max-w-7xl text-center">
            <p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug">
              &ldquo;I believe the best software is born at the intersection of elegant code and thoughtful design.&rdquo;
            </p>
            <footer className="mt-8 text-lg text-sun">Fana Asmelash</footer>
          </blockquote>
        </section>

        {/* Skills */}
        <section id="skills" className="relative overflow-hidden py-24 px-5 scroll-mt-20">
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[min(110vw,52rem)] rounded-full bg-gradient-to-b from-[#451a04] to-[#4a2008]/70" />
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[min(66vw,30rem)] rounded-full bg-black" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-center">My skills</h2>
            <ul className="mt-16 space-y-8">
              {skills.map(([n, s], i) => (
                <li key={n} className={`relative ${i % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]'} ${i === 0 ? '' : '-mt-2'}`}>
                  <span className={`absolute -top-4 ${i % 2 ? 'left-6 -rotate-6' : 'right-6 rotate-6'} z-10 px-4 py-1 font-display font-bold text-sm md:text-base ${i % 3 === 0 ? 'bg-white/80 text-black' : 'bg-cobalt text-white'}`}>
                    {tags[i]}
                  </span>
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/30 bg-gradient-to-br from-white/15 to-black/30 backdrop-blur-xl px-8 py-8 md:py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
                    <div aria-hidden className={`absolute bottom-0 ${i % 2 ? 'right-6' : 'left-6'} w-1/3 h-1/2 bg-cobalt/50 blur-2xl`} />
                    <h3 className="relative font-display text-2xl md:text-3xl font-semibold">{n}</h3>
                    <p className="relative mt-1 text-white/80">{s}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative scroll-mt-20">
          <div className="px-5 pt-16 pb-6 mx-auto max-w-6xl"><H2>Projects solving real-world problems</H2></div>
          <div ref={projRef} style={{ height: `${projects.length * 100}vh` }}>
            <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-hidden">
              <div className="flex h-full" style={{ width: `${projects.length * 100}%`, transform: `translateX(-${(prog * (projects.length - 1) * 100) / projects.length}%)` }}>
                {projects.map((pr) => (
                  <div key={pr.name} className="h-full px-5 pb-6" style={{ width: `${100 / projects.length}%` }}>
                    <ProjectPanel p={pr} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design */}
        <section id="design" className="py-20 px-5 scroll-mt-20 overflow-hidden"><div className="mx-auto max-w-6xl">
          <H2>Design work</H2>
          <div className="mt-16 md:mt-28 pb-10 md:pb-24 flex flex-col md:flex-row md:justify-center gap-6 md:gap-8 [perspective:1600px]">
            {designs.map((d, i) => (
              <article key={d.name}
                style={{ ['--ty' as string]: `${[4, 0, -4][i]}rem` }}
                className={`tilt group relative w-full md:w-[22rem] aspect-[4/5] md:aspect-[11/15] rounded-[2rem] p-6 flex flex-col border border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.5)] ${i === 1 ? 'bg-cobalt/80' : 'bg-white/10 backdrop-blur-md'}`}>
                <h3 className="font-display text-2xl font-bold leading-tight">{d.name}</h3>
                <p className="text-sm text-white/80 mt-1">{d.cat}</p>
                <div className="relative mt-4 flex-1 min-h-0 rounded-xl overflow-hidden bg-black/30">
                  <Image src={d.image} alt={d.name} fill className="object-cover" sizes="300px" />
                </div>
                <span className="mt-3 self-end font-display text-5xl font-light leading-none">0{i + 1}</span>

                <div className="pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto absolute inset-0 rounded-[2rem] overflow-y-auto overscroll-contain scroll-thin bg-[#140a04]/95 backdrop-blur-xl p-6 flex flex-col opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-sun">{d.cat}</p>
                  <h3 className="font-display text-2xl font-bold leading-tight">{d.name}</h3>
                  <p className="mt-3 text-base text-white/90">{d.desc}</p>
                  <p className="mt-3 text-sm text-muted">{d.details}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">{d.tags.map(t => <li key={t} className="border border-white/50 px-2.5 py-0.5 text-xs rounded-full">{t}</li>)}</ul>
                  <a href={d.link} target="_blank" rel="noopener noreferrer" className="mt-auto pt-4 self-start">
                    <span className="inline-block bg-cobalt text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white hover:text-paper transition-colors">View full project on Behance</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div></section>

        {/* Education */}
        <section id="education" className="py-16 md:py-24 px-5 scroll-mt-20">
          <div className="mx-auto max-w-6xl">
            <H2>My education</H2>
            <div className="mt-12 border-t border-white/15">
              {study.map((e) => (
                <article key={e.school} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-10 border-b border-white/15">
                  <div>
                    <p className="text-sm text-muted">{e.when}</p>
                    <h3 className="mt-2 font-display text-3xl md:text-4xl font-bold">{e.school}</h3>
                    <p className="mt-1 text-sun font-medium">{e.degree}</p>
                  </div>
                  <div>
                    <p className="text-muted max-w-prose">{e.desc}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {e.items.map((i) => (
                        <li key={i} className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm">{i}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Contact + footer */}
      <ContactFooter />
    </div>
  );
}