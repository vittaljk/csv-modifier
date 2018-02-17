import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrapDemoComponent } from './drap-demo.component';

describe('DrapDemoComponent', () => {
  let component: DrapDemoComponent;
  let fixture: ComponentFixture<DrapDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrapDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrapDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
