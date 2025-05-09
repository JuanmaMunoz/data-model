import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsExampleComponent } from './signals-example.component';

describe('SignalsExampleComponent', () => {
  let component: SignalsExampleComponent;
  let fixture: ComponentFixture<SignalsExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
