import StatisticCameraGroupStore from '@/app/pages/protected-page/dashboard/stores/statistic-camera-group-store';
import { Component, computed, inject, OnInit } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { endOfDay, startOfDay } from 'date-fns';
import { FieldsetModule } from 'primeng/fieldset';
import { debounceTime, filter, pipe, tap } from 'rxjs';
import DashboardCameraGroupCriteriaStore from './stores/dashboard-camera-group-criteria-store';
@Component({
  selector: 'app-dashboard-camera-group-statistic-component',
  imports: [FieldsetModule],
  providers: [StatisticCameraGroupStore],
  template: ` <p-fieldset legend="Thống kê số liệu"> </p-fieldset> `,
  styles: ``,
})
export class DashboardCameraGroupStatisticComponent implements OnInit {
  public statisticCameraGroupStore = inject(StatisticCameraGroupStore);

  private dashboardCameraGroupCriteriaStore = inject(DashboardCameraGroupCriteriaStore);
  private triggerLoadStatistic = rxMethod<{
    branchIds: number[];
    cameraGroupIds: number[];
  }>(
    pipe(
      debounceTime(300),
      filter(({ branchIds, cameraGroupIds }) => branchIds.length > 0 && cameraGroupIds.length > 0),
      tap(({ branchIds, cameraGroupIds }) => {
        console.log(branchIds, cameraGroupIds);
        const now = new Date();
        const fromStartOfDay = startOfDay(now);
        const toEndOfDay = endOfDay(now);
        this.statisticCameraGroupStore.getStatisticCameraGroups({
          dto: {
            branchId: branchIds,
            cameraGroupId: cameraGroupIds,
            fromTime: fromStartOfDay.toISOString(),
            toTime: toEndOfDay.toISOString(),
          },
        });
      }),
    ),
  );

  ngOnInit(): void {
    this.triggerLoadStatistic(
      computed(() => ({
        branchIds: this.dashboardCameraGroupCriteriaStore.branchIds(),
        cameraGroupIds: this.dashboardCameraGroupCriteriaStore.cameraGroupIds(),
      })),
    );
  }
}
