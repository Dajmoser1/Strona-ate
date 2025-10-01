import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import heroImage from '@/assets/hero-architecture.jpg';
import villaImage from '@/assets/project-villa.jpg';
import hotelImage from '@/assets/project-hotel.jpg';
import officeImage from '@/assets/project-office.jpg';

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!scrollRef.current) return;
    
    const updateHeight = () => {
      const scrollWidth = scrollRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      setContainerHeight(scrollWidth - windowWidth);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -containerHeight]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Spacer for scroll */}
      <div ref={containerRef} style={{ height: `${containerHeight + window.innerHeight}px` }} />

      {/* Horizontal container */}
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
        <motion.div
          ref={scrollRef}
          style={{ x: smoothX }}
          className="flex h-full"
        >
          {/* Hero Section */}
          <section className="min-w-screen h-screen flex items-center justify-center relative shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="text-center z-10"
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0.5"
                >
                  <circle cx="100" cy="100" r="95" />
                  <text
                    x="100"
                    y="120"
                    textAnchor="middle"
                    className="text-7xl font-serif"
                    fill="currentColor"
                    stroke="none"
                  >
                    SA
                  </text>
                </svg>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-4">Studio Arch</h1>
              <p className="text-lg md:text-xl text-muted-foreground tracking-wide">
                Contemporary Architecture & Design
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-center"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-foreground animate-pulse" />
                <p className="text-sm tracking-widest rotate-0">Scroll</p>
              </div>
            </motion.div>
          </section>

          {/* Studio Section */}
          <section className="min-w-screen h-screen flex items-center relative shrink-0">
            <div className="w-full h-full flex">
              <div className="w-1/2 h-full relative overflow-hidden">
                <motion.img
                  src={heroImage}
                  alt="Studio"
                  className="w-full h-full object-cover"
                  style={{
                    scale: useTransform(scrollYProgress, [0.1, 0.25], [1.2, 1]),
                  }}
                />
              </div>

              <div className="w-1/2 h-full flex items-center justify-center px-12 md:px-24">
                <motion.div
                  className="max-w-2xl"
                  style={{
                    opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]),
                    x: useTransform(scrollYProgress, [0.1, 0.2], [100, 0]),
                  }}
                >
                  <h2 className="text-4xl md:text-6xl font-serif mb-8">L'Agence</h2>
                  <div className="space-y-6 text-base md:text-lg leading-relaxed text-muted-foreground">
                    <p>
                      Fondée en 2018, Studio Arch développe des projets singuliers, portés par une vision affirmée de l'architecture, entre précision technique, approche durable et sensibilité esthétique.
                    </p>
                    <p>
                      Chaque projet conçu par l'atelier est unique, sur mesure, inédit. Raconter une histoire, affirmer une identité, respecter un lieu.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Project 1 - Villa */}
          <section className="min-w-screen h-screen flex items-center relative shrink-0 bg-accent">
            <div className="w-full h-full flex">
              <div className="w-3/5 h-full relative overflow-hidden">
                <motion.img
                  src={villaImage}
                  alt="SERENE Villa"
                  className="w-full h-full object-cover"
                  style={{
                    scale: useTransform(scrollYProgress, [0.3, 0.45], [1.2, 1]),
                    x: useTransform(scrollYProgress, [0.3, 0.45], ['-10%', '0%']),
                  }}
                />
              </div>

              <div className="w-2/5 h-full flex items-center justify-center px-12 md:px-16">
                <motion.div
                  style={{
                    opacity: useTransform(scrollYProgress, [0.3, 0.38], [0, 1]),
                    x: useTransform(scrollYProgress, [0.3, 0.38], [100, 0]),
                  }}
                >
                  <h3 className="text-4xl md:text-6xl font-serif mb-4">SERENE</h3>
                  <p className="text-lg md:text-xl mb-4">Construction d'une Villa</p>
                  <p className="text-muted-foreground mb-2">MALIBU</p>
                  <p className="text-sm text-muted-foreground">Surface 320m² _ 2024</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Project 2 - Hotel */}
          <section className="min-w-screen h-screen flex items-center relative shrink-0">
            <div className="w-full h-full flex">
              <div className="w-2/5 h-full flex items-center justify-center px-12 md:px-16">
                <motion.div
                  style={{
                    opacity: useTransform(scrollYProgress, [0.48, 0.56], [0, 1]),
                    x: useTransform(scrollYProgress, [0.48, 0.56], [-100, 0]),
                  }}
                >
                  <h3 className="text-4xl md:text-6xl font-serif mb-4">HAVEN</h3>
                  <p className="text-lg md:text-xl mb-4">Création d'un complexe hôtelier</p>
                  <p className="text-muted-foreground mb-2">TULUM</p>
                  <p className="text-sm text-muted-foreground">Surface 1 800m² _ 2024</p>
                </motion.div>
              </div>

              <div className="w-3/5 h-full relative overflow-hidden">
                <motion.img
                  src={hotelImage}
                  alt="HAVEN Hotel"
                  className="w-full h-full object-cover"
                  style={{
                    scale: useTransform(scrollYProgress, [0.48, 0.63], [1.2, 1]),
                    x: useTransform(scrollYProgress, [0.48, 0.63], ['10%', '0%']),
                  }}
                />
              </div>
            </div>
          </section>

          {/* Project 3 - Office */}
          <section className="min-w-screen h-screen flex items-center relative shrink-0 bg-accent">
            <div className="w-full h-full flex">
              <div className="w-3/5 h-full relative overflow-hidden">
                <motion.img
                  src={officeImage}
                  alt="NEXUS Office"
                  className="w-full h-full object-cover"
                  style={{
                    scale: useTransform(scrollYProgress, [0.66, 0.81], [1.2, 1]),
                    x: useTransform(scrollYProgress, [0.66, 0.81], ['-10%', '0%']),
                  }}
                />
              </div>

              <div className="w-2/5 h-full flex items-center justify-center px-12 md:px-16">
                <motion.div
                  style={{
                    opacity: useTransform(scrollYProgress, [0.66, 0.74], [0, 1]),
                    x: useTransform(scrollYProgress, [0.66, 0.74], [100, 0]),
                  }}
                >
                  <h3 className="text-4xl md:text-6xl font-serif mb-4">NEXUS</h3>
                  <p className="text-lg md:text-xl mb-4">Aménagement d'un espace de bureaux</p>
                  <p className="text-muted-foreground mb-2">BROOKLYN</p>
                  <p className="text-sm text-muted-foreground">Surface 680m² _ 2023</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="min-w-screen h-screen flex items-center justify-center relative shrink-0">
            <motion.div
              className="text-center max-w-4xl px-6"
              style={{
                opacity: useTransform(scrollYProgress, [0.85, 0.92], [0, 1]),
                y: useTransform(scrollYProgress, [0.85, 0.92], [50, 0]),
              }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8">Contact</h2>
              <p className="text-lg md:text-xl mb-8 text-muted-foreground">
                Pour discuter de votre projet d'architecture
              </p>
              <a
                href="mailto:contact@studioarch.com"
                className="text-xl md:text-2xl hover:text-muted-foreground transition-smooth inline-block relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                contact@studioarch.com
              </a>
              
              <div className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground">
                Studio Arch © 2024 | Tous droits réservés
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </>
  );
};

export default HorizontalScroll;
