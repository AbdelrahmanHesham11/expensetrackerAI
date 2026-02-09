'use client';

import Link from 'next/link';

const AboutPage = () => {
  const features = [
    {
      title: 'Real-Time AI Analytics',
      description: 'Advanced machine learning models analyze spending patterns with institutional-grade precision, delivering actionable insights in milliseconds.',
      gradient: 'from-blue-500 to-indigo-600',
      stat: '99.8%',
      statLabel: 'Accuracy',
    },
    {
      title: 'Intelligent Categorization',
      description: 'NLP-powered expense classification adapts to your unique patterns, eliminating manual entry with enterprise-level automation.',
      gradient: 'from-indigo-500 to-cyan-600',
      stat: '1.2s',
      statLabel: 'Avg Response',
    },
    {
      title: 'Predictive Forecasting',
      description: 'Multi-variable regression models forecast spending trends with hedge-fund precision, providing confidence intervals for all predictions.',
      gradient: 'from-cyan-500 to-blue-600',
      stat: '6mo',
      statLabel: 'Forecast Range',
    },
  ];

  const milestones = [
    { label: 'Founded', value: '2025', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { label: 'AI-First', value: 'Approach', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Global', value: 'Impact', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'User-Centric', value: 'Design', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ];

  return (
    <div className='font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen relative overflow-hidden transition-colors duration-300'>
      
      {/* Animated background */}
      <div className='absolute inset-0'>
        {/* Grid: Uses lighter slate for light mode, dark slate for dark mode */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 dark:opacity-20'></div>
        
        {/* Blobs: Opacity adjusted slightly for light mode visibility */}
        <div className='absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[150px] animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-pulse' style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 md:py-40'>
        <div className='max-w-[1400px] mx-auto text-center'>
          
          <div className='inline-flex items-center gap-2 px-5 py-2 bg-blue-50/50 dark:bg-gradient-to-r dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full mb-8 backdrop-blur-xl'>
            <div className='w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse'></div>
            <span className='text-sm font-semibold text-blue-600 dark:text-blue-300'>Powered by Advanced AI</span>
          </div>

          <h1 className='text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95]'>
            <span className='block text-slate-900 dark:text-white'>About</span>
            <span className='block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'>
              FinSight AI
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-[800px] mx-auto font-light leading-relaxed'>
            Your intelligent companion for enterprise-grade expense tracking and financial management with institutional-level AI insights.
          </p>

          <div className='flex flex-col sm:flex-row gap-5 justify-center'>
            <Link href='/sign-up'>
              <button className='group relative px-10 py-5 overflow-hidden rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(59,130,246,0.3)] dark:shadow-[0_0_60px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] transition-all duration-300'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'></div>
                <span className='relative z-10 flex items-center gap-3 justify-center text-white'>
                  Start Your Journey
                  <svg className='w-6 h-6 group-hover:translate-x-2 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
              </button>
            </Link>
            <Link href='/contact'>
              <button className='px-10 py-5 bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/20 hover:border-slate-300 dark:hover:border-white/40 rounded-2xl font-bold text-lg text-slate-900 dark:text-white transition-all duration-300 shadow-lg dark:shadow-none'>
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 border-t border-slate-200 dark:border-white/10'>
        <div className='max-w-[1200px] mx-auto text-center'>
          
          <div className='inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-cyan-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full mb-8 backdrop-blur-xl'>
            <span className='text-sm font-semibold text-indigo-600 dark:text-indigo-300'>Our Mission</span>
          </div>

          <h2 className='text-5xl md:text-6xl font-black mb-8 leading-tight'>
            <span className='block text-slate-900 dark:text-white'>Transforming Financial</span>
            <span className='block text-slate-900 dark:text-white'>Management with</span>
            <span className='block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent'>
              Institutional AI
            </span>
          </h2>

          <p className='text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-[900px] mx-auto font-light mb-16'>
            At FinSight AI, we leverage cutting-edge artificial intelligence infrastructure—the same technology used by quantitative hedge funds and investment banks—to revolutionize personal financial wellness. Our proprietary models deliver institutional-grade analytics without the complexity.
          </p>

          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[800px] mx-auto'>
            {[
              { value: '50K+', label: 'Active Users', gradient: 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400' },
              { value: '99.8%', label: 'AI Accuracy', gradient: 'from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400' },
              { value: '24/7', label: 'AI Support', gradient: 'from-cyan-600 to-indigo-600 dark:from-cyan-400 dark:to-indigo-400' },
            ].map((stat, i) => (
              <div key={i} className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 blur-xl group-hover:blur-2xl transition-all'></div>
                <div className='relative bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-100 dark:border-white/20 rounded-2xl p-6 shadow-xl dark:shadow-none'>
                  <div className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>{stat.value}</div>
                  <div className='text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider'>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 bg-slate-50/50 dark:bg-slate-900/50'>
        <div className='max-w-[1400px] mx-auto'>
          
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-5 py-2 bg-blue-50 dark:bg-gradient-to-r dark:from-blue-500/10 dark:to-cyan-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full mb-8 backdrop-blur-xl'>
              <span className='text-sm font-semibold text-blue-600 dark:text-blue-300'>Platform Capabilities</span>
            </div>
            <h2 className='text-5xl md:text-6xl font-black mb-6'>
              <span className='block text-slate-900 dark:text-white'>Why Choose</span>
              <span className='block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent'>FinSight AI?</span>
            </h2>
            <p className='text-xl text-slate-600 dark:text-slate-400 max-w-[700px] mx-auto font-light'>
              Enterprise-grade intelligence infrastructure designed for everyone.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6'>
            {features.map((feature, i) => (
              <div key={i} className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 dark:from-blue-600/10 dark:to-indigo-600/10 blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100'></div>
                <div className='relative bg-white dark:bg-gradient-to-br dark:from-white/[0.12] dark:to-white/[0.04] backdrop-blur-2xl border border-slate-200 dark:border-white/20 group-hover:border-blue-500/50 rounded-3xl p-8 transition-all duration-500 shadow-2xl shadow-slate-200/50 dark:shadow-none'>
                  
                  <div className='relative w-16 h-16 mb-8'>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl group-hover:blur-2xl transition-all opacity-60 dark:opacity-100`}></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                      <svg className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                      </svg>
                    </div>
                  </div>

                  <h3 className='text-2xl font-bold mb-4 text-slate-900 dark:text-white'>{feature.title}</h3>
                  <p className='text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-light'>{feature.description}</p>
                  
                  <div className='bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-4 backdrop-blur-sm'>
                    <div className='text-2xl font-black text-blue-600 dark:text-blue-300 mb-1'>{feature.stat}</div>
                    <div className='text-xs text-slate-500 uppercase tracking-wider font-semibold'>{feature.statLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 border-t border-slate-200 dark:border-white/10'>
        <div className='max-w-[1200px] mx-auto'>
          
          <div className='grid md:grid-cols-2 gap-16 items-center'>
            
            <div>
              <div className='inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-blue-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full mb-8 backdrop-blur-xl'>
                <span className='text-sm font-semibold text-indigo-600 dark:text-indigo-300'>Our Story</span>
              </div>

              <h2 className='text-5xl md:text-6xl font-black mb-8 leading-tight'>
                <span className='block text-slate-900 dark:text-white'>Built for the</span>
                <span className='block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent'>Future</span>
              </h2>

              <div className='space-y-6 text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed'>
                <p>
                  FinSight AI was born from the vision of democratizing institutional-grade financial intelligence. Our team of quantitative analysts, data scientists, and fintech engineers came together to solve a critical problem: making hedge-fund-level analytics accessible to everyone.
                </p>
                <p>
                  Since our launch, we&apos;ve helped thousands of users achieve better financial outcomes through AI-powered insights. Every feature is designed with institutional rigor and consumer simplicity in mind.
                </p>
              </div>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20 blur-3xl'></div>
              <div className='relative bg-white dark:bg-gradient-to-br dark:from-white/[0.12] dark:to-white/[0.04] backdrop-blur-2xl border border-slate-200 dark:border-white/30 rounded-3xl p-8 shadow-2xl dark:shadow-none'>
                <div className='space-y-6'>
                  {milestones.map((milestone, i) => (
                    <div key={i} className='flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10'>
                      <div className='relative flex-shrink-0'>
                        <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 blur-lg opacity-40 dark:opacity-100'></div>
                        <div className='relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center'>
                          <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={milestone.icon} />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <div className='text-sm text-slate-500 dark:text-slate-400 font-medium'>{milestone.label}</div>
                        <div className='text-xl font-bold text-slate-900 dark:text-white'>{milestone.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 border-t border-slate-200 dark:border-white/10'>
        <div className='max-w-[1000px] mx-auto text-center'>
          
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-cyan-600/10 dark:from-blue-600/30 dark:via-indigo-600/30 dark:to-cyan-600/30 blur-3xl group-hover:blur-[100px] transition-all duration-700'></div>
            <div className='relative bg-white dark:bg-gradient-to-br dark:from-white/[0.15] dark:to-white/[0.05] backdrop-blur-2xl border border-slate-200 dark:border-white/30 rounded-[2.5rem] p-16 shadow-2xl dark:shadow-none'>
              
              <h2 className='text-5xl md:text-6xl font-black mb-6 leading-tight'>
                <span className='block text-slate-900 dark:text-white'>Take Control of Your</span>
                <span className='block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent'>
                  Financial Future
                </span>
              </h2>

              <p className='text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-[600px] mx-auto font-light'>
                Join thousands who&apos;ve upgraded to institutional-grade financial intelligence.
              </p>

              <Link href='/sign-up'>
                <button className='group/cta relative px-12 py-6 overflow-hidden rounded-2xl font-black text-xl shadow-[0_0_40px_rgba(59,130,246,0.4)] dark:shadow-[0_0_80px_rgba(59,130,246,0.5)] hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] dark:hover:shadow-[0_0_120px_rgba(59,130,246,0.7)] transition-all duration-300 transform hover:scale-105'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'></div>
                  <span className='relative z-10 flex items-center gap-3 justify-center text-white'>
                    Get Started Free
                    <svg className='w-7 h-7 group-hover/cta:translate-x-2 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </span>
                </button>
              </Link>

              <div className='flex items-center justify-center gap-8 mt-10 text-sm text-slate-500 dark:text-slate-400'>
                {[
                  { text: 'Free forever', icon: 'M5 13l4 4L19 7' },
                  { text: 'No credit card', icon: 'M5 13l4 4L19 7' },
                  { text: '60s setup', icon: 'M5 13l4 4L19 7' },
                ].map((item, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <svg className='w-5 h-5 text-green-500 dark:text-green-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className='font-medium'>{item.text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

    </div>
  );
};

export default AboutPage;