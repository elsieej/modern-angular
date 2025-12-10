import { CameraGroupResponse } from "./camera-group-response";

export interface BranchResponse {
  id: number;
  code: string;
  name: string;
  info: string | null;
  address: string | null;
  parentId: number | null;
  children: BranchResponse[]
  cameraGroups?: CameraGroupResponse[]

  createdAt: string;
  updatedAt: string;
}
