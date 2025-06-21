import React from "react";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>She Speaks</h1>
      <div className="header-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;