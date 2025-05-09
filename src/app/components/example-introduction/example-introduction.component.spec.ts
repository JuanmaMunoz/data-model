import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleIntroductionComponent } from './example-introduction.component';

describe('ExampleIntroductionComponent', () => {
  let component: ExampleIntroductionComponent;
  let fixture: ComponentFixture<ExampleIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleIntroductionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExampleIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
