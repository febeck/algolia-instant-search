describe('home page', () => {
  it('makes a search', () => {
    cy.visit('http://localhost:3000')
    const query = 'Asian'

    cy.get('input').type(query)

    // Has results for restaurants
    cy.get('[data-autocomplete-source-id="restaurants"]')
    
    // Has results for food types and
    cy
      .get('[data-autocomplete-source-id="food_type"]') // finds results in the food types
      .find('li').first().click() // clicks the first (that should match the query)
    
    // Redirects user to search page with the correct filter
    cy.url().should('eq', 'http://localhost:3000/search?foodType[0]=Asian')
  })
})

export {}