// 🐨 you'll need to import react and createRoot from react-dom up here
import '@reach/dialog/styles.css'
import React, { useState } from 'react'
import { render } from 'react-dom'

// 🐨 you'll also need to import the Logo component from './components/logo'
import { Logo } from 'components/logo'
import {Dialog} from '@reach/dialog'


const LoginForm = ({buttonText, onSubmit}) =>{

    const handleSubmit = (e)=>{
        e.preventDefault()
        const {username, password} = e.target.elements

        onSubmit({
            username: username.value,
            password: password.value
        })
    }

    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' />
            </div>
            <div>
                <button type='submit'>{buttonText}</button>
            </div>
        </form>
    )
}

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
const App = ()=>{
    const [openModal, setOpenModal] = useState('none')

    const login = (formData) => {
        console.log('login', formData)
      }

    const register = (formData) => {
        console.log('register', formData)
      }
    return (
        <div>
            <Logo width='80' height='80'/>
            <h1>BookShelf</h1>
            <div>
                <button onClick={() => setOpenModal('login')}>login</button>
            </div>
            <div>
                <button onClick={() => setOpenModal('register')}>register</button>
            </div>
            <Dialog aria-label='Login form' isOpen={openModal === 'login'}>
                <div>
                    <button onClick={()=>setOpenModal('none') }>close</button>
                </div>
                <h3>Login</h3>
                <LoginForm buttonText='Login' onSubmit={login}/>
            </Dialog>
            <Dialog aria-label='Registration form' isOpen={openModal === 'register'}>
                <div>
                    <button onClick={()=>setOpenModal('none') }>close</button>
                </div>
                <h3>Register</h3>
                <LoginForm buttonText='Register' onSubmit={register}/>
            </Dialog>
        </div>
    )
}

// 🐨 use createRoot to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
render(<App/>, document.getElementById('root'))