import { AssetStatus } from "@prisma/client";
export type RecentAsset = {
  id: number;
  name: string;
  code: string;
  type: string;
  createdAt: string;
};


export interface AssetFormType {
  id?: number;
  name: string;
  code: string;
  type: string;
  location: string;
  status: AssetStatus;
  value: number;      // always number
  createdAt?: string;
};


export interface Asset {
  id?: number;
  name: string;
  code: string;
  type: string;
  location: string;
  status: string;
  value: number;
  createdAt?: string;
}


export type DashboardData = {
  totalAssets: number;
 
  assignedAssets: number;
  maintenanceDue: number;
  recentAssets: RecentAsset[];
  activeassets:number;
  repairassets:number;
};


export type ActionState = {
  message: string | null;
  error: string | null;
};
