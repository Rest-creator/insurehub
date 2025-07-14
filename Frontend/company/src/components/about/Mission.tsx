
import React from 'react';
import Container from '../ui/Container';
import FadeIn from '../animations/FadeIn';
import { Shield, HeartHandshake, Lightbulb } from 'lucide-react';

const Mission = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust",
      description: "We build relationships based on transparency, honesty, and reliability."
    },
    {
      icon: HeartHandshake,
      title: "Empathy",
      description: "We understand the challenges customers face and design solutions with their needs in mind."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously evolve our platform to provide cutting-edge insurance solutions."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-4">
                Our Mission
              </span>
              <h2 className="heading-2 text-insurance-neutral-dark mb-6">
                Transforming the Insurance Experience
              </h2>
              <p className="body-text mb-6">
                Our mission is to demystify insurance and make it accessible to everyone. We believe that finding the right coverage should be simple, transparent, and empowering.
              </p>
              <p className="body-text">
                By combining cutting-edge technology with insurance knowledge, we created a platform that guides you through the entire insurance journey—from understanding your needs to managing your policies and claims.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="left">
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl relative z-10">
                <h3 className="text-xl font-semibold mb-8 text-insurance-neutral-dark">Our Core Values</h3>
                <div className="space-y-8">
                  {values.map((value, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-insurance-orange-light">
                          <value.icon className="text-insurance-orange" size={24} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-2 text-insurance-neutral-dark">{value.title}</h4>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-insurance-orange-light/20 to-insurance-green-light/20 rounded-2xl transform translate-x-4 translate-y-4 -z-0"></div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
};

export default Mission;
