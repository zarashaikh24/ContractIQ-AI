import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Zap, Shield } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '95%',
      label: 'AI Contract Accuracy',
      color: 'text-success',
    },
    {
      icon: Zap,
      value: '<5s',
      label: 'Average Analysis Time',
      color: 'text-ibm-blue',
    },
    {
      icon: Sparkles,
      value: '7+',
      label: 'AI Intelligence Features',
      color: 'text-warning',
    },
    {
      icon: Shield,
      value: 'Real-Time',
      label: 'Risk Detection',
      color: 'text-info',
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <div className="glass rounded-3xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-ibm-blue/5 to-transparent" />
          
          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Powerful AI</span> Contract Intelligence
              </h2>
              <p className="text-xl text-dark-300 max-w-3xl mx-auto">
                Advanced features powered by enterprise AI for comprehensive contract analysis
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`${stat.color} mb-4 flex justify-center`}>
                    <stat.icon className="w-10 h-10" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-dark-300 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-dark-400 text-sm">
                Powered by Advanced AI • Enterprise-Grade Contract Intelligence
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;

// Made with Bob
