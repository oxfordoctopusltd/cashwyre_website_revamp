"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Send, User, Mail, MessageSquare, Phone, Building, Clock, MessageCircle, Code } from "lucide-react"

const supportChannels = [
  {
    icon: Code,
    title: "API Support",
    description: "Technical assistance for developers",
    response: "Within 24 hours",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed assistance via email",
    response: "Response within 24 hours",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Talk directly with our experts",
    response: "Mon-Fri 9AM-6PM GMT",
    color: "from-purple-500 to-pink-500"
  }
]



export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/Subscriber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        }),
      })
      if (response.ok) {
        setShowModal(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        console.error('Failed to submit form')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="pt-32 space-y-20">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
          Contact <span className="gradient-text">Us</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Fast, reliable help when you need it. Choose your support channel.
        </p>
      </motion.section>

      {/* Support Channels */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12">
          {/* <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get Help <span className="gradient-text">Quickly</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Multiple ways to reach us. Pick what works best for you.
          </p> */}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {supportChannels.map((channel, index) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-6 text-center group cursor-pointer"
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${channel.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <channel.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{channel.title}</h3>
              <p className="text-gray-300 mb-3">{channel.description}</p>
              <div className="flex items-center justify-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                {channel.response}
              </div>
            </motion.div>
          ))}
        </div>

      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Send us a <span className="gradient-text">Message</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Can't find what you're looking for? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#FFA726] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">info@cashwyre.com</p>
                  </div>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div> */}
                
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold mb-3 text-lg">Response Time</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-blue-400">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">WhatsApp:</span>
                  <span className="text-purple-400">Immediately</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>


                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Message *</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-[#FF6B35] focus:outline-none transition-colors resize-none"
                      placeholder="How can we help you today?"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className={`w-5 h-5 ${isSubmitting ? '' : 'group-hover:translate-x-1'} transition-transform`} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FFA726] px-6 py-3 rounded-xl font-semibold text-white hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  )
}