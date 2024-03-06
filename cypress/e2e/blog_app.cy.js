// 5.18: blogilistan end to end ‑testit, step2
// Tee testit kirjautumiselle, testaa sekä onnistunut että epäonnistunut kirjautuminen. Luo testejä varten käyttäjä beforeEach-lohkossa.

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

})