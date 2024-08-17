import React, { useState } from "react";
import PropertyList from "./PropertyList";
import Filters from "./Filters";
import Navbar from "./Navbar"; // Import Navbar component
const initialProperties = [
  {
    title: "3BHK Apartment for Sale",
    description: "Located in Sector 50, Noida",
    image: "./images/image1.jpg",
    link: "#",
    type: "Apartment",
    condition: "New",
    bhk: "3 BHK",
    furnish: "Furnished",
    facing: "North",
    postedBy: "Owner",
    budget: 7000000,
    builtUpArea: 1800,
  },
  {
    title: "4BHK Individual Floor for Sale",
    description: "Located in Sector 16, Noida",
    image: "./images/image2.jpg",
    link: "#",
    type: "Individual Floor",
    condition: "Resale",
    bhk: "4 BHK",
    furnish: "Semi-Furnished",
    facing: "South",
    postedBy: "Dealer",
    budget: 8500000,
    builtUpArea: 2200,
  },
  {
    title: "Independent House for Sale",
    description: "Located in Sector 62, Noida",
    image: "./images/image3.jpg",
    link: "#",
    type: "Independent House",
    condition: "New",
    bhk: "4 BHK",
    furnish: "Unfurnished",
    facing: "East",
    postedBy: "Builder",
    budget: 9500000,
    builtUpArea: 2500,
  },
  {
    title: "Independent Villa for Sale",
    description: "Located in Sector 137, Noida",
    image: "./images/image4.jpg",
    link: "#",
    type: "Independent Villa",
    condition: "New",
    bhk: "5 BHK",
    furnish: "Furnished",
    facing: "West",
    postedBy: "Owner",
    budget: 12000000,
    builtUpArea: 3000,
  },
  {
    title: "Plot/Land for Sale",
    description: "Located in Sector 144, Noida",
    image: "./images/image5.jpg",
    link: "#",
    type: "Plot/Land",
    condition: "New",
    bhk: "N/A",
    furnish: "N/A",
    facing: "North East",
    postedBy: "Dealer",
    budget: 4000000,
    builtUpArea: 0, // For land, built-up area is not applicable
  },
  {
    title: "2BHK Apartment for Sale",
    description: "Located in Sector 12, Noida",
    image: "./images/image6.jpg",
    link: "#",
    type: "Apartment",
    condition: "Resale",
    bhk: "2 BHK",
    furnish: "Semi-Furnished",
    facing: "South West",
    postedBy: "Builder",
    budget: 5000000,
    builtUpArea: 1200,
  },
  {
    title: "1BHK Independent Floor for Sale",
    description: "Located in Sector 22, Noida",
    image: "./images/image7.jpg",
    link: "#",
    type: "Individual Floor",
    condition: "New",
    bhk: "1 BHK",
    furnish: "Furnished",
    facing: "North West",
    postedBy: "Owner",
    budget: 3000000,
    builtUpArea: 800,
  },
  {
    title: "3BHK Villa for Sale",
    description: "Located in Sector 27, Noida",
    image: "./images/image8.jpg",
    link: "#",
    type: "Independent Villa",
    condition: "Resale",
    bhk: "3 BHK",
    furnish: "Unfurnished",
    facing: "East",
    postedBy: "Dealer",
    budget: 6500000,
    builtUpArea: 1700,
  },
  {
    title: "New 4BHK House for Sale",
    description: "Located in Sector 45, Noida",
    image: "./images/image9.jpg",
    link: "#",
    type: "Independent House",
    condition: "New",
    bhk: "4 BHK",
    furnish: "Semi-Furnished",
    facing: "South",
    postedBy: "Builder",
    budget: 8000000,
    builtUpArea: 2000,
  },
  {
    title: "Plot/Land for Sale",
    description: "Located in Sector 52, Noida",
    image: "./images/image10.jpg",
    link: "#",
    type: "Plot/Land",
    condition: "Resale",
    bhk: "N/A",
    furnish: "N/A",
    facing: "North",
    postedBy: "Dealer",
    budget: 6000000,
    builtUpArea: 0, // For land, built-up area is not applicable
  },
  {
    title: "3BHK Apartment for Sale",
    description: "Located in Sector 75, Noida",
    image: "./images/image11.jpg",
    link: "#",
    type: "Apartment",
    condition: "New",
    bhk: "3 BHK",
    furnish: "Furnished",
    facing: "North East",
    postedBy: "Owner",
    budget: 7000000,
    builtUpArea: 1800,
  },
];

const getMinMaxValues = (properties) => {
  const budgets = properties.map((p) => p.budget);
  const areas = properties.map((p) => p.builtUpArea);

  return {
    minBudget: Math.min(...budgets),
    maxBudget: Math.max(...budgets),
    minArea: Math.min(...areas),
    maxArea: Math.max(...areas),
  };
};

export default function PropertyPage() {
  const { minBudget, maxBudget, minArea, maxArea } =
    getMinMaxValues(initialProperties);

  const [filters, setFilters] = useState({
    PropertyType: "",
    PropertyCondition: "",
    BHKType: "",
    FurnishType: "",
    Facing: "",
    PostedBy: "",
    budget: maxBudget,
    builtUpArea: maxArea,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredProperties = initialProperties.filter((property) => {
    const matchesSearchTerm = property.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.PropertyType || property.type === filters.PropertyType) &&
      (!filters.PropertyCondition ||
        property.condition === filters.PropertyCondition) &&
      (!filters.BHKType || property.bhk === filters.BHKType) &&
      (!filters.FurnishType || property.furnish === filters.FurnishType) &&
      (!filters.Facing || property.facing === filters.Facing) &&
      (!filters.PostedBy || property.postedBy === filters.PostedBy) &&
      property.budget <= filters.budget &&
      property.builtUpArea <= filters.builtUpArea;

    return matchesSearchTerm && matchesFilters;
  });

  const filteredAreas = filteredProperties.map(
    (property) => property.description
  );
  const resetFilters = () => {
    setFilters({
      PropertyType: "",
      PropertyCondition: "",
      BHKType: "",
      FurnishType: "",
      Facing: "",
      PostedBy: "",
      budget: maxBudget,
      builtUpArea: maxArea,
    });
  };
  return (
    <div>
      {" "}
      <Navbar
        onSearchChange={handleSearchChange}
        filteredAreas={filteredAreas}
      />
      <div className="container-fluid mt-3">
        {" "}
        {/* Ensure this is the only Navbar being used */}
        <div className="row">
          <Filters
            filters={filters}
            onFilterChange={handleFilterChange}
            resetFilters={resetFilters}
            minBudget={minBudget}
            maxBudget={maxBudget}
            minArea={minArea}
            maxArea={maxArea}
          />
          <PropertyList properties={filteredProperties} filters={filters} />
        </div>
      </div>
    </div>
  );
}
