import BranchTreeViewStore from '@/app/cores/stores/apis/branch-tree-view-store';
import { BranchResponse } from '@/app/types/apis/responses/branch-response';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type CameraFilterState = {
  selectedCameraGroupIds: number[];
};

const initialState: CameraFilterState = {
  selectedCameraGroupIds: [],
};

const CameraFilterStore = signalStore(
  withState(initialState),
  withComputed((store, branchTreeViewStore = inject(BranchTreeViewStore)) => ({
    isLoading: computed(() => branchTreeViewStore.loading() === 'loading'),
    extractFromTreeView: computed(() => {
      const data = branchTreeViewStore.data();
      if (!data) return [];
      const selectedCameraGroupIds = store.selectedCameraGroupIds();
      const allCameras = extractCamerasFromTree(data).map((c) => ({
        ...c,
        label: c.name,
        value: c.id,
      }));
      if (selectedCameraGroupIds.length > 0) {
        return allCameras.filter((c) => selectedCameraGroupIds.includes(c.cameraGroupId));
      }
      return allCameras;
    }),
  })),
  withMethods((store) => ({
    setSelectedCameraGroupIds: (cameraGroupIds: number[]) => {
      patchState(store, { selectedCameraGroupIds: cameraGroupIds });
    },
  })),
);

const extractCamerasFromTree = (tree: BranchResponse[]) => {
  const allChildBranches = tree.flatMap((branch) => branch.children ?? []);
  const allCameraGroups = allChildBranches.flatMap((branch) => branch.cameraGroups ?? []);
  const allCameras = allCameraGroups.flatMap(
    (cameraGroup) =>
      cameraGroup?.cameras.map((c) => ({
        name: c.name,
        id: c.id,
        cameraGroupId: cameraGroup.id,
      })) ?? [],
  );
  return allCameras;
};

export default CameraFilterStore;
