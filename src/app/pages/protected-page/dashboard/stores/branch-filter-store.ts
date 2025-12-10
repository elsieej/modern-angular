import BranchTreeViewStore from '@/app/cores/stores/apis/branch-tree-view-store';
import { computed, inject } from '@angular/core';
import { signalStore, withComputed } from '@ngrx/signals';

const BranchFilterStore = signalStore(
  withComputed((_, branchTreeViewStore = inject(BranchTreeViewStore)) => ({
    isLoading: computed(() => branchTreeViewStore.loading() === 'loading'),
    extractFromTreeView: computed(() => {
      const data = branchTreeViewStore.data();
      if (!data) return [];
      return data
        .flatMap((branch) => [branch, ...branch.children])
        .map((branch) => ({
          label: branch.name,
          value: branch.id,
        }));
    }),
  })),
);

export default BranchFilterStore;
