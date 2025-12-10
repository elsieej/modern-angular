import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import BranchFilterStore from '@/app/pages/protected-page/dashboard/stores/branch-filter-store';
@Component({
  selector: 'app-dashboard-filter-component',
  providers: [BranchFilterStore],
  imports: [ReactiveFormsModule, MultiSelectModule, FloatLabelModule],
  template: `<div class="space-y-2">
    <h3 class="text-lg font-bold">Bộ lọc</h3>
    <form [formGroup]="filterForm">
      <div class="flex w-full gap-x-4">
        <p-floatlabel variant="on" class="w-full">
          <p-multiSelect
            formControlName="branchId"
            inputId="camera-group-filter"
            optionLabel="label"
            class="w-full"
            display="chip"
            [options]="branchFilterStore.extractFromTreeView()"
            [loading]="branchFilterStore.isLoading()"
          />
          <label for="camera-group-filter">Nhóm camera</label>
        </p-floatlabel>
      </div>
    </form>
  </div>`,
  styles: ``,
})
export class DashboardFilterComponent {
  public branchFilterStore = inject(BranchFilterStore);
  private fb = inject(FormBuilder);

  public filterForm = this.fb.nonNullable.group({
    branchId: [''],
  });
}
