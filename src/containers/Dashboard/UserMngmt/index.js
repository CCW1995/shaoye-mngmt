import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { 
  Row, Col, Button,
  Card, CardBody
} from 'reactstrap'
import _ from 'lodash'

import ManaTable from 'components/Table'
import SearchForm from 'components/SearchForm'
import LoadingOverlay from 'components/Indicator/LoadingOverlay'

import UsersHOC from './action'

class Users extends Component {

  handleClass = val => {
    if ( val === 1) {
      return 'success'
    }

    if ( val === 2 ) {
      return 'warning'
    }

    return 'secondary'
  }

  handleStatusName = val => {
    let temp = _.find( this.props.data.DictionaryReducer.status, { id: val })
    const selectedLanguage = this.props.data.ProfileReducer.profile.admin_panel_language

    return temp
  }

  renderUserTable = () => {
    return (
      <>
        <ManaTable
          data={ this.props.users }
          actionsContent={[
            ... true ? [
              {
                content: <i className="pe-7s-pen btn-icon-wrapper"> </i>,
                actionID: 'UpdateUser',
                color: 'primary',
                tooltipContent: 'GENERAL_EDIT',
                onClick: val => {
                  this.props.onChangeUserHOC( 'showUpdateUserModal', true )
                  this.props.getSelectedUser( val.id  )
                }
              },
              {
                content: <i className="pe-7s-key btn-icon-wrapper"> </i>,
                actionID: 'UpdateUserPassword',
                color: 'success',
                tooltipContent: 'CHANGE_PASSWORD',
                onClick: val => {
                  this.props.onChangeUserHOC( 'selectedUser', val )
                  this.props.onChangeUserHOC( 'showUpdatePasswordModal', true )
                }
              },
              {
                content: <i className="pe-7s-download btn-icon-wrapper"> </i>,
                actionID: 'ArchieveUser',
                color: 'warning',
                disabled: val => val.status_id === 3,
                tooltipContent: 'GENERAL_ARCHIVE',
                onClick: val => {
                  this.props.onChangeUserHOC( 'selectedUser', val )
                  this.props.onChangeUserHOC( 'showArchieveUserModal', true )
                }
              }
            ] : []
          ]}
          columnsContent={[
            {
              Header: 'Name',
              accessor: "name"
            },
            {
              Header: 'Adress',
              accessor: "email"
            },
            {
              Header: 'Phone',
              accessor: "phone"
            },
            {
              Header: 'Shop Name',
              accessor: "shop_name"
            },
            {
              Header: 'Lattitude',
              accessor: "latitude"
            },
            {
              Header: 'Longitude',
              accessor: "longitude"
            }
          ]}
        />
      </>
    )
  }

  render = () => {
    return (
      <>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <Row>
            <Col md={12}>
              <Card className="main-card mb-3">
                <CardBody>
                  <div className='page-action-bar'>
                    <SearchForm
                      searchParams={ this.props.searchParams }
                      onChangeHOCState={ this.props.onChangeUserHOC }
                      getListAPI={ val => {}}
                    />
                    <div className="page-action-buttons">
                      {
                        true && (
                          <Button 
                            color='warning'
                            onClick={ () => this.props.onChangeUserHOC( 'showCreateUserModal', true ) } 
                          >
                            <div className='d-flex align-items-center text-white'>
                              <FaPlus className='mr-2' style={{ width: 15, height: 15 }}/>
                              Create
                            </div>
                          </Button>
                        )
                      }
                    </div>
                  </div>
                  { this.renderUserTable() }
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ReactCSSTransitionGroup>
        { this.props.onLoadUsers && <LoadingOverlay />}
      </>
    )
  }
}

const mapStateToProps = state => ({ data: state })
export default compose(
  UsersHOC,
  connect( mapStateToProps )
)(Users)