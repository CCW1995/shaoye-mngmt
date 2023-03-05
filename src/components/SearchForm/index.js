import React, { useState, useRef, useEffect } from 'react'
import {
  Card, CardBody,
  Form, FormGroup, Label,Input, Button,
  Col, Row, Collapse
} from 'reactstrap'
import _ from 'lodash'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import { BiReset } from 'react-icons/bi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiOutlineSearch } from 'react-icons/ai'
import { UncontrolledTooltip } from 'reactstrap'
import { queryHandler } from 'utils/queryHandler'
import { connect } from 'react-redux'

const SearchFormFields = ({
  item,
  onChangeField
}) => {

  return (
    <div style={{ flex: 1, maxWidth: 700, minWidth: 300 }}>
      {
        item.type === 'multi-select' && (
          <Select
            isMulti
            options={ item.options }
            className="basic-multi-select"
            styles={{ container: ( base ) => ({ ...base, zIndex: 999 }) }}
            value={ item.param }
            onChange={ val => onChangeField( val )} 
          />
        )
      }
      {
        item.type === 'select' && (
          <Input
            type={ 'select' }
            value={ item.param }
            onChange={ e => {
              let tempVal = parseInt( e.target.value )

              if ( item.valueType === 'string' ) {
                tempVal = e.target.value
              } 
              if ( item.valueType === 'boolean' ) {
                tempVal = e.target.value === 'true'
              }

              onChangeField( tempVal )
            }}
            style={{ fontSize: '0.8rem' }}
          >
            <option>
              { `Search By ` }
              { ` - `}
              { `${ item.label }` }
            </option>
            { item.options.map( data => (
              <option key={ data.id } value= { data.id }>
                { data.name }
              </option>
            ))}
          </Input>
        )
      }
      {
        item.type === 'text' && (
          <Input
            type={ 'text' }
            placeholder={ `Search By - ${ item.label }` }
            value={ item.param }
            onChange={ e => onChangeField( e.target.value )} 
            style={{ fontSize: '0.8rem' }}
          />
        )
      }
      {
        item.type === 'date' && (
          <DatePicker
            className={ 'w-100' }
            showTimeSelect
            dateFormat="dd-MM-yyyy h:mm aa"
            selected={ item.param }
            onChange={ val => onChangeField( val )} 
          />
        )
      }
    </div>
  )
}

const SearchForm = ({
  data,
  searchParams,
  searchParamKey,
  onChangeHOCState,
  getListAPI,
  nonPaginated // if its non paginated will set the page to be 0, all data will be returned all at a time.
}) => {

  const contRef = useRef()
  const [ showAdvanceField, setShowAdvance ] = useState( false )

  useEffect(() => {
    const keyDownHandler = event => {
      if (event.key === 'Enter') {
        if (contRef.current && contRef.current.contains( document.activeElement )) {
          let searchQuery = queryHandler( searchParams, 1, showAdvanceField )
          getListAPI( searchQuery, 1 )
        }
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [ contRef, searchParams ]);

  const onClickReset = () => {
    let tmpMain = []
    let tmpAdvance = []
    let tmpSearchParams = _.cloneDeep( searchParams )

    searchParams[ 'advance' ].map( item => {
      tmpAdvance.push({
        ...item,
        param: '',
        checked: false,
      })
    })

    searchParams[ 'main' ].map( item => {
      tmpMain.push({
        ...item,
        param: ''
      })
    })

    tmpSearchParams.main = tmpMain
    tmpSearchParams.advance = tmpAdvance
    
    onChangeHOCState( searchParamKey || 'searchParams', tmpSearchParams )
    let searchQuery = queryHandler( tmpSearchParams, nonPaginated ? 0 : 1, showAdvanceField )
    getListAPI( searchQuery, 1 )
  }

  const onChangeField = ( context, fieldIndex, key, val ) => {
    let tmp = _.cloneDeep( searchParams )
    tmp[ context ][ fieldIndex ][ key ] = val

    onChangeHOCState( searchParamKey || 'searchParams', tmp )
  }

  return (
    <Card 
      className="page-search-form main-card rounded"
      style={{ flex: 1 }}
      innerRef={ contRef }
    >
      <CardBody>
        <div className="d-md-flex flex-wrap align-items-end">
          {
            searchParams.main.map(( item, index ) => (
              <SearchFormFields
                item={ item }
                onChangeField={ val => onChangeField( 'main', index, 'param', val )}
              />
            ))
          }
          <div className="d-flex mt-2 mt-md-0" style={{ flex: 1 }}>
            <Button 
              color='warning' 
              className='ml-auto text-white'
              id='search'
              onClick={() => {
                let searchQuery = queryHandler( searchParams, nonPaginated ? 0 : 1, showAdvanceField )
                getListAPI( searchQuery, 1 )
              }}
            >
              <AiOutlineSearch style={{ width: 20, height: 20 }} />
              <UncontrolledTooltip target='search' placement='top'>
                Search
              </UncontrolledTooltip>
            </Button>
            <Button 
              color='warning' 
              className='ml-2 text-white'
              id='reset'
              onClick={() => onClickReset()}
            >
              <BiReset style={{ width: 20, height: 20 }} />
              <UncontrolledTooltip target='reset' placement='top'>
                Reset
              </UncontrolledTooltip>
            </Button> 
            {
              searchParams.advance?.[0] && (
                <Button 
                  color='secondary' 
                  className='ml-2'
                  id="ViewMore"
                  onClick={() => setShowAdvance( !showAdvanceField )}
                >
                  <MdKeyboardArrowDown style={{ 
                    width: 20, height: 20,
                    transform: showAdvanceField ? 'rotate(180deg)' : 'unset'
                  }}/>
                  <UncontrolledTooltip target="ViewMore" placement="top">
                    View More
                  </UncontrolledTooltip>
                </Button> 
              )
            }
          </div>
        </div>
        {
          searchParams.advance &&
          searchParams.advance.length > 0 && (
          <Collapse
            isOpen={ showAdvanceField }
            onExiting={ () => setShowAdvance( false )}
          >
            <Form onSubmit={ e => e.preventDefault() } className={ 'mt-4' }>
              <Row>
                {
                  searchParams.advance.map(( item, index ) => {
                    return (
                      <Col 
                        key={ index } md={ item.col || 6 } 
                        xs={ 12 }
                      >
                        <Card className='p-3'>
                          <FormGroup className='mb-1'>
                            <Label style={{ fontSize: 12.5 }}>
                              { item.label }
                            </Label>
                            <Input
                              type='checkbox'
                              style={{ margin: "2px 0px 0px 5px"}}
                              checked={ item.checked }
                              onChange={ e => onChangeField( 'advance', index, 'checked', e.target.checked )}
                            />
                          </FormGroup>
                          <SearchFormFields
                            item={ item }
                            onChangeField={ val => onChangeField( 'advance', index, 'param', val )}
                          />
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            </Form>
          </Collapse>
        )}
      </CardBody>
    </Card>
  )
}

const mapStateToProps = state => ({ data: state })
export default connect( mapStateToProps )( SearchForm )