import React from "react";

const ExpertsInsights: React.FC = () => {
  const insights = [
    {
      title: "Breaking Barriers",
      description: "Insights from industry leaders on overcoming challenges in male-dominated tech spaces.",
    },
    {
      title: "Career Advancement",
      description: "Tips and strategies from experts to help women excel in their tech careers.",
    },
    {
      title: "Workplace Inclusivity",
      description: "Advice on fostering inclusive environments and advocating for diversity in tech.",
    },
    {
      title: "Skill Development",
      description: "Guidance on acquiring in-demand skills and staying ahead in the rapidly evolving tech industry.",
    },
    {
      title: "Personal Growth",
      description: "Encouragement and advice on building confidence and resilience in the workplace.",
    },
  ];

  return (
    <section id="experts-insights" className="experts">
      <h2>Experts Insights</h2>
      <div className="insights-container">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card">
            <h3>{insight.title}</h3>
            <p>{insight.description}</p>
          </div>
        ))}
      </div>
      <div className="insights-cta">
        <h3>Become an Expert Contributor</h3>
        <p>Share your expertise and help other women succeed in tech</p>
        <button className="btn-primary">Join Our Expert Network</button>
      </div>
    </section>
  );
};
    ;

export default ExpertsInsights;