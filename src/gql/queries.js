import gql from 'graphql-tag'
import { ReservationFragments } from './fragments'

export const GET_RESERVATIONS = gql`
  query reservations {
    reservations {
      ...reservation
    }
  }
  ${ReservationFragments.reservation}
`

export const GET_RESERVATION = gql`
  query reservation($id: ID!) {
    reservation(id: $id) {
      ...reservation
    }
  }
  ${ReservationFragments.reservation}
`
