import React, { Fragment } from 'react'
import { NotificationsOutline } from 'react-ionicons'
import { 
  DropdownToggle, DropdownMenu,
  Nav, NavItem,
  Button, 
  UncontrolledButtonDropdown ,
  UncontrolledTooltip
} from 'reactstrap'

export default function Notification({
  notification,
  history,
  setNotificationRead,
  onToggleDetail,
  onChangeSelected
}) {
  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="link">
        <div 
          id="ViewMore"
          className="icon-wrapper bg-warning icon-wrapper-alt rounded-circle" 
          style={{ width: 'initial', height: 'initial', padding: 8, overflow: 'initial' }}
        >
          <NotificationsOutline width={ '25px' } color="white"/>
          <UncontrolledTooltip target="ViewMore" placement="top">
            Notifications
          </UncontrolledTooltip>
          <div 
            className="badge badge-dot badge-dot-sm badge-warning"
          >
            Notifications
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl rm-pointers">
          <div className="dropdown-menu-header mb-0">
              <div className="dropdown-menu-header-inner" style={{ padding: '0.8rem 0.5rem' }}>
                  <div className="menu-header-content text-dark">
                      <h5 className="menu-header-title">
                        Notifications
                      </h5>
                  </div>
              </div>
          </div>
          <Nav vertical>
          {/* {
            notification.meta.Meta.total_count < 1 && (
              <>
              <NavItem className="nav-item-divider"/>
              <NavItem className="text-center">
                <h6 className={ 'fw-600' }>No notification is available.</h6>
                </NavItem>
              </>
            )
          }
          {
            notification.meta.Meta.total_count > 0 && (
              <>
                {
                  notification.data?.[0] && notification.data.map( data => (
                    (
                      <Fragment key={ data.id }>
                        <NavItem className="nav-item-divider"/>
                        <NavItem 
                          className="nav-item-btn position-relative"
                          style={{ cursor: 'pointer' }}
                          onClick={ () => {
                            onChangeSelected( data )
                            onToggleDetail( true )
                            !data.is_read && setNotificationRead( data.id )
                          }}
                        >
                          <span>
                            { `${ data.content.slice( 0, 150 ) } ${ data.content.length > 150 ? '...' : '' }`}
                          </span>
                          {
                            !data.is_read && (
                              <div 
                                className="badge badge-dot badge-dot-lg badge-warning position-absolute"
                                style={{ top: '40%', right: 10, backgroundColor: '#545cd8' }}
                              >
                                Unread
                              </div>
                            )
                          }
                        </NavItem>
                      </Fragment>
                    )
                  ))
                }
              </>
            )
          } */}
          <NavItem className="nav-item-divider"/>
            <NavItem className="nav-item-btn text-center">
                <Button 
                  size="sm" className="btn-shadow btn-wide btn-pill" color="focus"
                  style={{ padding: '4px 8px' }}
                  onClick={ () => history.push( '/dashboard/notifications' )}
                >
                  View All Notifications
                </Button>
            </NavItem>
        </Nav>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}
