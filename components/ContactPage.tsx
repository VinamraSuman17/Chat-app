"use client"
import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('initial');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleSubmit = () => {
    if (name && email && subject && message && privacyChecked) {
      setFormStatus('submitting');
      
      // Simulate form submission
      setTimeout(() => {
        setFormStatus('success');
      }, 1500);
    }
  };
  
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Info */}
        <motion.div variants={itemVariants}>
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 h-full"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div className="flex items-center mb-8">
              <motion.div 
                className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  Contact Us
                </h1>
                <p className="text-gray-500 text-lg mt-1">
                  We&apos;d love to hear from you
                </p>
              </div>
            </motion.div>
            
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
              Have questions or need support? Reach out to us at support@chatconnect.com or use the form.
            </p>
            
            <div className="mt-10 space-y-6">
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@chatconnect.com</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600">123 Tech Plaza, San Francisco, CA</p>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-10 flex space-x-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                whileHover={{ y: -3, backgroundColor: "#3b82f6", color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                whileHover={{ y: -3, backgroundColor: "#3b82f6", color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.008 10.008 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                whileHover={{ y: -3, backgroundColor: "#3b82f6", color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                whileHover={{ y: -3, backgroundColor: "#3b82f6", color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right Column - Contact Form */}
        <motion.div variants={itemVariants}>
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a message</h2>
            
            {formStatus === 'success' ? (
              <motion.div 
                className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
                <motion.button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormStatus('initial')}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <motion.div
                  variants={itemVariants}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your name"
                    whileFocus={{ scale: 1.01 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your email"
                    whileFocus={{ scale: 1.01 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <motion.select
                    id="subject"
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    whileFocus={{ scale: 1.01 }}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                  </motion.select>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    rows={5}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your message"
                    whileFocus={{ scale: 1.01 }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></motion.textarea>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                  className="flex items-center"
                >
                  <input
                    id="privacy"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={privacyChecked}
                    onChange={(e) => setPrivacyChecked(e.target.checked)}
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">privacy policy</a>
                  </label>
                </motion.div>
                
                <motion.div
                  variants={itemVariants}
                >
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'submitting'}
                    onClick={handleSubmit}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}