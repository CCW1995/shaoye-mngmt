import ReactTable from 'react-table'
import _ from 'lodash'
import { Button, UncontrolledTooltip } from 'reactstrap'

const ManaTable = ({
  data,
  actionsContent,
  columnsContent,
  defaultPageSize,
  showPagination,
  showPageSizeOptions
}) => {
  return (
    <ReactTable
      resizable={ false }
      defaultPageSize={ defaultPageSize || 10 }
      showPageSizeOptions={ showPageSizeOptions || false }
      data={ data || [] }
      noDataText={ 'No content created.' }
      columns={[
        ... _.map( columnsContent, content => ({
          Header: content.Header,
          maxWidth: content.maxWidth ? content.maxWidth : undefined,
          headerStyle: { textAlign: !content.centerColumn ? 'start' : 'center' },
          className: content.centerColumn ? 'd-flex justify-content-center text-center' : '',
          Cell: row => (
            <div style={{ overflow: 'auto' }}>
              {  
                content.accessor 
                  ? row.original[ content.accessor ]
                  : content.Cell( row.original )
              }
            </div>
          )
        })
      ),
      ... actionsContent?.[0] ? [{
        Header: 'Actions',
        maxWidth: actionsContent.length * 70,
        Cell: row => (
          <div 
            className='d-flex justify-content-center flex-wrap'
            style={{ flex: 1, gap: 5 }}
          >
            {
              actionsContent.map(( action, actionIndex ) => (
                <>
                  <Button
                    id={ `${action.actionID}-${row.original.id}` }
                    color={ action.color || action.colorFunc( row.original ) }
                    disabled={ action.disabled ? action.disabled( row.original, actionIndex ): false }
                    className={ `btn-icon btn-icon-only` }
                    onClick={() => action.onClick( row.original, actionIndex )}>
                    { typeof action.content === 'object' ? action.content : action.content( row.original ) }
                  </Button>
                  <UncontrolledTooltip target={ `${action.actionID}-${row.original.id}` } placement={ action.tooltipPosition || 'top' }>
                    { action.tooltipContent }
                  </UncontrolledTooltip>
                </>
              ))
            }
          </div>
        )
      }] : []
    ]}
    showPagination={ showPagination } />
  )
}

export default ManaTable;