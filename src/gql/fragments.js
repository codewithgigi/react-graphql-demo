import gql from "graphql-tag";

export const ReservationFragments = {
  reservation: gql`
    fragment reservation on Reservation {
      _id
      guestName
      hotelName
      arrivalDate
      departureDate
    }
  `
};
