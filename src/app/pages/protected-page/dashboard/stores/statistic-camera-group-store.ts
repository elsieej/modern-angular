import { StatisticService } from '@/app/cores/services/apis/statistic-service/statistic-service';
import { StatisticDto } from '@/app/types/apis/dtos/statistic-dto';
import { LoadingStatus } from '@/app/types/apis/responses/api-response';
import { StatisticCameraGroupResponse } from '@/app/types/apis/responses/statistic-response';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type StatisticCameraGroupState = {
  data: StatisticCameraGroupResponse | null;
  loading: LoadingStatus;
  error: string | null;
};

const initialState: StatisticCameraGroupState = {
  data: null,
  loading: 'idle',
  error: null,
};

const StatisticCameraGroupStore = signalStore(
  withState(initialState),
  withMethods((store, statisticService = inject(StatisticService)) => ({
    getStatisticCameraGroups: rxMethod<{ dto: StatisticDto }>(
      pipe(
        tap(() => patchState(store, { loading: 'loading' })),
        switchMap(({ dto }) => statisticService.getStatisticCameraGroups(dto)),
        tapResponse({
          next: (response) => {
            const data = response.data;
            if (data.length > 0) {
              patchState(store, { data: data[0], loading: 'success' });
            } else {
              patchState(store, { data: null, loading: 'success' });
            }
          },
          error: (error: HttpErrorResponse) =>
            patchState(store, { error: error.message, loading: 'error' }),
        }),
      ),
    ),
  })),
);

export default StatisticCameraGroupStore;
