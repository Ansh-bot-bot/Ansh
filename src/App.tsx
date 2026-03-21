import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function App() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPhotoHovering, setIsPhotoHovering] = useState(false);
  const [isCardHovering, setIsCardHovering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<null | number>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Elastic ring position
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150 });
  
  // Parallax background
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });

  const projects = [
    {
      id: 1,
      title: 'LOGOFOLIO',
      category: 'Identity & Logos',
      gradient: 'linear-gradient(135deg, #1a1a1a, #2d1a1a, #3a1010)',
      image: 'https://lh3.googleusercontent.com/d/1NZesT_qTt_LkQuDR83c2PnRW1FW3zE3X',
      description: 'A collection of visual identities crafted with precision and purpose. Each logo represents a unique story, distilled into its most essential form. From minimalist marks to complex brand symbols, this folio explores the intersection of geometry and meaning.',
      gallery: ['https://lh3.googleusercontent.com/d/14rKNtuO_S9uBl7YI5rxM6ojcGGkfbqk1']
    },
    {
      id: 2,
      title: 'BRANDING',
      category: 'Brand Systems',
      gradient: 'linear-gradient(135deg, #1a1a1a, #1a1a2d, #10102a)',
      image: 'https://lh3.googleusercontent.com/d/1q1DMMwQlZl8mDKd2cjQ-jaDb2SVkCL8y',
      description: 'Comprehensive brand systems that go beyond just a logo. This project focuses on visual consistency across multiple touchpoints, including color theory, typography systems, and brand guidelines that ensure a cohesive and memorable presence.',
      gallery: ['https://lh3.googleusercontent.com/d/1uW4SEU4lr1jvBErCIxpMAwo17lKdJ5l6']
    },
    {
      id: 3,
      title: 'PACKAGING',
      category: 'Product & Print',
      gradient: 'linear-gradient(135deg, #1a1a1a, #1a2d1a, #0f2010)',
      image: 'https://lh3.googleusercontent.com/d/1YPQddgWneVo8UYLOY0aTncWzKAU-0BxK',
      description: 'Tactile experiences through physical design. Packaging that not only protects but also communicates the brand values through material choice, structure, and graphic layout. A study in how design translates from screen to physical form.',
      gallery: ['https://lh3.googleusercontent.com/d/1_UqRYlVdLDQPthfmcET06V6esSaGcHkj']
    },
    {
      id: 4,
      title: 'POSTERS',
      category: 'Print & Visual',
      gradient: 'linear-gradient(135deg, #1a1a1a, #2d2a1a, #2a1f0a)',
      image: 'https://lh3.googleusercontent.com/d/1ZUQXlI4VpIxAQIUoPSEuPwX7VUgXOqml',
      description: 'Large-scale visual communication. These posters explore bold typography, experimental layouts, and striking imagery to convey messages with maximum impact. A playground for visual exploration and graphic expression.',
      gallery: [
        'https://lh3.googleusercontent.com/d/13PTdncbf7LygEtjyYErIN9a09TlPcFlG',
        'https://lh3.googleusercontent.com/d/1PbDnakxmHGySaw6nrXlAM3U_OTk9f2u5',
        'https://lh3.googleusercontent.com/d/1Z2VPmngvVxBORgxXifKkcwXZwLw0WYdQ',
        'https://lh3.googleusercontent.com/d/1v6QFGMsi6_ryQwlL3FatMkeN3uBixKU6'
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Background parallax effect
      const moveX = (e.clientX - window.innerWidth / 2) * 0.005;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.005;
      setBgOffset({ x: moveX, y: moveY });
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Active Link Highlight Logic (Intersection Observer)
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'work', 'services', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  const handleHoverStart = () => setIsHovering(true);
  const handleHoverEnd = () => setIsHovering(false);
  
  const handlePhotoHoverStart = () => setIsPhotoHovering(true);
  const handlePhotoHoverEnd = () => setIsPhotoHovering(false);

  const handleCardHoverStart = () => setIsCardHovering(true);
  const handleCardHoverEnd = () => setIsCardHovering(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-red-900 selection:text-white">
      {/* Custom Cursor */}
      <motion.div 
        className="cursor-dot"
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div 
        className={`cursor-ring ${isHovering ? 'hover-active' : ''} ${isPhotoHovering ? 'photo-hover' : ''} ${isCardHovering ? 'card-hover' : ''}`}
        style={{ x: ringX, y: ringY }}
      />

      {/* Parallax Background */}
      <div 
        className="dot-grid" 
        style={{ transform: selectedProject === null ? `translate(${bgOffset.x}px, ${bgOffset.y}px)` : 'none' }}
      />

      {/* Navigation */}
      <nav 
        className={`px-8 py-[20px] flex justify-between items-center ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-logo-container flex items-center gap-2">
          <div className="w-[42px] h-[42px] bg-white text-black flex items-center justify-center rounded-sm font-bold text-xl">
            A
          </div>
        </div>
        <div className="flex gap-8 text-sm font-medium text-[#CCCCCC]">
          {['About', 'Work', 'Services', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : 'hover:text-white'}`}
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main id="home" className="container mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center px-8 pt-20">
        {/* Left Side: Photo */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-[35%] flex justify-center md:justify-start"
        >
          <div 
            className="relative w-full max-w-[320px] aspect-[3/4] rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden group"
            onMouseEnter={handlePhotoHoverStart}
            onMouseLeave={handlePhotoHoverEnd}
          >
            <div className="absolute inset-0 bg-[#222] flex items-center justify-center text-[#555] font-medium">
              <img 
                src="https://lh3.googleusercontent.com/d/1Rn9FYS7yCycURWcsdXB_UV24-2K2dSLG" 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="w-full md:w-[60%] mt-12 md:mt-0 md:pl-16 flex flex-col items-start">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#CCCCCC] text-xs uppercase tracking-[0.3em] font-light mb-4 pl-[9px]"
          >
            not your everyday
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-bebas text-[126px] leading-[0.85] text-white flex items-center flex-nowrap whitespace-nowrap"
          >
            P<span className="inline-block">O</span>RTF<span className="text-accent font-serif-italic inline-block translate-y-[-0.05em] scale-110 mx-1">O</span>LIO
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#CCCCCC] text-sm md:text-base max-w-md mt-6 font-light leading-relaxed pl-[9px]"
          >
            I design like no one is watching—and then make sure everyone does
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex gap-4 mt-10"
          >
            <button 
              className="btn-pill"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              GRAPHIC DESIGNER
            </button>
            <button 
              className="btn-pill"
              onMouseEnter={handleHoverStart}
              onMouseLeave={handleHoverEnd}
            >
              VISUAL ARTIST
            </button>
          </motion.div>
        </div>
      </main>

      {/* About Section */}
      <section id="about" className="container mx-auto min-h-screen flex flex-col justify-center px-8 py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-bebas text-[75.672px] leading-none text-white mb-10 w-full md:w-[701px]"
        >
          Hey<span className="text-accent inline-block ml-1 mr-3" style={{ fontFamily: 'Arial', fontSize: '98.2392px', fontStyle: 'normal', paddingLeft: '13px' }}>!</span> It's me Ansh :)
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#AAAAAA] text-base md:text-lg max-w-[900px] mb-20 font-light leading-relaxed"
        >
          A graphic design student focused on clarity, precision, and quiet impact. The work strips away the unnecessary, leaving space for ideas to stand on their own. Clean structure meets subtle tension—where small details carry weight and restraint becomes a style. Still evolving, with each project refining a sharper, more intentional visual voice.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {[
            { label: 'EDUCATION', content: ['Masters in Visual Experiential Design', '2025–2027 (ongoing)'] },
            { label: 'LANGUAGES', content: ['English', 'हिन्दी'] },
            { label: 'CONTACTS', content: [
              { icon: '✉', text: 'ashashash100100@gmail.com' },
              { icon: '📷', text: 'ansh_0_o' }
            ] }
          ].map((col, idx) => (
            <motion.div 
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx + 0.3 }}
            >
              <span className="font-bebas font-bold text-accent text-xl tracking-[0.2em] mb-6 block">{col.label}</span>
              <div className="flex flex-col gap-2">
                {col.content.map((item, i) => (
                  <div key={i} className="text-[#AAAAAA] text-sm flex items-center gap-3">
                    {typeof item === 'string' ? (
                      <span className={i === 0 ? 'text-white font-medium' : ''}>{item}</span>
                    ) : (
                      <>
                        <span className="text-white text-lg">{item.icon}</span>
                        <span>{item.text}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="font-bebas font-bold text-accent text-xl tracking-[0.2em] mb-6 block">TECHNICAL SKILLS</span>
            <div className="flex gap-4 flex-wrap">
              {[
                { name: 'Ps', color: '#31A8FF' },
                { name: 'Ai', color: '#FF9A00' },
                { name: 'Id', color: '#FF3366' },
                { name: 'Ae', color: '#9999FF' },
                { isFigma: true }
              ].map((skill, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i + 0.7 }}
                  className="w-[60px] h-[60px] bg-[#222] border border-white/10 rounded-xl flex items-center justify-center font-bold text-lg"
                  style={{ color: skill.color }}
                >
                  {skill.isFigma ? (
                    <svg width="32" height="32" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 28.5C19 23.2533 14.7467 19 9.5 19C4.2533 19 0 23.2533 0 28.5C0 33.7467 4.2533 38 9.5 38H19V28.5Z" fill="#0ACF83"/>
                      <path d="M0 9.5C0 4.2533 4.2533 0 9.5 0H19V19H9.5C4.2533 19 0 14.7467 0 9.5Z" fill="#F24E1E"/>
                      <path d="M19 0H28.5C33.7467 0 38 4.2533 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="#FF7262"/>
                      <path d="M38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5Z" fill="#1ABCFE"/>
                      <path d="M19 38H28.5C33.7467 38 38 42.2533 38 47.5C38 52.7467 33.7467 57 28.5 57C23.2533 57 19 52.7467 19 47.5V38Z" fill="#A259FF"/>
                    </svg>
                  ) : skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="font-bebas font-bold text-accent text-xl tracking-[0.2em] mb-6 block">INTERESTS</span>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 flex-wrap">
                {['Designing', 'Illustration', 'Typography'].map(tag => (
                  <button key={tag} className="btn-pill" onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>{tag}</button>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                {['Psychology', 'Problem solving'].map(tag => (
                  <button key={tag} className="btn-pill" onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>{tag}</button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="container mx-auto min-h-screen px-8 py-20">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-bebas text-accent tracking-[0.2em] text-sm block mb-2">SELECTED WORKS</span>
            <h2 className="font-bebas text-[100px] leading-none text-white">Work</h2>
            <div className="w-[60px] h-[2px] bg-accent mt-4" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#AAAAAA] font-dm text-sm"
          >
            04 Projects
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.15 }}
              className="project-card group"
              onMouseEnter={handleCardHoverStart}
              onMouseLeave={handleCardHoverEnd}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="project-thumbnail">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <div className="project-info">
                <div className="flex flex-col">
                  <span className="text-white font-dm font-semibold text-lg">{project.title}</span>
                  <span className="text-accent font-dm text-[10px] uppercase tracking-widest">{project.category}</span>
                </div>
                <div className="text-white text-2xl group-hover:rotate-45 group-hover:text-accent transition-all duration-300">↗</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Project Overlay */}
      {selectedProject !== null && (
        <motion.div 
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="overlay-container"
          onScroll={handleScroll}
        >
          <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
          
          <header className="sticky top-0 w-full z-[210] bg-[#111] px-8 py-6 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-4 text-white font-bebas text-2xl">
              <span className="cursor-pointer" onClick={() => setSelectedProject(null)}>←</span>
              <span>{projects.find(p => p.id === selectedProject)?.title}</span>
            </div>
            <button 
              className="text-white font-dm text-xs uppercase tracking-widest flex items-center gap-2"
              onClick={() => setSelectedProject(null)}
            >
              CLOSE ✕
            </button>
          </header>

          <div className="w-full">
            {/* Block 1: Intro */}
            <section className="overlay-slide flex flex-col md:flex-row items-center px-12 md:px-24 relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  src={projects.find(p => p.id === selectedProject)?.image} 
                  alt="" 
                  className="w-full h-full object-cover opacity-20 blur-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
              
              <div className="w-full md:w-1/2 z-10">
                <h3 className="font-bebas leading-none text-white mb-4" style={{ width: '100%', maxWidth: '601px', fontSize: '69px' }}>
                  {projects.find(p => p.id === selectedProject)?.title}
                </h3>
                <span className="text-accent font-dm text-sm uppercase tracking-widest" style={{ paddingLeft: '7px' }}>
                  {projects.find(p => p.id === selectedProject)?.category}
                </span>
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-12 mt-8 md:mt-0 z-10">
                <p className="text-[#CCCCCC] font-dm text-lg leading-relaxed">
                  {projects.find(p => p.id === selectedProject)?.description}
                </p>
              </div>
            </section>

            {/* Block 2: Gallery */}
            {projects.find(p => p.id === selectedProject)?.gallery && (
              <section className="px-4 md:px-0 py-20 bg-[#111]">
                <div className="max-w-screen-xl mx-auto flex flex-col gap-12">
                  {projects.find(p => p.id === selectedProject)?.gallery?.map((img, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-full flex justify-center"
                    >
                      <img 
                        src={img} 
                        alt={`Gallery ${i}`} 
                        className="w-full h-auto max-w-full rounded-lg shadow-2xl"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Block 4: Close Slide */}
            <section className="overlay-slide bg-[#1a1a1a] flex flex-col items-center justify-center gap-8">
              <h4 className="font-bebas text-6xl text-white">More Projects</h4>
              <div className="flex gap-4">
                {projects.filter(p => p.id !== selectedProject).slice(0, 2).map(p => (
                  <button 
                    key={p.id} 
                    className="btn-pill"
                    onClick={() => {
                      setSelectedProject(p.id);
                      setScrollProgress(0);
                      document.querySelector('.overlay-container')?.scrollTo(0, 0);
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
              <button 
                className="text-accent font-dm text-sm uppercase tracking-widest hover:underline"
                onClick={() => setSelectedProject(null)}
              >
                Back to Work
              </button>
            </section>
          </div>
        </motion.div>
      )}

    </div>
  );
}
