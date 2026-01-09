'use client'

import React from 'react'
import ButtonCard from '@/components/ButtonCard'

export default function Page() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div
        className="container flex flex-col text-black items-center mx-auto px-6 pt-20 pb-20"
      >
        <div className="mb-10">
          <h1 className="text-5xl text-center font-bold md:text-6xl leading-tight">
            Convert Your Any File In to <br />
            PDF With
            <span className="text-primary"> CloudPDF.</span>
          </h1>

          <p className="text-lg mt-4 text-gray-600 text-center">
            Easily convert documents, images, and more to PDF format with our free online tool.
          </p>
        </div>
        <ButtonCard/>
      </div>
    </div>
  )
}
