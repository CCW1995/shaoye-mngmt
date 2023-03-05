import Axios from 'axios'
import getDomainURL from 'utils/api'

export const Get = (url, response, error, load, current_role_id ) => {
  load(true)
  let token = ''
  Axios.defaults.headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
  return Axios.get(`${getDomainURL()}${url}${ current_role_id ? `&role_id=${ current_role_id }` : '' }`).then(res => {
    response(res.data)
    load(false)
  }).catch(err => {
    if (err && err.response) {
      if (err.response.status === 401) {
        // error(err.response.status)
      } else if (err.response.status === 500) {
        error('Server encountered issues. Please contact your system admin for assistance.')
      } else {
        error(err.response.data.message )
      }
    } else if (err.response) {
      error(err.response.data[0])
    } else {
      error('You are disconnnected from the internet, please reconnect to use the system. If problem persists, please contact the system admin.')
    }
    load(false)
  })
}

export const Post = (url, data, response, error, load) => {
  load(true)
  let token = ''
  Axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
  return Axios.post(`${getDomainURL()}${url}`, data).then(res => {
    response(res.data)
    load(false)
  }).catch(err => {
    if (err && err.response && err.response.status === 422 ) {
      
      error( errorMessageHandling( err ))
    } else {
      error('You are disconnnected from the internet, please reconnect to use the system. If problem persists, please contact the system admin.')
    }
    load(false)
  })
}

export const Put = (url, data, response, error, load) => {
  load(true)
  let token = ''
  Axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
  return Axios.put(`${getDomainURL()}${url}`, data).then(res => {
    response(res.data)
    load(false)
  }).catch(err => {
    console.dir(err, 'err')
    if (err && err.response && err.response.status) {
      if (err.response.status === 500) {
        error('Server encountered issues. Please contact your system admin for assistance.')
      } else if(err.response.status === 422){
        error( errorMessageHandling( err ))
      } else {
        error(err.response.data[0])
      }
    } else if (err) {
      error(err.response.data[0])
    } else {
      error('You are disconnnected from the internet, please reconnect to use the system. If problem persists, please contact the system admin.')
    }
    load(false)
  })
}

export const Delete = (url, response, error, load) => {
  load(true)
  let token = ''
  Axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
  }
  return Axios.delete(`${getDomainURL()}${url}`).then(res => {
    response(res.data)
    load(false)
  }).catch(err => {
    if (err && err.response && err.response.status) {
      if (err.response.status === 500) {
        error('Server encountered issues. Please contact your system admin for assistance.')
      } else if(err.response.status === 422){
        error( errorMessageHandling( err ))
      } else {
        error(err.response.data[0])
      }
    } else if (err) {
      error(err.response.data[0])
    } else {
      error('You are disconnnected from the internet, please reconnect to use the system. If problem persists, please contact the system admin.')
    }
    load(false)
  })
}

const errorMessageHandling = err => {
  const { message } = err.response.data
   
  return message || 'You are disconnnected from the internet, please reconnect to use the system. If problem persists, please contact the system admin.';
}