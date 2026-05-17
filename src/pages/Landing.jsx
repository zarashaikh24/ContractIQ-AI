import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Shield,
  Zap,
  FileText,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Upload,
  FileSearch,
  BarChart3
} from 'lucide-react';
import Navbar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import ProductFlow from '../components/Landing/ProductFlow';
import Stats from '../components/Landing/Stats';
import CTA from '../components/Landing/CTA';
import Footer from '../components/Landing/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ProductFlow />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;

// Made with Bob
