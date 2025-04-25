
import { Doctor } from "@/types/doctor";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
      data-testid="doctor-card"
    >
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-medical-light flex items-center justify-center shrink-0">
          {doctor.image_url ? (
            <img 
              src={doctor.image_url} 
              alt={doctor.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl font-medium text-medical-primary">
              {doctor.name.charAt(0)}
            </span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-lg" data-testid="doctor-name">
            Dr. {doctor.name}
          </h3>
          
          <p className="text-gray-600 text-sm mt-1" data-testid="doctor-specialty">
            {doctor.specialty.join(", ")}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs" data-testid="doctor-experience">
              {doctor.experience} Years Experience
            </div>
            
            <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs" data-testid="doctor-fee">
              ₹{doctor.fees} Fee
            </div>
            
            {doctor.consultation_type.map(type => (
              <div 
                key={type}
                className={cn(
                  "px-2 py-1 rounded text-xs",
                  type === "Video Consult" 
                    ? "bg-purple-50 text-purple-700" 
                    : "bg-orange-50 text-orange-700"
                )}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
