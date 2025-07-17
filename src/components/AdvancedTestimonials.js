import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, Play, Heart, Brain, Eye } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './AdvancedTestimonials.css';

const AdvancedTestimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 45,
      location: "New York, NY",
      procedure: "Robotic Heart Surgery",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "The robotic heart surgery saved my life. The precision and care were extraordinary. I was back to my normal activities in just 3 weeks.",
      rating: 5,
      beforeAfter: {
        before: "Severe chest pain, couldn't walk stairs",
        after: "Running marathons, completely pain-free"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      recoveryTime: "3 weeks",
      satisfaction: 100
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      age: 52,
      location: "Los Angeles, CA",
      procedure: "AI Brain Tumor Detection",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "Their AI diagnostics caught a brain tumor that three other hospitals missed. The technology here is truly revolutionary.",
      rating: 5,
      beforeAfter: {
        before: "Undiagnosed symptoms, severe headaches",
        after: "Tumor removed successfully, symptom-free"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      recoveryTime: "2 weeks",
      satisfaction: 98
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      age: 38,
      location: "Miami, FL",
      procedure: "LASIK Eye Surgery",
      icon: Eye,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "Perfect vision in 15 minutes! The laser precision was incredible. I can see better now than I ever could with glasses.",
      rating: 5,
      beforeAfter: {
        before: "Thick glasses, -8.5 prescription",
        after: "20/20 vision, no glasses needed"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      recoveryTime: "24 hours",
      satisfaction: 100
    },
    {
      id: 4,
      name: "James Wilson",
      age: 62,
      location: "Chicago, IL",
      procedure: "Minimally Invasive Spine Surgery",
      icon: Brain,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "I was told I'd never walk normally again. Thanks to their robotic spine surgery, I'm hiking mountains at 62!",
      rating: 5,
      beforeAfter: {
        before: "Wheelchair-bound, chronic pain",
        after: "Hiking, pain-free mobility"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      recoveryTime: "4 weeks",
      satisfaction: 97
    },
    {
      id: 5,
      name: "Emily Davis",
      age: 29,
      location: "Seattle, WA",
      procedure: "Fertility Treatment",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      quote: "After 5 years of trying, their advanced fertility treatments made our dream come true. We now have beautiful twins!",
      rating: 5,
      beforeAfter: {
        before: "5 years of infertility struggles",
        after: "Healthy twins, complete family"
      },
      videoThumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      recoveryTime: "9 months",
      satisfaction: 100
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    <div className="advanced-testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 variants={itemVariants}>
            Life-Changing Success Stories
          </motion.h2>
          <motion.p variants={itemVariants}>
            Real patients, real results, real transformations
          </motion.p>
        </motion.div>

        {/* 3D Testimonial Carousel */}
        <div className="testimonial-carousel">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="testimonial-swiper"
            onSlideChange={(swiper) => setActiveTestimonial(swiper.activeIndex)}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="card-background">
                    <div className="gradient-overlay" />
                    <img 
                      src={testimonial.videoThumbnail} 
                      alt="Background"
                      className="bg-image"
                    />
                  </div>

                  <div className="card-content">
                    <div className="patient-info">
                      <div className="patient-avatar">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <div className="procedure-icon">
                          <testimonial.icon size={20} />
                        </div>
                      </div>
                      
                      <div className="patient-details">
                        <h3>{testimonial.name}</h3>
                        <p className="patient-meta">
                          Age {testimonial.age} • {testimonial.location}
                        </p>
                        <p className="procedure-name">{testimonial.procedure}</p>
                      </div>

                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="#ffd700" color="#ffd700" />
                        ))}
                      </div>
                    </div>

                    <div className="quote-section">
                      <Quote className="quote-icon" size={24} />
                      <p className="testimonial-quote">{testimonial.quote}</p>
                    </div>

                    <div className="before-after">
                      <div className="comparison-item">
                        <span className="label">Before:</span>
                        <span className="value">{testimonial.beforeAfter.before}</span>
                      </div>
                      <div className="comparison-item">
                        <span className="label">After:</span>
                        <span className="value success">{testimonial.beforeAfter.after}</span>
                      </div>
                    </div>

                    <div className="stats-row">
                      <div className="stat">
                        <span className="stat-value">{testimonial.recoveryTime}</span>
                        <span className="stat-label">Recovery Time</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{testimonial.satisfaction}%</span>
                        <span className="stat-label">Satisfaction</span>
                      </div>
                    </div>

                    <motion.button
                      className="video-button"
                      onClick={() => setShowVideo(testimonial.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play size={16} />
                      Watch Story
                    </motion.button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Statistics Summary */}
        <motion.div
          className="testimonial-stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-number">98.9%</div>
            <div className="stat-description">Patient Satisfaction Rate</div>
          </motion.div>
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-number">50,000+</div>
            <div className="stat-description">Success Stories</div>
          </motion.div>
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-number">15min</div>
            <div className="stat-description">Average Consultation</div>
          </motion.div>
          <motion.div className="stat-card" variants={itemVariants}>
            <div className="stat-number">24/7</div>
            <div className="stat-description">Support Available</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="video-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              className="video-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="video-placeholder">
                <Play size={60} />
                <p>Patient Success Story Video</p>
                <p className="video-note">
                  Video testimonial would play here
                </p>
              </div>
              <button 
                className="close-button"
                onClick={() => setShowVideo(false)}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedTestimonials;