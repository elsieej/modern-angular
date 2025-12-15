import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type DashboardCameraGroupCriteriaState = {
  branchIds: number[];
  cameraGroupIds: number[];
};

const initialState: DashboardCameraGroupCriteriaState = {
  branchIds: [],
  cameraGroupIds: [],
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
