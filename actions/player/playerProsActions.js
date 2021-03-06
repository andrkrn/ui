import fetch from 'isomorphic-fetch';
import { API_HOST } from '../';
import { playerPros } from '../../reducers';
import { getUrl } from '../utility';

// const excludedOptions = ['limit'];
const url = playerId => `/api/players/${playerId}/pros`;

const REQUEST = 'yasp/playerPros/REQUEST';
const OK = 'yasp/playerPros/OK';
const ERROR = 'yasp/playerPros/ERROR';
const SORT = 'yasp/playerPros/SORT';

export const playerProsActions = {
  REQUEST,
  OK,
  ERROR,
  SORT,
};

export const setPlayerProsSort = (sortField, sortState, sortFn, id) => ({
  type: SORT,
  sortField,
  sortState,
  sortFn,
  id,
});

export const getPlayerProsRequest = (id) => ({ type: REQUEST, id });

export const getPlayerProsOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

export const getPlayerProsError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayerPros = (playerId, options = {}, host = API_HOST) => (dispatch, getState) => {
  if (playerPros.isLoaded(getState(), playerId)) {
    dispatch(getPlayerProsOk(playerPros.getProsList(getState(), playerId), playerId));
  } else {
    dispatch(getPlayerProsRequest(playerId));
  }
  // const modifiedOptions = getModifiedOptions(options, excludedOptions);

  return fetch(`${host}${getUrl(playerId, options, url)}`, { credentials: 'include' })
    .then(response => response.json())
    .then(json => dispatch(getPlayerProsOk(json, playerId)))
    .catch(error => dispatch(getPlayerProsError(error, playerId)));
};
