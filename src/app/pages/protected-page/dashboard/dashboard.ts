import { DateRangePicker } from '@/app/types/form-type';
import { Component, inject } from '@angular/core';
import dayjs from 'dayjs';
import { DashboardCameraGroupStatisticComponent } from './components/dashboard-camera-group-statistic-component/dashboard-camera-group-statistic-component';
import DashboardCameraGroupCriteriaStore from './components/dashboard-camera-group-statistic-component/stores/dashboard-camera-group-criteria-store';
import { DashboardFilterComponent } from './components/dashboard-filter-component/dashboard-filter-component';

@Component({
  selector: 'app-dashboard',
  providers: [DashboardCameraGroupCriteriaStore],
  imports: [DashboardFilterComponent, DashboardCameraGroupStatisticComponent],
  template: `
    <div class="space-y-4 py-4">
      <app-dashboard-filter-component (onChangesFilterForm)="onChangesFilterForm($event)" />
      <app-dashboard-camera-group-statistic-component />
    </div>
  `,
  styles: ``,
})
export class Dashboard {
  private dashboardCameraGroupCriteriaStore = inject(DashboardCameraGroupCriteriaStore);

  public onChangesFilterForm(
    event:
      | {
          type: 'branchIds' | 'cameraGroupIds' | 'cameraIds';
          value: number[] | null;
        }
      | {
          type: 'date';
          value: DateRangePicker | null;
        },
  ) {
    switch (event.type) {
      case 'branchIds':
        this.dashboardCameraGroupCriteriaStore.updateFilter({ branchIds: event.value ?? [] });
        break;
      case 'cameraGroupIds':
        this.dashboardCameraGroupCriteriaStore.updateFilter({ cameraGroupIds: event.value ?? [] });
        break;
      case 'date': {
        const dateValue = event.value ?? null;
        const from = dateValue?.[0] ?? null;
        const to = dateValue?.[1] ?? null;
        if (from && to) {
          const startOfDay = dayjs(from).startOf('day').toISOString();
          const endOfDay = dayjs(to).endOf('day').toISOString();
          this.dashboardCameraGroupCriteriaStore.updateFilter({
            date: { from: startOfDay, to: endOfDay },
          });
        } else {
          this.dashboardCameraGroupCriteriaStore.updateFilter({ date: null });
        }
        break;
      }
    }
  }
}
