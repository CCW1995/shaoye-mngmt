import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall
} from 'reducers/ThemeOptions'

import icon from 'assets/shaoye/icon.jpg'

class Logo extends Component {
  state = {
    active: false,
    mobile: false,
    activeSecondaryMenuMobile: false
  }

  render = () => {
    return (
      <div className="app-header__logo">
        {/* <img src={ icon } style={{ width: 100 }} alt="proofpoint-logo" /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
})

export default connect( mapStateToProps, {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall
})( Logo )