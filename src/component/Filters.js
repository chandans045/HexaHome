import React from "react";

const filterOptions = {
  "Property Type": [
    "Apartment",
    "Individual Floor",
    "Independent House",
    "Independent Villa",
    "Plot/Land",
  ],
  "Property Condition": ["New", "Resale"],
  "BHK Type": ["1 BHK", "2 BHK", "3 BHK", "4 BHK"],
  "Furnish Type": ["Furnished", "Semi-Furnished", "Unfurnished"],
  Facing: [
    "North",
    "South",
    "East",
    "West",
    "North East",
    "North West",
    "South East",
    "South West",
  ],
  "Posted by": ["Owner", "Dealer", "Builder"],
};

export default function Filters({
  filters,
  onFilterChange,
  resetFilters,
  minBudget,
  maxBudget,
  minArea,
  maxArea,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="col-lg-3 col-md-4">
      <div className="card p-3">
        <h5>Filters</h5>
        {/* Dynamically generate filter sections as dropdowns */}
        {Object.entries(filterOptions).map(([sectionTitle, options], index) => (
          <div className="mb-4" key={index}>
            <label className="form-label">{sectionTitle}</label>
            <select
              className="form-select mt-2"
              name={sectionTitle.replace(/\s+/g, "")} // Removing spaces for filter key
              onChange={handleChange}
              value={filters[sectionTitle.replace(/\s+/g, "")] || ""}
            >
              <option value="">Select {sectionTitle}</option>
              {options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {/* Budget Filter */}
        <div className="mb-3">
          <label className="form-label">Budget</label>
          <input
            type="range"
            className="form-range"
            min={minBudget}
            max={maxBudget}
            step="10000"
            name="budget"
            onChange={handleChange}
            value={filters.budget || minBudget}
          />
          <div className="d-flex justify-content-between">
            <span>
              ₹
              {filters.budget
                ? filters.budget.toLocaleString()
                : minBudget.toLocaleString()}
            </span>
            <span>₹{maxBudget.toLocaleString()}</span>
          </div>
        </div>

        {/* Built-up Area Filter */}
        <div className="mb-3">
          <label className="form-label">Built-up area</label>
          <input
            type="range"
            className="form-range"
            min={minArea}
            max={maxArea}
            step="50"
            name="builtUpArea"
            onChange={handleChange}
            value={filters.builtUpArea || minArea}
          />
          <div className="d-flex justify-content-between">
            <span>
              {filters.builtUpArea
                ? `${filters.builtUpArea} sq.ft.`
                : `${minArea} sq.ft.`}
            </span>
            <span>{maxArea} sq.ft.</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-secondary mt-3"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
