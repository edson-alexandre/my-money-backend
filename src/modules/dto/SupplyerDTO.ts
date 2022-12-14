export interface SupplyerDTO {
  id: string;
  name: string;
  email: string;
  personType: string;
  cgcCpf: string;
  contact: string;
  city: string;
  state: string;
  street: string;
  number: string;
  details: string;
  district: string;
  zip: string;
  country: string;
  created_at?: Date;
  updated_at?: Date;
}
