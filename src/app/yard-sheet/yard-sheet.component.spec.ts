import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YardSheetComponent } from './yard-sheet.component';

describe('YardSheetComponent', () => {
  let component: YardSheetComponent;
  let fixture: ComponentFixture<YardSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YardSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YardSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
