import React from 'react'
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import Clear from '@material-ui/icons/Clear'

const Search = props => {
  const { setSearch, searchTerm, placeholder } = props
  const handleMouseDown = event => {
    event.preventDefault()
  }

  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        value={searchTerm ? searchTerm : ''}
        fullWidth
        name="search"
        label={placeholder}
        id="search"
        onChange={e => setSearch(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onMouseDown={handleMouseDown}
                onClick={() => setSearch()}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  )
}
export default Search
