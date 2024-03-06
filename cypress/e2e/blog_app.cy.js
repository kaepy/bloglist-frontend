// 5.22: blogilistan end to end ‑testit, step6
// Tee testi, joka varmista, että vain blogin lisännyt käyttäjä näkee blogin poistonapin.

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      username: 'himmeli',
      password: 'hommeli'
    }

    const user2 = {
      username: 'gimmeli',
      password: 'gommeli'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'himmeli', password: 'hommeli' })

      cy.createBlog({ title: 'another title', author: 'another author', url: 'another url' })
      cy.createBlog({ title: 'yet another title', author: 'yet another author', url: 'yet another url' })
      cy.createBlog({ title: 'and another title', author: 'and another author', url: 'and another url' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('title example')
      cy.get('#author').type('author example')
      cy.get('#url').type('url example')
      cy.get('#create-button').click()

      cy.contains('A new blog title example by author example added')
      cy.contains('title example')
    })

    it('A blog can be liked', function () {
      cy.get('#viewhide-button').click()
      cy.contains('likes').should('contain', '0')

      cy.get('#like-button').click()

      cy.contains('New like added to blog another title')
      cy.contains('likes').should('contain', '1')
    })

    it('A blog can be removed', function () {
      cy.contains('and another title').as('blogToRemove')
        .find('#viewhide-button')
        .click()

      cy.get('@blogToRemove').find('#remove-button').click()

      cy.contains('Blog and another title removed')
      cy.get('and another title').should('not.exist')
    })

    it('Only blog creator can see remove button', function () {
      cy.contains('and another title').as('blogToRemove')
        .find('#viewhide-button').click()

      cy.get('@blogToRemove').find('#remove-button')

      cy.logout()
      cy.login({ username: 'gimmeli', password: 'gommeli' })

      cy.get('@blogToRemove').find('#viewhide-button').click()

      cy.get('@blogToRemove').find('#remove-button').should('not.exist')
    })

  })

})