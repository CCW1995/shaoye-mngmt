import React, { Component } from 'react'
import { connect } from 'react-redux'

const HOC = ( WrappedComponent ) => {
  class WithHOC extends Component {
    state = {
      loading: false,
      showPassword: false,
      showErrorMessage: false
    }

    onChangeHOC = ( val, context ) => this.setState({ [context]: val })

    onClickLogin = ({ email, password }) => {}

    render = () => {
      return (
        <WrappedComponent 
          { ... this.props }
          showPassword={ this.state.showPassword }
          onLoadLogin={ this.state.loading }
          onChangeHOC={ this.onChangeHOC }
          onClickLogin={ this.onClickLogin }/>
      )
    }
  }
  const mapStateToProps = state => ({ data: state })
  return connect( mapStateToProps )( WithHOC );
}
export default HOC