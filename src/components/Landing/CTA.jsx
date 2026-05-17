import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Main CTA Card */}
          <div className="glass rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-ibm-blue/10 via-transparent to-ibm-blue/5" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 left-1/4 w-64 h-64 bg-ibm-blue/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-0 right-1/4 w-64 h-64 bg-ibm-blue/20 rounded-full blur-3xl"
            />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-ibm-blue" />
                <span className="text-sm font-medium text-dark-200">
                  Start Analyzing Today
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Transform Your
                <br />
                <span className="gradient-text">Contract Analysis?</span>
              </h2>

              <p className="text-xl text-dark-300 mb-10 max-w-2xl mx-auto">
                Start analyzing your contracts with AI-powered intelligence in seconds.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/upload')}
                  className="btn-primary text-lg px-10 py-4 flex items-center space-x-2 group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-dark-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>No signup required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Instant analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>100% secure</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;

// Made with Bob
