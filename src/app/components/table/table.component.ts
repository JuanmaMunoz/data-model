import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public rows: string[] = [
    'paradigm',
    'complexity',
    'performance',
    'developmentTime',
    'strategyChange',
    'unsubscribe',
    'debug',
    'appTypes',
    'compatibility',
  ];
}
