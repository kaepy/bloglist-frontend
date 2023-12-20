import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Blog from './Blog'

// CI=true npm test

// 5.13: blogilistan testit, step1
// Tee testi, joka varmistaa että blogin näyttävä komponentti renderöi blogin titlen ja authorin mutta ei renderöi oletusarvoisesti urlia eikä likejen määrää. Mikäli toteutit tehtävän 5.7, niin pelkkä titlen renderöinnin testaus riittää.

describe('Blog Component', () => {
  const blog = {
    title: 'This is Blog title',
    author: 'Blog Author',
    url: 'Blog url',
    likes: 10,
    user: {
      name: 'Testi Testinen',
    },
  }

  test('renders title', () => {
    const component = render(<Blog blog={blog} />)
    expect(component.container).toHaveTextContent(blog.title)
  })

})