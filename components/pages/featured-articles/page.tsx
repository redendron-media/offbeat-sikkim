import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const FeaturedArticles = () => {
  return (
    <section className="bg-[url('../public/images/featured-articles.jpg')] bg-cover bg-center bg-no-repeat px-4 md:px-6 py-16 md:py-24 rounded-lg flex flex-col gap-4 md:gap-6">
        <h2 className='headlines md:displaym text-white'>Featured Articles</h2>
        <p className='bodyl text-[#F3FCF2]'>Check out Offbeat Sikkim’s Blog for tips, stories and expert advice on himalayan adventures</p>
        <Link href={'/blog'}>
       <Button className='w-fit'>Explore Articles</Button>
        </Link>
    </section>
  )
}

export default FeaturedArticles