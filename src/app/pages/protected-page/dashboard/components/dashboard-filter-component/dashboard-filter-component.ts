import BranchFilterStore from '@/app/pages/protected-page/dashboard/stores/branch-filter-store';
import CameraFilterStore from '@/app/pages/protected-page/dashboard/stores/camera-filter-store';
import CameraGroupFilterStore from '@/app/pages/protected-page/dashboard/stores/camera-group-filter-store';
import { DashboardFilterForm } from '@/app/pages/protected-page/dashboard/types/dashboard-filter-form.type';
import { DateRangePicker, FormModel, MultiSelectOption } from '@/app/types/form-type';
import { Component, DestroyRef, effect, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-dashboard-filter-component',
  providers: [BranchFilterStore, CameraGroupFilterStore, CameraFilterStore],
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    FloatLabelModule,
    FieldsetModule,
    DatePickerModule,
  ],
  template: `
    <p-fieldset legend="Bộ lọc">
      <form [formGroup]="filterForm">
        <div class="flex w-full gap-4 flex-wrap">
          <p-floatlabel variant="on" class="shrink-0 grow sm:basis-72  sm:max-w-72">
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

          <p-floatlabel variant="on" class="shrink-0 grow sm:basis-72  sm:max-w-72">
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

          <p-floatlabel variant="on" class="shrink-0 grow sm:basis-72  sm:max-w-72">
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
          </p-floatlabel>

          <p-floatlabel variant="on" class="shrink-0 grow sm:basis-72 sm:max-w-72">
            <p-datePicker
              formControlName="date"
              inputId="date-filter"
              class="w-full"
              [fluid]="true"
              [showIcon]="true"
              selectionMode="range"
              dateFormat="dd/mm/yy"
            />
            <label for="date-filter">Ngày</label>
          </p-floatlabel>
        </div>
      </form>
    </p-fieldset>
  `,
  styles: ``,
})
export class DashboardFilterComponent implements OnInit {
  public branchFilterStore = inject(BranchFilterStore);
  public cameraGroupFilterStore = inject(CameraGroupFilterStore);
  public cameraFilterStore = inject(CameraFilterStore);

  public onChangesFilterForm = output<
    | {
        type: 'branchIds' | 'cameraGroupIds' | 'cameraIds' | 'date';
        value: number[] | null;
      }
    | {
        type: 'date';
        value: DateRangePicker | null;
      }
  >();

  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);

  public filterForm: FormGroup<FormModel<DashboardFilterForm>> = this.fb.group({
    branchId: this.fb.control<MultiSelectOption[] | null>(null),
    cameraGroupId: this.fb.control<MultiSelectOption[] | null>(null),
    cameraId: this.fb.control<MultiSelectOption[] | null>(null),
    date: this.fb.nonNullable.control<DateRangePicker>([
      dayjs().startOf('day').toDate(),
      dayjs().endOf('day').toDate(),
    ]),
  });

  constructor() {
    effect(() => {
      const allBranches = this.branchFilterStore.selectAllOptions();
      if (allBranches.length > 0) {
        this.filterForm.controls.branchId.patchValue(allBranches, { emitEvent: false });
        this.onChangesFilterForm.emit({
          type: 'branchIds',
          value: allBranches.map((v) => v.value),
        });
      }
    });

    effect(() => {
      const validCameraGroups = this.cameraGroupFilterStore.extractFromTreeView();
      if (validCameraGroups.length > 0) {
        this.filterForm.controls.cameraGroupId.patchValue(validCameraGroups, { emitEvent: false });
        this.onChangesFilterForm.emit({
          type: 'cameraGroupIds',
          value: validCameraGroups.map((v) => v.value),
        });
      }
    });

    effect(() => {
      const validCameras = this.cameraFilterStore.extractFromTreeView();
      if (validCameras.length > 0) {
        this.filterForm.controls.cameraId.patchValue(validCameras, { emitEvent: false });
      }
    });
  }

  ngOnInit(): void {
    this.filterForm.controls.branchId.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => {
        const ids = options?.map((v) => v.value) ?? [];
        this.cameraGroupFilterStore.setSelectedBranchIds(ids);
        this.onChangesFilterForm.emit({ type: 'branchIds', value: ids });
      });

    this.filterForm.controls.cameraGroupId.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((options) => {
        const ids = options?.map((v) => v.value) ?? [];
        this.cameraFilterStore.setSelectedCameraGroupIds(ids);
        this.onChangesFilterForm.emit({ type: 'cameraGroupIds', value: ids });
      });

    this.filterForm.controls.date.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        const dateFrom = value?.[0] ?? null;
        const dateTo = value?.[1] ?? null;
        const dateValue =
          dateFrom && dateTo ? ([dateFrom, dateTo] satisfies DateRangePicker) : null;
        this.onChangesFilterForm.emit({
          type: 'date',
          value: dateValue,
        });
      });
  }
}
