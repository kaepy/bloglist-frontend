// 5.23: blogilistan end to end ‑testit, step6
// Tee testi, joka varmistaa, että blogit järjestetään likejen mukaiseen järjestykseen, eniten likejä saanut blogi ensin.

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

      cy.createBlog({ title: 'yet title', author: 'yet author', url: 'yet url' })
      cy.createBlog({ title: 'another title', author: 'another author', url: 'another url' })
      cy.createBlog({ title: 'and title', author: 'and author', url: 'and url' })
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
      cy.contains('another title').as('likeBlog')
        .find('#viewhide-button')
        .click()

      cy.get('@likeBlog').contains('likes').should('contain', '0')
      cy.get('@likeBlog').find('#like-button').click()

      cy.contains('New like added to blog another title')
      // ei välttämättä se paras ratkasu, mutta toimii!
      cy.get('@likeBlog').parent().contains('likes').should('contain', '1')
    })

    it('A blog can be removed', function () {
      cy.contains('and title').as('blogToRemove')
        .find('#viewhide-button')
        .click()

      cy.get('@blogToRemove').find('#remove-button').click()

      cy.contains('Blog and title removed')
      cy.get('and another title').should('not.exist')
    })

    it('Only blog creator can see remove button', function () {
      cy.contains('yet title').as('blogToRemove')
        .find('#viewhide-button').click()

      cy.get('@blogToRemove').find('#remove-button')

      cy.logout()
      cy.login({ username: 'gimmeli', password: 'gommeli' })

      cy.get('@blogToRemove').find('#viewhide-button').click()

      cy.get('@blogToRemove').find('#remove-button').should('not.exist')
    })

    it.only('Blogs are sorted by likes', function () {
      cy.get('.blog').contains('yet title').as('likeYetBlog')
        .find('#viewhide-button')
        .click()

      cy.get('.blog').contains('another title').as('likeAnotherBlog')
        .find('#viewhide-button')
        .click()

      cy.get('.blog').contains('and title').as('likeAndBlog')
        .find('#viewhide-button')
        .click()

      for (let i = 0; i < 5; i++) {
        cy.get('@likeAnotherBlog').find('#like-button').click()
        cy.wait(1000)
      }

      cy.get('@likeYetBlog').find('#like-button').dblclick()
      cy.wait(1000)

      cy.get('.blog').eq(0).should('contain', 'and title')
      cy.get('.blog').eq(1).should('contain', 'yet title')
      cy.get('.blog').eq(2).should('contain', 'another title')
    })

  })

})
