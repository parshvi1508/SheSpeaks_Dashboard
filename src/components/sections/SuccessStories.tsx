import React, { useEffect, useRef, useState } from 'react';

interface Story {
  id: string;
  category: 'Career Growth' | 'Leadership' | 'Community Impact' | 'Research' | 'Mentorship';
  title: string;
  excerpt: string;
  impact: string;
  metrics: {
    value: string;
    label: string;
  }[];
  quote: string;
  author: string;
  role: string;
  company: string;
  timeframe: string;
}

const SuccessStories: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStory, setActiveStory] = useState<string | null>(null);
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

  const stories: Story[] = [
    {
      id: 'sarah-tech-lead',
      category: 'Leadership',
      title: 'From Imposter Syndrome to Tech Leadership',
      excerpt: 'Through SheSpeaks community support and data insights, Sarah overcame imposter syndrome and became a senior engineering manager.',
      impact: 'Led 3 successful product launches, mentored 15+ junior developers',
      metrics: [
        { value: '40%', label: 'Confidence Increase' },
        { value: '2x', label: 'Promotion Speed' }
      ],
      quote: "SheSpeaks showed me that my struggles weren't unique or insurmountable. The data visualization helped me see patterns in successful women's journeys, giving me a roadmap to follow.",
      author: 'Sarah Chen',
      role: 'Senior Engineering Manager',
      company: 'TechFlow Inc.',
      timeframe: '18 months'
    },
    {
      id: 'maria-research',
      category: 'Research',
      title: 'Transforming Industry Research',
      excerpt: 'Maria leveraged SheSpeaks data to publish groundbreaking research on gender bias in tech recruitment.',
      impact: 'Published in 3 top-tier journals, influenced 50+ companies hiring practices',
      metrics: [
        { value: '10k+', label: 'Citations' },
        { value: '50+', label: 'Companies Impacted' }
      ],
      quote: "The anonymous data from SheSpeaks provided unprecedented insights into the real experiences of women in tech. This research is changing how companies approach diversity.",
      author: 'Dr. Maria Rodriguez',
      role: 'Research Scientist',
      company: 'Stanford University',
      timeframe: '2 years'
    },
    {
      id: 'priya-startup',
      category: 'Career Growth',
      title: 'Startup Success Story',
      excerpt: 'Priya found her co-founder through SheSpeaks community and built a successful healthtech startup.',
      impact: 'Raised $5M Series A, 20+ employees, serving 100k+ users',
      metrics: [
        { value: '$5M', label: 'Funding Raised' },
        { value: '100k+', label: 'Users Served' }
      ],
      quote: "I met my co-founder in a SheSpeaks discussion about workplace challenges. We realized we could solve these problems together through technology.",
      author: 'Priya Patel',
      role: 'CEO & Co-founder',
      company: 'HealthTech Solutions',
      timeframe: '3 years'
    },
    {
      id: 'jessica-mentorship',
      category: 'Mentorship',
      title: 'Building a Mentorship Network',
      excerpt: 'Jessica created a structured mentorship program connecting senior and junior women in tech through SheSpeaks insights.',
      impact: 'Mentored 200+ women, 85% retention rate in tech',
      metrics: [
        { value: '200+', label: 'Women Mentored' },
        { value: '85%', label: 'Retention Rate' }
      ],
      quote: "The stories shared on SheSpeaks revealed common pain points in women's tech journeys. I created a mentorship program to address these specific challenges.",
      author: 'Jessica Wang',
      role: 'VP Engineering',
      company: 'DataCorp',
      timeframe: '2.5 years'
    },
    {
      id: 'aisha-policy',
      category: 'Community Impact',
      title: 'Driving Policy Change',
      excerpt: 'Aisha used SheSpeaks data to advocate for parental leave policy changes at major tech companies.',
      impact: 'Influenced policy at 10+ companies, affecting 50k+ employees',
      metrics: [
        { value: '10+', label: 'Companies Changed' },
        { value: '50k+', label: 'Employees Benefited' }
      ],
      quote: "The aggregated data from SheSpeaks provided concrete evidence of the challenges working mothers face in tech. This data was crucial in convincing leadership.",
      author: 'Aisha Johnson',
      role: 'Head of People Operations',
      company: 'Multiple Companies',
      timeframe: '18 months'
    }
  ];

  const categories = ['All', 'Career Growth', 'Leadership', 'Community Impact', 'Research', 'Mentorship'];

  const filteredStories = selectedCategory === 'All' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  return (
    <section 
      ref={sectionRef}
      className={`section ${isVisible ? 'animate-fade-in' : ''}`}
      id="success-stories"
    >
      <div className="stories-header">
        <h2 className="text-gradient">Success Stories</h2>
        <p className="stories-subtitle">
          Real women, real impact. Discover how SheSpeaks community members are transforming 
          their careers and driving change across the tech industry.
        </p>
      </div>

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

      <div className="stories-grid">
        {filteredStories.map((story, index) => (
          <div 
            key={story.id}
            className={`story-card ${isVisible ? 'animate-slide-up' : ''} ${activeStory === story.id ? 'expanded' : ''}`}
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
          >
            <div className="story-header">
              <div className="story-category">
                <span className="category-badge">{story.category}</span>
                <span className="story-timeframe">{story.timeframe}</span>
              </div>
              <div className="story-expand-icon">
                {activeStory === story.id ? '−' : '+'}
              </div>
            </div>

            <h3 className="story-title">{story.title}</h3>
            <p className="story-excerpt">{story.excerpt}</p>

            <div className="story-metrics">
              {story.metrics.map((metric, idx) => (
                <div key={idx} className="metric-item">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                </div>
              ))}
            </div>

            {activeStory === story.id && (
              <div className="story-expanded-content">
                <div className="story-impact">
                  <h4>Impact Achieved</h4>
                  <p>{story.impact}</p>
                </div>

                <blockquote className="story-quote">
                  <p>"{story.quote}"</p>
                  <cite>
                    <strong>{story.author}</strong>
                    <span>{story.role} at {story.company}</span>
                  </cite>
                </blockquote>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="stories-cta">
        <div className="cta-content">
          <h3>Your Success Story Starts Here</h3>
          <p>Join these inspiring women and thousands more who are building careers, driving change, and supporting each other through shared experiences.</p>
          
          <div className="cta-stats">
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Success Stories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">89%</span>
              <span className="stat-label">Career Growth</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15k+</span>
              <span className="stat-label">Community Members</span>
            </div>
          </div>

          <button className="btn-primary cta-button">
            Share Your Story
            <span className="button-arrow">→</span>
          </button>
        </div>
      </div>

      <style>{`
        .stories-header {
          text-align: center;
          margin-bottom: var(--space-10);
        }

        .stories-subtitle {
          font-size: var(--text-lg);
          color: var(--neutral-600);
          max-width: 800px;
          margin: var(--space-6) auto 0;
          line-height: 1.7;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: var(--space-10);
        }

        .category-filter {
          padding: var(--space-3) var(--space-6);
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
          box-shadow: var(--shadow-glow);
        }

        .stories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--space-6);
          margin-bottom: var(--space-12);
        }

        .story-card {
          background: var(--neutral-0);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          transition: all var(--transition-base);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(30px);
        }

        .story-card.animate-slide-up {
          opacity: 1;
          transform: translateY(0);
        }

        .story-card::before {
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

        .story-card:hover::before,
        .story-card.expanded::before {
          transform: scaleX(1);
        }

        .story-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-200);
        }

        .story-card.expanded {
          border-color: var(--primary-300);
          box-shadow: var(--shadow-glow);
        }

        .story-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-4);
        }

        .story-category {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .category-badge {
          padding: var(--space-1) var(--space-3);
          background: var(--primary-100);
          color: var(--primary-700);
          border-radius: var(--radius-full);
          font-size: var(--text-xs);
          font-weight: var(--fw-semibold);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .story-timeframe {
          font-size: var(--text-xs);
          color: var(--neutral-500);
          font-weight: var(--fw-medium);
        }

        .story-expand-icon {
          width: 32px;
          height: 32px;
          background: var(--primary-100);
          color: var(--primary-600);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--fw-bold);
          transition: all var(--transition-base);
        }

        .story-card:hover .story-expand-icon {
          background: var(--primary-200);
          transform: scale(1.1);
        }

        .story-title {
          font-family: var(--font-accent);
          font-size: var(--text-xl);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-4);
          line-height: 1.4;
        }

        .story-excerpt {
          font-size: var(--text-base);
          color: var(--neutral-600);
          line-height: 1.7;
          margin-bottom: var(--space-6);
        }

        .story-metrics {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .metric-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-3);
          background: var(--neutral-50);
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
        }

        .metric-label {
          font-size: var(--text-xs);
          color: var(--neutral-500);
          font-weight: var(--fw-medium);
          text-align: center;
          margin-top: var(--space-1);
        }

        .story-expanded-content {
          border-top: 1px solid var(--neutral-200);
          padding-top: var(--space-6);
          margin-top: var(--space-6);
          animation: expandContent 0.3s ease-out;
        }

        @keyframes expandContent {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .story-impact {
          margin-bottom: var(--space-6);
        }

        .story-impact h4 {
          font-family: var(--font-accent);
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          margin-bottom: var(--space-2);
        }

        .story-impact p {
          color: var(--neutral-600);
          line-height: 1.6;
        }

        .story-quote {
          background: var(--primary-50);
          border-left: 4px solid var(--primary-500);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          margin: 0;
          font-style: italic;
        }

        .story-quote p {
          font-size: var(--text-base);
          color: var(--neutral-700);
          line-height: 1.7;
          margin-bottom: var(--space-4);
        }

        .story-quote cite {
          display: block;
          font-style: normal;
        }

        .story-quote cite strong {
          color: var(--neutral-800);
          font-weight: var(--fw-semibold);
        }

        .story-quote cite span {
          display: block;
          font-size: var(--text-sm);
          color: var(--neutral-500);
          margin-top: var(--space-1);
        }

        .stories-cta {
          background: var(--gradient-card);
          border-radius: var(--radius-2xl);
          padding: var(--space-12);
          text-align: center;
          border: 1px solid var(--neutral-200);
        }

        .cta-content h3 {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: var(--fw-semibold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-4);
        }

        .cta-content p {
          font-size: var(--text-lg);
          color: var(--neutral-600);
          line-height: 1.7;
          margin-bottom: var(--space-8);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-stats {
          display: flex;
          justify-content: center;
          gap: var(--space-8);
          margin-bottom: var(--space-8);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-number {
          font-family: var(--font-mono);
          font-size: var(--text-3xl);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          font-size: var(--text-sm);
          color: var(--neutral-600);
          font-weight: var(--fw-medium);
          margin-top: var(--space-1);
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

        @media (max-width: 768px) {
          .stories-grid {
            grid-template-columns: 1fr;
          }

          .story-card {
            padding: var(--space-6);
          }

          .story-metrics {
            flex-direction: column;
            gap: var(--space-2);
          }

          .cta-stats {
            flex-direction: column;
            gap: var(--space-4);
          }

          .category-filters {
            gap: var(--space-2);
          }

          .category-filter {
            padding: var(--space-2) var(--space-4);
            font-size: var(--text-xs);
          }
        }
      `}</style>
    </section>
  );
};

export default SuccessStories;
