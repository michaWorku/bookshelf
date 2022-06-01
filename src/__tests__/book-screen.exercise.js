// 🐨 here are the things you're going to need for this test:
import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {queryCache} from 'react-query'
import * as auth from 'auth-provider'
import {buildUser, buildBook} from 'test/generate'
import * as usersDB from 'test/data/users'
import * as booksDB from 'test/data/books'
import * as listItemsDB from 'test/data/list-items'
import {formatDate} from 'utils/misc'
import {AppProviders} from 'context'
import {App} from 'app'

// 🐨 after each test, clear the queryCache and auth.logout
// general cleanup
afterEach(async () => {
    queryCache.clear()
    await Promise.all([
      auth.logout(),
      usersDB.reset(),
      booksDB.reset(),
      listItemsDB.reset(),
    ])
  })
  
// test.todo('renders all the book information')
// 🐨 "authenticate" the client by setting the auth.localStorageKey in localStorage to some string value (can be anything for now)

// 🐨 create a user using `buildUser`
// 🐨 create a book use `buildBook`
// 🐨 update the URL to `/book/${book.id}`
//   💰 window.history.pushState({}, 'page title', route)
//   📜 https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

// 🐨 reassign window.fetch to another function and handle the following requests:
// - url ends with `/bootstrap`: respond with {user, listItems: []}
// - url ends with `/list-items`: respond with {listItems: []}
// - url ends with `/books/${book.id}`: respond with {book}
// 💰 window.fetch = async (url, config) => { /* handle stuff here*/ }
// 💰 return Promise.resolve({ok: true, json: async () => ({ /* response data here */ })})

// 🐨 render the App component and set the wrapper to the AppProviders
// (that way, all the same providers we have in the app will be available in our tests)

// 🐨 use findBy to wait for the book title to appear
// 📜 https://testing-library.com/docs/dom-testing-library/api-async#findby-queries

// 🐨 assert the book's info is in the document

test('renders all the book information', async () => {
    const user = buildUser()
    await usersDB.create(user)
    const authUser = await usersDB.authenticate(user)
    window.localStorage.setItem(auth.localStorageKey, authUser.token)
  
    const book = await booksDB.create(buildBook())
    const route = `/book/${book.id}`
    window.history.pushState({}, 'Test page', route)
  
    render(<App />, {wrapper: AppProviders})
  
    await waitForElementToBeRemoved(() => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ])
  
    expect(screen.getByRole('heading', {name: book.title})).toBeInTheDocument()
    expect(screen.getByText(book.author)).toBeInTheDocument()
    expect(screen.getByText(book.publisher)).toBeInTheDocument()
    expect(screen.getByText(book.synopsis)).toBeInTheDocument()
    expect(screen.getByRole('img', {name: /book cover/i})).toHaveAttribute(
      'src',
      book.coverImageUrl,
    )
    expect(screen.getByRole('button', {name: /add to list/i})).toBeInTheDocument()
  
    expect(
      screen.queryByRole('button', {name: /remove from list/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /mark as read/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /mark as unread/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', {name: /notes/i}),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/start date/i)).not.toBeInTheDocument()
  })

  test('can create a list item for the book', async () => {
    const user = buildUser()
    await usersDB.create(user)
    const authUser = await usersDB.authenticate(user)
    window.localStorage.setItem(auth.localStorageKey, authUser.token)
  
    const book = await booksDB.create(buildBook())
    const route = `/book/${book.id}`
    window.history.pushState({}, 'Test page', route)
  
    render(<App />, {wrapper: AppProviders})
  
    await waitForElementToBeRemoved(() => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ])
  
    const addToListButton = screen.getByRole('button', {name: /add to list/i})
    await userEvent.click(addToListButton)
    expect(addToListButton).toBeDisabled()
  
    await waitForElementToBeRemoved(() => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ])
  
    expect(
      screen.getByRole('button', {name: /mark as read/i}),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {name: /remove from list/i}),
    ).toBeInTheDocument()
    expect(screen.getByRole('textbox', {name: /notes/i})).toBeInTheDocument()
  
    const startDateNode = screen.getByLabelText(/start date/i)
    expect(startDateNode).toHaveTextContent(formatDate(Date.now()))
  
    expect(
      screen.queryByRole('button', {name: /add to list/i}),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {name: /mark as unread/i}),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('radio', {name: /star/i})).not.toBeInTheDocument()
  })