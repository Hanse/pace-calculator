/* global context, cy */

context('PaceCalculator', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should render the page', () => {
    cy.contains('How fast must I run');
    cy.get('.App-content').should('be.visible');
  });

  it('should update content after input', () => {
    cy.get('input[name="distance"]')
      .type('marathon')
      .should('have.value', 'marathon');

    cy.get('input[name="time"]')
      .type('3 hours 30 minutes')
      .should('have.value', '3 hours 30 minutes');

    cy.get('.summary')
      .should('contain', '42,195 m')
      .should('contain', '03:30:00.00')
      .should('contain', '04:59 min/km')
      .should('contain', '12.1 km/h');
  });
});
