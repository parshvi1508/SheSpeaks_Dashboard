import React, { useState, useEffect, useRef } from 'react';

// Types for mission content
interface MissionPillar {
  id: string;
  title: string;
  description: string;
  icon: string;
  metrics: {
    value: string;
    label: string;
  }[];
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  avatar: string;
}

interface Impact {
  category: string;
  value: string;
  description: string;
  icon: string;
}

// Custom hook for mission data
const useMissionData = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const missionPillars: MissionPillar[] = [
    {
      id: 'community',
      title: 'Foster Supportive Community',
      description: 'Create safe spaces where women in tech can connect, share experiences, and support each other through challenges and successes.',
      icon: '🤝',
      metrics: [
        { value: '15k+', label: 'Community Members' },
        { value: '89%', label: 'Feel Supported' }
      ]
    },
    {
      id: 'resources',
      title: 'Provide Access to Resources',
      description: 'Deliver comprehensive career development tools, technical training, and professional guidance tailored for women in technology.',
      icon: '📚',
      metrics: [
        { value: '500+', label: 'Resources Available' },
        { value: '73%', label: 'Career Growth' }
      ]
    },
    {
      id: 'barriers',
      title: 'Break Down Barriers',
      description: 'Identify and actively work to eliminate systemic obstacles that prevent women from thriving in male-dominated tech environments.',
      icon: '🚧',
      metrics: [
        { value: '25+', label: 'Companies Changed' },
        { value: '60%', label: 'Barrier Reduction' }
      ]
    },
    {
      id: 'advocacy',
      title: 'Drive Industry Change',
      description: 'Use data-driven insights to advocate for policy changes, inclusive practices, and cultural shifts in the technology industry.',
      icon: '📊',
      metrics: [
        { value: '12', label: 'Policy Changes' },
        { value: '40%', label: 'Diversity Increase' }
      ]
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former Google VP Engineering with 15+ years experience building inclusive tech teams.',
      expertise: ['Leadership', 'Engineering Management', 'D&I Strategy'],
      avatar: '👩‍💼'
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      role: 'Head of Community',
      bio: 'Community building expert passionate about creating spaces for women to thrive.',
      expertise: ['Community Management', 'Event Planning', 'Mentorship'],
      avatar: '👩‍🏫'
    },
    {
      id: '3',
      name: 'Dr. Priya Patel',
      role: 'Research Director',
      bio: 'Data scientist specializing in workplace diversity and inclusion research.',
      expertise: ['Data Science', 'Research', 'Analytics'],
      avatar: '👩‍🔬'
    },
    {
      id: '4',
      name: 'Aisha Johnson',
      role: 'Head of Partnerships',
      bio: 'Building strategic relationships with companies committed to gender diversity.',
      expertise: ['Business Development', 'Strategy', 'Partnerships'],
      avatar: '👩‍💻'
    }
  ];

  const impactMetrics: Impact[] = [
    {
      category: 'Community Growth',
      value: '15,000+',
      description: 'Women empowered through our platform',
      icon: '👥'
    },
    {
      category: 'Career Advancement',
      value: '73%',
      description: 'Members report career growth',
      icon: '📈'
    },
    {
      category: 'Industry Influence',
      value: '25+',
      description: 'Companies improved policies',
      icon: '🏢'
    },
    {
      category: 'Research Impact',
      value: '50+',
      description: 'Research papers published',
      icon: '📄'
    }
  ];

  return {
    loading,
    activeTab,
    setActiveTab,
    missionPillars,
    teamMembers,
    impactMetrics
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
const MissionStatement: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const content = {
    mission: {
      title: 'Our Mission',
      text: 'To empower women in technology by fostering a supportive community, providing access to comprehensive resources, and actively breaking down systemic barriers in male-dominated spaces.',
      subtitle: 'We transform individual experiences into collective power for industry-wide change.'
    },
    vision: {
      title: 'Our Vision',
      text: 'A technology industry where women thrive without limitations, where diversity drives innovation, and where every woman feels empowered to reach her full potential.',
      subtitle: 'Building a future where gender equality in tech is the norm, not the exception.'
    },
    values: {
      title: 'Our Values',
      text: 'Inclusivity, authenticity, empowerment, data-driven advocacy, and unwavering support for every woman\'s journey in technology.',
      subtitle: 'These principles guide every decision we make and every program we develop.'
    }
  };

  const current = content[activeTab as keyof typeof content];

  return (
    <div className="mission-statement">
      <h3>{current.title}</h3>
      <p className="statement-text">{current.text}</p>
      <p className="statement-subtitle">{current.subtitle}</p>
    </div>
  );
};

const PillarCard: React.FC<{
  pillar: MissionPillar;
  index: number;
  isVisible: boolean;
}> = ({ pillar, index, isVisible }) => (
  <div 
    className={`pillar-card ${isVisible ? 'animate-slide-up' : ''}`}
    style={{ animationDelay: `${index * 0.15}s` }}
  >
    <div className="pillar-icon">{pillar.icon}</div>
    <h3 className="pillar-title">{pillar.title}</h3>
    <p className="pillar-description">{pillar.description}</p>
    
    <div className="pillar-metrics">
      {pillar.metrics.map((metric, idx) => (
        <div key={idx} className="metric-item">
          <span className="metric-value">{metric.value}</span>
          <span className="metric-label">{metric.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const TeamMemberCard: React.FC<{
  member: TeamMember;
  index: number;
  isVisible: boolean;
}> = ({ member, index, isVisible }) => (
  <div 
    className={`team-member-card ${isVisible ? 'animate-scale-in' : ''}`}
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div className="member-avatar">{member.avatar}</div>
    <h4 className="member-name">{member.name}</h4>
    <p className="member-role">{member.role}</p>
    <p className="member-bio">{member.bio}</p>
    
    <div className="member-expertise">
      {member.expertise.map((skill, idx) => (
        <span key={idx} className="expertise-tag">{skill}</span>
      ))}
    </div>
  </div>
);

// Main component
const OurMission: React.FC = () => {
  const {
    loading,
    activeTab,
    setActiveTab,
    missionPillars,
    teamMembers,
    impactMetrics
  } = useMissionData();
  
  const { ref, isVisible } = useIntersectionObserver();

  if (loading) {
    return (
      <section className="section">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading our mission...</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="section" id="our-mission">
      <div className="mission-header">
        <h2 className="text-gradient">She Speaks</h2>
        <p className="mission-tagline">Where numbers meet narratives. Where voices are visualized.</p>
      </div>

      <div className="mission-tabs">
        {(['mission', 'vision', 'values'] as const).map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <MissionStatement activeTab={activeTab} />

      <div className="impact-metrics">
        <h3>Our Impact</h3>
        <div className="impact-grid">
          {impactMetrics.map((impact, index) => (
            <div 
              key={index}
              className={`impact-card ${isVisible ? 'animate-fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="impact-icon">{impact.icon}</div>
              <div className="impact-value">{impact.value}</div>
              <div className="impact-category">{impact.category}</div>
              <div className="impact-description">{impact.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mission-pillars">
        <h3>How We're Making a Difference</h3>
        <div className="pillars-grid">
          {missionPillars.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <div className="team-section">
        <h3>Meet Our Team</h3>
        <p className="team-description">
          Led by experienced women in tech who understand the challenges and are committed to creating lasting change.
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>

      <div className="mission-cta">
        <h3>Join Our Mission</h3>
        <p>Together, we can build a future where women thrive in technology without limitations.</p>
        <div className="cta-buttons">
          <button className="btn-primary">Join Our Community</button>
          <button className="btn-secondary">Support Our Cause</button>
        </div>
      </div>

      <style>{`
        .mission-header {
          text-align: center;
          margin-bottom: var(--space-12);
        }

        .mission-tagline {
          font-family: var(--font-accent);
          font-size: var(--text-lg);
          color: var(--neutral-600);
          margin-top: var(--space-4);
          font-style: italic;
        }

        .mission-tabs {
          display: flex;
          justify-content: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .tab-button {
          padding: var(--space-3) var(--space-6);
          border: 2px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          background: var(--neutral-0);
          color: var(--neutral-600);
          font-family: var(--font-body);
          font-weight: var(--fw-semibold);
          font-size: var(--text-base);
          cursor: pointer;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .tab-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--gradient-primary);
          transition: left var(--transition-base);
          z-index: -1;
        }

        .tab-button:hover {
          border-color: var(--primary-300);
          color: var(--primary-700);
        }

        .tab-button.active {
          border-color: var(--primary-500);
          color: white;
          box-shadow: var(--shadow-glow);
        }

        .tab-button.active::before {
          left: 0;
        }

        .mission-statement {
          background: var(--gradient-card);
          border-radius: var(--radius-2xl);
          padding: var(--space-10);
          text-align: center;
          margin-bottom: var(--space-12);
          border: 1px solid var(--neutral-200);
          position: relative;
          overflow: hidden;
        }

        .mission-statement::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--gradient-hero);
          opacity: 0.02;
          z-index: -1;
        }

        .mission-statement h3 {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: var(--fw-semibold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-6);
        }

        .statement-text {
          font-size: var(--text-xl);
          color: var(--neutral-700);
          line-height: 1.7;
          margin-bottom: var(--space-4);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .statement-subtitle {
          font-size: var(--text-base);
          color: var(--neutral-500);
          font-style: italic;
        }

        .impact-metrics {
          margin-bottom: var(--space-12);
        }

        .impact-metrics h3 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-6);
        }

        .impact-card {
          background: var(--neutral-0);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-align: center;
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
        }

        .impact-card.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .impact-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transition: transform var(--transition-base);
        }

        .impact-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-200);
        }

        .impact-card:hover::after {
          transform: scaleX(1);
        }

        .impact-icon {
          font-size: 2rem;
          margin-bottom: var(--space-3);
        }

        .impact-value {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-2);
        }

        .impact-category {
          font-family: var(--font-accent);
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-2);
        }

        .impact-description {
          font-size: var(--text-sm);
          color: var(--neutral-600);
        }

        .mission-pillars {
          margin-bottom: var(--space-12);
        }

        .mission-pillars h3 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: var(--space-8);
        }

        .pillar-card {
          background: var(--neutral-0);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
        }

        .pillar-card.animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        .pillar-card::before {
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

        .pillar-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-200);
        }

        .pillar-card:hover::before {
          transform: scaleX(1);
        }

        .pillar-icon {
          font-size: 3rem;
          margin-bottom: var(--space-4);
          text-align: center;
        }

        .pillar-title {
          font-family: var(--font-accent);
          font-size: var(--text-xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-4);
          text-align: center;
        }

        .pillar-description {
          font-size: var(--text-base);
          color: var(--neutral-600);
          line-height: 1.7;
          margin-bottom: var(--space-6);
          text-align: center;
        }

        .pillar-metrics {
          display: flex;
          justify-content: space-around;
          gap: var(--space-4);
        }

        .metric-item {
          text-align: center;
          padding: var(--space-3);
          background: var(--primary-50);
          border-radius: var(--radius-lg);
          flex: 1;
        }

        .metric-value {
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }

        .metric-label {
          font-size: var(--text-xs);
          color: var(--neutral-600);
          font-weight: var(--fw-medium);
          margin-top: var(--space-1);
        }

        .team-section {
          margin-bottom: var(--space-12);
        }

        .team-section h3 {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          text-align: center;
          margin-bottom: var(--space-4);
        }

        .team-description {
          font-size: var(--text-lg);
          color: var(--neutral-600);
          text-align: center;
          margin-bottom: var(--space-8);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-6);
        }

        .team-member-card {
          background: var(--neutral-0);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          padding: var(--space-6);
          text-align: center;
          transition: all var(--transition-base);
          opacity: 0;
          transform: scale(0.9);
        }

        .team-member-card.animate-scale-in {
          opacity: 1;
          transform: scale(1);
        }

        .team-member-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary-200);
        }

        .member-avatar {
          font-size: 3rem;
          margin-bottom: var(--space-4);
        }

        .member-name {
          font-family: var(--font-accent);
          font-size: var(--text-lg);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-2);
        }

        .member-role {
          font-size: var(--text-base);
          color: var(--primary-600);
          font-weight: var(--fw-medium);
          margin-bottom: var(--space-3);
        }

        .member-bio {
          font-size: var(--text-sm);
          color: var(--neutral-600);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }

        .member-expertise {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-2);
        }

        .expertise-tag {
          padding: var(--space-1) var(--space-3);
          background: var(--primary-100);
          color: var(--primary-700);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--fw-medium);
        }

        .mission-cta {
          background: var(--gradient-card);
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          text-align: center;
          border: 1px solid var(--neutral-200);
        }

        .mission-cta h3 {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: var(--fw-semibold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-4);
        }

        .mission-cta p {
          font-size: var(--text-lg);
          color: var(--neutral-600);
          margin-bottom: var(--space-8);
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

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .mission-tabs {
            flex-direction: column;
            align-items: center;
          }

          .tab-button {
            width: 200px;
          }

          .impact-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .pillars-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons button {
            width: 250px;
          }
        }

        @media (max-width: 480px) {
          .impact-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default OurMission;
