import { Component, Input } from '@angular/core';
import { IPlayer } from '../../models/interfaces';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  @Input() player!: IPlayer;
}
