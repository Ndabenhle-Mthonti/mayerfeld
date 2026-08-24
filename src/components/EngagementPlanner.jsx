import { useState } from 'react'
import { EngagementEstimator } from './EngagementEstimator.jsx'
import { ServiceSelector } from './ServiceSelector.jsx'

export function EngagementPlanner() {
  const [businessSize, setBusinessSize] = useState('medium')
  const [selectedPillar, setSelectedPillar] = useState('strategy')
  const [duration, setDuration] = useState(3)

  return (
    <>
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
    </>
  )
}
