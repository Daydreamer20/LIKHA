import React, { useEffect, useRef } from 'react';
import { BookOpen, Gamepad2, Tv, Download, Users, Accessibility } from 'lucide-react';

const Features = () => {
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    featureRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      featureRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const features = [
    {
      icon: <BookOpen size={32} />,
      title: "Interactive Storybooks",
      description: "Explore narrated and interactive storybooks featuring the winners of the DepEd Gawad Teodora Alonso Storybook Writing Competition.",
      color: "bg-likha-blue"
    },
    {
      icon: <Tv size={32} />,
      title: "Multimedia Resources",
      description: "Watch DepEd TV, an educational program based on Self-Learning Modules (SLMs), and explore the Reading Treasury, a collection of narrated storybooks.",
      color: "bg-likha-purple"
    },
    {
      icon: <Gamepad2 size={32} />,
      title: "Gamified Activities",
      description: "Reinforce learning through interactive, grade-specific games adapted from SLMs, making education both engaging and effective.",
      color: "bg-likha-orange"
    },
    {
      icon: <Download size={32} />,
      title: "Offline & Online Modes",
      description: "Access storybooks, SLMs, and games offline, while multimedia resources are available online through embedded links.",
      color: "bg-likha-teal"
    },
    {
      icon: <Accessibility size={32} />,
      title: "Child-Friendly Interface",
      description: "Designed with intuitive navigation, large buttons, and visual cues, ensuring a smooth and accessible experience for young learners.",
      color: "bg-likha-pink"
    },
    {
      icon: <Users size={32} />,
      title: "Inclusive Learning",
      description: "Stories highlight diverse characters and accessibility options for all learners, ensuring education is accessible to everyone.",
      color: "bg-likha-yellow"
    }
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern z-0 opacity-30"></div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-likha-teal/10 text-likha-teal text-sm font-medium px-4 py-2 rounded-full">
            Discover
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            Designed for Young Learners
          </h2>
          <p className="text-gray-600 text-lg">
            The Likha application offers a comprehensive suite of educational tools and resources specifically designed for Kindergarten to Grade 3 learners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className="feature-card scroll-reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`feature-icon ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
