import Image from 'next/image'
import React from 'react'

const Credibility = () => {
  return (
    <div className='px-4 md:px-6 py-16 md:py-24 flex flex-col gap-10'>
          <h2 className="headlines md:headlinem lg:headlinel text-secondary-oncontainer text-center">
         We are affliated with
        </h2>
        <div className='flex flex-row flex-wrap justify-center gap-8 lg:gap-10 xl:gap-14 items-center'>
        <Image src='/icons/msme.png' alt={'MSME'} width={200} height={200} />
        <Image src='/icons/sikkimtourismlogo.png' alt={'MSME'} width={200} height={200} />
        <Image src='/icons/taas.jpg' alt={'taas'} width={200} height={200} />
        </div>
     
    </div>
  )
}

export default Credibility