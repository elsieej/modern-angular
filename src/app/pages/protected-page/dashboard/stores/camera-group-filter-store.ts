import BranchTreeViewStore from '@/app/cores/stores/apis/branch-tree-view-store';
import { BranchResponse } from '@/app/types/apis/responses/branch-response';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

type CameraGroupFilterState = {
  selectedBranchIds: number[];
};

const initialState: CameraGroupFilterState = {
  selectedBranchIds: [],
};

const CameraGroupFilterStore = signalStore(
  withState(initialState),
  withComputed((store, branchTreeViewStore = inject(BranchTreeViewStore)) => ({
    isLoading: computed(() => branchTreeViewStore.loading() === 'loading'),
    extractFromTreeView: computed(() => {
      const data = branchTreeViewStore.data();
      if (!data) return [];
      const selectedBranchIds = store.selectedBranchIds();
      const allBranches = data.flatMap((branch) => branch.children);
      const allCameraGroups = extractCameraGroupsFromTree(allBranches).map((c) => ({
        ...c,
        label: c.name,
        value: c.id,
      }));

      if (selectedBranchIds.length > 0) {
        return allCameraGroups.filter((c) => selectedBranchIds.includes(c.branchId));
      }

      return allCameraGroups;
    }),
  })),
  withMethods((store) => ({
    setSelectedBranchIds: (branchIds: number[]) => {
      patchState(store, { selectedBranchIds: branchIds });
    },
  })),
);

const extractCameraGroupsFromTree = (tree: BranchResponse[]) => {
  const allCameraGroups = tree.flatMap(
    (branch) =>
      branch.cameraGroups?.map((cameraGroup) => ({
        name: cameraGroup.name,
        id: cameraGroup.id,
        branchId: cameraGroup.branchId,
      })) ?? [],
  );
  return allCameraGroups;
};

export default CameraGroupFilterStore;
