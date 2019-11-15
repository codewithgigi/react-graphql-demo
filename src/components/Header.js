import React from 'react'
import { Toolbar, AppBar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

function Header() {
  return (
    <React.Fragment>
      <AppBar color="inherit" position="sticky" elevation={0}>
        <Toolbar>
          <Typography key={1}>React/Graphql Hooks Demo</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
