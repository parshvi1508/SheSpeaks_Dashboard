import React, { useEffect, useRef, useState } from 'react';

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  metric?: string;
  metricLabel?: string;
}

const BenefitsOfUsingSheSpeaks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits: Benefit[] = [
    {
      id: 'safe-space',
      icon: '🛡️',
      title: 'Safe & Anonymous Platform',
      description: 'Share your experiences without fear of judgment. Our platform ensures complete anonymity while fostering genuine connections among women in tech.',
      metric: '98%',
      metricLabel: 'Feel Safe to Share'
    },
    {
      id: 'data-insights',
      icon: '📊',
      title: 'Data-Driven Insights',
      description: 'Transform personal experiences into powerful visualizations. See patterns, trends, and collective challenges that drive meaningful change in the industry.',
      metric: '15x',
      metricLabel: 'Better Understanding'
    },
    {
      id: 'community-support',
      icon: '🤝',
      title: 'Supportive Community',
      description: 'Connect with like-minded women facing similar challenges. Find mentorship, support, and solidarity in your tech journey.',
      metric: '500+',
      metricLabel: 'Active Members'
    },
    {
      id: 'career-growth',
      icon: '🚀',
      title: 'Career Development',
      description: 'Access resources, strategies, and insights that help navigate career challenges specific to women in technology fields.',
      metric: '73%',
      metricLabel: 'Career Advancement'
    },
    {
      id: 'voice-amplification',
      icon: '📢',
      title: 'Amplify Your Voice',
      description: 'Your stories matter. Help create a comprehensive narrative that influences policy, workplace culture, and industry standards.',
      metric: '10k+',
      metricLabel: 'Stories Shared'
    },
    {
      id: 'research-impact',
      icon: '🔬',
      title: 'Research Impact',
      description: 'Contribute to academic research and industry reports that shape the future of women in technology through evidence-based advocacy.',
      metric: '25+',
      metricLabel: 'Research Papers'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className={`section ${isVisible ? 'animate-fade-in' : ''}`}
      id="benefits"
    >
      <div className="benefits-header">
        <h2 className="text-gradient">Benefits of Using SheSpeaks</h2>
        <p className="benefits-subtitle">
          Empowering women in tech through data, community, and collective action. 
          Join a movement where your voice becomes a catalyst for industry-wide change.
        </p>
      </div>

      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div 
            key={benefit.id}
            className={`benefit-card ${isVisible ? 'animate-slide-up' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="benefit-icon">
              <span className="icon-emoji">{benefit.icon}</span>
            </div>
            
            <div className="benefit-content">
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
              
              {benefit.metric && (
                <div className="benefit-metric">
                  <span className="metric-value">{benefit.metric}</span>
                  <span className="metric-label">{benefit.metricLabel}</span>
                </div>
              )}
            </div>
            
            <div className="benefit-hover-indicator"></div>
          </div>
        ))}
      </div>

      <div className="benefits-cta">
        <div className="cta-content">
          <h3>Ready to Make Your Voice Heard?</h3>
          <p>Join thousands of women who are reshaping the tech industry through shared experiences and data-driven insights.</p>
          <button className="btn-primary cta-button">
            Start Your Journey
            <span className="button-arrow">→</span>
          </button>
        </div>
        
        <div className="voice-visualization">
          <div className="voice-pattern">
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
            <div className="voice-bar"></div>
          </div>
          <p className="voice-caption">Your voice visualized</p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .benefits-header {
            text-align: center;
            margin-bottom: var(--space-12);
          }

          .benefits-subtitle {
            font-size: var(--text-lg);
            color: var(--neutral-600);
            max-width: 800px;
            margin: var(--space-6) auto 0;
            line-height: 1.7;
          }

          .benefits-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
            gap: var(--space-8);
            margin-bottom: var(--space-12);
          }

          .benefit-card {
            background: var(--neutral-0);
            border: 1px solid var(--neutral-200);
            border-radius: var(--radius-2xl);
            padding: var(--space-8);
            transition: all var(--transition-base);
            position: relative;
            overflow: hidden;
            cursor: pointer;
            opacity: 0;
            transform: translateY(30px);
          }

          .benefit-card.animate-slide-up {
            opacity: 1;
            transform: translateY(0);
          }

          .benefit-card::before {
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

          .benefit-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-xl);
            border-color: var(--primary-200);
          }

          .benefit-card:hover::before {
            transform: scaleX(1);
          }

          .benefit-icon {
            width: 80px;
            height: 80px;
            background: var(--gradient-card);
            border-radius: var(--radius-2xl);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--space-6);
            position: relative;
            overflow: hidden;
          }

          .benefit-icon::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--gradient-primary);
            opacity: 0;
            transition: opacity var(--transition-base);
          }

          .benefit-card:hover .benefit-icon::after {
            opacity: 0.1;
          }

          .icon-emoji {
            font-size: 2rem;
            position: relative;
            z-index: 1;
          }

          .benefit-title {
            font-family: var(--font-accent);
            font-size: var(--text-xl);
            font-weight: var(--fw-semibold);
            color: var(--neutral-800);
            margin-bottom: var(--space-4);
          }

          .benefit-description {
            font-size: var(--text-base);
            color: var(--neutral-600);
            line-height: 1.7;
            margin-bottom: var(--space-6);
          }

          .benefit-metric {
            display: flex;
            align-items: baseline;
            gap: var(--space-2);
            padding: var(--space-4);
            background: var(--primary-50);
            border-radius: var(--radius-lg);
            border-left: 4px solid var(--primary-500);
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
            font-weight: var(--fw-medium);
            color: var(--neutral-600);
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .benefit-hover-indicator {
            position: absolute;
            bottom: var(--space-4);
            right: var(--space-4);
            width: 12px;
            height: 12px;
            background: var(--primary-400);
            border-radius: var(--radius-full);
            opacity: 0;
            transform: scale(0);
            transition: all var(--transition-base);
          }

          .benefit-card:hover .benefit-hover-indicator {
            opacity: 1;
            transform: scale(1);
            animation: pulse 1.5s ease-in-out infinite;
          }

          .benefits-cta {
            background: var(--gradient-card);
            border-radius: var(--radius-2xl);
            padding: var(--space-12);
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: var(--space-8);
            align-items: center;
            border: 1px solid var(--neutral-200);
          }

          .cta-content h3 {
            font-family: var(--font-display);
            font-size: var(--text-2xl);
            font-weight: var(--fw-semibold);
            color: var(--neutral-800);
            margin-bottom: var(--space-4);
          }

          .cta-content p {
            font-size: var(--text-base);
            color: var(--neutral-600);
            line-height: 1.7;
            margin-bottom: var(--space-6);
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2);
            padding: var(--space-4) var(--space-8);
          }

          .button-arrow {
            transition: transform var(--transition-base);
          }

          .cta-button:hover .button-arrow {
            transform: translateX(4px);
          }

          .voice-visualization {
            text-align: center;
          }

          .voice-caption {
            font-size: var(--text-sm);
            color: var(--neutral-500);
            margin-top: var(--space-4);
            font-style: italic;
          }

          @media (max-width: 768px) {
            .benefits-grid {
              grid-template-columns: 1fr;
              gap: var(--space-6);
            }

            .benefit-card {
              padding: var(--space-6);
            }

            .benefits-cta {
              grid-template-columns: 1fr;
              text-align: center;
              padding: var(--space-8);
            }
          }
        `
      }} />
    </section>
  );
};

export default BenefitsOfUsingSheSpeaks;
