import { useCallback, useRef, useState } from 'react'
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [businessSize, setBusinessSize] = useState('medium')
  const [selectedPillar, setSelectedPillar] = useState('strategy')
  const [duration, setDuration] = useState(3)
  const consultTriggerRef = useRef(null)

  const openConsult = useCallback((event) => {
    consultTriggerRef.current = event?.currentTarget ?? null
    setIsModalOpen(true)
  }, [])

  const closeConsult = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <div className="app">
      <SkipLink />
      <Navbar onOpenConsult={openConsult} />
      <main id="main-content" className="app__main">
        <Hero onOpenConsult={openConsult} />
        <Metrics />
        <ServiceSelector
          businessSize={businessSize}
          selectedPillar={selectedPillar}
          duration={duration}
          onBusinessSizeChange={setBusinessSize}
          onSelectedPillarChange={setSelectedPillar}
          onDurationChange={setDuration}
        />
        <EngagementEstimator
          businessSize={businessSize}
          pillar={selectedPillar}
          duration={duration}
        />
        <CaseStudies />
        <ConsultationCTA onOpenConsult={openConsult} />
      </main>
      <Footer />
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={closeConsult}
        returnFocusRef={consultTriggerRef}
      />
    </div>
  )
}

export default App
