// src/components/departments/MaintenanceCard.jsx
import React from "react";
import { Wrench } from "lucide-react";
import DepartmentCard from "../DepartmentCard.jsx";

const MaintenanceCard = ({ taskCount, onClick }) => {
  return (
    <DepartmentCard
      icon={Wrench}
      name="Maintenance"
      action="Fix Issues"
      taskCount={taskCount}
      color="bg-primary"
      onClick={onClick}
    />
  );
};

export default MaintenanceCard;
