import React, { useContext, useReducer } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../theme'
import Context from '../context'
import reducer from '../reducer'

import Home from '../components/Home'

const App = () => {
  const initialState = useContext(Context)
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Context.Provider value={{ state, dispatch }}>
          <Home />
        </Context.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
