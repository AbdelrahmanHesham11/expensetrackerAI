'use client';

const ContactPage = () => {
  const contactMethods = [
    {
      title: 'Email Support',
      description: 'Get detailed assistance with your questions. We typically respond within 24 hours.',
      email: 'abdo.heshamfathala@gmail.com',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      gradient: 'from-blue-600 to-indigo-600',
    },
  ];

  const supportInfo = [
    {
      title: 'Technical Issues',
      description: 'App not working properly? Check our troubleshooting documentation.',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    },
    {
      title: 'AI Features',
      description: 'Questions about AI insights? Our comprehensive AI documentation has answers.',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    },
    {
      title: 'Account & Billing',
      description: 'Account issues or billing questions? Contact us via email for assistance.',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
  ];

  const supportHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM PST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM PST' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  return (
    <div className='font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen relative overflow-hidden transition-colors duration-300'>
      
      {/* Animated background */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40 dark:opacity-20'></div>
        <div className='absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[150px] animate-pulse'></div>
        <div className='absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[120px] animate-pulse' style={{animationDelay: '2s'}}></div>
      </div>

      {/* Hero Section */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 md:py-40'>
        <div className='max-w-[1400px] mx-auto text-center'>
          
          <div className='inline-flex items-center gap-2 px-5 py-2 bg-blue-50/50 dark:bg-gradient-to-r dark:from-blue-500/10 dark:to-indigo-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full mb-8 backdrop-blur-xl'>
            <div className='w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse'></div>
            <span className='text-sm font-semibold text-blue-600 dark:text-blue-300'>Get in Touch</span>
          </div>

          <h1 className='text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.95]'>
            <span className='block text-slate-900 dark:text-white'>Contact</span>
            <span className='block bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'>
              FinSight AI
            </span>
          </h1>

          <p className='text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-[800px] mx-auto font-light leading-relaxed'>
            Have questions about AI-powered expense tracking or need assistance? We&apos;re here to help with institutional-grade support.
          </p>

          <a href='mailto:abdo.heshamfathala@gmail.com'>
            <button className='group relative px-10 py-5 overflow-hidden rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] transition-all duration-300'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]'></div>
              <span className='relative z-10 flex items-center gap-3 justify-center text-white'>
                Send us an Email
                <svg className='w-6 h-6 group-hover:translate-x-2 transition-transform duration-300' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                </svg>
              </span>
            </button>
          </a>
        </div>
      </section>

      {/* Contact Method */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 border-t border-slate-200 dark:border-white/10'>
        <div className='max-w-[1200px] mx-auto'>
          
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 px-5 py-2 bg-indigo-50 dark:bg-gradient-to-r dark:from-indigo-500/10 dark:to-cyan-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-full mb-8 backdrop-blur-xl'>
              <span className='text-sm font-semibold text-indigo-600 dark:text-indigo-300'>Contact Information</span>
            </div>
            <h2 className='text-5xl md:text-6xl font-black mb-6'>
              <span className='block text-slate-900 dark:text-white'>The Best Way to</span>
              <span className='block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent'>Connect</span>
            </h2>
            <p className='text-lg text-slate-600 dark:text-slate-400 max-w-[700px] mx-auto font-light'>
              Reach out to our FinSight AI support team via email for the fastest response.
            </p>
          </div>

          <div className='max-w-[600px] mx-auto'>
            {contactMethods.map((method, i) => (
              <div key={i} className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20 blur-2xl group-hover:blur-3xl transition-all duration-500'></div>
                <div className='relative bg-white dark:bg-gradient-to-br dark:from-white/[0.12] dark:to-white/[0.04] backdrop-blur-2xl border border-slate-200 dark:border-white/20 group-hover:border-blue-500/50 rounded-3xl p-10 text-center shadow-2xl dark:shadow-none'>
                  
                  <div className='relative w-20 h-20 mx-auto mb-8'>
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} blur-xl group-hover:blur-2xl transition-all opacity-60 dark:opacity-100`}></div>
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                      <svg className='w-10 h-10 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={method.icon} />
                      </svg>
                    </div>
                  </div>

                  <h3 className='text-3xl font-bold mb-4 text-slate-900 dark:text-white'>{method.title}</h3>
                  <p className='text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-light'>{method.description}</p>
                  
                  <a href={`mailto:${method.email}`} className='inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/30 border border-blue-200 dark:border-blue-500/30 rounded-xl text-blue-600 dark:text-blue-300 font-semibold transition-all group-hover:scale-105'>
                    {method.email}
                    <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Info */}
      <section className='relative z-10 px-6 md:px-12 lg:px-16 py-32 bg-slate-50/50 dark:bg-slate-900/50'>
        <div className='max-w-[1200px] mx-auto'>
          
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 px-5 py-2 bg-blue-50 dark:bg-gradient-to-r dark:from-blue-500/10 dark:to-cyan-500/10 border border-blue-100 dark:border-blue-500/20 rounded-full mb-8 backdrop-blur-xl'>
              <span className='text-sm font-semibold text-blue-600 dark:text-blue-300'>Support Information</span>
            </div>
            <h2 className='text-5xl md:text-6xl font-black mb-6'>
              <span className='block text-slate-900 dark:text-white'>We&apos;re Here to</span>
              <span className='block bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent'>Help</span>
            </h2>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            
            {/* Support Hours */}
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 dark:from-blue-600/10 dark:to-indigo-600/10 blur-xl group-hover:blur-2xl transition-all'></div>
              <div className='relative bg-white dark:bg-gradient-to-br dark:from-white/[0.08] dark:to-white/[0.03] backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-xl dark:shadow-none'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
                    <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>Support Hours</h3>
                </div>
                <div className='space-y-4'>
                  {supportHours.map((schedule, i) => (
                    <div key={i} className='flex justify-between items-center p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5'>
                      <span className='text-slate-600 dark:text-slate-300 font-medium'>{schedule.day}</span>
                      <span className='text-blue-600 dark:text-blue-300 font-semibold'>{schedule.hours}</span>
                    </div>
                  ))}
                  <div className='mt-6 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-xl'>
                    <p className='text-sm text-slate-600 dark:text-slate-300'>
                      <span className='font-bold text-blue-600 dark:text-blue-300'>Email support:</span> Available 24/7 with responses within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help */}
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-cyan-600/5 dark:from-indigo-600/10 dark:to-cyan-600/10 blur-xl group-hover:blur-2xl transition-all'></div>
              <div className='relative bg-white dark:bg-gradient-to-br dark:from-white/[0.08] dark:to-white/[0.03] backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 shadow-xl dark:shadow-none'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-12 h-12 bg-gradient-to-br from-indigo-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg'>
                    <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>Quick Help</h3>
                </div>
                <div className='space-y-4'>
                  {supportInfo.map((info, i) => (
                    <div key={i} className='p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-white/20 transition-all'>
                      <div className='flex items-start gap-3 mb-2'>
                        <svg className='w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={info.icon} />
                        </svg>
                        <div>
                          <h4 className='font-bold text-slate-900 dark:text-white mb-1'>{info.title}</h4>
                          <p className='text-sm text-slate-600 dark:text-slate-400'>{info.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default ContactPage;