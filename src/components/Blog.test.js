import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

// CI=true npm test

// 5.14: blogilistan testit, step 2
// Tee testi, joka varmistaa että myös url, likejen määrä ja käyttäjä näytetään, kun blogin kaikki tiedot näyttävää nappia on painettu.

describe('Blog Component', () => {
  const blog = {
    title: 'This is Blog title',
    author: 'Blog Author',
    url: 'Blog url',
    likes: 10,
    user: {
      username: 'Testi Testinen',
    },
  }

  test('renders title', () => {
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent(blog.title)

    screen.debug()
  })

  test('renders content when view button is pressed', async () => {
    const mockHandler = jest.fn()

    const userX = {
      username: 'testi'
    }

    const component = render(<Blog blog={blog} buttonToggle={mockHandler} user={userX} />)

    screen.debug()

    const user = userEvent.setup()

    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    screen.debug()

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
    expect(component.container).toHaveTextContent(blog.user.username)

    //screen.debug()
  })

})