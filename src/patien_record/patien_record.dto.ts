export class PatienRecordReq {
  prefix: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  national_id: string;
  gender: string;
  date_of_birth: Date;
  occupation: string;
  race: string;
  national: string;
  religion: string;
  blood_type: string;
  rh: string;
  nickname: string;
  allergic: string;
  hn: string;
  foreign_id: string;
  addresses?: AddressReq[];
}

export class PatienRecordUpdateReq extends PatienRecordReq {
  id: number;
  uuid: string;
  addresses?: AddressUpdateReq[];
}

export class AddressReq {
  address: string;
  province: string;
  sub_district: string;
  district: string;
  country: string;
  postcode: string;
  is_primary: boolean;
  patien_id: number;
}

export class AddressUpdateReq extends AddressReq {
  uuid: string;
  id: number;
}
