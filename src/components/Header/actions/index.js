import React, { Component } from 'react'
import _ from 'lodash'

import { requestError, requestSuccess } from 'utils/requestHandler'

const HOC = ( WrappedComponent ) => {
  class WithHOC extends Component {
    state = {
      loading: false,       
    }

    load = param => this.setState({ loading: param })

    submitForgotPassword = ( data ) => {}
    submitForgotPasswordSuccess = () => {
      requestSuccess( 'Request submitted successfully. Please check your email inbox.' )
    }
    submitForgotPasswordError = error => requestError( error )

    render = () => {
      return (
        <WrappedComponent
          { ...this.props }
          onLoadForgotPassword={ this.state.loading }                 
          submitForgotPassword={ this.submitForgotPassword } />
      )
    }
  }
  return WithHOC
}

export default HOC