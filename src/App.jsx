import { useCallback, useRef, useState } from 'react'
import { CaseStudies } from './components/CaseStudies.jsx'
import { ConsultationCTA } from './components/ConsultationCTA.jsx'
import { ConsultationModal } from './components/ConsultationModal.jsx'
import { EngagementPlanner } from './components/EngagementPlanner.jsx'
import { Footer } from './components/Footer.jsx'
import { Hero } from './components/Hero.jsx'
import { Metrics } from './components/Metrics.jsx'
import { Navbar } from './components/Navbar.jsx'
import { SkipLink } from './components/SkipLink.jsx'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const consultTriggerRef = useRef(null)

  function openConsult(event) {
    consultTriggerRef.current = event?.currentTarget ?? null
    setIsModalOpen(true)
  }

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
        <EngagementPlanner />
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
