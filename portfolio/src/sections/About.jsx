import React from 'react'

const About = () => {
  return (
    <section className='my-20 c-space'>
        <div className='grid h-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6 '>
            <div className='col-span-1 xl:row-span-3'>
                <div className='grid-container'>
                    <img src='assets/grid1.png' alt='grid1' className='w-full sm:h-[276px] h-fit object-contain'/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About