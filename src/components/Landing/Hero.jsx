import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Brain, Shield } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-ibm-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-ibm-blue/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-ibm-blue" />
            <span className="text-sm font-medium text-dark-200">
              AI-Powered Contract Intelligence
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            AI-Powered Contract
            <br />
            <span className="gradient-text">Analysis Platform</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-dark-300 mb-12 max-w-3xl mx-auto"
          >
            Upload contracts, detect hidden risks, understand complex clauses, and generate safer AI-powered agreements in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/upload')}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
            >
              <span>Analyze Contract</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <div className="glass px-6 py-3 rounded-full flex items-center space-x-2">
              <Brain className="w-5 h-5 text-ibm-blue" />
              <span className="text-sm font-medium">Advanced AI Engine</span>
            </div>
            <div className="glass px-6 py-3 rounded-full flex items-center space-x-2">
              <Shield className="w-5 h-5 text-success" />
              <span className="text-sm font-medium">Risk Detection</span>
            </div>
            <div className="glass px-6 py-3 rounded-full flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium">Smart Suggestions</span>
            </div>
          </motion.div>

          {/* AI Analysis Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 relative"
          >
            <div className="glass rounded-2xl p-8 shadow-2xl glow-blue">
              <div className="aspect-video bg-gradient-to-br from-dark-900 to-dark-800 rounded-xl relative overflow-hidden p-6">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-ibm-blue/5 to-transparent" />
                
                {/* Dashboard Mock Content */}
                <div className="relative z-10 h-full flex flex-col">
                  <div className="text-sm text-dark-400 mb-4 font-semibold">AI Analysis Dashboard Preview</div>
                  
                  {/* Risk Scores Row */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="glass rounded-lg p-3">
                      <div className="text-danger text-xl font-bold">45%</div>
                      <div className="text-xs text-dark-400">Legal Risk</div>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <div className="text-warning text-xl font-bold">55%</div>
                      <div className="text-xs text-dark-400">Financial</div>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <div className="text-warning text-xl font-bold">40%</div>
                      <div className="text-xs text-dark-400">Compliance</div>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <div className="text-success text-xl font-bold">68%</div>
                      <div className="text-xs text-dark-400">Safety</div>
                    </div>
                  </div>
                  
                  {/* Clause Analysis */}
                  <div className="flex-1 space-y-2">
                    <div className="glass rounded-lg p-3 border border-danger/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">Payment Terms</span>
                        <span className="text-xs text-danger">HIGH RISK</span>
                      </div>
                      <div className="text-xs text-dark-400">Excessive penalty detected</div>
                    </div>
                    <div className="glass rounded-lg p-3 border border-warning/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">Termination</span>
                        <span className="text-xs text-warning">MEDIUM</span>
                      </div>
                      <div className="text-xs text-dark-400">Notice period review needed</div>
                    </div>
                    <div className="glass rounded-lg p-3 border border-success/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white">Confidentiality</span>
                        <span className="text-xs text-success">LOW RISK</span>
                      </div>
                      <div className="text-xs text-dark-400">Standard mutual clause</div>
                    </div>
                  </div>
                  
                  {/* AI Chat Preview */}
                  <div className="mt-3 glass rounded-lg p-3 border border-ibm-blue/20">
                    <div className="text-xs text-ibm-blue mb-1">💬 Ask Your Contract AI</div>
                    <div className="text-xs text-dark-400">"What are my biggest risks?"</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -left-4 glass p-4 rounded-xl"
            >
              <div className="text-success text-2xl font-bold">95%</div>
              <div className="text-xs text-dark-400">Accuracy</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-4 -right-4 glass p-4 rounded-xl"
            >
              <div className="text-ibm-blue text-2xl font-bold">{'<5s'}</div>
              <div className="text-xs text-dark-400">Analysis Time</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-ibm-blue rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

// Made with Bob
