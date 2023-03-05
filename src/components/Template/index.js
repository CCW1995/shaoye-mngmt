import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import ResizeDetector from 'react-resize-detector';
import cx from 'classnames'

class Main extends Component {
  state = {
    closedSmallerSidebar: false
  }

  render = () => {
    let {
      colorScheme,
      enableFixedHeader,
      enableFixedSidebar,
      enableFixedFooter,
      enableClosedSidebar,
      closedSmallerSidebar,
      enableMobileMenu,
      enablePageTabsAlt,
    } = this.props
    return (
      <ResizeDetector
        handleWidth
        render={({ width }) => (
          <Fragment>
            <div
              className={cx(
                "app-container app-theme-" + colorScheme,
                {'fixed-header': enableFixedHeader},
                {'fixed-sidebar': enableFixedSidebar || width < 1250},
                {'fixed-footer': enableFixedFooter},
                {'closed-sidebar': enableClosedSidebar || width < 1250},
                {'closed-sidebar-mobile': closedSmallerSidebar || width < 1250},
                {'sidebar-mobile-open': enableMobileMenu},
                {'body-tabs-shadow-btn': enablePageTabsAlt},
              )}>
              { this.props.children }
            </div>
          </Fragment>
        )}
      />
    )
  }
}

const mapStateToProps = state => ({
  colorScheme: state.ThemeOptions.colorScheme,
  enableFixedHeader: state.ThemeOptions.enableFixedHeader,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableFixedFooter: state.ThemeOptions.enableFixedFooter,
  enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt
})

export default connect( mapStateToProps )( Main )