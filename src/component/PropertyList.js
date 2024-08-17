import React from "react";
import PropertyCard from "./PropertyCard";

export default function PropertyList({ properties, filters }) {
  // Filter properties based on selected filters
  const filteredProperties = properties.filter((property) => {
    const matchesType =
      !filters.PropertyType || property.type === filters.PropertyType;
    const matchesCondition =
      !filters.PropertyCondition ||
      property.condition === filters.PropertyCondition;
    const matchesBHK = !filters.BHKType || property.bhk === filters.BHKType;
    const matchesFurnish =
      !filters.FurnishType || property.furnish === filters.FurnishType;
    const matchesFacing = !filters.Facing || property.facing === filters.Facing;
    const matchesPostedBy =
      !filters.PostedBy || property.postedBy === filters.PostedBy;
    const matchesBudget = !filters.budget || property.budget <= filters.budget;
    const matchesBuiltUpArea =
      !filters.builtUpArea || property.builtUpArea <= filters.builtUpArea;

    return (
      matchesType &&
      matchesCondition &&
      matchesBHK &&
      matchesFurnish &&
      matchesFacing &&
      matchesPostedBy &&
      matchesBudget &&
      matchesBuiltUpArea
    );
  });

  return (
    <div className="col-lg-9 col-md-8">
      <h5>{filteredProperties.length} results | Properties in Noida for Buy</h5>
      {filteredProperties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
}
