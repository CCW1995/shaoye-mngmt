import React, { Component, Suspense, lazy } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { compose } from 'redux'
// import Lottie from 'react-lottie-player'

import LoadingOverlay from 'components/Indicator/LoadingOverlay'
import TemplateContainerMain from 'components/Template'
import TemplateHeader from 'components/Header'
import TemplateSidemenu from 'components/Menu/Sidemenu'

import * as animationData from 'assets/lottie/rocket-launch-space-explore.json'
import 'react-toastify/dist/ReactToastify.css';

const OrderMngmt =  lazy(() => import( './OrderMngmt' ))
const UsersMngmt =  lazy(() => import( './UserMngmt' ))

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={ <LoadingOverlay/> }>
    { children }
  </Suspense>
)

class Dashboard extends Component {

  render = () => {
    return (
      <>
        <TemplateContainerMain>
          <TemplateHeader/>
          <div className="app-main">
            <TemplateSidemenu 
              userPermissions={ this.props.userPermissions }
              user={ this.props.user }
              userRole={ this.props.userRole } />
            <div className="app-main__outer">
              <div className="app-main__inner">
                <SuspenseWrapper>
                  <Route 
                    path={ `/dashboard/order` } 
                    render={ props => (
                      <OrderMngmt  
                        { ...props }
                      />
                      )} />
                </SuspenseWrapper>
                <SuspenseWrapper>
                  <Route 
                    path={ `/dashboard/user` } 
                    render={ props => (
                      <UsersMngmt 
                        { ...props }
                        moduleID={ 8 }
                      />
                    )} />
                </SuspenseWrapper>
              </div>
            </div>
          </div>
          <ToastContainer position={ toast.POSITION.BOTTOM_RIGHT }/>
        </TemplateContainerMain>
      </>
    )
  }
}

const mapStateToProps = state => ({ data: state })
export default compose(
  connect( mapStateToProps, {
    withRouter
  })
)(Dashboard)