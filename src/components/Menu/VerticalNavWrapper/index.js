import React, { Component } from 'react'
import { connect } from 'react-redux'
import MetisMenu from 'react-metismenu'
import _ from 'lodash'

import { setEnableMobileMenu } from 'reducers/ThemeOptions'

import { MainNav } from './dataMainNav'

class VerticalNavWrapper extends Component {
  
  render = () => {
    return (
      <>
        <br />
        <MetisMenu
          content={ MainNav }
          onSelected={ () => this.props.setEnableMobileMenu( !this.props.enableMobileMenu ) }
          activeLinkFromLocation
          className="vertical-nav-menu"
          iconNamePrefix=""
          classNameStateIcon="pe-7s-angle-down" />
      </>
    )
  }
}

const mapStateToProps = state => ({
  data: state,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu
})

export default connect( mapStateToProps, {
  setEnableMobileMenu
})( VerticalNavWrapper )