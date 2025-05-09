import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewChecked,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
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
  selector: 'app-ngrx-example',
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
  templateUrl: './ngrx-example.component.html',
  styleUrl: './ngrx-example.component.scss',
})
export class NgrxExampleComponent
  implements OnInit, OnDestroy, AfterViewChecked
{
  public chartDataSets: IDataset[] = [];
  public players$!: Observable<IPlayer[]>;
  public loading$!: Observable<boolean>;
  public error$!: Observable<HttpErrorResponse | null>;
  public startTime!: DOMHighResTimeStamp;
  public totalTime: string = '0';
  public startRendering: boolean = false;
  private subscription = new Subscription();
  public example: IExample = examples.find(
    (e: IExample) => e.title === 'ngrx',
  )!;
  constructor(
    private store: Store<{ players: PlayerState }>,
    private chartService: ChartService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.players$ = this.store.select((state) => state.players.players);
    this.loading$ = this.store.select((state) => state.players.loading);
    this.error$ = this.store.select((state) => state.players.error);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.players$.subscribe((data: IPlayer[]) => {
        if (data.length) {
          this.chartDataSets = this.chartService.createDataSets(data);
          this.startRendering = true;
        }
      }),
    );
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getPlayers(): void {
    this.startTime = performance.now();
    this.store.dispatch(loadPlayers());
  }
}
