import BranchTreeViewStore from '@/app/cores/stores/apis/branch-tree-view-store';
import { Component, inject } from '@angular/core';
import { DashboardCameraGroupStatisticComponent } from './components/dashboard-camera-group-statistic-component/dashboard-camera-group-statistic-component';
import { DashboardFilterComponent } from './components/dashboard-filter-component/dashboard-filter-component';
import DashboardCameraGroupCriteriaStore from './components/dashboard-camera-group-statistic-component/stores/dashboard-camera-group-criteria-store';

@Component({
  selector: 'app-dashboard',
  providers: [DashboardCameraGroupCriteriaStore],
  imports: [DashboardFilterComponent, DashboardCameraGroupStatisticComponent],
  template: `
    <div class="space-y-4 py-4">
      <app-dashboard-filter-component />
      <app-dashboard-camera-group-statistic-component />
    </div>
  `,
  styles: ``,
})
export class Dashboard {
  public branchTreeViewStore = inject(BranchTreeViewStore);
}
