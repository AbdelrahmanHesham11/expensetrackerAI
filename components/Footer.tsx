import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 transition-colors duration-300 font-sans'>
      
      {/* Subtle Grid Background */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 dark:opacity-20 mask-image-gradient-b'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          
          {/* Logo and Tagline */}
          <div className='col-span-1 md:col-span-2'>
            <div className='inline-flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg'>
                {/* Abstract Finance Logo Icon */}
                <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                </svg>
              </div>
              <h2 className='text-2xl font-black tracking-tight text-slate-900 dark:text-white'>
                FinSight AI
              </h2>
            </div>
            <p className='text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-light'>
              Institutional-grade financial intelligence for the modern era. Track, analyze, and forecast your wealth with the precision of Wall Street algorithms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6'>
              Platform
            </h3>
            <div className='flex flex-col space-y-4'>
              <Link href='/' className='group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                Home
              </Link>
              <Link href='/about' className='group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                About Us
              </Link>
              <Link href='/contact' className='group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                Contact Support
              </Link>
              <Link href='/sign-in' className='group inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                Login
              </Link>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className='text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6'>
              Capabilities
            </h3>
            <div className='space-y-4'>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                <svg className='w-4 h-4 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
                AI Analytics
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                <svg className='w-4 h-4 text-indigo-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                </svg>
                Smart Tagging
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm'>
                <svg className='w-4 h-4 text-cyan-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
                Forecasting
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-slate-200 dark:bg-white/10 mb-8'></div>

        {/* Copyright and Legal */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-slate-500 dark:text-slate-500 text-sm'>
            © {new Date().getFullYear()} FinSight AI. All rights reserved.
          </p>
          <div className='flex gap-6 text-sm text-slate-500 dark:text-slate-500'>
            <span className='hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors'>Privacy Policy</span>
            <span className='hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors'>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;