import {createContext} from 'react'

const noop = () => {}

export const AuthContext = createContext({
  userId: null,
  token: null,
  login: noop,
  logout: noop,
  isAuthenticated: false
})
