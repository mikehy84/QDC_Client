import React from 'react'
import withAuth from '../../HOC/withAuth'


const AuthenticationTest = () => {
  return (
    <div>This page can be accessed by any logged in user</div>
  )
}

export default withAuth(AuthenticationTest)
