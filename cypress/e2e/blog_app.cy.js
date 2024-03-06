// 5.19: blogilistan end to end ‑testit, step3
// Tee testi, joka varmistaa, että kirjautunut käyttäjä pystyy luomaan blogin. Testin tulee varmistaa, että luotu blogi tulee näkyville blogien listalle.

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'himmeli',
      password: 'hommeli'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('username').get('#username')
    cy.contains('password').get('#password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('himmeli')
      cy.get('#password').type('hommeli')
      cy.get('#login-button').click()

      cy.contains('Welcome himmeli!')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('himmeli')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Ups! Wrong credentials. Try again :)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('himmeli')
      cy.get('#password').type('hommeli')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('title example')
      cy.get('#author').type('author example')
      cy.get('#url').type('url example')
      cy.get('#create-button').click()

      cy.contains('A new blog title example by author example added')
      cy.contains('title example')
    })
  })

})