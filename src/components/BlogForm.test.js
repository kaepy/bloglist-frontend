import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

// CI=true npm test
// npm test -- --coverage --collectCoverageFrom='src/**/*.{jsx,js}'

// 5.16: blogilistan testit, step 4
// Tee uuden blogin luomisesta huolehtivalle lomakkeelle testi, joka varmistaa, että lomake kutsuu propsina saamaansa takaisinkutsufunktiota oikeilla tiedoilla siinä vaiheessa kun blogi luodaan.

describe('Testing NewBlogForm component', () => {
  const newBlog = {
    title: 'Mock Tester',
    author: 'Mock the Mocker',
    url: 'Blog url',
  }

  const mockCreateBlog = jest.fn()

  const component = <BlogForm createBlog={mockCreateBlog} />

  test('<BlogForm /> create new blog', async () => {
    const user = userEvent.setup()

    render(component)

    //screen.debug()

    const title = screen.getByPlaceholderText('placeholder title')
    const author = screen.getByPlaceholderText('placeholder author')
    const url = screen.getByPlaceholderText('placeholder url')
    const createButton = screen.getByText('create')

    await user.type(title, newBlog.title)
    await user.type(author, newBlog.author)
    await user.type(url, newBlog.url)
    await user.click(createButton)

    //screen.debug()

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    //expect(mockCreateBlog).toHaveBeenCalledTimes(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe(`${newBlog.title}`)
    expect(mockCreateBlog.mock.calls[0][0].author).toBe(`${newBlog.author}`)
    expect(mockCreateBlog.mock.calls[0][0].url).toBe(`${newBlog.url}`)

    //screen.debug()
  })

})