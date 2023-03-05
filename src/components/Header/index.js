import React from 'react'
import cx from 'classnames'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import MobileMenu from '../Menu/MobileMenu'
import HeaderLogo from './Logo'
import Userbox from './Userbox'
import { pageNamesMappings } from './PageNamesMappings'

const Header = ({
  headerBackgroundColor,
  enableMobileMenuSmall,
  enableHeaderShadow,
  history
}) => {
  return (
    <>
      <ReactCSSTransitionGroup
        component="div"
        className={ cx("app-header", headerBackgroundColor, {'header-shadow': enableHeaderShadow}) }
        transitionName="HeaderAnimation"
        transitionAppear={ true }
        transitionAppearTimeout={ 1500 }
        transitionEnter={ false }
        transitionLeave={ false }>
        <MobileMenu />
        <div className='app-header__heading'>
          <HeaderLogo />
        </div>
        <div className={ cx( "app-header__content", { 'header-mobile-open': enableMobileMenuSmall } ) }>
          <div className="app-header-content__left">
          </div>
          <div className="app-header-content__right">
            <Userbox history={ history }/>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    </>
  )
}

const mapStateToProps = state => ({
  enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall
})

const mapDispatchToProps = dispatch => ({})

export default connect( mapStateToProps, mapDispatchToProps )( Header )