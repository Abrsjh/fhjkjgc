import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Brain, Eye, Wind, Activity, Zap } from 'lucide-react';
import './InteractiveOrganSystem.css';

const InteractiveOrganSystem = () => {
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [hoveredOrgan, setHoveredOrgan] = useState(null);

  const organs = [
    {
      id: 'heart',
      name: 'Cardiovascular System',
      icon: Heart,
      position: { x: 50, y: 45 },
      color: '#ff6b6b',
      info: {
        title: 'Advanced Cardiac Care',
        description: 'State-of-the-art heart treatments with 99.2% success rate',
        procedures: ['Robotic Heart Surgery', 'Cardiac Catheterization', 'Valve Replacement', 'Bypass Surgery'],
        stats: { patients: '15,000+', successRate: '99.2%', avgTime: '3.5 hours' }
      }
    },
    {
      id: 'brain',
      name: 'Neurological System',
      icon: Brain,
      position: { x: 50, y: 15 },
      color: '#9b59b6',
      info: {
        title: 'Neuroscience Excellence',
        description: 'Cutting-edge brain and spine treatments with AI assistance',
        procedures: ['Brain Tumor Surgery', 'Stroke Treatment', 'Epilepsy Care', 'Spinal Surgery'],
        stats: { patients: '8,500+', successRate: '97.8%', avgTime: '4.2 hours' }
      }
    },
    {
      id: 'lungs',
      name: 'Respiratory System',
      icon: Wind,
      position: { x: 35, y: 35 },
      color: '#3498db',
      info: {
        title: 'Pulmonary Medicine',
        description: 'Advanced respiratory care and lung treatments',
        procedures: ['Lung Transplant', 'Thoracic Surgery', 'COPD Treatment', 'Sleep Apnea Care'],
        stats: { patients: '12,000+', successRate: '96.5%', avgTime: '2.8 hours' }
      }
    },
    {
      id: 'liver',
      name: 'Digestive System',
      icon: Activity,
      position: { x: 65, y: 40 },
      color: '#e67e22',
      info: {
        title: 'Gastroenterology',
        description: 'Comprehensive digestive system care and liver treatments',
        procedures: ['Liver Transplant', 'Endoscopic Surgery', 'Cancer Treatment', 'Metabolic Surgery'],
        stats: { patients: '10,500+', successRate: '98.1%', avgTime: '3.1 hours' }
      }
    },
    {
      id: 'eyes',
      name: 'Visual System',
      icon: Eye,
      position: { x: 45, y: 20 },
      color: '#1abc9c',
      info: {
        title: 'Vision Institute',
        description: 'Revolutionary eye care and laser surgery',
        procedures: ['LASIK Surgery', 'Retinal Treatment', 'Cataract Surgery', 'Glaucoma Care'],
        stats: { patients: '18,000+', successRate: '99.7%', avgTime: '45 minutes' }
      }
    },
    {
      id: 'nervous',
      name: 'Nervous System',
      icon: Zap,
      position: { x: 55, y: 25 },
      color: '#f39c12',
      info: {
        title: 'Neurology & Pain Management',
        description: 'Advanced neurological treatments and pain management',
        procedures: ['Deep Brain Stimulation', 'Nerve Blocks', 'Chronic Pain Treatment', 'Migraine Care'],
        stats: { patients: '7,200+', successRate: '94.3%', avgTime: '2.1 hours' }
      }
    }
  ];

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const organVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.3, 
      rotate: 10,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    },
    selected: {
      scale: 1.5,
      rotate: 360,
      transition: { duration: 0.5, type: "spring", stiffness: 200 }
    }
  };

  return (
    <div className="interactive-organ-system">
      <div className="organ-container">
        <div className="human-silhouette">
          {/* Animated connection lines */}
          <svg className="connection-lines" viewBox="0 0 100 100">
            {organs.map((organ, index) => (
              <motion.line
                key={`line-${organ.id}`}
                x1="50"
                y1="50"
                x2={organ.position.x}
                y2={organ.position.y}
                stroke={hoveredOrgan === organ.id ? organ.color : 'rgba(255,255,255,0.2)'}
                strokeWidth={hoveredOrgan === organ.id ? "0.5" : "0.2"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: index * 0.2 }}
              />
            ))}
          </svg>

          {/* Central pulse */}
          <motion.div
            className="central-pulse"
            variants={pulseVariants}
            initial="initial"
            animate="animate"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />

          {/* Organ points */}
          {organs.map((organ) => (
            <motion.div
              key={organ.id}
              className="organ-point"
              style={{
                left: `${organ.position.x}%`,
                top: `${organ.position.y}%`,
                backgroundColor: organ.color
              }}
              variants={organVariants}
              initial="initial"
              animate={selectedOrgan === organ.id ? "selected" : hoveredOrgan === organ.id ? "hover" : "initial"}
              onHoverStart={() => setHoveredOrgan(organ.id)}
              onHoverEnd={() => setHoveredOrgan(null)}
              onClick={() => setSelectedOrgan(selectedOrgan === organ.id ? null : organ.id)}
              whileTap={{ scale: 0.9 }}
            >
              <organ.icon size={24} color="white" />
              
              {/* Ripple effect */}
              <motion.div
                className="ripple"
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: hoveredOrgan === organ.id ? [0, 2] : 0,
                  opacity: hoveredOrgan === organ.id ? [1, 0] : 1
                }}
                transition={{ duration: 1, repeat: hoveredOrgan === organ.id ? Infinity : 0 }}
                style={{ borderColor: organ.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Information Panel */}
        <AnimatePresence>
          {selectedOrgan && (
            <motion.div
              className="organ-info-panel"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
              {(() => {
                const organ = organs.find(o => o.id === selectedOrgan);
                return (
                  <div className="info-content">
                    <div className="info-header" style={{ borderColor: organ.color }}>
                      <organ.icon size={32} color={organ.color} />
                      <h3>{organ.info.title}</h3>
                    </div>
                    
                    <p className="info-description">{organ.info.description}</p>
                    
                    <div className="procedures-list">
                      <h4>Key Procedures:</h4>
                      {organ.info.procedures.map((procedure, index) => (
                        <motion.div
                          key={procedure}
                          className="procedure-item"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="procedure-dot" style={{ backgroundColor: organ.color }} />
                          {procedure}
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-number">{organ.info.stats.patients}</span>
                        <span className="stat-label">Patients Treated</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{organ.info.stats.successRate}</span>
                        <span className="stat-label">Success Rate</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{organ.info.stats.avgTime}</span>
                        <span className="stat-label">Avg. Procedure Time</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InteractiveOrganSystem;