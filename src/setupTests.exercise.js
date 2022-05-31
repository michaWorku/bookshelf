import {server} from 'test/server'
// 🐨 add a beforeAll to start the server with `server.listen()`
beforeAll(() => server.listen())
// 🐨 add an afterAll to stop the server when `server.close()`
afterAll(() => server.close())
// 🐨 afterEach test, reset the server handlers to their original handlers
// via `server.resetHandlers()`
afterEach(() => server.resetHandlers())