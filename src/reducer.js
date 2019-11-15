export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_RESERVATION':
      console.log('state', state, action)
      const data = {
        ...state,
        reservations: [
          ...new Set([...state.reservations, ...action.payload]),
        ],
      }
      console.log('reduce data', data)
      return data
    default:
      return state
  }
}
