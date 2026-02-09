'use client';

import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
  const chartBars = [55, 40, 75, 50, 85, 60, 90, 70, 95, 65, 88, 100];
  const gradients = ['from-blue-500/60 to-blue-600/80', 'from-indigo-500/60 to-indigo-600/80', 'from-cyan-500/60 to-cyan-600/80'];

  const features = [
    {
      title: 'Real-Time AI Analytics',
      description: 'Millisecond-latency machine learning models process every transaction in real-time. Pattern recognition, anomaly detection, and predictive forecasting—all automated.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      stats: [{ value: '1.2s', label: 'Avg Response' }, { value: '99.8%', label: 'Accuracy' }],
      gradient: 'from-blue-500 to-indigo-600',
      hoverColor: 'blue',
    },
    {
      title: 'Intelligent Categorization',
      description: 'Advanced NLP algorithms automatically classify expenses with institutional-grade precision. Custom taxonomy learning adapts to your unique spending patterns.',
      icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
      stats: [{ value: '127', label: 'Categories' }, { value: 'Auto', label: 'Learning' }],
      gradient: 'from-indigo-500 to-cyan-600',
      hoverColor: 'indigo',
    },
    {
      title: 'Predictive Forecasting',
      description: 'Multi-variable regression models forecast spending trends with hedge-fund precision. Monte Carlo simulations provide confidence intervals for all predictions.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      stats: [{ value: '94%', label: 'Confidence' }, { value: '6mo', label: 'Forecast' }],
      gradient: 'from-cyan-500 to-blue-600',
      hoverColor: 'cyan',
    },
    {
      title: 'Bank-Level Security',
      description: '256-bit AES encryption, zero-knowledge architecture, and SOC 2 Type II compliance. Your financial data never leaves our encrypted infrastructure.',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      stats: [{ value: '256b', label: 'Encryption' }, { value: 'SOC 2', label: 'Certified' }],
      gradient: 'from-blue-500 to-cyan-600',
      hoverColor: 'blue',
    },
    {
      title: 'Natural Language AI',
      description: 'Conversational interface powered by GPT-4 architecture. Ask questions in plain English, receive institutional-quality analysis instantly.',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      stats: [{ value: 'GPT-4', label: 'Powered' }, { value: '∞', label: 'Queries' }],
      gradient: 'from-indigo-500 to-blue-600',
      hoverColor: 'indigo',
    },
    {
      title: 'Custom Dashboards',
      description: 'Drag-and-drop dashboard builder with 50+ visualization widgets. Create Bloomberg Terminal-grade interfaces tailored to your financial workflow.',
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      stats: [{ value: '50+', label: 'Widgets' }, { value: '∞', label: 'Layouts' }],
      gradient: 'from-cyan-500 to-indigo-600',
      hoverColor: 'cyan',
    },
  ];

  const faqs = [
    {
      question: 'What is FinSight AI?',
      answer: 'FinSight AI is an enterprise-grade financial intelligence platform that combines institutional-level analytics with consumer accessibility. Our proprietary AI models analyze transaction data with hedge-fund precision to deliver actionable insights for personal finance optimization.',
      icon: '?',
      gradient: 'from-blue-500/30 to-indigo-600/30',
    },
    {
      question: 'How does the AI work?',
      answer: 'Our multi-layer neural networks process millions of data points using advanced NLP, time-series forecasting, and anomaly detection algorithms. Real-time pattern recognition identifies spending trends, categorizes transactions with 99%+ accuracy, and generates predictive models for future expenses.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      gradient: 'from-indigo-500/30 to-cyan-600/30',
    },
    {
      question: 'Is my financial data secure?',
      answer: 'Absolutely. We employ bank-level 256-bit AES encryption, zero-knowledge architecture, and maintain SOC 2 Type II compliance. Your data is encrypted at rest and in transit. We never sell or share your information—your financial privacy is our top priority.',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      gradient: 'from-cyan-500/30 to-blue-600/30',
    },
    {
      question: 'What makes FinSight AI different?',
      answer: 'Unlike basic budgeting apps, we leverage institutional-grade AI infrastructure—the same technology used by quantitative hedge funds and investment banks. Our platform delivers professional-level analytics without the complexity, making sophisticated financial intelligence accessible to everyone.',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      gradient: 'from-blue-500/30 to-cyan-600/30',
    },
  ];

  return (
    <div className='font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen relative overflow-hidden transition-colors duration-300'>
      
      {/* Animated background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20'></div>
        <div className='absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/20 dark:bg-blue-600/30 rounded-full blur-[150px] animate-pulse'></div>
        <div className='absolute top-1/3 left-0 w-[800px] h-[800px] bg-indigo-600/15 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-pulse' style={{animationDelay: '2s'}}></div>
        <div className='absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-cyan-600/15 dark:bg-cyan-600/20 rounded-full blur-[100px] animate-pulse' style={{animationDelay: '4s'}}></div>
      </div>

      {/* Hero Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-40'>
        <div className='max-w-[1600px] mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 lg:gap-24 items-center'>
            
            {/* Left: Content */}
            <div>
              <div className='inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 border border-blue-500/30 dark:border-blue-500/30 rounded-full mb-10 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.15)]'>
                <div className='relative'>
                  <div className='w-2 h-2 bg-blue-400 rounded-full animate-ping absolute'></div>
                  <div className='w-2 h-2 bg-blue-400 rounded-full'></div>
                </div>
                <span className='text-sm font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-300 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent'>
                  Trusted by 50,000+ Financial Professionals
                </span>
              </div>

              <h1 className='text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tight'>
                <span className='block text-slate-900 dark:text-white'>AI-Powered</span>
                <span className='block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'>
                  Financial Intelligence
                </span>
                <span className='block text-slate-900 dark:text-white mt-2'>At Your Fingertips</span>
              </h1>

              <p className='text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-[600px] font-light'>
                Institutional-grade analytics meet consumer simplicity. Transform your spending data into actionable intelligence with real-time AI insights.
              </p>

              {/* Stats grid */}
              <div className='grid grid-cols-3 gap-4 mb-12 max-w-[550px]'>
                {[
                  { value: '99.2%', label: 'Accuracy', gradient: 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400', hover: 'blue' },
                  { value: '1.8s', label: 'Response', gradient: 'from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400', hover: 'indigo' },
                  { value: '24/7', label: 'Support', gradient: 'from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400', hover: 'cyan' },
                ].map((stat, i) => (
                  <div key={i} className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                    <div className='relative bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/20 rounded-2xl p-5 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg dark:shadow-none'>
                      <div className={`text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>{stat.value}</div>
                      <div className='text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider'>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className='flex flex-col sm:flex-row gap-5'>
                <SignInButton>
                  <button className='group relative px-10 py-5 overflow-hidden rounded-2xl font-black text-lg shadow-[0_0_60px_rgba(59,130,246,0.4)] hover:shadow-[0_0_80px_rgba(59,130,246,0.6)] transition-all duration-300'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'></div>
                    <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'></div>
                    <span className='relative z-10 flex items-center gap-3 justify-center text-white'>
                      Launch Dashboard
                      <svg className='w-6 h-6 group-hover:translate-x-2 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                      </svg>
                    </span>
                  </button>
                </SignInButton>
                <button className='group relative px-10 py-5 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 backdrop-blur-xl border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 rounded-2xl font-bold text-lg transition-all duration-300 text-slate-700 dark:text-white shadow-lg dark:shadow-none'>
                  <span className='flex items-center gap-3 justify-center'>
                    <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'><path d='M8 5v14l11-7z'/></svg>
                    Watch Demo
                  </span>
                </button>
              </div>

              <div className='flex items-center gap-8 mt-12 text-sm text-slate-600 dark:text-slate-400'>
                <div className='flex items-center gap-2'>
                  <svg className='w-5 h-5 text-green-500 dark:text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd'/>
                  </svg>
                  <span className='font-medium'>No credit card required</span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg className='w-5 h-5 text-blue-500 dark:text-blue-400' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd'/>
                  </svg>
                  <span className='font-medium'>Bank-level security</span>
                </div>
              </div>
            </div>

            {/* Right: Dashboard Mockup */}
            <div className='relative lg:scale-110'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-600/30 via-indigo-600/30 to-cyan-600/30 blur-[60px] -z-10'></div>
                
                <div className='relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/[0.15] dark:to-white/[0.05] backdrop-blur-2xl border border-slate-200 dark:border-white/30 rounded-3xl p-10 shadow-[0_20px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)]'>
                  
                  <div className='flex items-center justify-between mb-10'>
                    <div className='flex items-center gap-4'>
                      <div className='flex gap-2'>
                        {['red', 'yellow', 'green'].map(color => (
                          <div key={color} className={`w-3 h-3 bg-${color}-400 rounded-full opacity-80`}></div>
                        ))}
                      </div>
                      <div className='text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider'>Financial Overview</div>
                    </div>
                    <div className='px-3 py-1.5 bg-green-500/20 border border-green-500/40 rounded-lg text-green-600 dark:text-green-300 text-xs font-bold backdrop-blur-sm'>LIVE</div>
                  </div>

                  <div className='mb-10'>
                    <div className='text-sm text-slate-500 dark:text-slate-400 mb-3 font-medium tracking-wide'>Total Portfolio Value</div>
                    <div className='text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent'>
                      $127,849.32
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg backdrop-blur-sm'>
                        <svg className='w-4 h-4 text-green-500 dark:text-green-400' fill='currentColor' viewBox='0 0 20 20'>
                          <path fillRule='evenodd' d='M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z' clipRule='evenodd'/>
                        </svg>
                        <span className='text-green-600 dark:text-green-300 font-bold text-sm'>+18.7%</span>
                      </div>
                      <span className='text-slate-500 dark:text-slate-400 text-sm font-medium'>vs last month</span>
                    </div>
                  </div>

                  <div className='relative mb-10'>
                    <div className='flex items-end gap-1.5 h-48'>
                      {chartBars.map((height, i) => (
                        <div key={i} className='flex-1 group relative cursor-pointer'>
                          <div className={`w-full bg-gradient-to-t ${gradients[i % 3]} rounded-t-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 shadow-[0_-4px_20px_rgba(59,130,246,0.3)] relative overflow-hidden`} style={{height: `${height}%`}}>
                            <div className='absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'></div>
                          </div>
                          <div className='absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-slate-900 border border-blue-500/50 px-3 py-2 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-all shadow-xl backdrop-blur-xl whitespace-nowrap z-10'>
                            <div className='text-blue-300'>${(Math.random() * 5000 + 3000).toFixed(0)}</div>
                            <div className='text-slate-400 text-[10px]'>Dec {i + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='flex justify-between mt-4 text-xs text-slate-500 font-medium'>
                      <span>Dec 1</span>
                      <span>Dec 12</span>
                    </div>
                  </div>

                  <div className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl group-hover:blur-2xl transition-all duration-300'></div>
                    <div className='relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:via-indigo-500/10 dark:to-cyan-500/10 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl'>
                      <div className='flex items-start gap-4'>
                        <div className='relative flex-shrink-0'>
                          <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 blur-lg'></div>
                          <div className='relative w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl'>
                            <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                            </svg>
                          </div>
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <span className='text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent'>AI Insight</span>
                            <div className='px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded text-[10px] font-bold text-blue-600 dark:text-blue-300'>NEW</div>
                          </div>
                          <p className='text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3'>
                            Your entertainment spending decreased by <span className='font-bold text-green-600 dark:text-green-400'>32%</span> this month. You're on track to save an additional <span className='font-bold text-blue-600 dark:text-blue-300'>$890</span> by year-end.
                          </p>
                          <button className='text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group/btn transition-colors'>
                            View full analysis
                            <svg className='w-3 h-3 group-hover/btn:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating cards */}
              <div className='absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/[0.15] dark:to-white/[0.05] backdrop-blur-2xl border border-slate-200 dark:border-white/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center animate-[float_6s_ease-in-out_infinite]'>
                <div className='text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium'>AI Score</div>
                <div className='text-3xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent'>A+</div>
                <div className='w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2'></div>
              </div>

              <div className='absolute -bottom-6 -left-6 w-40 h-28 bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/[0.15] dark:to-white/[0.05] backdrop-blur-2xl border border-slate-200 dark:border-white/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] p-4 animate-[float_6s_ease-in-out_infinite]' style={{animationDelay: '1s'}}>
                <div className='text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium'>Monthly Savings</div>
                <div className='text-2xl font-black text-slate-900 dark:text-white mb-1'>$2,847</div>
                <div className='flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold'>
                  <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z' clipRule='evenodd'/>
                  </svg>
                  <span>+24%</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-sm'>
        <div className='max-w-[1600px] mx-auto'>
          
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border border-indigo-300 dark:border-indigo-500/20 rounded-full mb-8 backdrop-blur-xl'>
              <span className='text-sm font-semibold text-indigo-600 dark:text-indigo-300'>Platform Capabilities</span>
            </div>
            <h2 className='text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight'>
              <span className='block text-slate-900 dark:text-white'>Institutional Power.</span>
              <span className='block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent'>
                Consumer Simplicity.
              </span>
            </h2>
            <p className='text-xl text-slate-600 dark:text-slate-400 max-w-[700px] mx-auto font-light'>
              Enterprise-grade financial intelligence infrastructure, designed for everyone.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {features.map((feature, i) => (
              <div key={i} className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100'></div>
                <div className='relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/[0.12] dark:to-white/[0.04] backdrop-blur-2xl border border-slate-200 dark:border-white/20 group-hover:border-blue-300 dark:group-hover:border-blue-500/50 rounded-3xl p-8 transition-all duration-500 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]'>
                  
                  <div className='relative w-16 h-16 mb-8'>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} blur-xl group-hover:blur-2xl transition-all`}></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                      <svg className='w-8 h-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                  </div>

                  <h3 className='text-2xl font-bold mb-4 text-slate-900 dark:text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-light'>
                    {feature.description}
                  </p>
                  
                  <div className='grid grid-cols-2 gap-3 mb-6'>
                    {feature.stats.map((stat, j) => (
                      <div key={j} className='bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-xl p-3 backdrop-blur-sm'>
                        <div className='text-lg font-bold text-blue-600 dark:text-blue-300'>{stat.value}</div>
                        <div className='text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-wider font-semibold'>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold group-hover:gap-3 transition-all'>
                    {i % 3 === 0 ? 'Explore analytics' : i % 3 === 1 ? 'View categories' : 'See predictions'}
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 border-t border-slate-200 dark:border-white/10'>
        <div className='max-w-[1200px] mx-auto'>
          
          <div className='mb-16'>
            <div className='inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-300 dark:border-blue-500/20 rounded-full mb-8 backdrop-blur-xl'>
              <span className='text-sm font-semibold text-blue-600 dark:text-blue-300'>Knowledge Base</span>
            </div>
            <h2 className='text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white'>
              Frequently Asked Questions
            </h2>
            <p className='text-xl text-slate-600 dark:text-slate-400 font-light max-w-[700px]'>
              Everything you need to know about FinSight AI's institutional-grade financial intelligence platform.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-6'>
            {faqs.map((faq, i) => (
              <div key={i} className='group relative'>
                <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100`}></div>
                <div className='relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/[0.08] dark:to-white/[0.03] backdrop-blur-2xl border border-slate-200 dark:border-white/10 group-hover:border-blue-300 dark:group-hover:border-blue-500/30 rounded-2xl p-8 transition-all duration-300 shadow-lg dark:shadow-none'>
                  <div className='flex items-start gap-5'>
                    <div className='relative flex-shrink-0'>
                      <div className={`absolute inset-0 bg-gradient-to-br ${faq.gradient} blur-lg`}></div>
                      <div className={`relative w-12 h-12 bg-gradient-to-br ${faq.gradient.replace('30', '20')} border border-blue-300 dark:border-blue-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                        {typeof faq.icon === 'string' && faq.icon === '?' ? (
                          <span className='text-blue-600 dark:text-blue-400 font-black text-lg'>?</span>
                        ) : (
                          <svg className='w-6 h-6 text-blue-600 dark:text-blue-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={faq.icon} />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors'>
                        {faq.question}
                      </h3>
                      <p className='text-slate-600 dark:text-slate-400 leading-relaxed font-light'>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 border-t border-slate-200 dark:border-white/10'>
        <div className='max-w-[1000px] mx-auto text-center'>
          
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-cyan-600/30 blur-3xl group-hover:blur-[100px] transition-all duration-700'></div>
            <div className='relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-white/[0.15] dark:to-white/[0.05] backdrop-blur-2xl border border-slate-200 dark:border-white/30 rounded-[2.5rem] p-16 shadow-[0_40px_120px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_120px_rgba(0,0,0,0.5)]'>
              
              <h2 className='text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight'>
                <span className='block text-slate-900 dark:text-white'>Ready to Transform</span>
                <span className='block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent'>
                  Your Finances?
                </span>
              </h2>

              <p className='text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-[600px] mx-auto font-light'>
                Join thousands of users who've upgraded to institutional-grade financial intelligence.
              </p>

              <SignInButton>
                <button className='group/cta relative px-12 py-6 overflow-hidden rounded-2xl font-black text-xl shadow-[0_0_80px_rgba(59,130,246,0.5)] hover:shadow-[0_0_120px_rgba(59,130,246,0.7)] transition-all duration-300 transform hover:scale-105'>
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'></div>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>
                  <span className='relative z-10 flex items-center gap-3 justify-center text-white'>
                    Start Free Today
                    <svg className='w-7 h-7 group-hover/cta:translate-x-2 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </span>
                </button>
              </SignInButton>

              <div className='flex items-center justify-center gap-8 mt-10 text-sm text-slate-600 dark:text-slate-400'>
                {[
                  { text: 'Free forever plan', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', color: 'green' },
                  { text: 'No credit card', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', color: 'blue' },
                  { text: 'Setup in 60 seconds', icon: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', color: 'indigo' },
                ].map((item, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <svg className={`w-5 h-5 text-${item.color}-500 dark:text-${item.color}-400`} fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d={item.icon} clipRule='evenodd'/>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

    </div>
  );
};

export default Guest;