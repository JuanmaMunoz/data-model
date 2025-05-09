import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-execution',
  standalone: true,
  imports: [TranslateModule, SpinnerComponent],
  templateUrl: './execution.component.html',
  styleUrl: './execution.component.scss',
})
export class ExecutionComponent {
  @Input() time: string = '0';
  @Input() loading: boolean | null = false;
  @Output() actionGetPlayers: EventEmitter<null> = new EventEmitter();

  public getPlayers(): void {
    this.actionGetPlayers.emit();
  }
}
