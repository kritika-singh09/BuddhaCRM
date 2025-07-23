// src/components/departments/LaundryCard.jsx
import React from "react";
import { Shirt } from "lucide-react";
import DepartmentCard from "../DepartmentCard";

const LaundryCard = ({ taskCount, onClick }) => {
  return (
    <DepartmentCard
      icon={Shirt}
      name="Laundry"
      action="Process Laundry"
      taskCount={taskCount}
      color="bg-primary"
      onClick={onClick}
    />
  );
};

export default LaundryCard;
