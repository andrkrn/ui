import React from 'react';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import { table } from '../../../reducers';
import { setCurrentPage } from '../../../actions';
import Pagination from './Pagination';

export default Table => {
  // We have to give the table an id so we can hold all tables currentPage in memory.
  const id = uuid.v4();

  const PaginatedTable = ({ currentPage, data, pageLength = 20, setCurrentPage, ...rest }) => {
    if (data) {
      if (currentPage > Math.ceil(data.length / pageLength)) {
        setCurrentPage(0);
      }
      return (
        <div>
          <Pagination id={id} numPages={Math.ceil(data.length / pageLength)} currentPage={currentPage} />
          <Table {...rest} data={data.slice(currentPage * pageLength, (currentPage + 1) * pageLength)} />
          <Pagination id={id} numPages={Math.ceil(data.length / pageLength)} currentPage={currentPage} />
        </div>
      );
    }
    return <span />;
  };

  const mapStateToProps = (state) => ({
    currentPage: table.getCurrentPage(state, id),
  });

  const mapDispatchToProps = (dispatch) => ({
    setCurrentPage: page => dispatch(setCurrentPage(id, page)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(PaginatedTable);
};
