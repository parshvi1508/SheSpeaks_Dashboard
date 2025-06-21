import React from "react";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is She Speaks?",
      answer: "She Speaks is a platform designed to empower women in tech by providing resources, community support, and tools for personal and professional growth.",
    },
    {
      question: "How can I join the She Speaks community?",
      answer: "You can join by signing up on our platform and participating in discussions, events, and mentorship programs.",
    },
    {
      question: "Is She Speaks free to use?",
      answer: "Yes, She Speaks offers free access to most of its resources. Some premium features may require a subscription.",
    },
    {
      question: "How can She Speaks help me in my career?",
      answer: "She Speaks provides mentorship programs, expert insights, and skill development resources to help you advance in your career.",
    },
    {
      question: "Can I contribute to She Speaks?",
      answer: "Absolutely! You can contribute by sharing your success stories, participating in discussions, or volunteering as a mentor.",
    },
  ];

  return (
    <section id="faq" className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;