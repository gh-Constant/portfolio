import React from 'react'
import Navigation from './sections/navigation'
import Hero from './sections/Hero'
import About from './sections/About'

const App = () => {
  return (
    <main className='mx-auto max-w-7xl'>
      <Navigation/>
      <Hero/>
      <About/>
    </main>
  )
}
export default App  