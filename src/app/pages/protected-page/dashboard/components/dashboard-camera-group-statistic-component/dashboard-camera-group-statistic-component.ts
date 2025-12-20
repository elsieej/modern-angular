import StatisticCameraGroupStore from '@/app/pages/protected-page/dashboard/stores/statistic-camera-group-store';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { debounceTime, filter, pipe, tap } from 'rxjs';
import DashboardCameraGroupCriteriaStore from './stores/dashboard-camera-group-criteria-store';
@Component({
  selector: 'app-dashboard-camera-group-statistic-component',
  imports: [FieldsetModule, PanelModule, CommonModule, ProgressSpinnerModule],
  providers: [StatisticCameraGroupStore],
  template: `
    <p-fieldset legend="Thống kê số liệu" class="w-full">
      <div class="flex gap-x-2">
        <p-panel header="Khu vực" class="flex-1">
          {{ statisticCameraGroupStore.data()?.cameraGroupNo ?? 0 }}
        </p-panel>
        <p-panel header="Camera" class="flex-1">
          {{ statisticCameraGroupStore.data()?.cameraNo ?? 0 }}
        </p-panel>
        <p-panel header="Khuôn mặt" class="flex-1">
          {{ statisticCameraGroupStore.data()?.custNo ?? 0 }}
        </p-panel>
      </div>
    </p-fieldset>
  `,
  styles: ``,
})
export class DashboardCameraGroupStatisticComponent implements OnInit {
  public statisticCameraGroupStore = inject(StatisticCameraGroupStore);

  private dashboardCameraGroupCriteriaStore = inject(DashboardCameraGroupCriteriaStore);
  private triggerLoadStatistic = rxMethod<{
    branchIds: number[];
    cameraGroupIds: number[];
    date: {
      from: string;
      to: string;
    } | null;
  }>(
    pipe(
      debounceTime(300),
      filter(({ branchIds, cameraGroupIds }) => branchIds.length > 0 && cameraGroupIds.length > 0),
      tap(({ branchIds, cameraGroupIds, date }) => {
        this.statisticCameraGroupStore.getStatisticCameraGroups({
          dto: {
            branchId: branchIds,
            cameraGroupId: cameraGroupIds,
            fromTime: date?.from ?? '',
            toTime: date?.to ?? '',
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
        date: this.dashboardCameraGroupCriteriaStore.date(),
      })),
    );
  }
}
