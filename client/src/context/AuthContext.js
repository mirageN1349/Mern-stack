import React from 'react'

function noop() {}

export const AuthContext = React.createContext({
  token: null,
  userId: null,
  logout: noop,
  login: noop,
  isAuthenticated: false,
})
