
import React from 'react';
import { Leaf, Sprout, CloudSun, Users, Wheat } from 'lucide-react';

const FeatureItem = ({ 
  icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  delay?: number 
}) => (
  <div 
    className="feature-card mb-4 animate-pulse-subtle"
    style={{ animationDelay: `${delay}ms`, animationDuration: '4s', animationIterationCount: 'infinite' }}
  >
    <div className="flex items-start gap-4">
      <div className="mt-1 p-2 bg-white/20 rounded-lg animate-pulse-subtle" 
           style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}>
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </div>
    <div className="floating-circle w-20 h-20 -right-5 -bottom-5 bg-white/5"></div>
  </div>
);

const FeatureShowcase = () => {
  // Create decorative background elements
  const circles = Array.from({ length: 6 }).map((_, i) => (
    <div 
      key={i}
      className="floating-circle" 
      style={{
        width: `${Math.random() * 15 + 5}rem`,
        height: `${Math.random() * 15 + 5}rem`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
        animationIterationCount: 'infinite',
        backgroundColor: i % 2 === 0 ? 'rgba(245, 193, 61, 0.15)' : 'rgba(255, 255, 255, 0.1)',
      }}
    />
  ));

  // Features data
  const features = [
    {
      icon: <Sprout className="h-5 w-5 text-farm-gold" />,
      title: "AI Personal Farming Assistant",
      description: "Get personalized answers to farming questions and learn organic methods",
      delay: 100
    },
    {
      icon: <Leaf className="h-5 w-5 text-farm-gold" />,
      title: "Plant Disease Detection",
      description: "Identify plant diseases with AI and receive prevention recommendations",
      delay: 200
    },
    {
      icon: <CloudSun className="h-5 w-5 text-farm-gold" />,
      title: "Crop Recommendation",
      description: "Analyze soil and weather to determine the best crops for your area",
      delay: 300
    },
    {
      icon: <Wheat className="h-5 w-5 text-farm-gold" />,
      title: "Price Prediction",
      description: "AI forecasting of crop and farming commodity future prices",
      delay: 400
    },
    {
      icon: <Leaf className="h-5 w-5 text-farm-gold" />,
      title: "Fertilizer Recommendation",
      description: "Get AI recommendations for the best fertilizers based on your soil",
      delay: 500
    },
    {
      icon: <Users className="h-5 w-5 text-farm-gold" />,
      title: "Farmers Community",
      description: "Connect with other farmers to share knowledge and experiences",
      delay: 600
    }
  ];

  return (
    <div className="features-container dark-green-gradient">
      {circles}
      <div className="relative z-10 w-full max-w-4xl px-6 md:px-10">
        <h1 className="text-4xl font-bold mb-2 text-farm-gold font-display">AgroVerse</h1>
        <p className="text-white/80 mb-8">Your intelligent farming assistant powered by AI</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4 text-xs text-white/60">
        Powered by advanced agricultural AI
      </div>
    </div>
  );
};

export default FeatureShowcase;
