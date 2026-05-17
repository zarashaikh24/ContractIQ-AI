import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Shield, CheckCircle, MessageCircle, Sparkles, ArrowDown } from 'lucide-react';

const ProductFlow = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Contract',
      description: 'PDF, DOCX, or paste text',
      color: 'text-ibm-blue',
      bgColor: 'bg-ibm-blue/10'
    },
    {
      icon: Shield,
      title: 'AI Risk Detection',
      description: 'Analyze clauses & risks',
      color: 'text-danger',
      bgColor: 'bg-danger/10'
    },
    {
      icon: CheckCircle,
      title: 'Compliance Check',
      description: 'Validate legal standards',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: MessageCircle,
      title: 'Ask AI About Contract',
      description: 'Get instant answers',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: Sparkles,
      title: 'Generate Safer Contract',
      description: 'AI-improved version',
      color: 'text-info',
      bgColor: 'bg-info/10'
    }
  ];

  return (
    <section id="how-it-works" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="gradient-text">ContractIQ AI</span> Works
          </h2>
          <p className="text-xl text-dark-300 max-w-3xl mx-auto">
            Simple, fast, and intelligent contract analysis in 5 easy steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 mb-6"
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 ${step.bgColor} rounded-xl flex items-center justify-center relative`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-dark-800 rounded-full flex items-center justify-center border-2 border-ibm-blue">
                      <span className="text-xs font-bold text-ibm-blue">{index + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 glass rounded-xl p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-dark-300">{step.description}</p>
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  className="flex justify-center mb-6"
                >
                  <ArrowDown className="w-6 h-6 text-ibm-blue/50" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFlow;

// Made with Bob