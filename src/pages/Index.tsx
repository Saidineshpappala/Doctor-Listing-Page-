
import { useEffect, useState } from "react";
import { Doctor } from "@/types/doctor";
import { fetchDoctors } from "@/services/doctorService";
import { useFilterState } from "@/hooks/useFilterState";
import { useToast } from "@/components/ui/use-toast";

import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";

const Index = () => {
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const { filterState, updateFilter, filteredDoctors } = useFilterState(doctors);
  
  // Fetch doctors on component mount
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        setLoading(true);
        const data = await fetchDoctors();
        setDoctors(data);
      } catch (error) {
        console.error("Failed to load doctors:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor data. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadDoctors();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center text-medical-primary">Find a Doctor</h1>
          <div className="mt-4">
            {doctors && (
              <SearchBar 
                doctors={doctors}
                searchQuery={filterState.searchQuery}
                onSearchChange={(query) => updateFilter({ searchQuery: query })}
              />
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-medical-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filter Panel */}
            <div className="md:w-72 shrink-0">
              {doctors && (
                <FilterPanel
                  doctors={doctors}
                  filterState={filterState}
                  updateFilter={updateFilter}
                />
              )}
            </div>
            
            {/* Doctor List */}
            <div className="flex-1">
              <div className="mb-4">
                <h2 className="text-lg font-medium">
                  {filteredDoctors.length} Doctors Found
                </h2>
              </div>
              
              <div className="grid gap-4">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-lg">
                    <p className="text-gray-500">No doctors match your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
