import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrackViewComponent } from './track-view.component';

describe('TrackViewComponent', () => {
  let component: TrackViewComponent;
  let fixture: ComponentFixture<TrackViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
