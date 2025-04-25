
export interface Doctor {
  id: string;
  name: string;
  specialty: string[];
  consultation_type: ConsultationType[];
  experience: number;
  fees: number;
  rating?: number;
  image_url?: string;
}

export type ConsultationType = "Video Consult" | "In Clinic";

export interface FilterState {
  searchQuery: string;
  consultationType: ConsultationType | null;
  specialties: string[];
  sortBy: SortOption | null;
}

export type SortOption = "fees" | "experience";
