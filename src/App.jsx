import { useCallback, useState } from 'react'
import { CaseStudies } from './components/CaseStudies.jsx'
import { ConsultationCTA } from './components/ConsultationCTA.jsx'
import { ConsultationModal } from './components/ConsultationModal.jsx'
import { EngagementEstimator } from './components/EngagementEstimator.jsx'
import { Footer } from './components/Footer.jsx'
import { Hero } from './components/Hero.jsx'
import { Metrics } from './components/Metrics.jsx'
import { Navbar } from './components/Navbar.jsx'
import { ServiceSelector } from './components/ServiceSelector.jsx'
import { SkipLink } from './components/SkipLink.jsx'

function App() {
  const [isConsultOpen, setIsConsultOpen] = useState(false)

  const openConsult = useCallback(() => {
    setIsConsultOpen(true)
  }, [])

  const closeConsult = useCallback(() => {
    setIsConsultOpen(false)
  }, [])

  return (
    <div className="app">
      <SkipLink />
      <Navbar onOpenConsult={openConsult} />
      <main id="main-content" className="app__main">
        <Hero onOpenConsult={openConsult} />
        <Metrics />
        <ServiceSelector />
        <EngagementEstimator />
        <CaseStudies />
        <ConsultationCTA onOpenConsult={openConsult} />
      </main>
      <Footer />
      <ConsultationModal isOpen={isConsultOpen} onClose={closeConsult} />
    </div>
  )
}

export default App
