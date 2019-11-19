export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_RESERVATION':
      const data = {
        ...state,
        reservations: [
          ...new Set([...state.reservations, ...action.payload]),
        ],
      }

      return data
    default:
      return state
  }
}
