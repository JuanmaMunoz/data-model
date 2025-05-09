import { Component, Input } from '@angular/core';
import { actionsReducers, effects } from '../../info/info';
import { IExample } from '../../models/interfaces';
import { CodeComponent } from '../code/code.component';

@Component({
  selector: 'app-example-code',
  standalone: true,
  imports: [CodeComponent],
  templateUrl: './example-code.component.html',
  styleUrl: './example-code.component.scss',
})
export class ExampleCodeComponent {
  @Input() example!: IExample;
  public actionsReducers: string = actionsReducers;
  public effects: string = effects;
}
