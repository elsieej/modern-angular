import API_CONFIG from '@/app/constants/api-config';
import { StatisticDto } from '@/app/types/apis/dtos/statistic-dto';
import { ApiResponse } from '@/app/types/apis/responses/api-response';
import { StatisticCameraGroupResponse } from '@/app/types/apis/responses/statistic-response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  private http = inject(HttpClient);
  private baseUrl = `${API_CONFIG.baseUrl}/statistics`;

  public getStatisticCameraGroups(dto: StatisticDto) {
    return this.http.post<ApiResponse<StatisticCameraGroupResponse>>(
      `${this.baseUrl}/camera-groups`,
      dto,
    );
  }
}
