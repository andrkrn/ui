import fetch from 'isomorphic-fetch';
import { API_HOST } from '../';
import { player } from '../../reducers';

const url = '/api/players';

const REQUEST = 'yasp/player/REQUEST';
const OK = 'yasp/player/OK';
const ERROR = 'yasp/player/ERROR';

export const playerActions = {
  REQUEST,
  OK,
  ERROR,
};

const getPlayerRequest = (id) => ({ type: REQUEST, id });

const getPlayerOk = (payload, id) => ({
  type: OK,
  payload,
  id,
});

const getPlayerError = (payload, id) => ({
  type: ERROR,
  payload,
  id,
});

export const getPlayer = (accountId, isUser, host = API_HOST) => (dispatch, getState) => {
  // we are checking to see if the player object exists here.
  if (player.isLoaded(getState(), accountId)) {
    dispatch(getPlayerOk(player.getPlayer(getState(), accountId), accountId));
  } else {
    dispatch(getPlayerRequest(accountId));
  }
  return fetch(`${host}${url}/${accountId}`)
    .then(response => response.json(accountId))
    .then(json => {
      dispatch(getPlayerOk(json, accountId));
    })
    .catch(error => {
      dispatch(getPlayerError(error, accountId));
    });
};
