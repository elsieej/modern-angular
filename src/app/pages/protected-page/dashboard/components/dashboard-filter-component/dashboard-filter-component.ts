import BranchFilterStore from '@/app/pages/protected-page/dashboard/stores/branch-filter-store';
import CameraFilterStore from '@/app/pages/protected-page/dashboard/stores/camera-filter-store';
import CameraGroupFilterStore from '@/app/pages/protected-page/dashboard/stores/camera-group-filter-store';
import { MultiSelectOption } from '@/app/types/form-type';
import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-dashboard-filter-component',
  providers: [BranchFilterStore, CameraGroupFilterStore],
  imports: [ReactiveFormsModule, MultiSelectModule, FloatLabelModule],
  template: `<div class="space-y-4">
    <h3 class="text-lg font-bold">Bộ lọc</h3>
    <form [formGroup]="filterForm">
      <div class="flex w-full gap-x-4">
        <p-floatlabel variant="on" class="w-72">
          <p-multiSelect
            formControlName="branchId"
            inputId="branch-filter"
            optionLabel="label"
            class="w-full"
            display="chip"
            [options]="branchFilterStore.extractFromTreeView()"
            [loading]="branchFilterStore.isLoading()"
          />
          <label for="branch-filter">Chi nhánh</label>
        </p-floatlabel>
        <p-floatlabel variant="on" class="w-72">
          <p-multiSelect
            formControlName="cameraGroupId"
            inputId="camera-group-filter"
            optionLabel="label"
            class="w-full"
            display="chip"
            [options]="cameraGroupFilterStore.extractFromTreeView()"
            [loading]="cameraGroupFilterStore.isLoading()"
          />
          <label for="camera-group-filter">Khu vực</label>
        </p-floatlabel>
        <!-- <p-floatlabel variant="on" class="w-72">
          <p-multiSelect
            formControlName="cameraId"
            inputId="camera-filter"
            optionLabel="label"
            class="w-full"
            display="chip"
            [options]="cameraFilterStore.extractFromTreeView()"
            [loading]="cameraFilterStore.isLoading()"
          />
          <label for="camera-filter">Camera</label>
        </p-floatlabel> -->
      </div>
    </form>
  </div>`,
  styles: ``,
})
export class DashboardFilterComponent implements OnInit {
  public branchFilterStore = inject(BranchFilterStore);
  public cameraGroupFilterStore = inject(CameraGroupFilterStore);
  public cameraFilterStore = inject(CameraFilterStore);

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public filterForm = this.fb.nonNullable.group({
    branchId: [[] as MultiSelectOption[]],
    cameraGroupId: [[] as MultiSelectOption[]],
    cameraId: [[] as MultiSelectOption[]],
  });

  constructor() {
    effect(() => {
      const allBranches = this.branchFilterStore.selectAllOptions();
      if (allBranches.length > 0) {
        this.filterForm.controls.branchId.patchValue(allBranches, { emitEvent: false });
      }
    });

    effect(() => {
      const validCameras = this.cameraGroupFilterStore.extractFromTreeView();
      if (validCameras.length > 0) {
        this.filterForm.controls.cameraGroupId.patchValue(validCameras, { emitEvent: false });
      }
    });

    // effect(() => {
    //   const validCameras = this.cameraFilterStore.extractFromTreeView();
    //   if (validCameras.length > 0) {
    //     this.filterForm.controls.cameraId.patchValue(validCameras , { emitEvent: false });
    //   }
    // });
  }

  ngOnInit(): void {
    this.filterForm.controls.branchId.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.cameraGroupFilterStore.setSelectedBranchIds(value.map((v) => v.value));
      });
  }
}
