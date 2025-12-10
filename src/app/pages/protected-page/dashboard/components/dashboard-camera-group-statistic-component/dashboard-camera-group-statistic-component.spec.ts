import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCameraGroupStatisticComponent } from './dashboard-camera-group-statistic-component';

describe('DashboardCameraGroupStatisticComponent', () => {
  let component: DashboardCameraGroupStatisticComponent;
  let fixture: ComponentFixture<DashboardCameraGroupStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCameraGroupStatisticComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCameraGroupStatisticComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
