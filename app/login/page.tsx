'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);
    
    // Simulate API call
    try {
      // Replace with your actual login logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard or messages page on success
      window.location.href = '/messages';
    } catch (error) {
      // Using the error parameter instead of underscore to fix the ESLint error
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <Link href="/" className="inline-flex items-center text-2xl font-bold text-indigo-600">
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            💬
          </motion.span>
          <span className="ml-2">ChatConnect</span>
        </Link>
      </motion.div>

      {/* Login Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold text-gray-900 mb-6 text-center"
        >
          Log in to your account
        </motion.h1>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.form variants={itemVariants} onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 rounded border-gray-300"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign in'}
          </motion.button>
        </motion.form>

        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account yet?{' '}
            <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-8 pt-6 border-t border-gray-200"
        >
          <div className="text-sm text-gray-500 text-center mb-4">
            Or continue with
          </div>
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-label="Sign in with Google"
            >
              <svg className="h-5 w-5 mx-auto" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574 2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-label="Sign in with Facebook"
            >
              <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-label="Sign in with Twitter"
            >
              <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.1 10.1 0 01-3.127 1.184A4.92 4.92 0 0012.3 8.184a13.956 13.956 0 01-10.12-5.137 4.94 4.94 0 001.524 6.585 4.98 4.98 0 01-2.23-.616v.06a4.923 4.923 0 003.95 4.826 4.888 4.888 0 01-2.222.084 4.942 4.942 0 004.604 3.417 9.875 9.875 0 01-7.306 2.042 13.905 13.905 0 007.556 2.21c9.054 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59v-.023z" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.p 
        variants={itemVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center text-xs text-gray-500"
      >
        By signing in, you agree to our{' '}
        <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500">
          Privacy Policy
        </Link>
      </motion.p>
    </div>
  );
}