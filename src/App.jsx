
import './App.css'
import Hero from './components/Hero'
import About from './components/About'  
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
function App() {

  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      <Navbar/>
     <Hero/>
     <About/>
     <Features/>
     <Story/>
     </main>
  )
}

export default App
