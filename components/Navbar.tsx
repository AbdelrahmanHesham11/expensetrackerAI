'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/about', label: 'About', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  ];

  return (
    <nav className='sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'>
      <div className='max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          
          {/* Logo */}
          <Link href='/' className='flex items-center gap-3 group' onClick={() => setIsMobileMenuOpen(false)}>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 blur-lg group-hover:blur-xl transition-all'></div>
              <div className='relative w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300'>
                <svg className='w-6 h-6 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' />
                </svg>
              </div>
            </div>
            <span className='text-xl font-black bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent'>
              FinSight AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-2'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='group relative px-4 py-2 text-slate-300 hover:text-white font-medium text-sm transition-all duration-300'
              >
                <span className='relative z-10 flex items-center gap-2'>
                  <svg className='w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={link.icon} />
                  </svg>
                  {link.label}
                </span>
                <div className='absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className='flex items-center gap-3'>
            <ThemeToggle />

            {/* Desktop Auth */}
            <div className='hidden sm:block'>
              <SignedOut>
                <SignInButton>
                  <button className='group relative px-6 py-2.5 overflow-hidden rounded-xl font-semibold text-sm shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300'>
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600'></div>
                    <span className='relative z-10 flex items-center gap-2 text-white'>
                      Sign In
                      <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                      </svg>
                    </span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className='relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-lg'></div>
                  <div className='relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1'>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-8 h-8 hover:scale-110 transition-transform duration-200',
                        },
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 active:scale-95'
              aria-label='Toggle menu'
            >
              <svg className={`w-6 h-6 text-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                {isMobileMenuOpen ? (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                ) : (
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mt-4 space-y-2'>
            
            {/* Mobile Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={link.icon} />
                </svg>
                <span className='font-medium'>{link.label}</span>
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className='pt-4 border-t border-white/10'>
              <SignedOut>
                <SignInButton>
                  <button
                    className='w-full group relative px-6 py-3 overflow-hidden rounded-xl font-semibold shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-300 active:scale-95'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600'></div>
                    <span className='relative z-10 flex items-center justify-center gap-2 text-white'>
                      Sign In
                      <svg className='w-4 h-4 group-hover:translate-x-1 transition-transform' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
                      </svg>
                    </span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className='relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 blur-lg'></div>
                  <div className='relative flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3'>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: 'w-10 h-10 hover:scale-110 transition-transform duration-200',
                        },
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}