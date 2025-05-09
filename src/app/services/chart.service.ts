import { Injectable } from '@angular/core';
import { IDataset, IPlayer } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public createDataSets(players: IPlayer[]): IDataset[] {
    const dataSets: IDataset[] = [];
    players.forEach((p: IPlayer) => {
      const dataSet: IDataset = {
        label: p.name,
        data: this.getDataPlayer(p),
        borderWidth: 1,
        borderColor: p.color,
        backgroundColor: this.getBackground(p.color),
      };
      dataSets.push(dataSet);
    });
    return dataSets;
  }

  private getBackground(color: string): string {
    return color.replace('1)', '0.3)');
  }

  private getDataPlayer(p: IPlayer): number[] {
    return [p.adwardWon, p.dribbling, p.goalMatch, p.goldenBall, p.maxSpeed, p.shotPower, p.winMatch];
  }
}
