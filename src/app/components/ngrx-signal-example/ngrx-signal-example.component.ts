import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, Component, effect, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngrx/store';
import { examples } from '../../info/info';
import { IDataset, IExample, IPlayer } from '../../models/interfaces';
import { ChartService } from '../../services/chart.service';
import { loadPlayers } from '../../store/players.actions';
import { PlayerState } from '../../store/players.reducers';
import { ChartComponent } from '../chart/chart.component';
import { ErrorComponent } from '../error/error.component';
import { ExampleCodeComponent } from '../example-code/example-code.component';
import { ExampleIntroductionComponent } from '../example-introduction/example-introduction.component';
import { ExecutionComponent } from '../execution/execution.component';
import { PlayerComponent } from '../player/player.component';
declare var Prism: any;
@Component({
  selector: 'app-ngrx-signal-example',
  standalone: true,
  imports: [
    PlayerComponent,
    ChartComponent,
    CommonModule,
    ExecutionComponent,
    ErrorComponent,
    ErrorComponent,
    ExampleIntroductionComponent,
    ExampleCodeComponent,
  ],
  templateUrl: './ngrx-signal-example.component.html',
  styleUrl: './ngrx-signal-example.component.scss',
})
export class NgrxSignalExampleComponent implements AfterViewChecked {
  public chartDataSets: IDataset[] = [];
  public players!: Signal<IPlayer[]>;
  public loading!: Signal<boolean>;
  public error!: Signal<HttpErrorResponse | null>;
  public startTime!: DOMHighResTimeStamp;
  public totalTime: string = '0';
  public startRendering: boolean = false;
  public example: IExample = examples.find((e: IExample) => e.title === 'ngrxSignal')!;
  constructor(
    private store: Store<{ players: PlayerState }>,
    private chartService: ChartService,
  ) {
    this.players = toSignal(
      this.store.select((state) => state.players.players),
      { initialValue: [] },
    );
    this.loading = toSignal(
      this.store.select((state) => state.players.loading),
      { initialValue: false },
    );
    this.error = toSignal(
      this.store.select((state) => state.players.error),
      { initialValue: null },
    );

    effect(() => {
      if (this.players().length) {
        this.chartDataSets = this.chartService.createDataSets(this.players());
        this.startRendering = true;
      }
    });
  }

  ngAfterViewChecked(): void {
    if (this.startRendering) {
      const time = (performance.now() - this.startTime - 250).toFixed(3);
      this.startRendering = false;
      setTimeout(() => {
        this.totalTime = time;
      }, 0);
    }
  }

  ngAfterViewInit(): void {
    Prism.highlightAll();
  }

  public getPlayers(): void {
    this.startTime = performance.now();
    this.store.dispatch(loadPlayers());
  }
}
