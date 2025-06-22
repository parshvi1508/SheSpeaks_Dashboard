import React, { useState, useEffect, useRef } from 'react';

// Types for health resources
interface HealthTip {
  id: string;
  category: 'Mental Health' | 'Physical Wellness' | 'Work-Life Balance' | 'Nutrition' | 'Sleep';
  title: string;
  description: string;
  actionItems: string[];
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  timeRequired: string;
  icon: string;
}

interface WellnessMetric {
  label: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

// Custom hook for health management data
const useHealthResources = () => {
  const [tips, setTips] = useState<HealthTip[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthTips = async () => {
      setLoading(true);
      
      const mockTips: HealthTip[] = [
        {
          id: '1',
          category: 'Mental Health',
          title: 'Combat Imposter Syndrome',
          description: 'Evidence-based strategies to overcome self-doubt and build authentic confidence in your technical abilities.',
          actionItems: [
            'Keep a daily accomplishment journal',
            'Seek feedback from trusted colleagues',
            'Practice positive self-talk techniques',
            'Set realistic, achievable goals',
            'Connect with mentors who understand your journey'
          ],
          difficulty: 'Moderate',
          timeRequired: '15-30 min daily',
          icon: '🧠'
        },
        {
          id: '2',
          category: 'Physical Wellness',
          title: 'Desk Ergonomics & Movement',
          description: 'Prevent repetitive strain injuries and maintain physical health during long coding sessions.',
          actionItems: [
            'Set up proper monitor height and keyboard position',
            'Take 5-minute movement breaks every hour',
            'Practice neck and shoulder stretches',
            'Use a standing desk for part of the day',
            'Invest in ergonomic accessories'
          ],
          difficulty: 'Easy',
          timeRequired: '5 min every hour',
          icon: '💪'
        },
        {
          id: '3',
          category: 'Work-Life Balance',
          title: 'Boundary Setting in Remote Work',
          description: 'Establish clear boundaries between work and personal life, especially in remote or hybrid environments.',
          actionItems: [
            'Create a dedicated workspace',
            'Set specific work hours and stick to them',
            'Use separate devices for work and personal use',
            'Practice saying no to non-essential meetings',
            'Schedule regular personal time activities'
          ],
          difficulty: 'Moderate',
          timeRequired: 'Ongoing practice',
          icon: '⚖️'
        },
        {
          id: '4',
          category: 'Nutrition',
          title: 'Brain-Boosting Nutrition',
          description: 'Optimize your diet to enhance cognitive function, focus, and energy levels throughout the workday.',
          actionItems: [
            'Eat protein-rich breakfast to stabilize blood sugar',
            'Stay hydrated with 8-10 glasses of water daily',
            'Include omega-3 rich foods for brain health',
            'Limit caffeine to avoid crashes',
            'Plan healthy snacks to maintain energy'
          ],
          difficulty: 'Easy',
          timeRequired: '10 min meal prep',
          icon: '🥗'
        },
        {
          id: '5',
          category: 'Sleep',
          title: 'Quality Sleep for Developers',
          description: 'Improve sleep quality to enhance problem-solving abilities, creativity, and overall job performance.',
          actionItems: [
            'Establish a consistent sleep schedule',
            'Limit screen time 1 hour before bed',
            'Create a comfortable, dark sleep environment',
            'Practice relaxation techniques',
            'Avoid caffeine after 2 PM'
          ],
          difficulty: 'Moderate',
          timeRequired: '7-9 hours nightly',
          icon: '😴'
        },
        {
          id: '6',
          category: 'Mental Health',
          title: 'Stress Management Techniques',
          description: 'Practical methods to manage workplace stress and prevent burnout in high-pressure tech environments.',
          actionItems: [
            'Practice deep breathing exercises',
            'Use time-blocking for better task management',
            'Learn to delegate when possible',
            'Take regular vacation days',
            'Seek professional support when needed'
          ],
          difficulty: 'Moderate',
          timeRequired: '10-20 min daily',
          icon: '🧘‍♀️'
        }
      ];

      setTimeout(() => {
        setTips(mockTips);
        setLoading(false);
      }, 800);
    };

    fetchHealthTips();
  }, []);

  const filteredTips = selectedCategory === 'All' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  return {
    tips: filteredTips,
    loading,
    selectedCategory,
    setSelectedCategory,
    categories: ['All', 'Mental Health', 'Physical Wellness', 'Work-Life Balance', 'Nutrition', 'Sleep']
  };
};

// Custom hook for intersection observer
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Reusable components
const WellnessMetrics: React.FC = () => {
  const metrics: WellnessMetric[] = [
    {
      label: 'Stress Reduction',
      value: '67%',
      description: 'of members report lower stress levels',
      trend: 'up'
    },
    {
      label: 'Better Sleep',
      value: '74%',
      description: 'improved sleep quality',
      trend: 'up'
    },
    {
      label: 'Work-Life Balance',
      value: '82%',
      description: 'feel more balanced',
      trend: 'up'
    },
    {
      label: 'Mental Clarity',
      value: '79%',
      description: 'report enhanced focus',
      trend: 'up'
    }
  ];

  return (
    <div className="wellness-metrics">
      <h3>Community Wellness Impact</h3>
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-description">{metric.description}</div>
            <div className={`metric-trend ${metric.trend}`}>
              {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '→'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HealthTipCard: React.FC<{
  tip: HealthTip;
  index: number;
  isVisible: boolean;
}> = ({ tip, index, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'var(--success-500)';
      case 'Moderate': return 'var(--warning-500)';
      case 'Advanced': return 'var(--error-500)';
      default: return 'var(--neutral-500)';
    }
  };

  return (
    <div 
      className={`health-tip-card ${isVisible ? 'animate-slide-up' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="tip-header">
        <div className="tip-icon">{tip.icon}</div>
        <div className="tip-meta">
          <span className="category-badge">{tip.category}</span>
          <span 
            className="difficulty-badge"
            style={{ backgroundColor: getDifficultyColor(tip.difficulty) }}
          >
            {tip.difficulty}
          </span>
        </div>
      </div>

      <h3 className="tip-title">{tip.title}</h3>
      <p className="tip-description">{tip.description}</p>

      <div className="tip-time">
        <span className="time-icon">⏰</span>
        <span>{tip.timeRequired}</span>
      </div>

      <button 
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide Action Items' : 'View Action Items'}
        <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
      </button>

      {isExpanded && (
        <div className="action-items">
          <h4>Action Items:</h4>
          <ul>
            {tip.actionItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const EmergencyResources: React.FC = () => (
  <div className="emergency-resources">
    <h3>🚨 Emergency Mental Health Resources</h3>
    <div className="resource-grid">
      <div className="resource-item">
        <h4>Crisis Support</h4>
        <p>National Suicide Prevention Lifeline</p>
        <a href="tel:988" className="resource-link">988</a>
      </div>
      <div className="resource-item">
        <h4>24/7 Text Support</h4>
        <p>Crisis Text Line</p>
        <a href="sms:741741" className="resource-link">Text HOME to 741741</a>
      </div>
      <div className="resource-item">
        <h4>Online Therapy</h4>
        <p>Professional counseling services</p>
        <a href="#" className="resource-link">Find Therapists</a>
      </div>
    </div>
  </div>
);

// Main component
const HealthManagement: React.FC = () => {
  const { tips, loading, selectedCategory, setSelectedCategory, categories } = useHealthResources();
  const { ref, isVisible } = useIntersectionObserver();

  if (loading) {
    return (
      <section className="section">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading health resources...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section" id="health-management">
      <div className="health-header">
        <h2 className="text-gradient">Health & Wellness Management</h2>
        <p className="health-subtitle">
          Comprehensive resources to help women in tech maintain their physical and mental health, 
          prevent burnout, and thrive in demanding technical environments.
        </p>
      </div>

      <WellnessMetrics />

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="health-tips-grid">
        {tips.map((tip, index) => (
          <HealthTipCard
            key={tip.id}
            tip={tip}
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>

      <EmergencyResources />

      <div className="health-cta">
        <h3>Prioritize Your Wellbeing</h3>
        <p>Your health is your most valuable asset. Take the first step towards a healthier, more balanced tech career.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Start Wellness Assessment</button>
          <button className="btn-secondary">Join Wellness Community</button>
        </div>
      </div>

      <style>{`
        .health-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .health-subtitle {
          font-size: var(--text-lg);
          color: var(--neutral-600);
          max-width: 800px;
          margin: var(--space-6) auto 0;
          line-height: 1.7;
        }

        .wellness-metrics {
          background: var(--gradient-card);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          margin-bottom: var(--space-10);
          border: 1px solid var(--neutral-200);
        }

        .wellness-metrics h3 {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--space-4);
        }

        .metric-card {
          background: var(--neutral-0);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          text-align: center;
          position: relative;
          border: 1px solid var(--neutral-200);
          transition: all var(--transition-base);
        }

        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .metric-value {
          font-family: var(--font-mono);
          font-size: var(--text-2xl);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .metric-label {
          font-size: var(--text-sm);
          font-weight: var(--fw-semibold);
          color: var(--neutral-700);
          margin: var(--space-1) 0;
        }

        .metric-description {
          font-size: var(--text-xs);
          color: var(--neutral-500);
        }

        .metric-trend {
          position: absolute;
          top: var(--space-2);
          right: var(--space-2);
          font-size: var(--text-sm);
        }

        .category-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-10);
        }

        .category-filter {
          padding: var(--space-3) var(--space-5);
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-full);
          background: var(--neutral-0);
          color: var(--neutral-600);
          font-family: var(--font-body);
          font-weight: var(--fw-medium);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .category-filter:hover {
          border-color: var(--primary-300);
          background: var(--primary-50);
          color: var(--primary-700);
        }

        .category-filter.active {
          border-color: var(--primary-500);
          background: var(--primary-500);
          color: white;
        }

        .health-tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-12);
        }

        .health-tip-card {
          background: var(--neutral-0);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-2xl);
          padding: var(--space-6);
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
        }

        .health-tip-card.animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        .health-tip-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transition: transform var(--transition-base);
        }

        .health-tip-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-200);
        }

        .health-tip-card:hover::before {
          transform: scaleX(1);
        }

        .tip-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-4);
        }

        .tip-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          background: var(--primary-50);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tip-meta {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          align-items: flex-end;
        }

        .category-badge {
          padding: var(--space-1) var(--space-3);
          background: var(--primary-100);
          color: var(--primary-700);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--fw-semibold);
        }

        .difficulty-badge {
          padding: var(--space-1) var(--space-3);
          color: white;
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--fw-semibold);
        }

        .tip-title {
          font-family: var(--font-accent);
          font-size: var(--text-xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-3);
        }

        .tip-description {
          font-size: var(--text-base);
          color: var(--neutral-600);
          line-height: 1.7;
          margin-bottom: var(--space-4);
        }

        .tip-time {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          color: var(--neutral-500);
          margin-bottom: var(--space-4);
        }

        .expand-button {
          width: 100%;
          padding: var(--space-3);
          background: var(--primary-50);
          border: 1px solid var(--primary-200);
          border-radius: var(--radius-lg);
          color: var(--primary-700);
          font-family: var(--font-body);
          font-weight: var(--fw-medium);
          cursor: pointer;
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        }

        .expand-button:hover {
          background: var(--primary-100);
          border-color: var(--primary-300);
        }

        .expand-icon {
          transition: transform var(--transition-base);
        }

        .expand-icon.rotated {
          transform: rotate(180deg);
        }

        .action-items {
          margin-top: var(--space-4);
          padding: var(--space-4);
          background: var(--neutral-50);
          border-radius: var(--radius-lg);
          animation: expandContent 0.3s ease-out;
        }

        .action-items h4 {
          font-family: var(--font-accent);
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-3);
        }

        .action-items ul {
          list-style: none;
          padding: 0;
        }

        .action-items li {
          padding: var(--space-2) 0;
          padding-left: var(--space-4);
          color: var(--neutral-600);
          position: relative;
        }

        .action-items li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--success-500);
          font-weight: bold;
        }

        .emergency-resources {
          background: var(--error-50);
          border: 2px solid var(--error-200);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          margin-bottom: var(--space-12);
        }

        .emergency-resources h3 {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: var(--fw-semibold);
          color: var(--error-700);
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .resource-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-4);
        }

        .resource-item {
          background: var(--neutral-0);
          border-radius: var(--radius-lg);
          padding: var(--space-4);
          text-align: center;
          border: 1px solid var(--error-200);
        }

        .resource-item h4 {
          font-family: var(--font-accent);
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-2);
        }

        .resource-item p {
          font-size: var(--text-sm);
          color: var(--neutral-600);
          margin-bottom: var(--space-3);
        }

        .resource-link {
          display: inline-block;
          padding: var(--space-2) var(--space-4);
          background: var(--error-500);
          color: white;
          text-decoration: none;
          border-radius: var(--radius-md);
          font-weight: var(--fw-semibold);
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .resource-link:hover {
          background: var(--error-600);
          transform: translateY(-2px);
        }

        .health-cta {
          background: var(--gradient-card);
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          text-align: center;
          border: 1px solid var(--neutral-200);
        }

        .health-cta h3 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-4);
        }

        .health-cta p {
          font-size: var(--text-lg);
          color: var(--neutral-600);
          margin-bottom: var(--space-6);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
        }

        .btn-secondary {
          padding: var(--space-3) var(--space-6);
          background: var(--neutral-0);
          border: 2px solid var(--primary-500);
          border-radius: var(--radius-lg);
          color: var(--primary-600);
          font-family: var(--font-body);
          font-weight: var(--fw-semibold);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .btn-secondary:hover {
          background: var(--primary-500);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-16);
          color: var(--neutral-600);
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--neutral-200);
          border-top: 3px solid var(--primary-500);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: var(--space-4);
        }

        @keyframes expandContent {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .health-tips-grid {
            grid-template-columns: 1fr;
          }

          .health-tip-card {
            padding: var(--space-4);
          }

          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .resource-grid {
            grid-template-columns: 1fr;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons button {
            width: 250px;
          }
        }
      `}</style>
    </section>
  );
};

export default HealthManagement;
