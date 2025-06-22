import React, { useState } from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerSections: FooterSection[] = [
    {
      title: 'Platform',
      links: [
        { label: 'Dashboard', href: '#dashboard' },
        { label: 'Survey', href: '#survey' },
        { label: 'Data Insights', href: '#insights' },
        { label: 'Community', href: '#community' },
        { label: 'Resources', href: '#resources' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#help' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Mentorship', href: '#mentorship' },
        { label: 'Wellness', href: '#wellness' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Our Mission', href: '#mission' },
        { label: 'Team', href: '#team' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press', href: '#press' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'Data Protection', href: '#data-protection' },
        { label: 'Accessibility', href: '#accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', href: '#twitter', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: '💼', href: '#linkedin', color: '#0077B5' },
    { name: 'Instagram', icon: '📷', href: '#instagram', color: '#E4405F' },
    { name: 'YouTube', icon: '📺', href: '#youtube', color: '#FF0000' },
    { name: 'GitHub', icon: '👩‍💻', href: '#github', color: '#333' }
  ];

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="brand-logo">
            <h3 className="brand-title">SheSpeaks</h3>
            <p className="brand-tagline">Where voices are visualized</p>
          </div>
          
          <p className="brand-description">
            Empowering women in technology through data-driven insights, 
            community support, and professional development resources.
          </p>

          {/* Newsletter Signup */}
          <div className="newsletter-section">
            <h4>Stay Connected</h4>
            <p>Get the latest insights and updates delivered to your inbox.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-button">
                  {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                </button>
              </div>
            </form>
            
            {isSubscribed && (
              <p className="success-message">
                Thank you for subscribing! Welcome to the SheSpeaks community.
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="social-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="social-link"
                  style={{ '--social-color': social.color } as React.CSSProperties}
                  title={social.name}
                >
                  <span className="social-icon">{social.icon}</span>
                  <span className="social-label">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          {footerSections.map((section) => (
            <div key={section.title} className="footer-section">
              <h4 className="section-title">{section.title}</h4>
              <ul className="section-links">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="footer-contact">
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <a href="mailto:hello@shespeaks.tech" className="contact-link">
              hello@shespeaks.tech
            </a>
          </div>
          
          <div className="contact-item">
            <span className="contact-icon">💬</span>
            <span className="contact-text">24/7 Community Support</span>
          </div>
          
          <div className="contact-item">
            <span className="contact-icon">🌍</span>
            <span className="contact-text">Global Community</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="bottom-content">
          <div className="copyright">
            <p>© 2025 SheSpeaks. Empowering Women in Tech.</p>
            <p className="tagline">Building a future where women thrive in technology.</p>
          </div>
          
          <div className="footer-stats">
            <div className="stat-item">
              <span className="stat-number">15k+</span>
              <span className="stat-label">Women Empowered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Companies Impacted</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">89%</span>
              <span className="stat-label">Career Growth</span>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .footer {
          background: var(--neutral-900);
          color: var(--neutral-300);
          position: relative;
          overflow: hidden;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--gradient-hero);
          opacity: 0.05;
          z-index: 0;
        }

        .footer-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--space-16) var(--space-8) var(--space-12);
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-16);
        }

        .footer-brand {
          max-width: 400px;
        }

        .brand-logo {
          margin-bottom: var(--space-6);
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: var(--space-2);
        }

        .brand-tagline {
          font-family: var(--font-accent);
          font-size: var(--text-sm);
          color: var(--neutral-400);
          font-style: italic;
          margin: 0;
        }

        .brand-description {
          font-size: var(--text-base);
          line-height: 1.7;
          color: var(--neutral-300);
          margin-bottom: var(--space-8);
        }

        .newsletter-section {
          margin-bottom: var(--space-8);
        }

        .newsletter-section h4 {
          font-family: var(--font-accent);
          font-size: var(--text-lg);
          font-weight: var(--fw-semibold);
          color: var(--neutral-100);
          margin-bottom: var(--space-2);
        }

        .newsletter-section p {
          font-size: var(--text-sm);
          color: var(--neutral-400);
          margin-bottom: var(--space-4);
        }

        .newsletter-form {
          margin-bottom: var(--space-4);
        }

        .input-group {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-3);
        }

        .newsletter-input {
          flex: 1;
          padding: var(--space-3) var(--space-4);
          border: 1px solid var(--neutral-600);
          border-radius: var(--radius-lg);
          background: var(--neutral-800);
          color: var(--neutral-100);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--primary-500);
          background: var(--neutral-700);
          box-shadow: 0 0 0 3px rgba(238, 87, 255, 0.1);
        }

        .newsletter-button {
          padding: var(--space-3) var(--space-6);
          background: var(--gradient-primary);
          border: none;
          border-radius: var(--radius-lg);
          color: white;
          font-family: var(--font-body);
          font-weight: var(--fw-semibold);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-base);
          white-space: nowrap;
        }

        .newsletter-button:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .success-message {
          font-size: var(--text-sm);
          color: var(--success-500);
          font-weight: var(--fw-medium);
          margin: 0;
        }

        .social-section h4 {
          font-family: var(--font-accent);
          font-size: var(--text-lg);
          font-weight: var(--fw-semibold);
          color: var(--neutral-100);
          margin-bottom: var(--space-4);
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background: var(--neutral-800);
          border: 1px solid var(--neutral-600);
          border-radius: var(--radius-lg);
          color: var(--neutral-300);
          text-decoration: none;
          font-size: var(--text-sm);
          transition: all var(--transition-base);
        }

        .social-link:hover {
          background: var(--neutral-700);
          border-color: var(--social-color);
          color: var(--social-color);
          transform: translateY(-2px);
        }

        .social-icon {
          font-size: var(--text-base);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-8);
        }

        .footer-section {
          min-width: 0;
        }

        .section-title {
          font-family: var(--font-accent);
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--neutral-100);
          margin-bottom: var(--space-4);
        }

        .section-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .section-links li {
          margin-bottom: var(--space-2);
        }

        .footer-link {
          color: var(--neutral-400);
          text-decoration: none;
          font-size: var(--text-sm);
          transition: all var(--transition-base);
          display: block;
          padding: var(--space-1) 0;
        }

        .footer-link:hover {
          color: var(--primary-400);
          transform: translateX(4px);
        }

        .footer-contact {
          background: var(--neutral-800);
          border-top: 1px solid var(--neutral-700);
          padding: var(--space-6) var(--space-8);
          position: relative;
          z-index: 1;
        }

        .contact-info {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: var(--space-8);
          flex-wrap: wrap;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .contact-icon {
          font-size: var(--text-lg);
        }

        .contact-link {
          color: var(--primary-400);
          text-decoration: none;
          font-weight: var(--fw-medium);
          transition: color var(--transition-base);
        }

        .contact-link:hover {
          color: var(--primary-300);
        }

        .contact-text {
          color: var(--neutral-300);
          font-size: var(--text-sm);
        }

        .footer-bottom {
          background: var(--neutral-900);
          border-top: 1px solid var(--neutral-700);
          padding: var(--space-6) var(--space-8);
          position: relative;
          z-index: 1;
        }

        .bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-6);
        }

        .copyright p {
          margin: 0;
          font-size: var(--text-sm);
          color: var(--neutral-400);
        }

        .tagline {
          font-style: italic;
          color: var(--neutral-500) !important;
          margin-top: var(--space-1) !important;
        }

        .footer-stats {
          display: flex;
          gap: var(--space-6);
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-family: var(--font-mono);
          font-size: var(--text-lg);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          display: block;
          font-size: var(--text-xs);
          color: var(--neutral-500);
          margin-top: var(--space-1);
        }

        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: var(--space-12);
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
          }
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: var(--space-12) var(--space-4) var(--space-8);
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }

          .input-group {
            flex-direction: column;
          }

          .social-links {
            justify-content: center;
          }

          .contact-info {
            flex-direction: column;
            text-align: center;
            gap: var(--space-4);
          }

          .bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-stats {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-stats {
            flex-direction: column;
            gap: var(--space-3);
          }

          .social-links {
            flex-direction: column;
            align-items: center;
          }

          .social-link {
            width: 200px;
            justify-content: center;
          }
        }
        `}
      </style>
    </footer>
  );
};

export default Footer;
