import React, { useState, useContext } from 'react'
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@material-ui/core'
import moment from 'moment'
import { CREATE_RESERVATION } from '../gql/mutations'
import Context from '../context'
import { useMutation } from '@apollo/react-hooks'

const AddReservation = () => {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState()
  const [formValues, setFormValues] = useState({
    hotelName: '',
    guestName: '',
    arrivalDate: moment(new Date()).format('MM DD YYYY'),
    departureDate: '',
  })

  const { dispatch } = useContext(Context)
  const [createReservation] = useMutation(CREATE_RESERVATION)

  const updateFormField = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await createReservation({
        variables: { reservationInput: formValues },
      })
      setOpen(false)

      dispatch({
        type: 'ADD_RESERVATION',
        payload: [data.createReservation],
      })
    } catch (errors) {
      const { graphQLErrors, networkError } = errors
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
          setError(message)
          setOpen(true)
        })

      if (networkError) {
        console.log('network', networkError)
        setError('Network server error', networkError)
        setOpen(true)
      }
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        onClick={() => setOpen(!open)}
      >
        Add Reservation
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Add Reservation
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {error && <div>{error}</div>}
              <TextField
                name="guestName"
                label="Guest Name"
                InputLabelProps={{ shrink: true, required: true }}
                type="textarea"
                defaultValue={''}
                onChange={e => updateFormField(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="hotelName"
                label="Hotel Name"
                InputLabelProps={{ shrink: true, required: true }}
                type="textarea"
                defaultValue={''}
                onChange={e => updateFormField(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="arrivalDate"
                label="Arrival Date"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                defaultValue={formValues.arrivalDate}
                onChange={e => updateFormField(e)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="departureDate"
                label="Departure Date"
                InputLabelProps={{ shrink: true, required: true }}
                type="date"
                defaultValue={formValues.arrivalDate}
                onChange={e => updateFormField(e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddReservation
