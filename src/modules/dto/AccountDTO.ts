import { EAccountNature } from '../enums/EAccountNature';
export interface AccountDTO {
  id?: string;
  shortCode: number;
  classification: string;
  isAnalytical: boolean;
  nature: EAccountNature;
  level: number;
  description: string;
  superiorId: string;
  created_at?: Date;
  updated_at?: Date;
}
