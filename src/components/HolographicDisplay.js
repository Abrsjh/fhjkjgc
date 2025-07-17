import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import './HolographicDisplay.css';

const HolographicDisplay = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const metrics = [
    {
      title: "AI Diagnostic Accuracy",
      value: 99.7,
      suffix: "%",
      description: "Machine learning algorithms analyzing medical data",
      color: "#00ff88",
      particles: 150
    },
    {
      title: "Robotic Surgery Precision",
      value: 0.1,
      suffix: "mm",
      description: "Sub-millimeter precision in surgical procedures",
      color: "#ff6b6b",
      particles: 120
    },
    {
      title: "Patient Recovery Speed",
      value: 65,
      suffix: "%",
      description: "Faster recovery with advanced treatment protocols",
      color: "#4ecdc4",
      particles: 100
    },
    {
      title: "Telemedicine Consultations",
      value: 50000,
      suffix: "+",
      description: "Remote consultations completed this year",
      color: "#ffd700",
      particles: 200
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [metrics.length]);

  const generateParticles = (count, color) => {
    return Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        className="hologram-particle"
        style={{
          backgroundColor: color,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: "easeInOut"
        }}
      />
    ));
  };

  return (
    <div className="holographic-display" ref={ref}>
      <div className="hologram-container">
        <div className="hologram-grid">
          {/* Main Display */}
          <div className="main-hologram">
            <div className="hologram-frame">
              <div className="scan-lines" />
              <div className="hologram-content">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMetric}
                    className="metric-display"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    <div className="metric-title">
                      {metrics[activeMetric].title}
                    </div>
                    <div 
                      className="metric-value"
                      style={{ color: metrics[activeMetric].color }}
                    >
                      {inView && (
                        <CountUp
                          end={metrics[activeMetric].value}
                          duration={2}
                          decimals={metrics[activeMetric].value < 1 ? 1 : 0}
                          suffix={metrics[activeMetric].suffix}
                        />
                      )}
                    </div>
                    <div className="metric-description">
                      {metrics[activeMetric].description}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Particle System */}
              <div className="particle-system">
                {generateParticles(
                  metrics[activeMetric].particles,
                  metrics[activeMetric].color
                )}
              </div>
              
              {/* Hologram Effects */}
              <div className="hologram-effects">
                <div className="glow-ring" style={{ borderColor: metrics[activeMetric].color }} />
                <div className="pulse-ring" style={{ borderColor: metrics[activeMetric].color }} />
                <div className="data-stream" />
              </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="side-panels">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className={`side-panel ${index === activeMetric ? 'active' : ''}`}
                onClick={() => setActiveMetric(index)}
                whileHover={{ scale: 1.05, x: 10 }}
                whileTap={{ scale: 0.95 }}
                style={{ borderColor: metric.color }}
              >
                <div className="panel-indicator" style={{ backgroundColor: metric.color }} />
                <div className="panel-title">{metric.title}</div>
                <div className="panel-value" style={{ color: metric.color }}>
                  {metric.value}{metric.suffix}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Data Visualization */}
        <div className="data-visualization">
          <svg className="data-chart" viewBox="0 0 400 200">
            {/* Grid Lines */}
            {Array.from({ length: 10 }, (_, i) => (
              <g key={i}>
                <line
                  x1={i * 40}
                  y1={0}
                  x2={i * 40}
                  y2={200}
                  stroke="rgba(0, 255, 136, 0.2)"
                  strokeWidth="1"
                />
                <line
                  x1={0}
                  y1={i * 20}
                  x2={400}
                  y2={i * 20}
                  stroke="rgba(0, 255, 136, 0.2)"
                  strokeWidth="1"
                />
              </g>
            ))}
            
            {/* Animated Data Line */}
            <motion.path
              d="M0,150 Q100,50 200,100 T400,80"
              fill="none"
              stroke={metrics[activeMetric].color}
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Data Points */}
            {[0, 100, 200, 300, 400].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={150 - i * 20}
                r="4"
                fill={metrics[activeMetric].color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              />
            ))}
          </svg>
        </div>

        {/* Control Interface */}
        <div className="control-interface">
          <div className="interface-header">
            <div className="status-indicator active" />
            <span>MEDICAL AI SYSTEM ONLINE</span>
          </div>
          
          <div className="progress-bars">
            {['CPU Usage', 'Memory', 'Network', 'Storage'].map((label, i) => (
              <div key={label} className="progress-item">
                <span className="progress-label">{label}</span>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + Math.random() * 30}%` }}
                    transition={{ duration: 2, delay: i * 0.2 }}
                    style={{ backgroundColor: metrics[activeMetric].color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolographicDisplay;