import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PlayersService } from '../services/players.service';
import {
  loadPlayers,
  loadPlayersFailure,
  loadPlayersSuccess,
} from './players.actions';

@Injectable()
export class PlayerEffects {
  /*constructor(
    //private actions$: Actions,
    //private playersService: PlayersService,
  ) {}*/

  private actions$ = inject(Actions);
  private playersService = inject(PlayersService);

  loadPlayers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlayers),
      mergeMap(() =>
        this.playersService.getPlayers().pipe(
          map((players) => loadPlayersSuccess({ players })),
          catchError((error) =>
            of(loadPlayersFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
