import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
})
export class CodeComponent {
  @Input() title!: string;
  @Input() code!: string;
}
