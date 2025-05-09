import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxSignalExampleComponent } from './ngrx-signal-example.component';

describe('NgrxSignalExampleComponent', () => {
  let component: NgrxSignalExampleComponent;
  let fixture: ComponentFixture<NgrxSignalExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgrxSignalExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgrxSignalExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
