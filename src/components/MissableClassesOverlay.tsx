import React, { useState } from "react";
import { 
  Card, 
  Tooltip, 
  Progress,
  Button
} from "@nextui-org/react";
import { motion } from "framer-motion";

interface MissableClassesOverlayProps {
  total: number;
  present: number;
  loading: boolean;
}

const MissableClassesOverlay: React.FC<MissableClassesOverlayProps> = ({ 
  total, 
  present, 
  loading 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Button 
          size="sm" 
          color="primary" 
          variant="flat" 
          onClick={() => setIsVisible(true)}
        >
          Show Attendance Status
        </Button>
      </motion.div>
    );
  }
  
  // Calculate current attendance percentage
  const currentPercentage = total > 0 ? (present / total) * 100 : 0;
  
  // Calculate how many more classes can be missed while maintaining ≥75% attendance
  const calculateAttendanceData = () => {
    if (loading || total === 0) {
      return { canSkip: 0, classesRequired: 0, isDeficit: false };
    }
    
    // Required classes for 75% attendance
    const requiredClasses = Math.ceil(0.75 * total);
    
    // How many classes can be skipped
    const canSkip = present - requiredClasses;
    
    // Calculate if in deficit (need more classes) or surplus (can miss classes)
    const isDeficit = canSkip < 0;
    
    // Absolute value of classes required (if negative) or classes that can be missed (if positive)
    const classesRequired = Math.abs(canSkip);
    
    return { canSkip, classesRequired, isDeficit };
  };
  
  const { canSkip, classesRequired, isDeficit } = calculateAttendanceData();
  
  // Determine color based on status
  const getColorClass = () => {
    if (isDeficit) return "danger";
    if (canSkip === 0) return "warning";
    return "success";
  };
  
  const colorClass = getColorClass();
  
  // Get message based on status
  const getMessage = () => {
    if (isDeficit) {
      return `⚠️ Attend ${classesRequired} more class${classesRequired !== 1 ? 'es' : ''} to reach 75% attendance`;
    }
    if (canSkip === 0) {
      return "⚠️ You cannot miss any more classes to maintain 75% attendance";
    }
    return `✅ You can miss ${canSkip} more class${canSkip !== 1 ? 'es' : ''} and still maintain 75% attendance`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed top-20 right-6 z-50"
    >
      <Card 
        className={`shadow-xl w-80 p-3 ${
          colorClass === "danger" ? "bg-danger-50 border-danger-500" : 
          colorClass === "warning" ? "bg-warning-50 border-warning-500" : 
          "bg-success-50 border-success-500"
        } border-2`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className={`font-bold ${
              colorClass === "danger" ? "text-danger-600" : 
              colorClass === "warning" ? "text-warning-600" : 
              "text-success-600"
            }`}>
              Attendance Status
            </h3>
            <Tooltip content={`Current attendance: ${currentPercentage.toFixed(1)}%`}>
              <div className={`text-sm font-semibold rounded-full px-2 py-1 ${
                colorClass === "danger" ? "text-danger-600 bg-danger-100" : 
                colorClass === "warning" ? "text-warning-600 bg-warning-100" : 
                "text-success-600 bg-success-100"
              }`}>
                {currentPercentage.toFixed(1)}%
              </div>
            </Tooltip>
          </div>
          
          <Progress 
            size="sm" 
            radius="full" 
            value={currentPercentage} 
            color={colorClass as any}
            minValue={0}
            maxValue={100}
          />
          
          <p className={`font-medium text-sm ${
            colorClass === "danger" ? "text-danger-700" : 
            colorClass === "warning" ? "text-warning-700" : 
            "text-success-700"
          }`}>
            {getMessage()}
          </p>
          
          <div className="flex justify-end">
            <Button 
              size="sm" 
              variant="light" 
              onClick={() => setIsVisible(false)}
            >
              Hide
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MissableClassesOverlay; 