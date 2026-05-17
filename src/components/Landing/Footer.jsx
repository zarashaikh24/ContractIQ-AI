import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
    ],
    project: [
      { name: 'About ContractIQ AI', href: '#about' },
      { name: 'Documentation', href: '#docs' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-dark-900/50">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2 mb-4"
            >
              <Sparkles className="w-8 h-8 text-ibm-blue" />
              <div>
                <h3 className="text-xl font-bold gradient-text">ContractIQ AI</h3>
                <p className="text-xs text-dark-400">AI Contract Intelligence</p>
              </div>
            </motion.div>
            <p className="text-dark-300 mb-6 max-w-sm">
              AI-powered contract analysis platform helping legal professionals make
              smarter, faster decisions.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-dark-300 hover:text-ibm-blue transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-dark-300 hover:text-ibm-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Project Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Project</h4>
            <ul className="space-y-2">
              {footerLinks.project.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-dark-300 hover:text-ibm-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    className="text-dark-300 hover:text-ibm-blue transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-400 text-sm text-center md:text-left">
              © {currentYear} ContractIQ AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-dark-400">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-danger"
              >
                ♥
              </motion.span>
              <span>for smarter contracts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Made with Bob
