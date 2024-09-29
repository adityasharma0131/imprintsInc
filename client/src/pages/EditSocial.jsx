import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const EditSocial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [social, setSocial] = useState({ name: "", url: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSocial = async () => {
      if (!id) {
        setError("Invalid ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/socials/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch social");
        const data = await response.json();
        setSocial(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSocial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocial((prevSocial) => ({
      ...prevSocial,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/socials/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(social),
        }
      );

      if (!response.ok) throw new Error("Failed to update social");

      toast.success("Social updated successfully!"); // Success toast
      navigate("/social-operation");
    } catch (error) {
      toast.error(`Error: ${error.message}`); // Error toast
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Toaster /> {/* Include the Toaster component to render toasts */}
      <div className="admin-bx">
        <div className="dash-opr-head">
          <h1 className="dash-head">
            <Link className="dash-head1" to="/social-operation">
              Socials Page
            </Link>
            <IoIosArrowForward />
            <span className="dash-head2">Edit Social</span>
          </h1>
        </div>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Edit Social</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="dash-input"
                      placeholder="Enter name"
                      value={social.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="url"
                      className="dash-input"
                      placeholder="Enter URL"
                      value={social.url}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <button type="submit" className="add">
                      Edit +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSocial;
