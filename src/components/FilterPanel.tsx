
import { ConsultationType, Doctor, FilterState, SortOption } from "@/types/doctor";
import { getAllSpecialties } from "@/services/doctorService";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterPanelProps {
  doctors: Doctor[];
  filterState: FilterState;
  updateFilter: (filter: Partial<FilterState>) => void;
}

const FilterPanel = ({ doctors, filterState, updateFilter }: FilterPanelProps) => {
  // Get all specialties, ensuring doctors array exists first
  const specialties = doctors && doctors.length > 0 ? getAllSpecialties(doctors) : [];

  const handleConsultationChange = (value: string) => {
    updateFilter({ consultationType: value as ConsultationType });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    const updatedSpecialties = checked
      ? [...filterState.specialties, specialty]
      : filterState.specialties.filter(s => s !== specialty);
    
    updateFilter({ specialties: updatedSpecialties });
  };

  const handleSortChange = (value: SortOption) => {
    updateFilter({ sortBy: value });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 space-y-6">
      {/* Consultation Type Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3" data-testid="filter-header-moc">Consultation Mode</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="video-consult"
              name="consultation-type"
              checked={filterState.consultationType === "Video Consult"}
              onChange={() => handleConsultationChange("Video Consult")}
              data-testid="filter-video-consult"
            />
            <label htmlFor="video-consult" className="text-sm">Video Consult</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="in-clinic"
              name="consultation-type"
              checked={filterState.consultationType === "In Clinic"}
              onChange={() => handleConsultationChange("In Clinic")}
              data-testid="filter-in-clinic"
            />
            <label htmlFor="in-clinic" className="text-sm">In Clinic</label>
          </div>
        </div>
      </div>

      {/* Specialties Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3" data-testid="filter-header-speciality">Speciality</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {specialties.map(specialty => (
            <div key={specialty} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                checked={filterState.specialties.includes(specialty)}
                onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                data-testid={`filter-specialty-${specialty.replace("/", "-")}`}
              />
              <label htmlFor={`specialty-${specialty}`} className="text-sm">{specialty}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="text-lg font-medium mb-3" data-testid="filter-header-sort">Sort</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="sort-fees"
              name="sort-by"
              checked={filterState.sortBy === "fees"}
              onChange={() => handleSortChange("fees")}
              data-testid="sort-fees"
            />
            <label htmlFor="sort-fees" className="text-sm">Fees (Low to High)</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="sort-experience"
              name="sort-by"
              checked={filterState.sortBy === "experience"}
              onChange={() => handleSortChange("experience")}
              data-testid="sort-experience"
            />
            <label htmlFor="sort-experience" className="text-sm">Experience (High to Low)</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
