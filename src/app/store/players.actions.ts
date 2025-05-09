import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IPlayer } from '../models/interfaces';
export const loadPlayers = createAction('[Player] Load Players');
export const loadPlayersSuccess = createAction('[Player] Load Players Success', props<{ players: IPlayer[] }>());
export const loadPlayersFailure = createAction('[Player] Load Players Failure', props<{ error: HttpErrorResponse }>());
export const setInitialState = createAction('[Player] Set initial state');
