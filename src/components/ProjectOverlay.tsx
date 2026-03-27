import React, { useRef, useState } from 'react';
import { motion, useScroll } from 'motion/react';
import { DottedWave } from './DottedWave';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  gallery?: string[];
}

interface ProjectOverlayProps {
  project: Project;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (id: number) => void;
  mouseX: any;
  mouseY: any;
}

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ 
  project, 
  projects, 
  onClose, 
  onSelectProject,
  mouseX,
  mouseY
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY: overlayScrollY } = useScroll({ container: overlayRef });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setScrollProgress(progress);
  };

  return (
    <motion.div 
      ref={overlayRef}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      exit={{ clipPath: 'inset(100% 0 0 0)' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="overlay-container"
      onScroll={handleScroll}
    >
      <DottedWave 
        mouseX={mouseX} 
        mouseY={mouseY} 
        scrollY={overlayScrollY} 
        opacity={0.4}
        className="fixed inset-0 pointer-events-none z-[201]"
      />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      
      <header className="sticky top-0 w-full z-[210] bg-[#111] px-8 py-6 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-4 text-white font-bebas text-2xl">
          <span className="cursor-pointer" onClick={onClose}>←</span>
          <span>{project.title}</span>
        </div>
        <button 
          className="text-white font-dm text-xs uppercase tracking-widest flex items-center gap-2"
          onClick={onClose}
        >
          CLOSE ✕
        </button>
      </header>

      <div className="w-full">
        {/* Block 1: Intro */}
        <section className="overlay-slide flex flex-col md:flex-row items-center px-12 md:px-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={project.image} 
              alt="" 
              className="w-full h-full object-cover opacity-20 blur-sm"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="w-full md:w-1/2 z-10">
            <h3 className="font-bebas leading-none text-white mb-4" style={{ width: '100%', maxWidth: '601px', fontSize: '69px' }}>
              {project.title}
            </h3>
            <span className="text-accent font-dm text-sm uppercase tracking-widest" style={{ paddingLeft: '7px' }}>
              {project.category}
            </span>
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-12 mt-8 md:mt-0 z-10">
            <p className="text-[#CCCCCC] font-dm text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        {/* Block 2: Gallery */}
        {project.gallery && (
          <section className="px-4 md:px-0 py-20 bg-[#111]">
            <div className="max-w-screen-xl mx-auto flex flex-col gap-0">
              {project.gallery.map((img, i) => (
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
            {projects.filter(p => p.id !== project.id).slice(0, 2).map(p => (
              <button 
                key={p.id} 
                className="btn-pill"
                onClick={() => {
                  onSelectProject(p.id);
                  overlayRef.current?.scrollTo(0, 0);
                }}
              >
                {p.title}
              </button>
            ))}
          </div>
          <button 
            className="text-accent font-dm text-sm uppercase tracking-widest hover:underline"
            onClick={onClose}
          >
            Back to Work
          </button>
        </section>
      </div>
    </motion.div>
  );
};
