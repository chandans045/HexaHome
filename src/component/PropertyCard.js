import React from "react";
import {
  BsHouseDoor,
  BsFillTagFill,
  BsFillPeopleFill,
  BsFillStarFill,
  BsFillSquareFill,
  BsFillFileTextFill,
} from "react-icons/bs";

export default function PropertyCard({ property }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 overflow-hidden">
          <img
            src={property.image}
            className="img-fluid rounded-start"
            alt={property.title}
            id="image"
            style={{
              width: "100%", // Image will take full width of the div
              height: "100%", // Image will take full height of the div
              transition: "1s",
              objectFit: "cover", // Ensures the image covers the div without distortion
            }}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{property.title}</h5>
            <p className="card-text">{property.description}</p>
            <div className="row">
              <div className="col-6">
                <div className="d-flex align-items-center mb-2">
                  <BsHouseDoor className="me-2 text-primary" />
                  <span>
                    <strong>Type:</strong> {property.type}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BsFillTagFill className="me-2 text-primary" />
                  <span>
                    <strong>Condition:</strong> {property.condition}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BsFillStarFill className="me-2 text-primary" />
                  <span>
                    <strong>BHK:</strong> {property.bhk}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BsFillFileTextFill className="me-2 text-primary" />
                  <span>
                    <strong>Furnish Type:</strong> {property.furnish}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex align-items-center mb-2">
                  <BsFillSquareFill className="me-2 text-primary" />
                  <span>
                    <strong>Facing:</strong> {property.facing}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BsFillPeopleFill className="me-2 text-primary" />
                  <span>
                    <strong>Posted By:</strong> {property.postedBy}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BsFillTagFill className="me-2 text-primary" />
                  <span>
                    <strong>Budget:</strong> ₹{property.budget.toLocaleString()}
                  </span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <BsFillSquareFill className="me-2 text-primary" />
                  <span>
                    <strong>Built-up Area:</strong> {property.builtUpArea}{" "}
                    sq.ft.
                  </span>
                </div>
              </div>
            </div>
            <a href={property.link} className="btn btn-primary">
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
