import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MessageSquare, 
  Bot,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Heart,
  Eye,
  Activity
} from 'lucide-react';
import './AIAppointmentBooking.css';

const AIAppointmentBooking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    symptoms: '',
    urgency: 'routine'
  });
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      message: "Hello! I'm your AI health assistant. I'll help you book the perfect appointment based on your needs.",
      timestamp: new Date()
    }
  ]);

  const services = [
    {
      id: 'cardiology',
      name: 'Cardiology',
      icon: Heart,
      description: 'Heart and cardiovascular care',
      color: '#ff6b6b',
      aiKeywords: ['chest pain', 'heart', 'palpitations', 'shortness of breath']
    },
    {
      id: 'neurology',
      name: 'Neurology',
      icon: Brain,
      description: 'Brain and nervous system',
      color: '#9b59b6',
      aiKeywords: ['headache', 'dizziness', 'memory', 'seizure', 'numbness']
    },
    {
      id: 'ophthalmology',
      name: 'Ophthalmology',
      icon: Eye,
      description: 'Eye care and vision',
      color: '#3498db',
      aiKeywords: ['vision', 'eye', 'blurry', 'glasses', 'contacts']
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: Activity,
      description: 'Urgent medical care',
      color: '#e74c3c',
      aiKeywords: ['urgent', 'emergency', 'severe', 'acute', 'immediate']
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  useEffect(() => {
    if (formData.symptoms) {
      analyzeSymptoms(formData.symptoms);
    }
  }, [formData.symptoms]);

  const analyzeSymptoms = (symptoms) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const suggestions = services.filter(service =>
        service.aiKeywords.some(keyword =>
          symptoms.toLowerCase().includes(keyword)
        )
      );

      if (suggestions.length > 0) {
        setAiSuggestions(suggestions);
        const aiMessage = {
          type: 'ai',
          message: `Based on your symptoms, I recommend considering ${suggestions[0].name}. Would you like me to check availability?`,
          timestamp: new Date(),
          suggestions: suggestions
        };
        setChatMessages(prev => [...prev, aiMessage]);
      }
      setIsTyping(false);
    }, 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'symptoms') {
      const userMessage = {
        type: 'user',
        message: value,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, userMessage]);
    }
  };

  const handleServiceSelect = (serviceId) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    setStep(3);
    
    const service = services.find(s => s.id === serviceId);
    const aiMessage = {
      type: 'ai',
      message: `Great choice! ${service.name} is perfect for your needs. Let's schedule your appointment.`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, aiMessage]);
  };

  const handleSubmit = () => {
    setStep(5);
    const aiMessage = {
      type: 'ai',
      message: `Perfect! Your appointment has been scheduled. You'll receive a confirmation email shortly.`,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, aiMessage]);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="ai-appointment-booking">
      <div className="booking-container">
        <div className="booking-header">
          <motion.div
            className="ai-avatar"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Bot size={40} />
            <div className="ai-pulse" />
          </motion.div>
          <div className="header-text">
            <h2>AI-Powered Appointment Booking</h2>
            <p>Let our AI assistant help you find the perfect appointment</p>
          </div>
        </div>

        <div className="booking-content">
          {/* Progress Bar */}
          <div className="progress-bar">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`progress-step ${step >= num ? 'active' : ''}`}
              >
                <div className="step-number">{num}</div>
                <div className="step-label">
                  {num === 1 && 'Symptoms'}
                  {num === 2 && 'Service'}
                  {num === 3 && 'Date'}
                  {num === 4 && 'Details'}
                  {num === 5 && 'Confirm'}
                </div>
              </div>
            ))}
          </div>

          <div className="booking-form">
            <AnimatePresence mode="wait">
              {/* Step 1: Symptom Analysis */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <div className="step-content">
                    <h3>Tell me about your symptoms</h3>
                    <div className="chat-interface">
                      <div className="chat-messages">
                        {chatMessages.map((msg, index) => (
                          <motion.div
                            key={index}
                            className={`message ${msg.type}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {msg.type === 'ai' && <Bot size={20} />}
                            <div className="message-content">
                              <p>{msg.message}</p>
                              {msg.suggestions && (
                                <div className="ai-suggestions">
                                  {msg.suggestions.map((suggestion) => (
                                    <button
                                      key={suggestion.id}
                                      className="suggestion-chip"
                                      onClick={() => handleServiceSelect(suggestion.id)}
                                      style={{ borderColor: suggestion.color }}
                                    >
                                      <suggestion.icon size={16} />
                                      {suggestion.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                        {isTyping && (
                          <motion.div
                            className="message ai typing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Bot size={20} />
                            <div className="typing-indicator">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      <div className="chat-input">
                        <textarea
                          placeholder="Describe your symptoms or health concerns..."
                          value={formData.symptoms}
                          onChange={(e) => handleInputChange('symptoms', e.target.value)}
                          rows={3}
                        />
                        <button
                          onClick={() => setStep(2)}
                          disabled={!formData.symptoms}
                          className="next-button"
                        >
                          <Sparkles size={16} />
                          Analyze
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Service Selection */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Choose your medical service</h3>
                  <div className="services-grid">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        className={`service-card ${formData.service === service.id ? 'selected' : ''}`}
                        onClick={() => handleServiceSelect(service.id)}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ borderColor: service.color }}
                      >
                        <div className="service-icon" style={{ backgroundColor: service.color }}>
                          <service.icon size={32} />
                        </div>
                        <h4>{service.name}</h4>
                        <p>{service.description}</p>
                        {aiSuggestions.some(s => s.id === service.id) && (
                          <div className="ai-recommended">
                            <Sparkles size={14} />
                            AI Recommended
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Date & Time Selection */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Select date and time</h3>
                  <div className="datetime-selection">
                    <div className="date-picker">
                      <label>
                        <Calendar size={20} />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="time-slots">
                      <label>
                        <Clock size={20} />
                        Available Times
                      </label>
                      <div className="slots-grid">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                            onClick={() => handleInputChange('time', time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!formData.date || !formData.time}
                    className="next-button"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 4: Personal Details */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step"
                >
                  <h3>Your contact information</h3>
                  <div className="contact-form">
                    <div className="form-group">
                      <label>
                        <User size={20} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <Mail size={20} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <Phone size={20} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        <MessageSquare size={20} />
                        Additional Notes
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Any additional information..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name || !formData.email || !formData.phone}
                    className="submit-button"
                  >
                    Book Appointment
                    <CheckCircle size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="form-step confirmation"
                >
                  <div className="success-animation">
                    <motion.div
                      className="success-icon"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.8, type: "spring" }}
                    >
                      <CheckCircle size={60} />
                    </motion.div>
                    <h3>Appointment Confirmed!</h3>
                    <p>Your appointment has been successfully scheduled</p>
                  </div>
                  
                  <div className="appointment-summary">
                    <div className="summary-item">
                      <strong>Service:</strong> {services.find(s => s.id === formData.service)?.name}
                    </div>
                    <div className="summary-item">
                      <strong>Date:</strong> {formData.date}
                    </div>
                    <div className="summary-item">
                      <strong>Time:</strong> {formData.time}
                    </div>
                    <div className="summary-item">
                      <strong>Patient:</strong> {formData.name}
                    </div>
                  </div>

                  <div className="next-steps">
                    <h4>What's Next?</h4>
                    <ul>
                      <li>You'll receive a confirmation email within 5 minutes</li>
                      <li>A reminder will be sent 24 hours before your appointment</li>
                      <li>Please arrive 15 minutes early for check-in</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAppointmentBooking;