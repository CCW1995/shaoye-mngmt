import Axios from 'axios'

import getDomainURL from 'utils/api' 

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  failedQueue = [];
}

Axios.interceptors.response.use( response => {
  return response
}, error => {
  const originalRequest = error.config
  if( error.config.url.indexOf( '/auth/refresh_token' ) > -1 ) {
    console.dir( error, 'error' )
    if( error.response.data.internal_code === 460 ) {
      
    }
  }
  if (error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise(function(resolve, reject) {
        failedQueue.push({resolve, reject})
      }).then(token => {
        originalRequest.headers['Authorization'] = 'JWT ' + token;
        return Axios(originalRequest);
      }).catch(err => {
        return Promise.reject(err);
      })
    }
    originalRequest._retry = true;
    isRefreshing = true;
    return new Promise(( resolve, reject ) => {
      // Axios.get(  
      //   `${ getDomainURL() }/auth/refresh_token`
      // ).then( response => {
      //   window.localStorage.setItem( 'MANA_TOKEN', response.data.token )
      //   Axios.defaults.headers = {
      //     common: {
      //       'Authorization': `JWT ${ response.data.token }`
      //     }
      //   }
      //   originalRequest.headers[ 'Authorization' ] = 'JWT ' + response.data.token
      //   processQueue( null, response.data.token )
      //   resolve( Axios(originalRequest) )
      // }).catch((err) => {
      //   processQueue(err, null);
      //   reject(err);
      // }).finally(() => { 
      //   isRefreshing = false
      // })
      alert('Your session is expired.')
      window.localStorage.removeItem( 'MANA_TOKEN' )
      window.localStorage.setItem( 'IS_TOKEN_EXPIRED', true )
      window.location.href = `${window.location.origin}/#/login`
    })
  }
  return Promise.reject(error);
})