import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Phone, 
  MapPin, 
  Star,
  ChevronRight,
  Activity,
  Stethoscope,
  Brain,
  Eye,
  Zap
} from 'lucide-react';
import './HospitalAdvertisement.css';

const HospitalAdvertisement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const heroSlides = [
    {
      title: "Advanced Cardiac Care",
      subtitle: "State-of-the-art heart treatment with 98% success rate",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Heart
    },
    {
      title: "Emergency Services 24/7",
      subtitle: "Round-the-clock emergency care when you need it most",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Clock
    },
    {
      title: "Expert Medical Team",
      subtitle: "Board-certified specialists with decades of experience",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Users
    }
  ];

  const services = [
    { icon: Heart, title: "Cardiology", description: "Advanced heart care and surgery" },
    { icon: Brain, title: "Neurology", description: "Brain and nervous system treatment" },
    { icon: Eye, title: "Ophthalmology", description: "Comprehensive eye care services" },
    { icon: Activity, title: "Emergency", description: "24/7 emergency medical services" },
    { icon: Stethoscope, title: "General Medicine", description: "Primary healthcare services" },
    { icon: Zap, title: "Surgery", description: "Minimally invasive procedures" }
  ];

  const stats = [
    { number: "50,000+", label: "Patients Treated", icon: Users },
    { number: "98%", label: "Success Rate", icon: Award },
    { number: "24/7", label: "Emergency Care", icon: Clock },
    { number: "15+", label: "Specialties", icon: Shield }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="hospital-ad">
      {/* Hero Section */}
      <section className="hero-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="hero-slide"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.8), rgba(0, 82, 163, 0.8)), url(${heroSlides[currentSlide].image})`
            }}
          >
            <div className="hero-content">
              <motion.div
                className="hero-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {React.createElement(heroSlides[currentSlide].icon, { size: 60 })}
              </motion.div>
              
              <motion.h1
                className="hero-title"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                className="hero-subtitle"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                className="hero-buttons"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <button className="btn-primary">
                  Book Appointment
                  <ChevronRight size={20} />
                </button>
                <button className="btn-secondary">
                  <Phone size={18} />
                  Emergency: (555) 123-4567
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="stats-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">
                  {React.createElement(stat.icon, { size: 32 })}
                </div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="services-section"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div className="section-header" variants={itemVariants}>
            <h2>Our Medical Services</h2>
            <p>Comprehensive healthcare solutions with cutting-edge technology</p>
          </motion.div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card"
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="service-icon">
                  {React.createElement(service.icon, { size: 40 })}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <button className="service-btn">
                  Learn More
                  <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Ready to Experience Premier Healthcare?</h2>
              <p>Join thousands of satisfied patients who trust us with their health</p>
              <div className="cta-features">
                <div className="feature">
                  <Star className="feature-icon" size={20} />
                  <span>5-Star Patient Rating</span>
                </div>
                <div className="feature">
                  <MapPin className="feature-icon" size={20} />
                  <span>Convenient Locations</span>
                </div>
                <div className="feature">
                  <Shield className="feature-icon" size={20} />
                  <span>Insurance Accepted</span>
                </div>
              </div>
            </div>
            <div className="cta-actions">
              <motion.button
                className="btn-primary large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
              <motion.button
                className="btn-outline large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Virtual Tour
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Premier Healthcare</h3>
              <p>Your health is our priority. Providing exceptional medical care with compassion and expertise.</p>
            </div>
            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <Phone size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Healthcare Ave, Medical City</span>
              </div>
            </div>
            <div className="footer-section">
              <h4>Emergency</h4>
              <div className="emergency-number">
                <Phone size={20} />
                <span>911</span>
              </div>
              <p>For life-threatening emergencies</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HospitalAdvertisement;