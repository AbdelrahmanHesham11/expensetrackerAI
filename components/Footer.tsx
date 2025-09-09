import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 border-t border-slate-200/50 dark:border-slate-700/50 transition-colors duration-300'>
      {/* Gradient accent line */}
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-800 dark:from-slate-400 dark:via-gray-300 dark:to-slate-200'></div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* Logo and Tagline */}
          <div className='text-center md:text-left'>
            <div className='inline-flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-gradient-to-br from-slate-700 via-gray-600 to-slate-800 dark:from-slate-600 dark:via-gray-500 dark:to-slate-700 rounded-xl flex items-center justify-center shadow-lg border border-slate-500/30 dark:border-slate-400/20 transition-colors duration-300'>
                <span className='text-amber-400 dark:text-amber-300 text-lg'>💰</span>
              </div>
              <h2 className='text-xl font-bold bg-gradient-to-r from-slate-700 via-gray-600 to-slate-800 dark:from-slate-300 dark:via-gray-200 dark:to-slate-100 bg-clip-text text-transparent'>
                FinSight AI
              </h2>
            </div>
            <p className='text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm transition-colors duration-300'>
              Intelligent financial management powered by AI. Track your
              expenses, manage your budget, and gain insights into your spending
              patterns.
            </p>
          </div>

          {/* Navigation Links */}
          <div className='text-center md:text-left'>
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300'>
              Quick Links
            </h3>
            <div className='flex flex-col space-y-3'>
              <Link
                href='/'
                className='group inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors duration-200'
              >
                <span className='w-1.5 h-1.5 bg-slate-600 dark:bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                Home
              </Link>
              <Link
                href='/about'
                className='group inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors duration-200'
              >
                <span className='w-1.5 h-1.5 bg-slate-600 dark:bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                About
              </Link>
              <Link
                href='/contact'
                className='group inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors duration-200'
              >
                <span className='w-1.5 h-1.5 bg-slate-600 dark:bg-slate-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></span>
                Contact
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className='text-center md:text-left'>
            <h3 className='text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4 transition-colors duration-300'>
              Features
            </h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300'>
                <div className='w-5 h-5 bg-gradient-to-br from-slate-700 to-gray-700 dark:from-slate-600 dark:to-gray-600 rounded-md flex items-center justify-center shadow-sm border border-slate-500/20 dark:border-slate-400/20 transition-colors duration-300'>
                  <span className='text-amber-400 dark:text-amber-300 text-xs'>🤖</span>
                </div>
                AI-Powered Insights
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300'>
                <div className='w-5 h-5 bg-gradient-to-br from-gray-700 to-slate-800 dark:from-gray-600 dark:to-slate-700 rounded-md flex items-center justify-center shadow-sm border border-slate-500/20 dark:border-slate-400/20 transition-colors duration-300'>
                  <span className='text-amber-400 dark:text-amber-300 text-xs'>✨</span>
                </div>
                Smart Categorization
              </div>
              <div className='flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300'>
                <div className='w-5 h-5 bg-gradient-to-br from-slate-800 to-gray-700 dark:from-slate-700 dark:to-gray-600 rounded-md flex items-center justify-center shadow-sm border border-slate-500/20 dark:border-slate-400/20 transition-colors duration-300'>
                  <span className='text-amber-400 dark:text-amber-300 text-xs'>📊</span>
                </div>
                Analytics Dashboard
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-8 transition-colors duration-300'></div>

        {/* Copyright and Social */}
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-center md:text-left mb-4 md:mb-0'>
            <p className='text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300'>
              © {new Date().getFullYear()} FinSight AI. All rights
              reserved.
            </p>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;