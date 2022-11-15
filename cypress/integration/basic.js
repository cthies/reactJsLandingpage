describe('Basic flows', () => {
  it('Renders the home page', () => {
    cy.visit('http://localhost:3000');
    cy.get('#responsive-menu-button').click();
    cy.get('#customer_login').click();
    cy.get('#email').type('testuser@foodspring.com');
    cy.get('#pass').type('B?frdn(z#7');
    cy.get('#send2').click();
  });
});
