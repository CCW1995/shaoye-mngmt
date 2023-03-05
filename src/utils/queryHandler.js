import Moment from 'moment'

export const queryHandler = ( searchParams, page, showAdvanceField ) => {
  let tmpFilter = ''
  searchParams.main.map( item => {
    if ( 
        item.param || 
        typeof( item.param ) === 'boolean'
      ){
      tmpFilter += `"${ item.value }": ${ paramHandler( item ) },`
    }
  })

  if ( showAdvanceField ){
    searchParams.advance.map( item => {
      if (
        ( item.param || typeof( item.param ) === 'boolean' ) && 
        item.checked
      ){
        tmpFilter += `"${ item.value }": ${ paramHandler( item ) },`
      }
    })
  }

  return btoa( `{ "page": ${ page } ${ tmpFilter.length > 0 ? `, "filter":{ ${ tmpFilter.slice(0, -1) } }` : '' }}`  )
}

const paramHandler = item => {
  if ( item.type === 'date' ){
    return `{"${ item.searchMode || '$gt' }": "${ Moment( item.param ).format( `YYYY-MM-DDTHH:mm:ss` ) }Z"}`
  } 

  if ( item.type === 'multi-select' ){
    let temp  = ``
    item.param.map(( paramChild, paramIndex ) => {
      temp += ( `{ "${ [item.id] }": ${ paramChild.id } }${ paramIndex !== item.param.length - 1 ? ',' : '' }`)
    })
    return temp
  }
  
  if ( typeof( item.param ) === 'number' || typeof( item.param ) === 'boolean' ){
    return item.param
  }

  if ( item.exact ){
    return `{"$like": "${ item.param }" }`
  }

  return `{"$like": "%${ item.param }%" }`
}