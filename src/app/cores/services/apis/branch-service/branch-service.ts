import API_CONFIG from '@/app/constants/api-config';
import { ApiResponse } from '@/app/types/apis/responses/api-response';
import { BranchResponse } from '@/app/types/apis/responses/branch-response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private http = inject(HttpClient);
  private baseUrl = `${API_CONFIG.baseUrl}/branches`;

  public getTreeView() {
    return this.http.get<ApiResponse<BranchResponse[]>>(`${this.baseUrl}/treeview`);
  }
}
