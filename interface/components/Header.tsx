import Link from 'next/link'
import React from 'react'
import { Class } from './../node_modules/zod/v4/core/util';

export default function Header() {
  return (
<header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
  <div className="mx-auto max-w-[1400px] px-6">
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

      
      <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-gray-500 relative">
        {/* Dropdown Item */}
        <div className="relative group">
          <Link
            href="/tools"
            className="hover:text-primary transition flex items-center gap-1"
          >
            Convert PDF
            {/* Optional: down arrow */}
            <span className="ml-1">▼</span>
          </Link>

          {/* Dropdown Menu */}
          <ul className="absolute top-full left-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-10">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/image_to_pdf">Image to PDF</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/word_to_pdf">Word to PDF</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/excel_to_pdf">Excel to PDF</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link href="/powerpoint_to_pdf">PPT to PDF</Link>
            </li>
          </ul>
        </div>

        {/* Other nav items */}
        <Link href="/merge_pdf" className="hover:text-primary transition">Merge PDFs</Link>
        <Link href="/split_pdf" className="hover:text-primary transition">Split PDFs</Link>
        <Link href="/compress_pdf" className="hover:text-primary transition">Compress PDF</Link>
        <Link href="/tools" className="hover:text-primary transition">All Tools</Link>
        <Link href="/protect_pdf" className="hover:text-primary transition">Protect PDF</Link>

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

