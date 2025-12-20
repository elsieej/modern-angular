import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import dayjs from 'dayjs';

type DashboardCameraGroupCriteriaState = {
  branchIds: number[];
  cameraGroupIds: number[];
  date: {
    from: string;
    to: string;
  } | null;
};

const initialState: DashboardCameraGroupCriteriaState = {
  branchIds: [],
  cameraGroupIds: [],
  date: {
    from: dayjs().startOf('day').toISOString(),
    to: dayjs().endOf('day').toISOString(),
  },
};

const DashboardCameraGroupCriteriaStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    updateFilter: (filter: Partial<DashboardCameraGroupCriteriaState>) => {
      patchState(store, (state) => ({ ...state, ...filter }));
    },
  })),
);

export default DashboardCameraGroupCriteriaStore;
