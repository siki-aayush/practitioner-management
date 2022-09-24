const enum day {
  sunday = "Sunday",
  monday = "Monday",
  tuesday = "Tuesday",
  wednesday = "Wednesday",
  thursday = "Thursday",
  friday = "Friday",
  saturday = "Saturday",
}

export interface Practitioner {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  photograph: string;
  working_days: day[];
  start_time: string;
  end_time: string;
  dob: string;
  cloud_public_id: string;
}

export type PractitionerToCreate = Omit<Practitioner, "id">;

export type PractitionerToUpdate = Omit<Practitioner, "photograph">;

export type PractitionerBeforeUpload = Omit<
  Practitioner,
  "id" | "photograph" | "cloud_public_id"
>;

export type PractitionerToGet = Omit<Practitioner, "cloud_public_id">;
