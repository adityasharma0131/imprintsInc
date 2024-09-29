import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const EditContact = () => {
  const { id } = useParams(); // Get contact ID from URL
  const navigate = useNavigate(); // For redirection after editing
  const [contact, setContact] = useState({
    phone: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific contact details
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact-details/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch contact");
        const data = await response.json();
        setContact(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact-details/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        }
      );

      if (!response.ok) throw new Error("Failed to update contact");

      toast.success("Contact updated successfully!"); // Success toast
      navigate("/social-operation"); // Use navigate for redirection
    } catch (error) {
      toast.error(`Error: ${error.message}`); // Error toast
      setError(error.message);
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
            <span className="dash-head2">Edit Contact</span>
          </h1>
        </div>
      </div>
      <div className="table-row">
        <div className="category-listing">
          <div className="operation-header">
            <h1 className="heading">Edit User</h1>
          </div>

          {/* Form for editing a contact */}
          <form onSubmit={handleSubmit}>
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      className="dash-input"
                      placeholder="Enter phone number"
                      value={contact.phone}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      className="dash-input"
                      placeholder="Enter email"
                      value={contact.email}
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      className="dash-input"
                      placeholder="Enter address"
                      value={contact.address}
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

export default EditContact;
