'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaMobileAlt, FaDatabase, FaPalette, FaProjectDiagram, FaRobot, FaGamepad, FaArrowRight, FaCheckCircle, FaEye, FaQuoteLeft, FaQuoteRight, FaLightbulb, FaHeart, FaRocket, FaTrophy, FaGraduationCap, FaUsers, FaLaptopCode, FaStar, FaAward, FaBrain, FaCogs, FaMagic, FaFire, FaExternalLinkAlt, FaCodeBranch, FaLayerGroup, FaMobile, FaWaveSquare, FaBars, FaTimes, FaBehance, FaCamera } from 'react-icons/fa';

import ParticleNetwork from './components/ParticleNetwork';

export default function Home() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(200);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [activeDesign, setActiveDesign] = useState(0);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [selectedDesign, setSelectedDesign] = useState<typeof designProjects[0] | null>(null);
  const [projectTab, setProjectTab] = useState('overview');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // NEW: State for Photography Carousel
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const roles = ['Software Engineer', 'Full Stack Developer', 'UI/UX Designer', 'Mobile Developer'];
  
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      
      setTypingSpeed(isDeleting ? 50 : 200);
      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);
  
  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAboutVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  // NEW: Auto-play carousel for photography (Exchange every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval);
  }, []);
  
  const projects = [
    {
      id: 0,
      name: 'IddirNet',
      shortDescription: 'Digitizing Ethiopian community support systems',
      fullDescription: 'A comprehensive platform digitizing Ethiopian Iddir communities with secure digital payments and fair resource management.',
      tags: ['Web Development', 'System Architecture', 'UI/UX Design'],
      color: 'from-cyan-700 to-blue-900',
      image: '/images/phones.png',
      icon: <FaUsers />,
      links: { research: '#', prd: '#', architecture: '#', design: '#', schema: '#', website: '#' },
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
      impact: 'Helping community members with secure financial management'
    },
    {
      id: 1,
      name: 'SafiGreens',
      shortDescription: 'Connecting local vendors with customers',
      fullDescription: 'An end-to-end mobile app connecting local vegetable vendors with customers to increase sales and improve food accessibility.',
      tags: ['Mobile Development', 'API Development', 'Dashboard'],
      color: 'from-blue-800 to-indigo-900',
      image: '/images/safi.png', 
      icon: <FaMobile />,
      links: { report: '#', design: '#', website: '#', architecture: '#', schema: '#', api: '#', dashboard: '#' },
      tech: ['Kotlin', 'React', 'PostgreSQL', 'Google Maps API'],
      impact: 'Increased vendor sales by and expanded customer reach.'
    }
  ];
  const designProjects = [
    { 
      id: 0, 
      name: 'The Road Not Taken', 
      description: 'Designed a book cover by blending illustration, typography, and branding, presented in professional mockup formats.', 
      tags: ['Book Cover Design', 'Typography', 'Illustration'], 
      color: 'from-purple-700 to-pink-900', 
      image: '/images/bookcover.jpg', 
      category: 'Book Design', 
      details: 'This design combines modern typography with artistic illustration to create a visually striking book cover that captures essence of literary work.',
      link: 'https://www.behance.net/gallery/237913805/Book-cover' 
    },
    { 
      id: 1, 
      name: 'Depy\'s Crisps', 
      description: 'Designed a logo, landing page, and promotional adverts to showcase new product line, with packaging for three flavors tailored for children.', 
      tags: ['Packaging Design', 'Logo Design', 'Brand Identity'], 
      color: 'from-yellow-700 to-orange-900', 
      image: '/images/snack.png', 
      category: 'Packaging Design', 
      details: 'Created vibrant, child-friendly packaging designs that stand out on shelves while maintaining brand consistency across all three flavor variants.',
      link: 'https://www.behance.net/gallery/237914507/Depsys-Snack' 
    },
    { 
      id: 2, 
      name: 'Kilimanjaro Energies', 
      description: 'Created a brand identity by crafting a distinctive logo and cohesive branded materials, along with a loyalty program mobile app design.', 
      tags: ['Brand Identity', 'Logo Design', 'Mobile App Design'], 
      color: 'from-green-700 to-teal-900', 
      image: '/images/jerrycan.png', 
      category: 'Branding & Product Design', 
      details: 'Developed a comprehensive brand identity that reflects company\'s values and energy sector focus, including a user-friendly mobile app for customer engagement.',
      link: 'https://www.behance.net/gallery/233940763/Kilimanjaro' 
    }
  ];
  
  // UPDATED: Filenames and Titles
  const photos = [
    { id: 1, src: '/images/arts.jpg', category: 'Portrait', title: 'Urban Canvas' },
    { id: 2, src: '/images/monments.jpg', category: 'Memories', title: 'Chasing Light' },
    { id: 3, src: '/images/plants.jpg', category: 'Nature', title: 'Verdant Life' },
  ];

  const skills = [
    { name: 'Frontend Development', icon: <FaCode />, color: 'from-blue-500 to-cyan-600', stats: 'React, Next.js, Typescript' },
    { name: 'Mobile Development', icon: <FaMobileAlt />, color: 'from-green-500 to-teal-600', stats: 'Kotlin' },
    { name: 'Database Design', icon: <FaDatabase />, color: 'from-purple-500 to-pink-600', stats: 'SQL, NoSQL, sqlite' },
    { name: 'UI/UX Design', icon: <FaPalette />, color: 'from-orange-500 to-red-600', stats: 'Figma, Adobe Photoshop and Illustrator.' },
    { name: 'System Architecture', icon: <FaProjectDiagram />, color: 'from-indigo-500 to-purple-600', stats: 'Lucid charts' },
    { name: 'AI Integration', icon: <FaRobot />, color: 'from-yellow-500 to-orange-600', stats: 'TensorFlow, PyTorch' }
  ];
  const experienceCards = [
    { icon: <FaFire />, title: 'Passion Driven', description: 'My journey began with a love for gaming, sparking curiosity about how technology creates immersive experiences.', color: 'from-orange-500 to-red-600' },
    { icon: <FaBrain />, title: 'Creative Problem Solver', description: 'I approach challenges with innovative thinking, always seeking elegant solutions to complex problems.', color: 'from-purple-500 to-pink-600' },
    { icon: <FaCogs />, title: 'Full Stack Expert', description: 'From frontend aesthetics to backend architecture, I build complete, robust applications.', color: 'from-blue-500 to-cyan-600' },
    { icon: <FaMagic />, title: 'Design Focused', description: 'I believe great code deserves great design, creating experiences that users love.', color: 'from-green-500 to-teal-600' }
  ];
  const navItems = [
    { name: 'About', href: '#about', angle: -60 },
    { name: 'Skills', href: '#skills', angle: -30 },
    { name: 'Projects', href: '#projects', angle: 0 },
    { name: 'Education', href: '#education', angle: 30 },
    { name: 'Contacts', href: '#contact', angle: 60 }
  ];
  
  // Close mobile menu when clicking on a link
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 2. Use the imported component here as the background */}
      <ParticleNetwork />
      
      {/* Mobile Menu Toggle Button - Only visible on small screens */}
      <button
        className="fixed top-6 left-6 z-50 md:hidden bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-full p-3 text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >   
        {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      
      {/* Mobile Navigation Menu - Only visible on small screens */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 bg-opacity-95 backdrop-blur-md z-40 transform transition-transform duration-300 md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col p-6 pt-20">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="flex items-center py-4 text-lg font-medium hover:text-cyan-400 transition-colors"
              onClick={handleNavClick}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
      
      {/* Desktop Navigation - Large semicircle with buttons inside - Hidden on small screens */}
      <nav className="fixed -left-40 top-0 h-full w-48 md:w-64 z-20 hidden md:flex flex-col items-center py-8">
        <div className="relative h-full flex items-center">
          <div className="absolute -left- top-1/2 transform -translate-y-1/2 w-50 h-96 md:w-[250px] md:h-[500px] bg-cyan-700 bg-opacity-30 rounded-r-full overflow-hidden"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            {navItems.map((item, index) => {
              const radius = 180;
              const angleRad = (item.angle * Math.PI) / 180;
              const x = radius * Math.cos(angleRad);
              const y = radius * Math.sin(angleRad);
              return (
                <a key={index} href={item.href} className="absolute group z-10" style={{ transform: `translate(${x}px, ${y}px)`, left: '50%', top: '50%', marginLeft: '-28px', marginTop: '-28px' }}>
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-900 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-medium hover:bg-blue-800 transition-all duration-300 transform hover:scale-110 shadow-lg">{item.name}</div>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
      
      {/* Main Content - Adjusted for larger left sidebar */}
      <div className="ml-0 md:ml-20 relative z-10">
        {/* Hero Section - Reduced height and padding */}
        <section className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Hi, I'm <span className="text-cyan-300">Fana Asmelash</span></h1>
          <div className="text-2xl md:text-3xl mb-8 h-10"><span className="text-gray-400">{text}</span><span className="animate-pulse" style={{ animationDuration: '2s' }}>|</span></div>
          <p className="max-w-2xl mb-10 text-gray-400 text-lg">Passionate about creating innovative tech solutions that bridge gaps and enhance user experiences. From gaming inspiration to real-world applications, I love turning ideas into reality.</p>
          <div className="flex space-x-4 mb-8">
            <a href="#projects" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-700">View My Work</a>
            <a href="#contact" className="px-8 py-3 border border-cyan-600 rounded-full font-semibold hover:bg-cyan-900 transition-all duration-700">Get In Touch</a>
          </div>
        </section>
        
        {/* Creative Wave Divider */}
        <div className="relative h-24 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="#000000" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        </div>
        
        {/* New Beautiful About Section - Reduced top padding */}
        <section id="about" ref={aboutRef} className="py-10 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Section Title with Animation */}
            <div className={`text-center mb-16 transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-5xl md:text-6xl font-bold mb-4">About <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Me</span></h2>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            {/* Split Screen Design */}
            <div className={`grid lg:grid-cols-2 gap-12 mb-20 transition-all duration-1000 delay-200 ${aboutVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              {/* Left Side - Personal Introduction */}
              <div className="relative">
                {/* Floating Card Effect */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-700"
                     style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-20 blur-xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      Crafting Digital Experiences
                    </h3>
                    
                    <div className="space-y-4 text-gray-300">
                      <p className="text-lg leading-relaxed">
                        I'm a <span className="text-cyan-400 font-semibold">Software Engineer</span> who transforms ideas into 
                        elegant digital solutions. My journey began with a fascination for gaming, where I discovered magic 
                        of creating immersive experiences through code.
                      </p>
                      
                      <p className="text-lg leading-relaxed">
                        Today, I specialize in <span className="text-purple-400 font-semibold">full-stack development</span> and 
                        <span className="text-pink-400 font-semibold"> UI/UX design</span>, building applications that not only work 
                        flawlessly but also delight users with thoughtful design.
                      </p>
                      
                      <p className="text-lg leading-relaxed">
                        My philosophy is simple: <span className="text-yellow-400 font-semibold">great code deserves great design</span>. 
                        Whether I'm architecting scalable backend systems or crafting pixel-perfect interfaces, I bring the same 
                        level of passion and attention to detail.
                      </p>
                    </div>
                    
                    {/* Achievement Badges - REMOVED AS REQUESTED */}
                  </div>
                </div>
              </div>
              
              {/* Right Side - Interactive Experience Cards */}
              <div className="space-y-6" style={{ transform: `translateY(${-scrollY * 0.05}px)` }}>
                {experienceCards.map((card, index) => (
                  <div
                    key={index}
                    className={`relative bg-gradient-to-r ${card.color} p-1 rounded-2xl cursor-pointer transform transition-all duration-700 hover:scale-105 ${
                      activeCard === index ? 'scale-105 shadow-2xl' : ''
                    }`}
                    onClick={() => setActiveCard(activeCard === index ? null : index)}
                    onMouseEnter={() => setHoveredExperience(index)}
                    onMouseLeave={() => setHoveredExperience(null)}
                  >
                    <div className="bg-gray-900 rounded-2xl p-6 h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl text-white">
                          {card.icon}
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-2">
                        {card.title}
                      </h4>
                      
                      <p className="text-gray-400">
                        {card.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mt-4 w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all duration-1000"
                          style={{ 
                            width: hoveredExperience === index ? '100%' : '0%',
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom Section - Skills Showcase - Redesigned */}
            <div className={`mt-20 transition-all duration-1000 delay-500 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-3xl font-bold text-center mb-12">
                My<span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
              </h3>
              
              {/* Skills Grid - Rectangular Cards without Percentages */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`relative group bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                      hoveredSkill === index ? 'shadow-2xl' : ''
                    }`}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Card Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 10px 10px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    <div className="p-6 relative z-10">
                      <div className="flex items-center mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mr-4 shadow-lg transform group-hover:rotate-6 transition-transform duration-500`}>
                          {skill.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{skill.name}</h4>
                          <p className="text-sm text-gray-400">{skill.stats}</p>
                        </div>
                      </div>
                      
                      {/* Skill Tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {skill.stats.split(', ').map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400 border border-gray-700 group-hover:border-gray-600 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Skills Summary */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center px-6 py-3 bg-gray-800 rounded-full">
                  <div className="flex -space-x-2">
                    {skills.slice(0, 5).map((skill, index) => (
                      <div key={index} className={`w-10 h-10 rounded-full bg-gradient-to-br ${skill.color} flex items-center justify-center border-2 border-gray-900`}>
                        {skill.icon}
                      </div>
                    ))}
                  </div>
                  <p className="ml-4 text-gray-300">
                    And <span className="text-cyan-400 font-semibold">more</span> in my tech stack
                  </p>
                </div>
              </div>
            </div>
            
            {/* Personal Quote Section */}
            <div className={`mt-20 text-center transition-all duration-1000 delay-700 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative inline-block">
                <FaQuoteLeft className="absolute -top-8 -left-8 text-6xl text-cyan-500 opacity-20" />
                <p className="text-2xl md:text-3xl font-light text-gray-300 italic max-w-3xl mx-auto px-12">
                  "I believe the best software is born at the intersection of elegant code and thoughtful design. 
                  It's not just about building applications—it's about crafting experiences that make a difference."
                </p>
                <FaQuoteRight className="absolute -bottom-8 -right-8 text-6xl text-purple-500 opacity-20" />
              </div>
              <p className="mt-8 text-cyan-400 font-semibold">— Fana Bezabih</p>
            </div>
          </div>
        </section>
        
        {/* New Projects Section with Modern Design */}
        <section id="projects" className="py-20 px-6 bg-gray-950">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore my latest work, from community platforms to mobile applications that solve real-world problems
              </p>
            </div>
            
            {/* Project Selector */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex rounded-lg bg-gray-900 p-1">
                {projects.map((project, index) => (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-md transition-all duration-700 flex items-center space-x-2 ${
                      activeProject === index 
                        ? `bg-gradient-to-r ${project.color} text-white` 
                        : 'text-gray-500 hover:text-white'
                    }`}
                    onClick={() => setActiveProject(index)}
                  >
                    <span>{project.icon}</span>
                    <span>{project.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Main Project Display */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Project Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <div className="aspect-w-16 aspect-h-9 h-80 md:h-96">
                    {imageError[`project-${activeProject}`] ? (
                      <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].color} flex items-center justify-center`}>
                        <div className="text-center p-6">
                          <div className="text-6xl mb-4 text-white opacity-50">
                            {projects[activeProject].icon}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold mb-2">{projects[activeProject].name}</h3>
                          <p className="text-gray-300">Project Preview</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src={projects[activeProject].image}
                          alt={projects[activeProject].name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={() => setImageError(prev => ({ ...prev, [`project-${activeProject}`]: true }))}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </>
                    )}
                  </div>
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-6 right-6 flex space-x-3">
                    <button className="w-12 h-12 bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all duration-300">
                      <FaGithub />
                    </button>
                    <button className="w-12 h-12 bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-100 transition-all duration-300">
                      <FaExternalLinkAlt />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="order-1 lg:order-2">
                {/* Project Title and Description */}
                <div className="mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {projects[activeProject].name}
                  </h3>
                  <p className="text-xl text-gray-300 mb-6">
                    {projects[activeProject].shortDescription}
                  </p>
                  <p className="text-gray-400">
                    {projects[activeProject].fullDescription}
                  </p>
                </div>
                
                {/* Project Impact */}
                <div className="mb-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl">
                  <h4 className="text-lg font-semibold mb-2 text-cyan-400">Impact</h4>
                  <p className="text-gray-300">{projects[activeProject].impact}</p>
                </div>
                
                {/* Project Tabs */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-800">
                    <button
                      className={`px-4 py-2 font-medium transition-all duration-300 ${
                        projectTab === 'overview' 
                          ? 'text-cyan-400 border-b-2 border-cyan-400' 
                          : 'text-gray-500 hover:text-white'
                      }`}
                      onClick={() => setProjectTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`px-4 py-2 font-medium transition-all duration-300 ${
                        projectTab === 'tech' 
                          ? 'text-cyan-400 border-b-2 border-cyan-400' 
                          : 'text-gray-500 hover:text-white'
                      }`}
                      onClick={() => setProjectTab('tech')}
                    >
                      Technology
                    </button>
                    <button
                      className={`px-4 py-2 font-medium transition-all duration-300 ${
                        projectTab === 'links' 
                          ? 'text-cyan-400 border-b-2 border-cyan-400' 
                          : 'text-gray-500 hover:text-white'
                      }`}
                      onClick={() => setProjectTab('links')}
                    >
                      Resources
                    </button>
                  </div>
                </div>
                
                {/* Tab Content */}
                <div className="min-h-[200px]">
                  {projectTab === 'overview' && (
                    <div>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {projects[activeProject].tags.map((tag, index) => (
                          <span key={index} className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-700 flex items-center">
                        View Live Project
                        <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  )}
                  
                  {projectTab === 'tech' && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-cyan-400">Technology Stack</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {projects[activeProject].tech.map((tech, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 bg-gray-800 rounded-lg">
                            <FaCodeBranch className="text-cyan-400" />
                            <span className="text-gray-300">{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {projectTab === 'links' && (
                    <div>
                      <h4 className="text-lg font-semibold mb-4 text-cyan-400">Project Resources</h4>
                      <div className="space-y-3">
                        {Object.entries(projects[activeProject].links).map(([key, value]) => (
                          <a
                            key={key}
                            href={value}
                            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
                            onMouseEnter={() => setHoveredLink(key)}
                            onMouseLeave={() => setHoveredLink(null)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                key === 'research' ? 'bg-purple-900' :
                                key === 'prd' ? 'bg-blue-900' :
                                key === 'architecture' ? 'bg-green-900' :
                                key === 'design' ? 'bg-pink-900' :
                                key === 'schema' ? 'bg-yellow-900' :
                                key === 'website' ? 'bg-cyan-900' :
                                key === 'api' ? 'bg-indigo-900' :
                                key === 'dashboard' ? 'bg-red-900' :
                                'bg-gray-700'
                              }`}>
                                {
                                  key === 'research' ? <FaLightbulb /> :
                                  key === 'prd' ? <FaLayerGroup /> :
                                  key === 'architecture' ? <FaProjectDiagram /> :
                                  key === 'design' ? <FaPalette /> :
                                  key === 'schema' ? <FaDatabase /> :
                                  key === 'website' ? <FaExternalLinkAlt /> :
                                  key === 'api' ? <FaCode /> :
                                  key === 'dashboard' ? <FaRocket /> :
                                  <FaArrowRight />
                                }
                              </div>
                              <span className="capitalize text-gray-300">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            <FaArrowRight className={`text-cyan-500 transition-transform duration-300 ${
                              hoveredLink === key ? 'translate-x-1' : ''
                            }`} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Education Section - MOVED HERE */}
        <section id="education" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              My <span className="text-cyan-400">Education</span>
            </h2>
            
            <div className="space-y-12">
              {/* MIT Entry */}
              <div className="bg-gray-900 rounded-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 p-1 mb-6 md:mb-0 md:mr-8 flex items-center justify-center">
                    {/* Using Icon for MIT */}
                    <div className="text-3xl font-bold text-white">
                       MIT
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">MIT</h3>
                    <p className="text-xl text-gray-400 mb-4">Computer Science and Engineering</p>
                    <p className="text-gray-500 mb-4">September 2023 – January 2025</p>
                    <p className="text-gray-400">
                      Comprehensive curriculum covering digital logic design, circuit analysis, and programming. 
                      Developed strong foundational skills in C programming and electronic principles.
                    </p>
                  </div>
                </div>
                
                {/* MIT Course List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {['Digital and Logic Design', 'ECA (Circuit Course)', 'C Programming Language', 'Microprocessors'].map((course, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-800 rounded-lg">
                      <FaCheckCircle className="text-cyan-500 mr-3" />
                      <span className="text-gray-300">{course}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AkiraChix Entry */}
              <div className="bg-gray-900 rounded-xl p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-cyan-800 to-blue-900 p-1 mb-6 md:mb-0 md:mr-8">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      {imageError['education-logo'] ? (
                        <span className="text-2xl md:text-3xl font-bold text-cyan-400">AC</span>
                      ) : (
                        <Image
                          src="/images/Skirachix.png" 
                          alt="AkiraChix Logo"
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 80px, 96px"
                          onError={() => setImageError(prev => ({ ...prev, 'education-logo': true }))}
                        />
                      )}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">AkiraChix</h3>
                    <p className="text-xl text-gray-400 mb-4">Diploma in Information Technology</p>
                    <p className="text-gray-500 mb-4">February 2025 – November 2025</p>
                    <p className="text-gray-400">
                      CodeHive program specializing in Backend Development, Frontend Web Development, Mobile Development, 
                      Data and Machine Learning, User Experience (UX) Research, UI/UX Design, 
                      Product Management, and Quality Assurance.
                    </p>
                  </div>
                </div>
                
                {/* AkiraChix Course List */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {['Backend Development', 'Frontend Web Development', 'Mobile Development', 'Data & ML'].map((course, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-800 rounded-lg">
                      <FaCheckCircle className="text-cyan-500 mr-3" />
                      <span className="text-gray-300">{course}</span>
                    </div>
                  ))}
                  {['UX Research', 'UI/UX Design', 'Product Management', 'Quality Assurance'].map((course, index) => (
                    <div key={index + 4} className="flex items-center p-3 bg-gray-800 rounded-lg">
                      <FaCheckCircle className="text-cyan-500 mr-3" />
                      <span className="text-gray-300">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Section */}
        <section id="design" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Design <span className="text-purple-400">Work</span>
            </h2>
            
            {/* Design Preview Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {designProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-700 cursor-pointer"
                  onClick={() => setSelectedDesign(project)}
                >
                  <div className="relative h-64">
                    {imageError[`design-preview-${project.id}`] ? (
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                        <FaPalette className="text-5xl text-white opacity-50" />
                      </div>
                    ) : (
                      <>
                        <Image
                          src={project.image}
                          alt={project.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          onError={() => setImageError(prev => ({ ...prev, [`design-preview-${project.id}`]: true }))}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                      </>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black bg-opacity-60 rounded-full text-xs text-purple-300 backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-xl font-bold mb-1">{project.name}</h4>
                      <div className="flex items-center text-purple-400">
                        <FaEye className="mr-2" />
                        <span className="text-sm">View Design</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Design Detail Modal/Popup */}
            {selectedDesign && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
                onClick={() => setSelectedDesign(null)}
              >
                <div 
                  className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="px-3 py-1 bg-purple-900 bg-opacity-50 rounded-full text-sm text-purple-300">
                          {selectedDesign.category}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold mt-2">{selectedDesign.name}</h3>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={() => setSelectedDesign(null)}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Design Image */}
                      <div className="rounded-lg overflow-hidden">
                        <div className="relative h-80 md:h-96">
                          {imageError[`design-detail-${selectedDesign.id}`] ? (
                            <div className={`absolute inset-0 bg-gradient-to-br ${selectedDesign.color} flex items-center justify-center`}>
                              <div className="text-center p-6">
                                <FaPalette className="text-6xl text-white opacity-50 mx-auto mb-4" />
                                <p className="text-gray-300">Design Preview</p>
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={selectedDesign.image}
                              alt={selectedDesign.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              onError={() => setImageError(prev => ({ ...prev, [`design-detail-${selectedDesign.id}`]: true }))}
                            />
                          )}
                        </div>
                      </div>
                      
                      {/* Design Details */}
                      <div>
                        <p className="text-lg text-gray-400 mb-6">
                          {selectedDesign.description}
                        </p>
                        
                        <p className="text-gray-300 mb-6">
                          {selectedDesign.details}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-6">
                          {selectedDesign.tags.map((tag, index) => (
                            <span key={index} className="px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex gap-4">
                          <a 
                            href={selectedDesign.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-700 flex items-center"
                          >
                            View Full Project
                            <FaExternalLinkAlt className="ml-2" />
                          </a>
                          <button 
                            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-800 transition-all duration-700"
                            onClick={() => setSelectedDesign(null)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* NEW Photography Section - REDESIGNED AS 3-CARD CAROUSEL */}
        <section id="photography" className="py-20 px-6 bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Captured <span className="bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">Moments</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Photography is an inspiration for great design as well. It allows me to capture composition, color, and aesthetics that directly influence my UI/UX and graphic design work.
              </p>
            </div>
            
            {/* Carousel Container - Single Card with Auto-Swap */}
            <div className="relative group w-full max-w-4xl mx-auto h-[500px]">
              {/* Main Card Container */}
              <div className="absolute inset-0 bg-gray-900 rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
                
                {/* Active Photo with Key for Next.js Image Optimization */}
                <Image
                  key={photos[currentPhotoIndex].id} 
                  src={photos[currentPhotoIndex].src}
                  alt={photos[currentPhotoIndex].title}
                  fill
                  className="object-contain w-full h-full transition-opacity duration-700" // Changed to object-contain to fix zooming
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={() => setImageError(prev => ({ ...prev, [`photo-${photos[currentPhotoIndex].id}`]: true }))}
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70"></div>
                
                {/* Photo Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start justify-end z-10">
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1 animate-pulse">
                    {photos[currentPhotoIndex].category}
                  </span>
                  <h3 className="text-4xl font-bold text-white drop-shadow-md">
                    {photos[currentPhotoIndex].title}
                  </h3>
                </div>
              </div>
              
              {/* Navigation Indicators (Dots) */}
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPhotoIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPhotoIndex === idx ? 'bg-pink-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`View photo ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          
            {/* UPDATED Footer Link - POINTS TO SPECIFIC USER */}
            <div className="mt-12 text-center">
              <a 
                href="https://www.instagram.com/fanu_nti" // Specific Username Link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors border-b border-transparent hover:border-pink-400 pb-1"
              >
                <span>See more on my Instagram</span>
                <FaArrowRight className="text-sm" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Creative Contact Section */}
        <section id="contact" className="py-20 px-6 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Let's <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together.
            </p>
            
            {/* Interactive Contact Cards */}
            {/* Changed grid to accommodate 4 items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Email Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-lg p-6 h-full flex flex-col items-center justify-center transform transition-all duration-500 group-hover:scale-105">
                  <a 
                    href="mailto:fanabezabih@gmail.com"
                    className="cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                      <FaEnvelope className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <span className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      fanabezabih@gmail.com
                    </span>
                  </a>
                </div>
              </div>
              
              {/* LinkedIn Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-lg p-6 h-full flex flex-col items-center justify-center transform transition-all duration-500 group-hover:scale-105">
                  <a 
                    href="https://www.linkedin.com/in/fana-bezabih-027713326"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                      <FaLinkedin className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">LinkedIn</h3>
                    <span className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      Connect with me
                    </span>
                  </a>
                </div>
              </div>
              
              {/* GitHub Card */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-lg p-6 h-full flex flex-col items-center justify-center transform transition-all duration-500 group-hover:scale-105">
                  <a 
                    href="https://github.com/fanabezabih"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                      <FaGithub className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">GitHub</h3>
                    <span className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      Check my work
                    </span>
                  </a>
                </div>
              </div>

              {/* Behance Card - NEW */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative bg-gray-900 rounded-lg p-6 h-full flex flex-col items-center justify-center transform transition-all duration-500 group-hover:scale-105">
                  <a 
                    href="https://www.behance.net/fanabezabih" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500">
                      <FaBehance className="text-2xl text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Behance</h3>
                    <span className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      View Design
                    </span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Interactive Message Form */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold mb-6 text-center">Send me a message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input 
                        type="text" 
                        id="name" 
                        className="peer w-full bg-gray-800 border-0 border-b-2 border-gray-700 rounded-t-lg px-4 py-3 text-white  placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors"
                        placeholder="Your Name"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute left-5 -top-5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-cyan-400"
                      >
                        Your Name
                      </label>
                    </div>
                    <div className="relative">
                      <input 
                        type="email" 
                        id="email" 
                        className="peer w-full bg-gray-800 border-0 border-b-2 border-gray-700 rounded-t-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors"
                        placeholder="Your Email"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-5 -top-5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-cyan-400"
                      >
                        Your Email
                      </label>
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="subject" 
                      className="peer w-full bg-gray-800 border-0 border-b-2 border-gray-700 rounded-t-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Subject"
                    />
                    <label 
                      htmlFor="subject" 
                      className="absolute left-5 -top-5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-cyan-400"
                      >
                        Subject
                    </label>
                  </div>
                  <div className="relative">
                    <textarea 
                      id="message" 
                      rows={5} 
                      className="peer w-full bg-gray-800 border-0 border-b-2 border-gray-700 rounded-t-lg px-4 py-3 text-white placeholder-transparent focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                      placeholder="Your Message"
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className="absolute left-5 -top-5 text-sm text-gray-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-cyan-400"
                      >
                        Your Message
                    </label>
                  </div>
                  <div className="flex justify-center">
                        <a 
                    href="mailto:fanabezabih@gmail.com"
                    className="cursor-pointer"
                  >
                    <button 
                      type="submit" 
                      className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
                    >
                      Send Message
                    </button>
                    </a>
                  </div>
                </form>
              </div>
            </div>
      
            <div className="mt-20 text-center">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>

                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
           
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-8 px-6 text-center text-gray-600 border-t border-gray-900">
          <p>&copy; {new Date().getFullYear()} Fana Asmelash. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}