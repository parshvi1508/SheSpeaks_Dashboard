import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li><a href="#health-management">Health Management</a></li>
          <li><a href="#benefits">Benefits of Using She Sync</a></li>
          <li><a href="#mission">Our Mission</a></li>
          <li><a href="#success-stories">Success Stories</a></li>
          <li><a href="#experts-insights">Experts Insights</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;