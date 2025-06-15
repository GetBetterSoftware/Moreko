import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
  return (
    <div className={`bg-[#FF6363] h-screen max-h-[900px] max-w-[1440px] w-screen p-10 flex flex-col items-center justify-center `}>
        <div className='h-[80%] w-[80%] bg-[#ffffff] rounded relative'>
            <div className='absolute left-20 top-20 z-10'>
              <h1 className='text-8xl transform translate-y-1/2 font-bold'>
                <p className='mb-5'><span className='text-[#FF6363]'>M</span>OREKO</p>
                <p className='mt-5 ml-30 z-10'>HIGH <span className='text-[#FF6363]'>S</span>CH<span className='text-[#FFF]'>OOL</span></p>
              </h1>
            </div>

            <div className='absolute w-full h-full z-0'>
              <span className='absolute top-[40px] right-[170px] w-[50px] h-[50px] border-[10px] border-[#FF6363] rounded-full'></span>
              <span className='absolute bottom-[160px] right-[250px] w-[45px] h-[45px] border-[10px] border-[#9793FF] rounded-full'></span>
              <span className='absolute top-[78px] left-[370px] w-[30px] h-[30px] border-[7px] border-[#636060] rounded-full'></span>
            </div>

            <div className='absolute right-3 top-20 w-[50%] h-[70%] z-0'>
              
              <Image src="/images/hero.png" alt="logo" fill className='absolute '/>
              
            </div>

            <div className='absolute left-3 bottom-20 w-[50%] h-[20%] z-0'>
                <p className='text-1xl'>
                  “We aim at inspiring our students to dream more, learn more, do more, and become more in their respective journeys of life.”
                </p>
                <p className='text-1xl mt-7 font-bold'>Mkhabele E.M — School Principal</p>
            </div>
        </div>
    </div>
  )
}
