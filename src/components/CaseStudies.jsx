import { useState } from 'react'
import {
  CASE_STUDIES,
  CASE_STUDY_CATEGORIES,
} from '../data/caseStudies.js'
import { filterCaseStudies } from '../utils/caseStudyFilters.js'
import { CaseStudyCard } from './CaseStudyCard.jsx'

export function CaseStudies() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const visibleStudies = filterCaseStudies(CASE_STUDIES, {
    searchTerm,
    category: selectedCategory,
  })

  return (
    <section id="cases" className="section" aria-labelledby="cases-heading">
      <div className="container">
        <h2 id="cases-heading">Case studies</h2>
        <p className="section__intro">
          Sample assessment scenarios used to demonstrate discovery framing.
          They are not real Mayerfeld clients.
        </p>

        <div className="case-toolbar">
          <div className="form-field">
            <label htmlFor="case-search">Search case studies</label>
            <input
              id="case-search"
              type="search"
              value={searchTerm}
              placeholder="Search by challenge, outcome, or sector"
              autoComplete="off"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <fieldset className="selector-group">
            <legend>Category</legend>
            <div className="chip-row">
              {CASE_STUDY_CATEGORIES.map((category) => {
                const isSelected = category === selectedCategory

                return (
                  <button
                    key={category}
                    className={isSelected ? 'chip is-selected' : 'chip'}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>

        {visibleStudies.length > 0 ? (
          <div className="case-grid">
            {visibleStudies.map((study) => (
              <CaseStudyCard
                key={study.id}
                heading={study.companyType}
                category={study.category}
                challenge={study.challenge}
                solution={study.solution}
                outcome={study.outcome}
                metric={study.metric}
              />
            ))}
          </div>
        ) : (
          <p className="case-empty" role="status">
            No case studies match your current search.
          </p>
        )}
      </div>
    </section>
  )
}
