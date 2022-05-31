// 🐨 you'll need the test server
// 💰 the way that our tests are set up, you'll find this in `src/test/server/test-server.js`
 import {server, rest} from 'test/server'
// 🐨 grab the client
import {client} from '../api-client'

const apiURL = process.env.REACT_APP_API_URL

// 🐨 add a beforeAll to start the server with `server.listen()`
beforeAll(() => server.listen())
// 🐨 add an afterAll to stop the server when `server.close()`
afterAll(() => server.close())
// 🐨 afterEach test, reset the server handlers to their original handlers
// via `server.resetHandlers()`
afterEach(() => server.resetHandlers())
// 🐨 flesh these out:

//test.todo('calls fetch at the endpoint with the arguments for GET requests')
// 🐨 add a server handler to handle a test request you'll be making
// 💰 because this is the first one, I'll give you the code for how to do that.
// const endpoint = 'test-endpoint'
// const mockResult = {mockValue: 'VALUE'}
// server.use(
//   rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
//     return res(ctx.json(mockResult))
//   }),
// )
//
// 🐨 call the client (don't forget that it's asynchronous)
// 🐨 assert that the resolved value from the client call is correct
test('makes GET requests to the given endpoint', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )

  const result = await client(endpoint)

  expect(result).toEqual(mockResult)
})
// test.todo('adds auth token when a token is provided')
// 🐨 create a fake token (it can be set to any string you want)
// 🐨 create a "request" variable with let
// 🐨 create a server handler to handle a test request you'll be making
// 🐨 inside the server handler, assign "request" to "req" so we can use that
//     to assert things later.
//     💰 so, something like...
//       async (req, res, ctx) => {
//         request = req
//         ... etc...
//
// 🐨 call the client with the token (note that it's async)
// 🐨 verify that `request.headers.get('Authorization')` is correct (it should include the token)
test('adds auth token when a token is provided', async () => {
  const token = 'FAKE_TOKEN'

  let request
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResult))
    }),
  )

  await client(endpoint, {token})

  expect(request.headers.get('Authorization')).toBe(`Bearer ${token}`)
})
test.todo('allows for config overrides')
// 🐨 do a very similar setup to the previous test
// 🐨 create a custom config that specifies properties like "mode" of "cors" and a custom header
// 🐨 call the client with the endpoint and the custom config
// 🐨 verify the request had the correct properties

test.todo(
  'when data is provided, it is stringified and the method defaults to POST',
)
// 🐨 create a mock data object
// 🐨 create a server handler very similar to the previous ones to handle the post request
//    💰 Use rest.post instead of rest.get like we've been doing so far
// 🐨 call client with an endpoint and an object with the data
//    💰 client(endpoint, {data})
// 🐨 verify the request.body is equal to the mock data object you passed
