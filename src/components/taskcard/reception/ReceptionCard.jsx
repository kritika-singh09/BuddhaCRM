// src/components/departments/ReceptionCard.jsx
import React from "react";
import { UserPlus } from "lucide-react";
import DepartmentCard from "../DepartmentCard.jsx";

const ReceptionCard = ({ taskCount, onClick }) => {
  return (
    <DepartmentCard
      icon={UserPlus}
      name="Reception"
      action="Guest Services"
      taskCount={taskCount}
      color="bg-primary"
      onClick={onClick}
    />
  );
};

export default ReceptionCard;
