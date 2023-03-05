import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PerfectScrollbar from 'react-perfect-scrollbar'

import HeaderLogo from 'components/Header/Logo'
import VerticalNavWrapper from 'components/Menu/VerticalNavWrapper'

import { setEnableMobileMenu } from 'reducers/ThemeOptions'

class Sidemenu extends Component {
  render = () => {
    return (
      <>
        <div className="sidebar-mobile-overlay" onClick={ () => this.props.setEnableMobileMenu( !this.props.enableMobileMenu ) } />
        <ReactCSSTransitionGroup
          component="div"
          className={ cx("app-sidebar", this.props.backgroundColor, { 'sidebar-shadow': this.props.enableSidebarShadow }) }
          transitionName="SidebarAnimation"
          transitionAppear={ true }
          transitionAppearTimeout={ 1500 }
          transitionEnter={ false }
          transitionLeave={ false }>
          <HeaderLogo />
          <PerfectScrollbar>
            <div className="app-sidebar__inner">
              <VerticalNavWrapper 
                userPermissions={ this.props.userPermissions }
                user={ this.props.user }
                userRole={ this.props.userRole } />
            </div>
          </PerfectScrollbar>
        </ReactCSSTransitionGroup>
      </>
    )
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage,
  backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
})

export default connect( mapStateToProps, {
  setEnableMobileMenu
})( Sidemenu )