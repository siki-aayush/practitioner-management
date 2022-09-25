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
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  photograph: string;
  working_days: day[];
  start_time: string;
  end_time: string;
  dob: string;
}
