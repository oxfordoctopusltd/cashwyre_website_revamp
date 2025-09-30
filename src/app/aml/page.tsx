"use client"
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AMLPolicy() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAMLContent = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/aml");
        const data = await response.json();
        if (!response.ok || data.error) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }
        if (!data.content) {
          throw new Error("No content received from server");
        }
        setContent(data.content);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchAMLContent();
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
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">
            AML <span className="gradient-text">Policy</span>
          </h1>
          <div className="glass-card p-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <div className="text-gray-400">Loading AML policy...</div>
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
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-8">
            AML <span className="gradient-text">Policy</span>
          </h1>
          <div className="glass-card p-8">
            <div className="text-red-400 mb-4">Error loading AML policy: {error}</div>
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
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 text-center">
          AML <span className="gradient-text">Policy</span>
        </h1>
        <div className="glass-card p-8">
          <div className="text-sm text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <div
            className="prose prose-invert max-w-none privacy-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </motion.div>
    </div>
  );
}