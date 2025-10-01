import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const MinimalNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Accueil', scrollTo: 0 },
    { label: 'L\'Agence', scrollTo: window.innerHeight * 1.2 },
    { label: 'Projets', scrollTo: window.innerHeight * 2.4 },
    { label: 'Contact', scrollTo: window.innerHeight * 5.5 },
  ];

  const scrollToSection = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
    setIsOpen(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-md' : ''
        }`}
      >
        <div className="flex items-center justify-between p-6 md:p-8">
          <button
            onClick={() => scrollToSection(0)}
            className="text-xl md:text-2xl font-serif hover:text-muted-foreground transition-smooth"
          >
            Studio Arch
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-12 w-12 hover:bg-transparent"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background"
          >
            <div className="flex h-full items-center justify-center">
              <nav className="space-y-6 md:space-y-8 text-center">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.scrollTo)}
                      className="block text-3xl md:text-5xl lg:text-6xl font-serif hover:text-muted-foreground transition-smooth"
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MinimalNavigation;
