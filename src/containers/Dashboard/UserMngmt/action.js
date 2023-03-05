import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Get, Post, Put, Delete } from 'utils/axios'
import { requestError, requestSuccess } from 'utils/requestHandler'

const HOC = ( WrappedComponent ) => {
  class WithHOC extends Component {
    state = {
      loading: false,
      users: [],
      selected: {},
      searchParams: {
        main: [
          { 
            label: 'Name', 
            value: 'name',
            type: 'text',
            param: ''
          },
        ],
        advance: [
          { 
            label: 'Address', 
            value: 'address',
            checked: false,
            type: 'text',
            param: ''
          },
          { 
            label: 'Phone', 
            value: 'phone',
            checked: false,
            type: 'text',
            param: ''
          }
        ]
      },
      showCreateModal: false,
      showDeleteModal: false,
      showUpdateModal: false
    }

    onChangeSampleHOC = ( key, val ) => this.setState({ [key]: val })

    load = param => this.setState({ loading: param })

    getSample = ( search ) => {
      Get(
        ``,
        this.getSampleSuccess,
        this.getSampleError,
        this.load
      )
    }
    getSampleSuccess = payload => this.setState({ users: payload })
    getSampleError = error => requestError( error )

    getSelectedSample = id => Get(
      ``,
      this.getSelectedSampleSuccess,
      this.getSelectedSampleError,
      this.load
    )
    getSelectedSampleSuccess = payload => this.setState({ selected: payload })
    getSelectedSampleError = error => requestError ( error )

    createSample = dataToSubmit => Post(
      ``,
      dataToSubmit,
      this.createSampleSuccess,
      this.createSampleError,
      this.load
    )
    createSampleSuccess = payload => {
      const { search } = this.props.data.LastViewReducer.lastView

      this.getSample( search )
      requestSuccess( 's has been created successfully.' )
    }
    createSampleError = error => requestError( error )

    deleteSample = id => Delete( 
      ``,
      this.deleteSampleSuccess,
      this.deleteSampleError,
      this.load
    )
    deleteSampleSuccess = payload => {
      const { search } = this.props.data.LastViewReducer.lastView

      this.setState({ showDeleteModal: false })
      this.getSample( search )
      requestSuccess( ' has been deleted succesfully.' )
    }
    deleteSampleError = error => requestError( error )

    updateSample = dataToSubmit => Put(
      ``,
      dataToSubmit,
      this.updateSampleSucces,
      this.updateSampleError,
      this.load
    )
    updateSampleSucces = payload => {
      const { search } = this.props.data.LastViewReducer.lastView

      this.getSample( search )
      this.getSelectedSample( payload.id )
      requestSuccess( '' )
    }
    updateSampleError = error => requestError( error )

    render = () => {
      return (
        <WrappedComponent
          { ...this.props } 
          users={ this.state.samples }
          searchParams={ this.state.searchParams }
          onLoadSample={ this.state.loading }
          showCreateModal={ this.state.showCreateModal }
          showDeleteModal={ this.state.showDeleteModal }
          showUpdateModal={ this.state.showUpdateModal }

          getSample={ this.getSample }
          getSelectedSample={ this.getSelectedSample }
          createSample={ this.createSample }
          deleteSample={ this.deleteSample }
          updateSample={ this.updateSample }
          onChangeSampleHOC={ this.onChangeSampleHOC }/>
      )
    }
  }
  const mapStateToProps = state => ({ data: state })
  return connect( mapStateToProps )( WithHOC )
}

export default HOC