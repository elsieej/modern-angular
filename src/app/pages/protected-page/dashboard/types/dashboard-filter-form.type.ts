import { DateRangePicker, MultiSelectOption } from '@/app/types/form-type';

export type DashboardFilterForm = {
  branchId: MultiSelectOption[] | null;
  cameraGroupId: MultiSelectOption[] | null;
  cameraId: MultiSelectOption[] | null;
  date: DateRangePicker;
};
