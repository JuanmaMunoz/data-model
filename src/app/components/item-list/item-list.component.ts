import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
})
export class ItemListComponent {
  @Input() title!: string;
  @Input() description!: string;
}
