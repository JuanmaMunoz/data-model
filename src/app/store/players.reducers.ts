import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import { IPlayer } from './../models/interfaces';
import { loadPlayers, loadPlayersFailure, loadPlayersSuccess, setInitialState } from './players.actions';

export interface PlayerState {
  players: IPlayer[];
  loading: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: PlayerState = {
  players: [],
  loading: false,
  error: null,
};

export const playerReducer = createReducer(
  initialState,
  on(loadPlayers, (state) => ({ ...state, loading: true })),
  on(loadPlayersSuccess, (state, { players }) => ({
    ...state,
    loading: false,
    players,
    error: null,
  })),
  on(loadPlayersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(setInitialState, () => initialState),
);
