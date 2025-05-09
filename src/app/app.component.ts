import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CodeComponent } from './components/code/code.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { HeaderComponent } from './components/header/header.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { NgrxExampleComponent } from './components/ngrx-example/ngrx-example.component';
import { NgrxSignalExampleComponent } from './components/ngrx-signal-example/ngrx-signal-example.component';
import { RxjsExampleComponent } from './components/rxjs-example/rxjs-example.component';
import { SignalsExampleComponent } from './components/signals-example/signals-example.component';
import { TableComponent } from './components/table/table.component';
import { serviceCode } from './info/info';
import { Language } from './models/enums';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    IntroductionComponent,
    TableComponent,
    SignalsExampleComponent,
    TranslateModule,
    CodeComponent,
    RxjsExampleComponent,
    NgrxExampleComponent,
    NgrxSignalExampleComponent,
    ConclusionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private subscription = new Subscription();
  public serviceCode: string = serviceCode;
  constructor(
    private translate: TranslateService,
    public utilsService: UtilsService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('language') || Language.ENGLISH;
      this.translate.use(lang);
      this.subscription.add(
        this.translate.onLangChange.subscribe((data) => {
          localStorage.setItem('language', data.lang);
        }),
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
