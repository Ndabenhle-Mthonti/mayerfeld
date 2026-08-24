/**
 * Returns a new array of case studies matching search and category.
 * Does not mutate the original list. Never throws on bad input.
 */
export function filterCaseStudies(caseStudies, options) {
  if (!Array.isArray(caseStudies)) {
    return []
  }

  const { searchTerm, category } = options && typeof options === 'object' ? options : {}
  const query = typeof searchTerm === 'string' ? searchTerm.trim().toLowerCase() : ''
  const selectedCategory = typeof category === 'string' && category.trim() !== ''
    ? category.trim()
    : 'All'

  return caseStudies.filter((study) => {
    if (!study || typeof study !== 'object') {
      return false
    }

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
      .filter((value) => typeof value === 'string' && value !== '')
      .join(' ')
      .toLowerCase()

    return searchableText.includes(query)
  })
}
