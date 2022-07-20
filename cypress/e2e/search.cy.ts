describe('search page', () => {
  it('can selects all available filters', () => {
    cy.visit('http://localhost:3000/search')
    const query = 'Asian'

    cy.get('#mainSearchBox').type(query)
    cy.get('.ais-RefinementList-item').contains(query).click()
    cy.get('input[name="3 stars and more"]').check({ force: true })

    cy.url({ decode: true })
    .should('contain', `q=${query}`)
    .should('contain', `foodType[0]=${query}`)
    .should('contain', 'starRate=3%3A') // it cannot decode the ":" character...
  })
})

export {}