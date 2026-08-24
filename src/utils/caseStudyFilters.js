/**
 * Returns a new array of case studies matching search and category.
 * Does not mutate the original list.
 */
export function filterCaseStudies(caseStudies, { searchTerm = '', category = 'All' } = {}) {
  if (!Array.isArray(caseStudies)) {
    return []
  }

  const query = searchTerm.trim().toLowerCase()
  const selectedCategory = typeof category === 'string' ? category : 'All'

  return caseStudies.filter((study) => {
    const matchesCategory =
      selectedCategory === 'All' || study.category === selectedCategory

    if (!matchesCategory) {
      return false
    }

    if (query === '') {
      return true
    }

    const searchableText = [
      study.category,
      study.companyType,
      study.challenge,
      study.solution,
      study.outcome,
      study.metric,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchableText.includes(query)
  })
}
