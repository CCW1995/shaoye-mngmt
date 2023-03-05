import React, { useState } from 'react'

import {
  DropdownToggle, DropdownMenu,
  Button,
  UncontrolledButtonDropdown,
  UncontrolledTooltip
} from 'reactstrap'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compose } from 'redux'
import { connect } from 'react-redux'
import NotificationContent from './Notification'

import avatar1 from 'assets/images/av1.png'
import LoadingOverlay from 'components/Indicator/LoadingOverlay'

import WithForgotPassword from './actions'

const Userbox = ({
  data,
  history,
  onLoadForgotPassword
}) => {
  const [ showDetails, onToggleDetail ] = useState( false )
  const [ selectedNotification, onChangeSelected ] = useState( false )

  return (
    <>
      <div className="header-btn-lg ml-0 pl-0 pr-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <NotificationContent
                history={ history }
                onToggleDetail={ onToggleDetail }
                onChangeSelected={ onChangeSelected }
              />
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0" id="account">
                  <img width={ 42 } className="rounded-circle btn-signout" src={ avatar1 } alt="" />
                  <FontAwesomeIcon className="ml-2 opacity-8" icon={ faAngleDown } />
                  <UncontrolledTooltip target="account">
                    Account
                  </UncontrolledTooltip>
                </DropdownToggle>
                <DropdownMenu right className="rm-pointers dropdown-menu-lg p-0">
                  <div className="dropdown-menu-header" style={{ marginBottom: 0 }}>
                    <div className="dropdown-menu-header-inner bg-white">
                      <div className="menu-header-image opacity-2" />
                      <div className="menu-header-content text-left">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-3">
                              <img width={42} className="rounded-circle" src={ avatar1 } alt="" />
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading text-dark">{ `Tony Tan` }</div>
                              <div className="widget-subheading text-dark opacity-8">{ 'Email' }</div>
                            </div>
                            <div className="widget-content-right mr-2">
                              <Button 
                                className="btn-pill bg-dark text-light btn-shadow btn-shine btn-logout" 
                                color="focus" 
                                onClick = { () => {
                                  history.push( '/login' )
                                }}>
                                Logout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
        </div>
        {
          onLoadForgotPassword && <LoadingOverlay />
        }        
      </div>
    </>
  )
}

const mapStateToProps = state => ({ data:state })
export default compose (
  connect( mapStateToProps ),
  WithForgotPassword
)( Userbox )