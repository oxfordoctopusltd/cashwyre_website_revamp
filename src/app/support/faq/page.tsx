"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
// Helper to parse the backend HTML into a list of { question, answer } objects
function parseFAQBlocks(html: string): { question: string; answer: string }[] {
  if (!html) return [];
  // Extract all .faq-blocks
  const blocks = html.split(/<div class=\"faq-block\">/g).slice(1);
  return blocks.map((block) => {
    // Extract question
    const qMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
    // Extract answer (all .block-body content)
    const aMatch = block.match(/<div class=\"block-body[^>]*\">([\s\S]*?)<\/div>/i);
    const question = qMatch ? qMatch[1].replace(/\s+/g, ' ').trim() : '';
    const answer = aMatch ? aMatch[1].replace(/\s+/g, ' ').trim() : '';
    return { question, answer };
  }).filter(faq => faq.question && faq.answer);
}

export default function FAQ() {
  const [faqList, setFaqList] = useState<{ question: string; answer: string }[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/faq");
        const data = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        if (!data.content) {
          throw new Error("No content received from server");
        }
  setFaqList(parseFAQBlocks(data.content));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQContent();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <div className="glass-card p-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <div className="text-gray-400">Loading FAQ...</div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <div className="glass-card p-8">
            <div className="text-red-400 mb-4">Error loading FAQ: {error}</div>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-8">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h1>
        <div className="glass-card p-8 text-left">
          {faqList.length === 0 && (
            <div className="text-gray-400">No FAQs available.</div>
          )}
          {faqList.map((faq, idx) => (
            <div className="faq-block" key={idx}>
              <div
                className="block-header"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                tabIndex={0}
                role="button"
                aria-expanded={openIndex === idx}
              >
                <div className={`header-icon${openIndex === idx ? ' open' : ''}`}>{openIndex === idx ? <Minus /> : <Plus />}</div>
                <h3 className="mb-0">{faq.question}</h3>
              </div>
              {openIndex === idx && (
                <div className="block-body" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
