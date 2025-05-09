import { Component } from '@angular/core';
import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public img: string = 'assets/images/vs.png';
}
