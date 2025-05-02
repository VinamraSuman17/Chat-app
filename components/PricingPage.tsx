'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    {
      name: 'Free',
      description: 'Basic features for individuals getting started',
      price: { monthly: 0, yearly: 0 },
      features: [
        '5 conversations per day',
        'Basic messaging features',
        'Limited history (7 days)',
        'Standard support',
      ],
      popular: false,
      buttonText: 'Start for Free',
      buttonColor: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
    },
    {
      name: 'Pro',
      description: 'Everything you need for professional communication',
      price: { monthly: 9.99, yearly: 99.99 },
      features: [
        'Unlimited conversations',
        'Advanced messaging features',
        'Full history access',
        'Priority support',
        'Custom status messages',
        'Read receipts',
      ],
      popular: true,
      buttonText: 'Get Pro',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    {
      name: 'Team',
      description: 'For teams and organizations',
      price: { monthly: 19.99, yearly: 199.99 },
      features: [
        'Everything in Pro',
        'Team management dashboard',
        'Unlimited team members',
        'Admin controls',
        'Channel creation',
        'Analytics and reporting',
        'API access',
      ],
      popular: false,
      buttonText: 'Get Team',
      buttonColor: 'bg-gray-800 hover:bg-gray-900 text-white',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Simple, transparent pricing
        </motion.h1>
        <motion.p 
          className="mt-5 max-w-xl mx-auto text-xl text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Choose the perfect plan for your communication needs.
        </motion.p>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative flex items-center p-1 rounded-full bg-gray-100">
            <button
              className={`relative w-32 rounded-full py-2 text-sm font-medium transition-colors duration-300 ${
                !isYearly ? 'text-white' : 'text-gray-700'
              }`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
              {!isYearly && (
                <motion.div
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  layoutId="pricingTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
            <button
              className={`relative w-32 rounded-full py-2 text-sm font-medium transition-colors duration-300 ${
                isYearly ? 'text-white' : 'text-gray-700'
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly
              {isYearly && (
                <motion.div
                  className="absolute inset-0 bg-indigo-600 rounded-full"
                  layoutId="pricingTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
            </button>
          </div>
        </motion.div>
        
        {isYearly && (
          <motion.div 
            className="mt-3 text-sm text-indigo-600 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            Save 16% with yearly billing
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            className={`rounded-lg shadow-lg overflow-hidden ${
              plan.popular ? 'border-2 border-indigo-500 transform scale-105 z-10' : 'border border-gray-200'
            }`}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            {plan.popular && (
              <motion.div 
                className="bg-indigo-500 text-white text-center py-1 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                Most Popular
              </motion.div>
            )}
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">{plan.name}</h2>
              <p className="mt-2 text-gray-500 h-12">{plan.description}</p>
              
              <div className="mt-4 flex items-baseline">
                <motion.span 
                  className="text-4xl font-extrabold text-gray-900"
                  key={isYearly ? `yearly-${plan.name}` : `monthly-${plan.name}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${isYearly ? plan.price.yearly : plan.price.monthly}
                </motion.span>
                <span className="ml-1 text-gray-500">
                  {plan.price.monthly > 0 ? `/${isYearly ? 'year' : 'month'}` : ''}
                </span>
              </div>
              
              <motion.ul 
                className="mt-6 space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.3 + index * 0.1,
                    }
                  }
                }}
              >
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start"
                    variants={featureVariants}
                  >
                    <svg 
                      className="h-5 w-5 text-green-500 mt-0.5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    <span className="ml-2 text-gray-600">{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
              
              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className={`w-full rounded-md py-3 px-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm ${plan.buttonColor}`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900">Need custom features?</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Contact our sales team for enterprise solutions, custom integrations, and dedicated support.
        </p>
        <motion.div 
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
          >
            Contact Sales
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}