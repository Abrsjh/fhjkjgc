import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
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
  Zap,
  Calendar,
  MessageCircle,
  Video,
  Microscope,
  Ambulance,
  Building,
  CheckCircle,
  ArrowRight,
  Play,
  X,
  Menu,
  Search,
  Bell,
  User
} from 'lucide-react';
// import ParticleBackground from './ParticleBackground';
// import Medical3DScene from './Medical3DScene';
import InteractiveOrganSystem from './InteractiveOrganSystem';
import HolographicDisplay from './HolographicDisplay';
// import AdvancedTestimonials from './AdvancedTestimonials';
import AIAppointmentBooking from './AIAppointmentBooking';
import './HospitalAdvertisement.css';

const HospitalAdvertisement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentForm, setAppointmentForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', message: ''
  });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroSlides = [
    {
      title: "Revolutionary AI-Powered Diagnostics",
      subtitle: "Next-generation medical imaging with 99.7% accuracy rate",
      description: "Experience the future of healthcare with our cutting-edge AI diagnostic systems",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: Brain,
      stats: { patients: "50K+", accuracy: "99.7%", time: "< 30min" }
    },
    {
      title: "Robotic Surgery Excellence",
      subtitle: "Minimally invasive procedures with precision robotics",
      description: "World-class surgical outcomes with da Vinci robotic systems",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: Zap,
      stats: { surgeries: "10K+", recovery: "50% faster", precision: "0.1mm" }
    },
    {
      title: "Telemedicine & Virtual Care",
      subtitle: "Healthcare from anywhere, anytime with our digital platform",
      description: "Connect with specialists instantly through our advanced telehealth system",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: Video,
      stats: { consultations: "100K+", satisfaction: "98%", availability: "24/7" }
    },
    {
      title: "Emergency Response Network",
      subtitle: "Life-saving care with 3-minute average response time",
      description: "Advanced trauma center with helicopter emergency services",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      icon: Ambulance,
      stats: { response: "3min", survival: "95%", coverage: "24/7" }
    }
  ];

  const services = [
    { 
      icon: Heart, 
      title: "Advanced Cardiology", 
      description: "AI-powered cardiac diagnostics with robotic surgery",
      features: ["Robotic Heart Surgery", "3D Cardiac Imaging", "Preventive Screening"],
      patients: "15,000+",
      rating: 4.9,
      color: "from-red-500 to-pink-600"
    },
    { 
      icon: Brain, 
      title: "Neuroscience Center", 
      description: "Cutting-edge brain and spine treatments",
      features: ["Brain Tumor Surgery", "Stroke Treatment", "Epilepsy Care"],
      patients: "8,500+",
      rating: 4.8,
      color: "from-purple-500 to-indigo-600"
    },
    { 
      icon: Eye, 
      title: "Vision Institute", 
      description: "Revolutionary eye care and laser surgery",
      features: ["LASIK Surgery", "Retinal Treatment", "Cataract Surgery"],
      patients: "12,000+",
      rating: 4.9,
      color: "from-blue-500 to-cyan-600"
    },
    { 
      icon: Microscope, 
      title: "Cancer Center", 
      description: "Precision oncology with immunotherapy",
      features: ["Immunotherapy", "Precision Medicine", "Clinical Trials"],
      patients: "6,200+",
      rating: 4.7,
      color: "from-green-500 to-emerald-600"
    },
    { 
      icon: Activity, 
      title: "Emergency & Trauma", 
      description: "Level 1 trauma center with helicopter service",
      features: ["Helicopter Transport", "24/7 Trauma Team", "Stroke Center"],
      patients: "25,000+",
      rating: 4.8,
      color: "from-orange-500 to-red-600"
    },
    { 
      icon: Building, 
      title: "Women's Health", 
      description: "Comprehensive maternal and reproductive care",
      features: ["High-Risk Pregnancy", "Fertility Treatment", "Minimally Invasive Surgery"],
      patients: "18,000+",
      rating: 4.9,
      color: "from-pink-500 to-rose-600"
    }
  ];

  const stats = [
    { number: "250,000+", label: "Lives Saved", icon: Heart, color: "text-red-400" },
    { number: "99.2%", label: "Patient Satisfaction", icon: Star, color: "text-yellow-400" },
    { number: "3min", label: "Emergency Response", icon: Clock, color: "text-blue-400" },
    { number: "50+", label: "Medical Specialties", icon: Shield, color: "text-green-400" },
    { number: "24/7", label: "AI Monitoring", icon: Activity, color: "text-purple-400" },
    { number: "15", label: "Research Centers", icon: Microscope, color: "text-cyan-400" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Heart Surgery Patient",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The robotic heart surgery saved my life. The precision and care were extraordinary.",
      rating: 5,
      procedure: "Robotic Cardiac Surgery"
    },
    {
      name: "Dr. Michael Chen",
      role: "Referring Physician",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "Their AI diagnostics caught what we missed. Truly revolutionary technology.",
      rating: 5,
      procedure: "AI Diagnostics"
    },
    {
      name: "Maria Rodriguez",
      role: "Cancer Survivor",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The immunotherapy treatment gave me my life back. Forever grateful.",
      rating: 5,
      procedure: "Immunotherapy"
    }
  ];

  const achievements = [
    { title: "Magnet Hospital Recognition", year: "2024", icon: Award },
    { title: "Top 100 Hospitals", year: "2024", icon: Star },
    { title: "AI Innovation Award", year: "2024", icon: Brain },
    { title: "Patient Safety Excellence", year: "2024", icon: Shield }
  ];

  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 2000);
    
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heroSlides.length]);

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Appointment booked:', appointmentForm);
    alert('Appointment request submitted successfully!');
  };

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

  if (isLoading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loading-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Heart size={60} className="text-blue-500" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="loading-text"
        >
          Premier Healthcare
        </motion.h2>
        <motion.div
          className="loading-bar"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1, duration: 1 }}
        />
      </div>
    );
  }

  return (
    <div className="hospital-ad">
      {/* Navigation */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="nav-container">
          <div className="nav-logo">
            <Heart className="logo-icon" />
            <span>Premier Healthcare</span>
          </div>
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#contact">Contact</a>
            <button className="nav-btn">
              <Calendar size={18} />
              Book Now
            </button>
          </div>
          <button 
            className="nav-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <motion.div
          className="hero-particles"
          style={{
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="hero-slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0, 102, 204, 0.85), rgba(0, 82, 163, 0.85)), url(${heroSlides[currentSlide].image})`
            }}
          >
            <div className="hero-content">
              <motion.div
                className="hero-badge"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              >
                <span className="badge-text">Revolutionary Healthcare</span>
              </motion.div>

              <motion.div
                className="hero-icon-container"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {React.createElement(heroSlides[currentSlide].icon, { 
                  size: 80, 
                  className: "hero-main-icon" 
                })}
              </motion.div>
              
              <motion.h1
                className="hero-title"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p
                className="hero-subtitle"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              <motion.div
                className="hero-stats"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {Object.entries(heroSlides[currentSlide].stats).map(([key, value], index) => (
                  <div key={key} className="hero-stat">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{key}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.div
                className="hero-buttons"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <motion.button 
                  className="btn-primary hero-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar size={20} />
                  Schedule Consultation
                  <ArrowRight size={20} />
                </motion.button>
                <motion.button 
                  className="btn-secondary hero-btn"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowVideoModal(true)}
                >
                  <Play size={18} />
                  Watch Virtual Tour
                </motion.button>
                <motion.button 
                  className="btn-emergency"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone size={18} />
                  Emergency: (555) 911-HELP
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              className="hero-scroll-indicator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <div className="scroll-mouse">
                <div className="scroll-wheel" />
              </div>
              <span>Scroll to explore</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <div className="hero-progress">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </section>

      {/* Medical Innovation Section */}
      <section className="medical-innovation-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Revolutionary Medical Technology</h2>
            <p>Experience the future of healthcare with our advanced systems</p>
          </motion.div>
          <div className="innovation-grid">
            <motion.div 
              className="innovation-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Brain size={60} className="innovation-icon" />
              <h3>AI Diagnostics</h3>
              <p>99.7% accuracy in medical imaging analysis</p>
            </motion.div>
            <motion.div 
              className="innovation-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Zap size={60} className="innovation-icon" />
              <h3>Robotic Surgery</h3>
              <p>Sub-millimeter precision with da Vinci systems</p>
            </motion.div>
            <motion.div 
              className="innovation-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Video size={60} className="innovation-icon" />
              <h3>Telemedicine</h3>
              <p>24/7 virtual consultations with specialists</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Holographic Display */}
      <HolographicDisplay />

      {/* Interactive Organ System */}
      <InteractiveOrganSystem />

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
                  {React.createElement(stat.icon, { size: 32, className: stat.color })}
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

      {/* Patient Success Stories */}
      <section className="success-stories-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Life-Changing Success Stories</h2>
            <p>Real patients, real results, real transformations</p>
          </motion.div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="testimonial-card-simple"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} className="patient-photo" />
                  <div className="patient-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#ffd700" color="#ffd700" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="procedure-tag">{testimonial.procedure}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Appointment Booking */}
      <AIAppointmentBooking />

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