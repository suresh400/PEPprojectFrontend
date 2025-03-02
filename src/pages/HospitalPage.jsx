import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/hospitalPage.css"; // Import CSS for styling

const HospitalPage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitalDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/v1/hospitals/${id}`);

        if (!response.data || response.data.error) {
          setError("Hospital not found.");
          return;
        }

        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital details:", error);
        setError("Failed to load hospital details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalDetails();
  }, [id]);

  if (loading) return <p>Loading hospital details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hospital-details">
      <h2>{hospital.name}</h2>
      <p><strong>City:</strong> {hospital.city}</p>
      <img src={hospital.imageUrl} alt={hospital.name} className="hospital-main-image" />
      <p><strong>Specialities:</strong> {hospital.specialities ? hospital.specialities.join(", ") : "N/A"}</p>
      <p><strong>Rating:</strong> ⭐ {hospital.rating}</p>
      <p><strong>Description:</strong> {hospital.description || "No description available"}</p>
      <p><strong>Number of Doctors:</strong> {hospital.numberOfDoctors || "N/A"}</p>
      <p><strong>Number of Departments:</strong> {hospital.numberOfDepartments || "N/A"}</p>

      <h3>Additional Images</h3>
      <div className="hospital-images">
        {hospital.images && hospital.images.length > 0 ? (
          hospital.images.map((img, index) => (
            <img key={index} src={img} alt={`Hospital ${index}`} className="hospital-thumbnail" />
          ))
        ) : (
          <p>No additional images available.</p>
        )}
      </div>

      <div className="button-group">
        {/* Edit Button */}
        <Link to={`/edit-hospital/${hospital._id}`} className="edit-btn">✏️ Edit Hospital</Link>

        {/* Add Hospital Details Button */}
        <Link to={`/hospital/${hospital._id}/details`} className="add-details-btn">➕ Add Hospital Details</Link>
      </div>
    </div>
  );
};

export default HospitalPage;
