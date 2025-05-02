"use client"
import { motion } from "framer-motion";
import { useState } from "react";

export default function AboutPage() {
  const [isHovered, setIsHovered] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.5 
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
  
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }
  };
  
  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        variants={itemVariants}
        initial="initial"
        whileHover="hover"
        animate={isHovered ? "hover" : "initial"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        variants={cardVariants}
      >
        <motion.div 
          className="flex items-center mb-8"
          variants={itemVariants}
        >
          <motion.div 
            className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-6"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
          <div>
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              About ChatConnect
            </motion.h1>
            <motion.p 
              className="text-gray-500 text-lg mt-1"
              variants={itemVariants}
            >
              Bringing people together since 2023
            </motion.p>
          </div>
        </motion.div>
        
        <motion.p 
          className="mt-6 text-gray-600 text-lg leading-relaxed"
          variants={itemVariants}
        >
          ChatConnect was created to make communication simple, fun, and engaging. Our mission is to bring people closer together through intuitive and feature-rich messaging.
        </motion.p>
        
        <motion.p 
          className="mt-6 text-gray-600 text-lg leading-relaxed"
          variants={itemVariants}
        >
          Founded in 2023, we're a team passionate about building tools that empower connection and collaboration.
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Our Vision",
            description: "We envision a world where distance is no barrier to meaningful connection.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )
          },
          {
            title: "Our Team",
            description: "A diverse group of innovators committed to excellence in every feature we build.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          },
          {
            title: "Our Values",
            description: "Privacy, simplicity, and joy guide everything we do at ChatConnect.",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            )
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg"
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <motion.div 
              className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4"
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="mt-16 text-center"
        variants={itemVariants}
      >
        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Join Our Journey
        </motion.button>
      </motion.div>
    </motion.div>
  );
}