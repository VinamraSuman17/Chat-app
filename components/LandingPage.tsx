'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Features list for the landing page
  const features = [
    {
      icon: "💬",
      title: "Real-time Messaging",
      description: "Experience seamless, instant communication with friends and colleagues."
    },
    {
      icon: "👥",
      title: "Group Chats",
      description: "Create and join group conversations to collaborate effectively."
    },
    {
      icon: "🎭",
      title: "Rich Reactions",
      description: "Express yourself with a variety of emoji reactions to any message."
    },
    {
      icon: "🔔",
      title: "Status Updates",
      description: "Let others know your availability with customizable status indicators."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "ChatConnect has transformed how our team communicates. The interface is intuitive and responsive!",
      author: "Sarah J., Product Manager"
    },
    {
      quote: "I love the smooth animations and how easy it is to share reactions. Best messaging app I've used.",
      author: "Michael T., Designer"
    },
    {
      quote: "The status updates feature is a game-changer for our remote team's coordination.",
      author: "Priya R., Team Lead"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const featureVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i:number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  const chatBubbleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i:number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + (i * 0.15),
        type: "spring",
        stiffness: 260, 
        damping: 20
      }
    })
  };

  // Simulate chat bubbles for the hero section
  const chatMessages = [
    { id: 1, text: "Hey there! 👋", position: "left" },
    { id: 2, text: "Welcome to ChatConnect!", position: "right" },
    { id: 3, text: "Ready to start messaging?", position: "left" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <motion.div 
                className="text-2xl font-bold text-indigo-600 flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  💬
                </motion.span>
                <span className="ml-2">ChatConnect</span>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features" 
                className="text-gray-600 hover:text-indigo-600"
              >
                Features
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#testimonials" 
                className="text-gray-600 hover:text-indigo-600"
              >
                Testimonials
              </motion.a>
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
                >
                  Log in
                </motion.button>
              </Link>
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            >
              <span className="block">Connect and chat</span>
              <span className="block text-indigo-600">in real time</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-xl text-gray-600 max-w-lg"
            >
              ChatConnect brings your conversations to life with intuitive messaging, expressive reactions, and seamless status updates. Stay connected wherever you are.
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/signup">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Start Chatting
                  <motion.svg 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                    className="ml-2 h-5 w-5" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </motion.a>
              </Link>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#features"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Learn More
              </motion.a>
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="mt-6 flex items-center text-gray-500 text-sm"
            >
              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </motion.div>
          </motion.div>

          {/* Animated chat bubbles */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative h-96">
            <div className="absolute top-3 left-3 right-3 h-6 flex items-center justify-between">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-xs text-gray-500">ChatConnect Demo</div>
            </div>

            <div className="mt-8 space-y-4">
              {chatMessages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  custom={i}
                  variants={chatBubbleVariants}
                  initial="initial"
                  animate="animate"
                  className={`flex ${msg.position === 'right' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.position === 'right' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {animationComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 left-6 right-6"
              >
                <div className="relative rounded-lg border border-gray-300 bg-gray-50 flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="block w-full pl-3 pr-10 py-2 border-0 bg-transparent focus:ring-0 text-sm"
                    readOnly
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-indigo-600"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl font-extrabold text-gray-900"
            >
              Powerful features for better conversations
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto"
            >
              Everything you need for seamless and expressive communication.
            </motion.p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                variants={featureVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-gray-900">What our users are saying</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="text-indigo-600 mb-4">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                <p className="text-gray-900 font-medium">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-indigo-600 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-white"
          >
            Ready to transform your conversations?
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-indigo-100"
          >
            Join thousands of users already enjoying seamless communication on ChatConnect.
          </motion.p>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <Link href="/signup">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 shadow-md"
              >
                Get Started for Free
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Security</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Partners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl mr-2">💬</span>
              <span className="font-bold text-xl">ChatConnect</span>
            </div>
            <div className="mt-4 md:mt-0 text-gray-400 text-sm">
              © {new Date().getFullYear()} ChatConnect. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}