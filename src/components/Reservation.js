import React from 'react'
import moment from 'moment'
import { useQuery } from '@apollo/react-hooks'
import {
  Grid,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { GET_RESERVATION } from '../gql/queries'

const useStyles = makeStyles(theme => ({
  title: {
    paddingRight: '.4rem',
    fontWeight: '700',
  },
  message: {
    fontSize: '1.2rem',
    padding: '1rem',
  },
}))

const Reservation = ({ reservationId }) => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_RESERVATION, {
    variables: { id: reservationId },
  })

  if (loading)
    return (
      <Grid container justify="center" alignItems="center">
        <CircularProgress disableShrink />
      </Grid>
    )
  if (error) {
    const { graphQLErrors, networkError } = error
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => {
        return (
          <Typography className={classes.message}>
            {message}
          </Typography>
        )
      })

    if (networkError) {
      return 'Network server error', networkError
    }
  }

  const { reservation } = data || {}

  return (
    <span style={{ padding: '1rem', fontSize: '1rem' }}>
      {reservation && (
        <List>
          <ListItem>
            <Typography className={classes.title}>Geust: </Typography>
            {reservation.guestName}
          </ListItem>
          <ListItem>
            <Typography className={classes.title}>Hotel: </Typography>
            {reservation.hotelName}
          </ListItem>
          <ListItem>
            <Typography className={classes.title}>
              Arrival Date:
            </Typography>
            {moment(reservation.arrivalDate).format('MMM DD YYYY')}
          </ListItem>
          <ListItem>
            <Typography className={classes.title}>
              Departure Date:
            </Typography>
            {moment(reservation.departureDate).format('MMM DD YYYY')}
          </ListItem>
        </List>
      )}
      {!reservation && 'no reservation exists with that id'}
    </span>
  )
}
export default Reservation
