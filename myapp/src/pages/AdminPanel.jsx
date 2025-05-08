import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../components/api";
import { Link } from "react-router-dom";

const AdminPanel = ({products,setproducts}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ source: "", destination: "", availableDates: "",time:"",availableSeat:"",busType:"" });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(false);
  // const [products,setproducts]=useState([])
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/homepage"); // Redirect non-admins to home
    } else {
      setIsAdmin(true);
    }

    const fetchData = async () => {
      try {
        const res = await getProducts();
        setproducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error); 
      }
    };
    fetchData();
  }, [navigate,setproducts]);


  const formatAMPM = (dateStr) => {
    if (!dateStr || !dateStr.includes(":")) return dateStr; // Just return original if invalid
  
    const [hours, minutes] = dateStr.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return dateStr;
  
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Only format if time is provided
    const formattedTime = form.time ? formatAMPM(form.time) : "";
  
    const formData = {
      ...form,
      time: formattedTime,
    };
  
    try {
      if (editId) {
        await updateProduct(editId, formData, token);
        setproducts((prev) =>
          prev.map((p) => (p._id === editId ? { ...p, ...formData } : p))
        );
      } else {
        const res = await addProduct(formData, token);
        setproducts((prev) => [...prev, res.data]);
      }
  
      setForm({
        source: "",
        destination: "",
        availableDates: "",
        time: "",
        availableSeat: "",
        busType: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  


  const handleEdit = (product) => {
    setEditId(product._id); // Set edit mode
    setForm({ source: product.source, destination: product.destination, availableDates: product.availableDates,time:product.time,availableSeat:product.availableSeat,busType:product.busType}); // Pre-fill form
  };


  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      setproducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
<div className="admin-panel-container">
  <div className="admin-panel-nav">
    <Link to="/adminpage"><button className="admin-btn-back">BACK</button></Link>
    <Link to="/buslist"><button className="admin-btn-view">VIEW BUS</button></Link>
  </div>
  {isAdmin && <p>Welcome, Admin!</p>}

  <h1 className="admin-title">Admin Panel</h1>

  <form className="admin-form" onSubmit={handleSubmit}>
    <input
      className="admin-input"
      type="text"
      name="source"
      placeholder="Source"
      value={form.source}
      onChange={(e) => setForm({ ...form, source: e.target.value })}
      required
    />
    <input
      className="admin-input"
      type="text"
      name="destination"
      placeholder="Destination"
      value={form.destination}
      onChange={(e) => setForm({ ...form, destination: e.target.value })}
      required
    />
    <input
      className="admin-input"
      type="text"
      name="availableDates"
      placeholder="Enter dates (YYYY-MM-DD, YYYY-MM-DD)"
      value={Array.isArray(form.availableDates) ? form.availableDates.join(", ") : ""}
      onChange={(e) =>
        setForm({
          ...form,
          availableDates: e.target.value.split(",").map((date) => date.trim()),
        })
      }
      required
    />


<input
      className="admin-input"
      type="time"
      name="time"
      placeholder="Enter Bus Timing"
      value={form.time}
      onChange={(e) => setForm({ ...form, time: e.target.value })}
      required
    />




    <input
      className="admin-input"
      type="text"
      name="availableSeat"
      placeholder="Enter available seats"
      value={Array.isArray(form.availableSeat) ? form.availableSeat.join(", ") : ""}
      onChange={(e) =>
        setForm({
          ...form,
          availableSeat: e.target.value.split(",").map((seat) => seat.trim()),
        })
      }
      required
    />



<select
  className="admin-input"
  name="busType"
  value={form.busType}
  onChange={(e) => setForm({ ...form, busType: e.target.value })}
  required
>
  <option value="">Select Bus Type</option>
  <option value="Sleeper">Sleeper</option>
  <option value="Seater">Seater</option>
  <option value="Car">Car</option>
  <option value="Van">Van</option>
</select>

    <button type="submit" className="admin-submit-btn">
      {editId ? "Update Product" : "Add Product"}
    </button>
  </form>

  <ul className="admin-products-list">
    {products.map((p,index) => (
      <li key={p._id} className="admin-product-item">
        <div>ID:{index+1}</div>
        <div>{p.source}</div>
        <div>{p.destination}</div>
        <div>{p.availableDates.join(", ")}</div>
        <div>{p.time}</div>
        <div>{p.availableSeat.join(", ")}</div>
        <div>{p.busType}</div>
        <div className="admin-product-actions">
          <button onClick={() => handleEdit(p)} className="admin-edit-btn">Edit</button>
          <button onClick={() => handleDelete(p._id)} className="admin-delete-btn">Delete</button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default AdminPanel;






