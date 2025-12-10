import { BranchService } from '@/app/cores/services/apis/branch-service/branch-service';
import { LoadingStatus } from '@/app/types/apis/responses/api-response';
import { BranchResponse } from '@/app/types/apis/responses/branch-response';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type BranchTreeViewState = {
  data: BranchResponse[] | null;
  loading: LoadingStatus;
  error: string | null;
};

const initialState: BranchTreeViewState = {
  data: null,
  loading: 'idle',
  error: null,
};

const BranchTreeViewStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, branchService = inject(BranchService)) => ({
    getBranchTreeView: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: 'loading' })),
        switchMap(() => branchService.getTreeView()),
        tapResponse({
          next: (response) => patchState(store, { data: response.data, loading: 'success' }),
          error: (error: HttpErrorResponse) =>
            patchState(store, { error: error.message, loading: 'error' }),
        }),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.getBranchTreeView();
    },
  }),
);

export default BranchTreeViewStore;
