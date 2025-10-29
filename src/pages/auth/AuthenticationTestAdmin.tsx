import React from 'react'
import withAdminAuth from '../../HOC/withAdminAuth';

const AuthenticationTestAdmin = () => {
  return (
    <div>This page can only be accessed by Admin</div>
  )
}

export default withAdminAuth(AuthenticationTestAdmin);