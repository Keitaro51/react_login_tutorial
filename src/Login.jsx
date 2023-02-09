import {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from './context/AuthProvider'
import axios from './api/axios'
const LOGIN_URL = '/auth'

const Login = () => {
  const {setAuth} = useContext(AuthContext)

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(LOGIN_URL, JSON.stringify({user, pwd}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      })
      console.log(JSON.stringify(res?.data))

      const accessToken = res?.data?.accessToken
      const roles = res?.data?.role

      setAuth({user, pwd, roles, accessToken})
      setUser('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.res) {
        setErrMsg('No server response')
      } else if (err.res?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.res?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              ref={userRef}
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            ></input>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            ></input>
            <button>Sign In</button>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              {/*put router link here */}
              <a href="/">SignUp</a>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Login
