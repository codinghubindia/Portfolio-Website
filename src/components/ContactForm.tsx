import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const serviceId = import.meta.env.VITE_SERVICE_ID;
    const templateId = import.meta.env.VITE_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus({
        type: 'error',
        message: 'Email service configuration is missing. Please try again later.'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );

      if (result.text === 'OK') {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! We will get back to you soon.'
        });
        form.current.reset();
      }
    } catch (error: unknown) {
      console.error('EmailJS error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white"
            placeholder="Your email"
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white"
          placeholder="Project inquiry"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white resize-none"
          placeholder="Tell me about your project..."
          required
        ></textarea>
      </div>

      {submitStatus.type && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
          }`}
        >
          {submitStatus.message}
        </motion.div>
      )}

      <motion.button
        type="submit"
        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm; 