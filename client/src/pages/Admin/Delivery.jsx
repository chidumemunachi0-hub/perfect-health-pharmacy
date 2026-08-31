import { useEffect, useState } from "react";
import API from "../../../api/productApi";
import "./Delivery.css";

function Delivery() {
  const [areas, setAreas] = useState([]);

  const [areaName, setAreaName] = useState("");
  const [fee, setFee] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchAreas = async () => {
    try {
      const res = await API.get("/delivery");
      setAreas(res.data);
    } catch (error) {
      console.error("FETCH DELIVERY ERROR:", error);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!areaName.trim() || !fee) {
      alert("Please fill in all fields.");
      return;
    }
  
    try {
      if (editingId) {
        await API.put(`/delivery/${editingId}`, {
          name: areaName,
          fee: Number(fee),
        });
  
        alert("Delivery area updated successfully.");
      } else {
        await API.post("/delivery", {
          name: areaName,
          fee: Number(fee),
        });
  
        alert("Delivery area added successfully.");
      }
  
      setAreaName("");
      setFee("");
      setEditingId(null);
  
      fetchAreas();
    } catch (error) {
      console.error("SAVE DELIVERY ERROR:", error);
  
      alert(
        error.response?.data?.message ||
        "Failed to save delivery area."
      );
    }
  };
  const handleEdit = (area) => {
    setEditingId(area._id);
    setAreaName(area.name);
    setFee(area.fee);
  };

  const toggleStatus = async (area) => {
    try {
      await API.put(`/delivery/${area._id}`, {
        active: !area.active,
      });

      fetchAreas();
    } catch (error) {
      console.error("UPDATE DELIVERY ERROR:", error);

      alert("Failed to update delivery status.");
    }
  };

  const deleteArea = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this delivery area?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/delivery/${id}`);

      fetchAreas();
    } catch (error) {
      console.error("DELETE DELIVERY ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete delivery area."
      );
    }
  };

  return (
    <div className="delivery-page">

      <div className="page-header">
        <h1>Delivery</h1>

        <p>
          Manage delivery areas and delivery fees.
        </p>
      </div>


      {/* ADD DELIVERY AREA */}

      <div className="delivery-form-card">

        <h2>Add Delivery Area</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Delivery area"
            value={areaName}
            onChange={(e) =>
              setAreaName(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Delivery fee"
            value={fee}
            onChange={(e) =>
              setFee(e.target.value)
            }
          />

<button type="submit">
  {editingId ? "Update Area" : "Add Area"}
</button>

        </form>

      </div>


      {/* DELIVERY AREAS */}

      <div className="delivery-card">

        <h2>Delivery Areas</h2>

        {areas.length === 0 ? (

          <p className="empty-delivery">
            No delivery areas added yet.
          </p>

        ) : (

          <div className="delivery-list">

            {areas.map((area) => (

              <div
                className="delivery-item"
                key={area._id}
              >

                <div className="delivery-info">

                  <h3>{area.name}</h3>

                  <p>
                    ₦{Number(area.fee).toLocaleString()}
                  </p>

                </div>


                <div className="delivery-actions">

                <button
  className="edit-delivery-btn"
  onClick={() => handleEdit(area)}
>
  Edit
</button>

                  <button
                    className={
                      area.active
                        ? "active-btn"
                        : "inactive-btn"
                    }
                    onClick={() =>
                      toggleStatus(area)
                    }
                  >
                    {area.active
                      ? "Active"
                      : "Inactive"}
                  </button>


                  <button
                    className="delete-delivery-btn"
                    onClick={() =>
                      deleteArea(area._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Delivery;