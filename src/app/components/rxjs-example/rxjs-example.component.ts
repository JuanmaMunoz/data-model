import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Subscription } from 'rxjs';
import { examples } from '../../info/info';
import { IDataset, IExample, IPlayer } from '../../models/interfaces';
import { ChartService } from '../../services/chart.service';
import { PlayersService } from '../../services/players.service';
import { ChartComponent } from '../chart/chart.component';
import { ErrorComponent } from '../error/error.component';
import { ExampleCodeComponent } from '../example-code/example-code.component';
import { ExampleIntroductionComponent } from '../example-introduction/example-introduction.component';
import { ExecutionComponent } from '../execution/execution.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-rxjs-example',
  standalone: true,
  imports: [
    PlayerComponent,
    ChartComponent,
    CommonModule,
    ExecutionComponent,
    ErrorComponent,
    ExampleIntroductionComponent,
    ExampleCodeComponent,
  ],
  templateUrl: './rxjs-example.component.html',
  styleUrl: './rxjs-example.component.scss',
})
export class RxjsExampleComponent implements OnInit, OnDestroy {
  public chartDataSets: IDataset[] = [];
  public players$: BehaviorSubject<IPlayer[]> = new BehaviorSubject([] as IPlayer[]);
  public error$: BehaviorSubject<HttpErrorResponse | null> = new BehaviorSubject<HttpErrorResponse | null>(null);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public startTime!: DOMHighResTimeStamp;
  public totalTime: string = '0';
  public startRendering: boolean = false;
  private subscription = new Subscription();
  public example: IExample = examples.find((e: IExample) => e.title === 'rxjs')!;
  constructor(
    public playersService: PlayersService,
    private chartService: ChartService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.players$.subscribe((players: IPlayer[]) => {
        if (players.length) {
          this.chartDataSets = this.chartService.createDataSets(players);
          this.startRendering = true;
        }
      }),
    );
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

  public click(): void {
    this.startTime = performance.now();
    this.getPlayers();
  }

  private getPlayers(): void {
    this.loading$.next(true);
    this.playersService
      .getPlayers()
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe({
        next: (players: IPlayer[]) => this.players$.next(players),
        error: (error: HttpErrorResponse) => this.error$.next(error),
      });
  }
}
