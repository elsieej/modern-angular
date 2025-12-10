import { CameraResponse } from './camera-response';

export interface CameraGroupResponse {
  id: number;
  code: string;
  name: string;
  info: string | null;
  branchId: number;
  customerTypeIds: number[];
  cameras: CameraResponse[];
}
