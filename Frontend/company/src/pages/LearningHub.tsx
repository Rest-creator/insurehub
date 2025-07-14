
import { Helmet } from 'react-helmet-async';
import { Book, Users, Shield, Clock, Heart, Home, Car, Briefcase, Umbrella } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Container from '../components/ui/Container';
import FadeIn from '../components/animations/FadeIn';

const categories = [
  { name: 'Auto Insurance', icon: Car, count: 18 },
  { name: 'Home Insurance', icon: Home, count: 15 },
  { name: 'Life Insurance', icon: Heart, count: 12 },
  { name: 'Health Insurance', icon: Shield, count: 20 },
  { name: 'Business Insurance', icon: Briefcase, count: 14 },
  { name: 'Umbrella Insurance', icon: Umbrella, count: 8 }
];

const featuredArticles = [
  {
    title: 'Understanding Insurance Deductibles: A Beginner\'s Guide',
    excerpt: 'Learn what insurance deductibles are, how they work, and how they affect your premiums and coverage.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Basics',
    readTime: '5 min read'
  },
  {
    title: 'How to Choose the Right Auto Insurance Coverage',
    excerpt: 'Discover the different types of auto insurance coverage and how to select the right options for your needs.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78252?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Auto',
    readTime: '7 min read'
  },
  {
    title: 'Life Insurance: Term vs. Whole Life Policies',
    excerpt: 'Compare the benefits and drawbacks of term and whole life insurance policies to make an informed decision.',
    image: 'https://images.unsplash.com/photo-1516101922849-2bf0be616449?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Life',
    readTime: '8 min read'
  }
];

const recentArticles = [
  {
    title: 'Homeowners Insurance: Coverage Gaps to Watch For',
    excerpt: 'Many standard homeowners policies have surprising coverage gaps. Learn what they are and how to address them.',
    category: 'Home',
    readTime: '6 min read'
  },
  {
    title: '5 Ways to Lower Your Insurance Premiums',
    excerpt: 'Practical tips to help you reduce your insurance costs without sacrificing necessary coverage.',
    category: 'Tips',
    readTime: '4 min read'
  },
  {
    title: 'Insurance Claims Process: Step-by-Step Guide',
    excerpt: 'Navigate the claims process efficiently with this comprehensive guide to filing and following up.',
    category: 'Claims',
    readTime: '9 min read'
  },
  {
    title: 'Bundling Insurance Policies: Pros and Cons',
    excerpt: 'Is bundling multiple insurance policies with one provider really worth it? We break down the facts.',
    category: 'Tips',
    readTime: '5 min read'
  }
];

const LearningHub = () => {
  return (
    <>
      <Helmet>
        <title>Learning Hub - InsureHub</title>
        <meta name="description" content="Explore our educational resources on insurance topics, from beginner guides to in-depth articles on specialized coverage." />
      </Helmet>
      
      <main className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-white to-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-insurance-green-light text-insurance-green-dark rounded-full mb-6">
                  Learning Hub
                </span>
                <h1 className="heading-1 text-insurance-neutral-dark mb-6">
                  Insurance Knowledge Center
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Explore our educational resources to better understand insurance concepts and make informed decisions.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={100}>
              <div className="mt-10 max-w-2xl mx-auto">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles, guides, and topics..." 
                    className="w-full py-3 px-5 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-insurance-orange/20 focus:border-insurance-orange/20"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-insurance-orange">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </div>
        
        <section className="py-16">
          <Container>
            <FadeIn direction="up">
              <h2 className="heading-3 text-insurance-neutral-dark mb-8">
                Browse by Category
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <FadeIn key={index} direction="up" delay={50 * index}>
                  <a href="#" className="glass-card p-4 text-center block transition-all duration-300 hover:scale-105">
                    <div className="w-12 h-12 mx-auto rounded-full bg-insurance-orange-light/50 flex items-center justify-center mb-3">
                      <category.icon className="text-insurance-orange" size={20} />
                    </div>
                    <h3 className="font-medium text-insurance-neutral-dark mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} articles</p>
                  </a>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
        
        <section className="py-16 bg-insurance-neutral/50">
          <Container>
            <FadeIn direction="up">
              <div className="flex justify-between items-center mb-8">
                <h2 className="heading-3 text-insurance-neutral-dark">
                  Featured Articles
                </h2>
                <a href="#" className="text-insurance-orange hover:text-insurance-orange-dark font-medium flex items-center">
                  View all
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <FadeIn key={index} direction="up" delay={100 * index}>
                  <a href="#" className="glass-card overflow-hidden block h-full transition-all duration-300 hover:shadow-lg group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-white bg-insurance-orange rounded-full">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-insurance-neutral-dark mb-3 group-hover:text-insurance-orange transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-2" />
                        {article.readTime}
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </Container>
        </section>
        
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <FadeIn direction="right" className="lg:col-span-2">
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="heading-3 text-insurance-neutral-dark">
                      Recent Articles
                    </h2>
                    <a href="#" className="text-insurance-orange hover:text-insurance-orange-dark font-medium flex items-center">
                      View all
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="space-y-6">
                    {recentArticles.map((article, index) => (
                      <FadeIn key={index} direction="up" delay={100 * index}>
                        <a href="#" className="glass-card p-6 block transition-all duration-300 hover:shadow-lg group">
                          <div className="flex items-start">
                            <div className="mr-4 mt-1">
                              <div className="w-10 h-10 rounded-full bg-insurance-green-light flex items-center justify-center">
                                <Book className="text-insurance-green-dark" size={16} />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center mb-2">
                                <span className="px-2 py-0.5 text-xs font-medium bg-insurance-orange/10 text-insurance-orange rounded-full mr-2">
                                  {article.category}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Clock size={12} className="mr-1" />
                                  {article.readTime}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-insurance-neutral-dark mb-2 group-hover:text-insurance-orange transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-gray-600">
                                {article.excerpt}
                              </p>
                            </div>
                          </div>
                        </a>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </FadeIn>
              
              <FadeIn direction="left">
                <div>
                  <h2 className="heading-3 text-insurance-neutral-dark mb-8">
                    Resources
                  </h2>
                  
                  <div className="glass-card p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-insurance-neutral-dark">Insurance Glossary</h3>
                    <p className="text-gray-600 mb-4">
                      Confused by insurance terminology? Our comprehensive glossary explains key terms in plain language.
                    </p>
                    <a href="#" className="text-insurance-orange hover:text-insurance-orange-dark font-medium inline-flex items-center">
                      View Glossary
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="glass-card p-6 mb-6">
                    <h3 className="font-semibold text-lg mb-4 text-insurance-neutral-dark">Insurance Calculators</h3>
                    <p className="text-gray-600 mb-4">
                      Estimate your coverage needs and potential premiums with our easy-to-use calculators.
                    </p>
                    <a href="#" className="text-insurance-orange hover:text-insurance-orange-dark font-medium inline-flex items-center">
                      Try Calculators
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  
                  <div className="glass-card p-6">
                    <h3 className="font-semibold text-lg mb-4 text-insurance-neutral-dark">Video Tutorials</h3>
                    <p className="text-gray-600 mb-4">
                      Watch our explainer videos to better understand insurance concepts and processes.
                    </p>
                    <a href="#" className="text-insurance-orange hover:text-insurance-orange-dark font-medium inline-flex items-center">
                      Watch Videos
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </Container>
        </section>
        
        <Footer />
      </main>
    </>
  );
};

export default LearningHub;
