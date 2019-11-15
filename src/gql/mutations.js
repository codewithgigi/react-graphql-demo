import gql from "graphql-tag";
import { ReservationFragments } from "./fragments";

export const CREATE_RESERVATION = gql`
  mutation createReservation($reservationInput: reservationInput!) {
    createReservation(reservationInput: $reservationInput) {
      ...reservation
    }
  }
  ${ReservationFragments.reservation}
`;
