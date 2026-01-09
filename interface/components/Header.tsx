import Link from 'next/link'
import React from 'react'
import { Class } from './../node_modules/zod/v4/core/util';

export default function Header() {
  return (
<header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
  <div className="mx-auto max-w-7xl px-6 ">
    <div className="flex h-16 items-center justify-between">

     
      <Link href="/" className="flex items-center gap-2">
        <img
          src="/Logo/logo.png"
          alt="CloudPDF Logo"
          className="h-6 w-auto"
        />
        <span className="text-lg font-bold text-gray-900">
          Cloud<span className="text-primary">PDF</span>
        </span>
      </Link>

      
      <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600">
        <Link href="/" className="hover:text-primary transition">Home</Link>
        <Link href="/tools" className="hover:text-primary transition">Tools</Link>
        <Link href="/pricing" className="hover:text-primary transition">Pricing</Link>
        <Link href="/blog" className="hover:text-primary transition">Blog</Link>
        <Link href="/about" className="hover:text-primary transition">About</Link>
      </nav>

    
      <div className="flex items-center gap-2">
        <Link href="/login">
          <button className="px-4 cursor-pointer py-2 text-sm font-bold text-gray-700 hover:text-primary transition">
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button className="rounded-full cursor-pointer bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition ">
            Sign Up
          </button>
        </Link>
      </div>

    </div>
  </div>
</header>

  )
}

