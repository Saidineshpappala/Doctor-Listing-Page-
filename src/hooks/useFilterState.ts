
import { FilterState, SortOption, ConsultationType, Doctor } from "@/types/doctor";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const useFilterState = (doctors: Doctor[] | null) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Initialize filter state from URL params
  const initialFilterState: FilterState = {
    searchQuery: searchParams.get("search") || "",
    consultationType: (searchParams.get("consultation") as ConsultationType) || null,
    specialties: searchParams.getAll("specialty") || [],
    sortBy: (searchParams.get("sort") as SortOption) || null,
  };
  
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors || []);

  // Update URL params when filter state changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filterState.searchQuery) {
      newSearchParams.set("search", filterState.searchQuery);
    }
    
    if (filterState.consultationType) {
      newSearchParams.set("consultation", filterState.consultationType);
    }
    
    filterState.specialties.forEach(specialty => {
      newSearchParams.append("specialty", specialty);
    });
    
    if (filterState.sortBy) {
      newSearchParams.set("sort", filterState.sortBy);
    }

    setSearchParams(newSearchParams);
  }, [filterState, setSearchParams]);
  
  // Update filtered doctors when filter state or doctors change
  useEffect(() => {
    if (!doctors) return;
    
    let result = [...doctors];
    
    // Filter by search query
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(query)
      );
    }
    
    // Filter by consultation type
    if (filterState.consultationType) {
      result = result.filter(doctor => 
        doctor.consultation_type.includes(filterState.consultationType as ConsultationType)
      );
    }
    
    // Filter by specialties
    if (filterState.specialties.length > 0) {
      result = result.filter(doctor => 
        filterState.specialties.some(specialty => doctor.specialty.includes(specialty))
      );
    }
    
    // Sort by fees or experience
    if (filterState.sortBy) {
      result.sort((a, b) => {
        if (filterState.sortBy === "fees") {
          return a.fees - b.fees; // ascending
        } else if (filterState.sortBy === "experience") {
          return b.experience - a.experience; // descending
        }
        return 0;
      });
    }
    
    setFilteredDoctors(result);
  }, [doctors, filterState]);
  
  // Handle filter changes
  const updateFilter = (updatedFilter: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...updatedFilter }));
  };
  
  return {
    filterState,
    updateFilter,
    filteredDoctors,
  };
};
