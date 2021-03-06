// import React from 'react';
// import { PercentContainer } from '../../ColumnComponents';
// import { API_HOST } from '../../../yasp.config';
import React from 'react';
import PercentContainer from '../../PercentContainer';
import { transformations } from '../../../utility';

export default [{
  displayName: 'Category',
  field: 'category',
  width: 2,
  displayFn: transformations.category,
}, {
  displayName: 'Matches',
  field: 'matches',
  width: 2,
  sortFn: 1,
  displayFn: transformations.matches,
}, {
  displayName: 'Win %',
  field: 'winPercent',
  width: 2,
  sortFn: 1,
  displayFn: (row, column, field) => <PercentContainer percent={field.toFixed(1)} />,
}];

  // displayName: 'Win %',
  // field: 'win',
  // width: 2,
  // displayFn: (row) => <PercentContainer wins={row.win} games={row.games} />,
  // sortFn: (row) => (row.win / row.games),
