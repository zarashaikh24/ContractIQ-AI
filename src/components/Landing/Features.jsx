import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, Zap, FileSearch, TrendingUp, Sparkles } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced NLP technology to understand complex contract language and extract key insights automatically.',
      color: 'text-ibm-blue',
      bgColor: 'bg-ibm-blue/10',
    },
    {
      icon: Shield,
      title: 'Risk Detection',
      description: 'Automatically identify risky clauses, unfavorable terms, and potential legal issues in your contracts.',
      color: 'text-danger',
      bgColor: 'bg-danger/10',
    },
    {
      icon: Sparkles,
      title: 'Smart Suggestions',
      description: 'Get AI-generated recommendations for safer, more balanced contract clauses and terms.',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      icon: FileSearch,
      title: 'Instant Summary',
      description: 'Receive comprehensive contract summaries highlighting key terms, obligations, and deadlines.',
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
    {
      icon: TrendingUp,
      title: 'Risk Scoring',
      description: 'Visual risk assessment with detailed scoring to help you make informed decisions quickly.',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Analyze contracts in seconds, not hours. Get instant results powered by enterprise-grade AI infrastructure.',
      color: 'text-ibm-blue-400',
      bgColor: 'bg-ibm-blue-400/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="gradient-text"> Contract Analysis</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Everything you need to analyze, understand, and improve your contracts with AI
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-hover group"
            >
              <div className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-dark-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="glass rounded-2xl p-8 inline-block">
            <p className="text-dark-300 mb-4">
              Powered by <span className="text-ibm-blue font-semibold">Enterprise AI</span> and{' '}
              <span className="text-ibm-blue font-semibold">Advanced NLP</span>
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-dark-400">Real-time AI Processing</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-ibm-blue/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-ibm-blue/5 rounded-full blur-3xl -translate-y-1/2" />
    </section>
  );
};

export default Features;

// Made with Bob
