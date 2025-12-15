import BranchTreeViewStore from '@/app/cores/stores/apis/branch-tree-view-store';
import { Component, inject, OnInit } from '@angular/core';
import { DashboardCameraGroupStatisticComponent } from './components/dashboard-camera-group-statistic-component/dashboard-camera-group-statistic-component';
import { DashboardFilterComponent } from './components/dashboard-filter-component/dashboard-filter-component';

@Component({
  selector: 'app-dashboard',
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
