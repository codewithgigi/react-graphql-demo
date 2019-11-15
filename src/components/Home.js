import React from 'react'
import Header from './Header'
import Reservations from './Reservations'
import { HomeContainer } from '../styles'

export default () => {
  return (
    <HomeContainer>
      <Reservations />
    </HomeContainer>
  )
}
