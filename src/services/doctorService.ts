
import { Doctor } from "@/types/doctor";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch doctors: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map the API response to our Doctor type
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      specialty: item.specialities ? item.specialities.map((spec: any) => spec.name) : [],
      consultation_type: [
        ...(item.video_consult ? ["Video Consult"] : []),
        ...(item.in_clinic ? ["In Clinic"] : [])
      ],
      experience: parseInt(item.experience?.split(' ')[0]) || 0,
      fees: parseInt(item.fees?.replace(/[^\d]/g, '')) || 0,
      rating: 0, // API doesn't provide rating
      image_url: item.photo || undefined
    }));
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  if (!doctors) return [];
  
  doctors.forEach(doctor => {
    if (doctor.specialty && Array.isArray(doctor.specialty)) {
      doctor.specialty.forEach(specialty => {
        specialtiesSet.add(specialty);
      });
    }
  });
  
  return Array.from(specialtiesSet).sort();
};
