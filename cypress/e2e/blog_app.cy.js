// 5.17: blogilistan end to end ‑testit, step1
// Konfiguroi Cypress projektiisi. Tee testi, joka varmistaa, että sovellus näyttää oletusarvoisesti kirjautumislomakkeen.
// Testin beforeEach-alustuslohkon tulee nollata tietokannan tilanne.

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username').get('#username')
    cy.contains('password').get('#password')
    cy.contains('login')
  })

})