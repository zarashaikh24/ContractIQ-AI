import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, BarChart3, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Contract',
      description: 'Upload your contract file (PDF, DOCX) or paste the text directly into our platform.',
      color: 'text-ibm-blue',
      bgColor: 'bg-ibm-blue/10',
      step: '01',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our AI engine analyzes your contract using advanced NLP and machine learning algorithms.',
      color: 'text-info',
      bgColor: 'bg-info/10',
      step: '02',
    },
    {
      icon: BarChart3,
      title: 'Review Results',
      description: 'Get comprehensive insights including risk scores, risky clauses, and detailed analysis.',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      step: '03',
    },
    {
      icon: CheckCircle,
      title: 'Take Action',
      description: 'Use AI-generated suggestions to improve your contract and make informed decisions.',
      color: 'text-success',
      bgColor: 'bg-success/10',
      step: '04',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden bg-dark-900/50">
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
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ibm-blue/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="card text-center group hover:scale-105 transition-transform duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-ibm rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`${step.bgColor} ${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-dark-300 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-ibm-blue"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-dark-200 text-lg mb-4">
              <span className="text-ibm-blue font-semibold">Average analysis time:</span> Less than 5 seconds
            </p>
            <p className="text-dark-400">
              Our AI processes thousands of contracts daily, continuously improving accuracy and insights
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

// Made with Bob
