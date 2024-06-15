
import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'
import { User } from '../../../backend/models/userModel'

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Outlet/> : <Navigate to="./sign-in"/>

}

export default PrivateRoute