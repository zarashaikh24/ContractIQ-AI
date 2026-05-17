import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'features', 'how-it-works', 'about'];
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'About', id: 'about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-ibm-blue" />
              <div className="absolute inset-0 blur-xl bg-ibm-blue/30 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">ContractIQ AI</h1>
              <p className="text-xs text-dark-400">Powered by IBM Watson</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-dark-200 hover:text-white transition-colors duration-200 font-medium relative ${
                  activeSection === link.id ? 'text-white' : ''
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-ibm-blue"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/upload')}
              className="btn-primary"
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass rounded-lg mt-2 p-4 space-y-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className={`block text-dark-200 hover:text-white transition-colors duration-200 font-medium py-2 w-full text-left ${
                  activeSection === link.id ? 'text-white' : ''
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/upload');
              }}
              className="btn-primary w-full"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;

// Made with Bob
