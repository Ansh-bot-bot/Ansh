import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useScroll, useTransform } from 'motion/react';
import { DottedWave } from './components/DottedWave';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<null | number>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'photo' | 'card' | 'text' | 'send' | 'social' | 'arrow'>('default');
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [isSent, setIsSent] = useState(false);
  
  // Cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Elastic ring position
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150 });
  
  // Parallax background
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollParallax = useTransform(scrollY, [0, 3000], [0, -150]);
  
  // Combine mouse and scroll parallax
  const finalBgX = useSpring(bgX, { damping: 30, stiffness: 200 });
  const finalBgY = useSpring(useTransform([bgY, scrollParallax], ([y, s]) => (y as number) + (s as number)), { damping: 30, stiffness: 200 });

  const projects = [
    {
      id: 1,
      title: 'LOGOFOLIO',
      category: 'Identity & Logos',
      gradient: 'linear-gradient(135deg, #1a1a1a, #2d1a1a, #3a1010)',
      image: 'https://lh3.googleusercontent.com/d/1JPhLNJIBuMw_Mmvwba9vMBmEnWFhAw2e',
      description: 'A collection of visual identities crafted with precision and purpose. Each logo represents a unique story, distilled into its most essential form. From minimalist marks to complex brand symbols, this folio explores the intersection of geometry and meaning.',
      gallery: ['https://lh3.googleusercontent.com/d/14rKNtuO_S9uBl7YI5rxM6ojcGGkfbqk1']
    },
    {
      id: 2,
      title: 'BRANDING',
      category: 'Brand Systems',
      gradient: 'linear-gradient(135deg, #1a1a1a, #1a1a2d, #10102a)',
      image: 'https://lh3.googleusercontent.com/d/16LSdIUSdoxqkqaS932ETpW1zTFqEXZnJ',
      description: 'Comprehensive brand systems that go beyond just a logo. This project focuses on visual consistency across multiple touchpoints, including color theory, typography systems, and brand guidelines that ensure a cohesive and memorable presence.',
      gallery: [
        'https://lh3.googleusercontent.com/d/16LSdIUSdoxqkqaS932ETpW1zTFqEXZnJ',
        'https://lh3.googleusercontent.com/d/1YAQdNkkevR1oIuuFHhXr3-w6aKBvNz7l',
        'https://lh3.googleusercontent.com/d/1c23dfyJkuY3E4dXYnzyU3AwFRIHWahlG',
        'https://lh3.googleusercontent.com/d/1hysW53Aj4skh1l5DxBTHzyH1h_UYvjP0',
        'https://lh3.googleusercontent.com/d/1bJkYoQs_k-nnFBolO3GBoY_2MasVzpgg',
        'https://lh3.googleusercontent.com/d/1NdW8_Fej16Nr8WdwUKWP96fCsgNHQ7ry',
        'https://lh3.googleusercontent.com/d/1VLOUGMplQSZbiPmoVCVLSn6_4Jz58hww',
        'https://lh3.googleusercontent.com/d/1GSd_06WWDkTuaiBuIP4TvxMpjE5cQB33',
        'https://lh3.googleusercontent.com/d/1d0wOXwnIjuV_LGZG7gQNXE9DPItkmzJe',
        'https://lh3.googleusercontent.com/d/1FTo18eXpyX1-_vkKVqbx29i2I6ZrusbM',
        'https://lh3.googleusercontent.com/d/1pIYbor-6R2AEh2XHGBuD8iRyeTBl-CZy'
      ]
    },
    {
      id: 3,
      title: 'PACKAGING',
      category: 'Product & Print',
      gradient: 'linear-gradient(135deg, #1a1a1a, #1a2d1a, #0f2010)',
      image: 'https://lh3.googleusercontent.com/d/1xKBVZvfrVXsp1PFmpJwHtb6aSPg7L13Z',
      description: 'Tactile experiences through physical design. Packaging that not only protects but also communicates the brand values through material choice, structure, and graphic layout. A study in how design translates from screen to physical form.',
      gallery: [
        'https://lh3.googleusercontent.com/d/1xKBVZvfrVXsp1PFmpJwHtb6aSPg7L13Z',
        'https://lh3.googleusercontent.com/d/1QleWoaSuQmNA0f9ELNHANHf2YxkgEa1x',
        'https://lh3.googleusercontent.com/d/1qYylRQx-toBscdl6k0n4uTTKTa3jJZ-k',
        'https://lh3.googleusercontent.com/d/1JAwrwQOubbVkTfhj9zksX9_TFGxn6s6p',
        'https://lh3.googleusercontent.com/d/1SZt_o0_w45X5x5gw1_FzLVux1sn-jphE',
        'https://lh3.googleusercontent.com/d/1p0R3q6xV5dHpcxuW1tRyB4Ash_OpC7Xv',
        'https://lh3.googleusercontent.com/d/1iKUjf9s0i38wkLsYIEqUNz-kQBKATR61',
        'https://lh3.googleusercontent.com/d/1XoM6gI3_ckghBaE0ErLIkcJ1HRYKDd1d',
        'https://lh3.googleusercontent.com/d/1w_c2f7xhwyth0F34dQBhpIfE5LRD9HGb',
        'https://lh3.googleusercontent.com/d/1-8ioMZwPiTgowPTHdDCyG51G3SOmbg43',
        'https://lh3.googleusercontent.com/d/1c-z9FHYZ_kDvzsbSIfOrzgt47d8wcpcP',
        'https://lh3.googleusercontent.com/d/1aeK9nDMJSpkktNGvZ1PYxJfU7afjnwm9'
      ]
    },
    {
      id: 4,
      title: 'POSTERS',
      category: 'Print & Visual',
      gradient: 'linear-gradient(135deg, #1a1a1a, #2d2a1a, #2a1f0a)',
      image: 'https://lh3.googleusercontent.com/d/1TMfIt1Rg2WX7L5yuE0fJSUS7ojoMhkav',
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
      bgX.set((e.clientX - window.innerWidth / 2) * 0.05);
      bgY.set((e.clientY - window.innerHeight / 2) * 0.05);
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

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-red-900 selection:text-white">
      {/* Custom Cursor */}
      <motion.div 
        className="cursor-dot"
        style={{ x: mouseX, y: mouseY }}
      />
      <motion.div 
        className={`cursor-ring ${cursorType !== 'default' ? 'active' : ''} cursor-${cursorType}`}
        style={{ x: ringX, y: ringY }}
      >
        {cursorType === 'arrow' && <span className="text-white text-sm font-bold">↗</span>}
        {cursorType === 'send' && <span className="text-white text-[10px] font-bold tracking-widest">SEND</span>}
      </motion.div>

      {/* Parallax Background */}
      <DottedWave 
        mouseX={mouseX} 
        mouseY={mouseY} 
        scrollY={scrollY} 
        opacity={selectedProject === null ? 1 : 0}
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
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
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
          className="w-full md:w-[35%] flex justify-center md:justify-start pl-[27px] pb-0 ml-0"
        >
          <div 
            className="relative w-full max-w-[320px] aspect-[3/4] rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden group"
            onMouseEnter={() => setCursorType('photo')}
            onMouseLeave={() => setCursorType('default')}
          >
            <div className="absolute inset-0 bg-[#222] flex items-center justify-center text-[#555] font-medium">
              <img 
                src="https://lh3.googleusercontent.com/d/1Rn9FYS7yCycURWcsdXB_UV24-2K2dSLG" 
                alt="Portrait" 
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </motion.div>

        {/* Right Side: Content */}
        <div className="w-full md:w-[60%] mt-12 md:mt-0 md:pl-6 flex flex-col items-start">
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
            className="font-bebas text-[124px] leading-[0.85] text-white flex items-center flex-nowrap whitespace-nowrap w-[743.6px] pr-0"
          >
            P<span className="inline-block">O</span>RTF<span className="text-accent font-serif-italic inline-block translate-y-[-0.02em] scale-125 ml-0 mr-4">O</span>LIO
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
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
            >
              GRAPHIC DESIGNER
            </button>
            <button 
              className="btn-pill"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
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
          className="text-[#AAAAAA] text-base md:text-lg w-[1100px] max-w-none mb-20 font-light leading-[29.25px]"
        >
          I’m a designer who lives for the "aha!" moment when a messy idea finally clicks into place. My process is a mix of strategic thinking and the frantic energy of someone whose creative software just crashed for the third time today. I take my work seriously, but I’m not above naming my files FINAL_FINAL_PROMISE.pdf while I quest for the perfect layout. I’m here to make things look good, work better, and maybe survive the next deadline.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {[
            { label: 'EDUCATION', content: ['Masters in Visual Experiential Design (UID)', '2025–2027 (ongoing)'] },
            { label: 'LANGUAGES', content: ['English', 'हिन्दी'] },
            { label: 'CONTACTS', content: [
              { icon: '✉', text: 'ashashash100100@gmail.com' },
              { icon: 'https://lh3.googleusercontent.com/d/1xsSo6J3xr3rhcB0puapz-mjRHDBQzVyf', text: 'ansh_o_0', isImage: true }
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
                        {item.isImage ? (
                          <img src={item.icon} alt="icon" className="w-5 h-5 object-contain" />
                        ) : (
                          <span className="text-white text-lg">{item.icon}</span>
                        )}
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
                { icon: 'https://lh3.googleusercontent.com/d/1Ds9-MGj8vDAiHWA7uS5b852sH_2IavrI', isImage: true }
              ].map((skill, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i + 0.7 }}
                  className="w-[60px] h-[60px] bg-[#222] border border-white/10 rounded-xl flex items-center justify-center font-bold text-lg overflow-hidden"
                  style={{ color: skill.color }}
                >
                  {skill.isImage ? (
                    <img src={skill.icon} alt="skill" className="w-8 h-8 object-contain" />
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
                  <button key={tag} className="btn-pill" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>{tag}</button>
                ))}
              </div>
              <div className="flex gap-3 flex-wrap">
                {['Psychology', 'Problem solving'].map(tag => (
                  <button key={tag} className="btn-pill" onMouseEnter={() => setCursorType('hover')} onMouseLeave={() => setCursorType('default')}>{tag}</button>
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
              onMouseEnter={() => setCursorType('card')}
              onMouseLeave={() => setCursorType('default')}
              onClick={() => setSelectedProject(project.id)}
            >
              <div className="project-thumbnail">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: project.title === 'LOGOFOLIO' ? 'center 30%' : 'center' }}
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

      {/* Contact Section */}
      <section id="contact" className="container mx-auto min-h-screen flex flex-col md:flex-row items-center justify-center px-8 py-20 gap-16">
        {/* Left Half */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent uppercase mb-4"
            style={{ fontFamily: 'Arial', fontSize: '14px', letterSpacing: '0.25em' }}
          >
            GET IN TOUCH
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-bebas text-[90px] leading-[0.9] text-white mb-6"
          >
            Let's make<br />
            something<br />
            <span className="text-accent lowercase ml-2" style={{ fontFamily: 'Times New Roman', fontWeight: 'normal', fontStyle: 'italic', fontSize: '96.5px', textDecorationLine: 'none', textAlign: 'left', lineHeight: '46.95px' }}>great</span><span className="text-accent">.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#AAAAAA] text-base max-w-[380px] mb-12 font-light leading-relaxed"
            style={{ paddingTop: '15px' }}
          >
            Open to freelance projects, collaborations, and conversations.
          </motion.p>

          <div className="w-full max-w-[450px] flex flex-col">
            {[
              { label: 'BEHANCE', value: 'Ansh Raj — Graphic Designer', link: 'https://www.behance.net/anshvanshraj' },
              { label: 'INSTAGRAM', value: '@ansh_o_0', link: 'https://instagram.com/ansh_o_0' },
              { label: 'MAIL', value: 'ashashash100100@gmail.com', link: 'mailto:ashashash100100@gmail.com' },
              { label: 'MAIL', value: 'anshvanshraj2017@gmail.com', link: 'mailto:anshvanshraj2017@gmail.com' }
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                onMouseEnter={() => setCursorType('arrow')}
                onMouseLeave={() => setCursorType('default')}
                className="group flex items-center py-5 border-b border-white/10 transition-all duration-300 hover:bg-white/5 hover:px-4 relative overflow-hidden"
              >
                <span className="w-[110px] font-bold text-[11px] text-accent tracking-[0.2em] uppercase">{item.label}</span>
                <span className="text-white text-base transition-colors group-hover:text-accent">{item.value}</span>
                <span className="absolute right-4 text-accent text-xl opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">↗</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right Half: Form */}
        <div className="w-full md:w-1/2 md:pl-12">
          <div className="flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col"
            >
              <label className="font-bebas text-accent text-[13px] tracking-[0.15em] mb-2">YOUR NAME</label>
              <input 
                type="text" 
                placeholder="Ansh Raj"
                onMouseEnter={() => setCursorType('text')}
                onMouseLeave={() => setCursorType('default')}
                className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col"
            >
              <label className="font-bebas text-accent text-[13px] tracking-[0.15em] mb-2">YOUR EMAIL</label>
              <input 
                type="email" 
                placeholder="hello@email.com"
                onMouseEnter={() => setCursorType('text')}
                onMouseLeave={() => setCursorType('default')}
                className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col"
            >
              <label className="font-bebas text-accent text-[13px] tracking-[0.15em] mb-4">PROJECT TYPE</label>
              <div className="flex flex-wrap gap-3">
                {['Branding', 'Logo Design', 'Packaging', 'Poster', 'Other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPills(prev => 
                        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                      );
                    }}
                    onMouseEnter={() => setCursorType('hover')}
                    onMouseLeave={() => setCursorType('default')}
                    className={`px-5 py-2 rounded-full text-[13px] border transition-all duration-300 ${
                      selectedPills.includes(type) 
                        ? 'bg-accent border-accent text-white' 
                        : 'bg-[#222] border-white/10 text-white hover:border-accent'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex flex-col"
            >
              <label className="font-bebas text-accent text-[13px] tracking-[0.15em] mb-2">YOUR MESSAGE</label>
              <textarea 
                placeholder="Tell me about your project..."
                rows={4}
                onMouseEnter={() => setCursorType('text')}
                onMouseLeave={() => setCursorType('default')}
                className="bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-accent transition-colors placeholder:text-white/20 resize-none"
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              onMouseEnter={() => setCursorType('send')}
              onMouseLeave={() => setCursorType('default')}
              onClick={() => {
                setIsSent(true);
                setTimeout(() => setIsSent(false), 2000);
              }}
              className="w-full h-[56px] bg-accent text-white font-bebas text-lg tracking-[0.15em] rounded-lg relative overflow-hidden group transition-colors hover:bg-[#ff2800]"
            >
              <span className="relative z-10">{isSent ? 'SENT ✓' : 'SEND MESSAGE'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-6 px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#AAAAAA] text-[12px]"
        >
          © 2025 Ansh Raj. All rights reserved.
        </motion.div>

        <div className="flex gap-8">
          {[
            { icon: 'https://www.vectorlogo.zone/logos/behance/behance-icon.svg', link: 'https://www.behance.net/anshvanshraj' },
            { icon: 'https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg', link: 'https://instagram.com/ansh_o_0' },
            { icon: 'https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg', link: 'mailto:ashashash100100@gmail.com' }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setCursorType('social')}
              onMouseLeave={() => setCursorType('default')}
              className="w-5 h-5 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-125"
            >
              <img src={social.icon} alt="social" className="w-full h-full object-contain invert" />
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#AAAAAA] text-[12px]"
        >
          Designed & built by Ansh Raj
        </motion.div>
      </footer>

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
                <div className="max-w-screen-xl mx-auto flex flex-col gap-0">
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
                        className="w-full h-auto max-w-full"
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
