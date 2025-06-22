import React, { useState, useEffect } from 'react';

interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface User {
  name: string;
  avatar: string;
  role: string;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock user data - replace with actual auth state
  const user: User = {
    name: 'Sarah Chen',
    avatar: '👩‍💼',
    role: 'Community Member'
  };

  const navigationItems: NavigationItem[] = [
    { label: 'Dashboard', href: '#dashboard', isActive: true },
    { label: 'Survey', href: '#survey' },
    { label: 'Insights', href: '#insights' },
    { label: 'Community', href: '#community' },
    { label: 'Resources', href: '#resources' },
    { label: 'Support', href: '#support' }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMenuOpen(false);
      setShowUserMenu(false);
    };

    if (isMenuOpen || showUserMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen, showUserMenu]);

  const handleLogin = () => {
    // Mock login - replace with actual auth logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Section */}
        <div className="brand-section">
          <div className="brand-logo">
            <div className="logo-icon">👩‍💻</div>
            <div className="brand-text">
              <h1 className="brand-title">SheSpeaks</h1>
              <span className="brand-tagline">Where voices are visualized</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.label} className="nav-item">
                <a 
                  href={item.href} 
                  className={`nav-link ${item.isActive ? 'active' : ''}`}
                >
                  {item.label}
                  {item.isActive && <span className="active-indicator"></span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="user-section">
          {isLoggedIn ? (
            <div className="user-menu-container">
              {/* Notifications */}
              <button className="notification-btn">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>

              {/* User Profile */}
              <div className="user-profile" onClick={(e) => {
                e.stopPropagation();
                setShowUserMenu(!showUserMenu);
              }}>
                <div className="user-avatar">{user.avatar}</div>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-role">{user.role}</span>
                </div>
                <span className={`dropdown-arrow ${showUserMenu ? 'rotated' : ''}`}>▼</span>
              </div>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="user-avatar-large">{user.avatar}</div>
                    <div>
                      <div className="dropdown-name">{user.name}</div>
                      <div className="dropdown-role">{user.role}</div>
                    </div>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <ul className="dropdown-menu">
                    <li><a href="#profile" className="dropdown-link">👤 My Profile</a></li>
                    <li><a href="#settings" className="dropdown-link">⚙️ Settings</a></li>
                    <li><a href="#dashboard" className="dropdown-link">📊 My Dashboard</a></li>
                    <li><a href="#help" className="dropdown-link">❓ Help Center</a></li>
                  </ul>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button onClick={handleLogout} className="logout-btn">
                    🚪 Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <button onClick={handleLogin} className="login-btn">
                Sign In
              </button>
              <button className="signup-btn">
                Join Community
                <span className="btn-arrow">→</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-content">
            <ul className="mobile-nav-list">
              {navigationItems.map((item) => (
                <li key={item.label} className="mobile-nav-item">
                  <a 
                    href={item.href} 
                    className={`mobile-nav-link ${item.isActive ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {!isLoggedIn && (
              <div className="mobile-auth-buttons">
                <button onClick={handleLogin} className="mobile-login-btn">
                  Sign In
                </button>
                <button className="mobile-signup-btn">
                  Join Community
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--neutral-200);
          z-index: 1000;
          transition: all var(--transition-base);
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: var(--shadow-lg);
          border-bottom-color: var(--primary-200);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .brand-section {
          display: flex;
          align-items: center;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          text-decoration: none;
          transition: transform var(--transition-base);
        }

        .brand-logo:hover {
          transform: scale(1.02);
        }

        .logo-icon {
          font-size: 2rem;
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .logo-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: logoShine 3s ease-in-out infinite;
        }

        @keyframes logoShine {
          0% { left: -100%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        .brand-text {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--fw-bold);
          background: var(--gradient-primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          line-height: 1.2;
        }

        .brand-tagline {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--neutral-500);
          font-style: italic;
          margin-top: -2px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-list {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: var(--space-2);
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          padding: var(--space-3) var(--space-4);
          color: var(--neutral-600);
          text-decoration: none;
          font-family: var(--font-body);
          font-weight: var(--fw-medium);
          font-size: var(--text-sm);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: var(--primary-50);
          transition: left var(--transition-base);
          z-index: -1;
        }

        .nav-link:hover {
          color: var(--primary-700);
          transform: translateY(-1px);
        }

        .nav-link:hover::before {
          left: 0;
        }

        .nav-link.active {
          color: var(--primary-600);
          background: var(--primary-100);
          font-weight: var(--fw-semibold);
        }

        .active-indicator {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
        }

        .user-section {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .user-menu-container {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          position: relative;
        }

        .notification-btn {
          position: relative;
          background: var(--neutral-100);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          padding: var(--space-3);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .notification-btn:hover {
          background: var(--primary-50);
          border-color: var(--primary-200);
          transform: translateY(-1px);
        }

        .notification-icon {
          font-size: var(--text-lg);
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--error-500);
          color: white;
          font-size: var(--text-xs);
          font-weight: var(--fw-bold);
          padding: 2px 6px;
          border-radius: var(--radius-full);
          min-width: 18px;
          text-align: center;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-2) var(--space-3);
          background: var(--neutral-50);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-lg);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .user-profile:hover {
          background: var(--primary-50);
          border-color: var(--primary-200);
          transform: translateY(-1px);
        }

        .user-avatar {
          font-size: var(--text-xl);
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .user-name {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
          line-height: 1.2;
        }

        .user-role {
          font-size: var(--text-xs);
          color: var(--neutral-500);
          line-height: 1.2;
        }

        .dropdown-arrow {
          color: var(--neutral-400);
          font-size: var(--text-xs);
          transition: transform var(--transition-base);
        }

        .dropdown-arrow.rotated {
          transform: rotate(180deg);
        }

        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: var(--space-2);
          background: var(--neutral-0);
          border: 1px solid var(--neutral-200);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-xl);
          padding: var(--space-4);
          min-width: 250px;
          z-index: 1001;
          animation: dropdownSlide 0.2s ease-out;
        }

        @keyframes dropdownSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }

        .user-avatar-large {
          font-size: var(--text-2xl);
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dropdown-name {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: var(--fw-semibold);
          color: var(--neutral-800);
        }

        .dropdown-role {
          font-size: var(--text-sm);
          color: var(--neutral-500);
        }

        .dropdown-divider {
          height: 1px;
          background: var(--neutral-200);
          margin: var(--space-3) 0;
        }

        .dropdown-menu {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dropdown-menu li {
          margin-bottom: var(--space-1);
        }

        .dropdown-link {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          color: var(--neutral-600);
          text-decoration: none;
          font-size: var(--text-sm);
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
        }

        .dropdown-link:hover {
          background: var(--primary-50);
          color: var(--primary-700);
        }

        .logout-btn {
          width: 100%;
          padding: var(--space-2) var(--space-3);
          background: var(--error-50);
          border: 1px solid var(--error-200);
          border-radius: var(--radius-md);
          color: var(--error-600);
          font-size: var(--text-sm);
          font-weight: var(--fw-medium);
          cursor: pointer;
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          gap: var(--space-2);
        }

        .logout-btn:hover {
          background: var(--error-100);
          border-color: var(--error-300);
        }

        .auth-buttons {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .login-btn {
          padding: var(--space-3) var(--space-5);
          background: var(--neutral-0);
          border: 1px solid var(--neutral-300);
          border-radius: var(--radius-lg);
          color: var(--neutral-700);
          font-family: var(--font-body);
          font-weight: var(--fw-medium);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .login-btn:hover {
          background: var(--neutral-50);
          border-color: var(--primary-300);
          color: var(--primary-700);
          transform: translateY(-1px);
        }

        .signup-btn {
          padding: var(--space-3) var(--space-5);
          background: var(--gradient-primary);
          border: none;
          border-radius: var(--radius-lg);
          color: white;
          font-family: var(--font-body);
          font-weight: var(--fw-semibold);
          font-size: var(--text-sm);
          cursor: pointer;
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          gap: var(--space-2);
          position: relative;
          overflow: hidden;
        }

        .signup-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left var(--transition-slow);
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .signup-btn:hover::before {
          left: 100%;
        }

        .btn-arrow {
          transition: transform var(--transition-base);
        }

        .signup-btn:hover .btn-arrow {
          transform: translateX(2px);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          width: 24px;
          height: 18px;
          position: relative;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--neutral-600);
          border-radius: 1px;
          transition: all var(--transition-base);
          position: absolute;
        }

        .hamburger span:nth-child(1) {
          top: 0;
        }

        .hamburger span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        .hamburger span:nth-child(3) {
          bottom: 0;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg);
          top: 50%;
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg);
          bottom: 50%;
        }

        .mobile-nav {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: var(--neutral-0);
          border-bottom: 1px solid var(--neutral-200);
          box-shadow: var(--shadow-lg);
          animation: mobileSlide 0.3s ease-out;
        }

        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-nav-content {
          padding: var(--space-6);
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          margin-bottom: var(--space-6);
        }

        .mobile-nav-item {
          margin-bottom: var(--space-2);
        }

        .mobile-nav-link {
          display: block;
          padding: var(--space-4);
          color: var(--neutral-600);
          text-decoration: none;
          font-family: var(--font-body);
          font-weight: var(--fw-medium);
          font-size: var(--text-base);
          border-radius: var(--radius-lg);
          transition: all var(--transition-base);
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: var(--primary-50);
          color: var(--primary-700);
        }

        .mobile-auth-buttons {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .mobile-login-btn,
        .mobile-signup-btn {
          width: 100%;
          padding: var(--space-4);
          border-radius: var(--radius-lg);
          font-family: var(--font-body);
          font-weight: var(--fw-semibold);
          font-size: var(--text-base);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .mobile-login-btn {
          background: var(--neutral-0);
          border: 1px solid var(--neutral-300);
          color: var(--neutral-700);
        }

        .mobile-signup-btn {
          background: var(--gradient-primary);
          border: none;
          color: white;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }

          .mobile-menu-toggle {
            display: block;
          }

          .mobile-nav {
            display: block;
          }

          .user-info {
            display: none;
          }

          .brand-tagline {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 var(--space-4);
          }

          .brand-title {
            font-size: var(--text-xl);
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
          }

          .notification-btn {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .auth-buttons {
            gap: var(--space-2);
          }

          .login-btn,
          .signup-btn {
            padding: var(--space-2) var(--space-3);
            font-size: var(--text-xs);
          }

          .btn-arrow {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
