import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = ({search,setSearch}) => {
  const options = [
    "Chennai",
    "Seranthai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Kolkata",
    "Pune",
  ];

  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [Buses, setBuses] = useState([]);

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

  const [searchedFrom, setSearchedFrom] = useState("");
  const [searchedTo, setSearchedTo] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    axios
      .get("https://amulbus.onrender.com/products")
      .then((response) => {
        setBuses(response.data);
      })
      .catch((error) => console.error("Error fetching buses:", error));
  }, []);

  const filteredFromOptions = options.filter((option) =>
    option.toLowerCase().includes(searchedFrom.toLowerCase())
  );

  const filteredToOptions = options.filter((option) =>
    option.toLowerCase().includes(searchedTo.toLowerCase())
  );

  const handleSearch = () => {
    const filteredBuses = Buses.filter(
      (data) =>
        data.source === search.from &&
        data.destination === search.to &&
        data.availableDates.includes(search.date)
    );

    navigate("/results", { state: { results: filteredBuses } });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    console.log("User logged out, token removed");
    navigate("/");
  };

  return (
    <div className="home-container">
    <header className="home-header">
      
    <nav className="home-nav">
      <div className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776; {/* Hamburger icon */}
      </div>

      <div className={`account-dropdown-wrapper ${menuOpen ? 'show' : ''}`}>
        <button className="account-button">
          <span><Link className="linkcss1" to='/help'>Help</Link></span>
        </button>
        <button className="account-button">
          <span><Link className="linkcss1" to='/about'>About</Link></span>
        </button>

        <button onClick={() => setOpen(!open)} className="account-button">
          <span className="span">Account</span>
        </button>

        {open && (
          <div className="dropdown-menu">
            <ul>
              <li><Link className="linkcss" to="/">LOGIN</Link></li>
              <li><button onClick={logout}>LOGOUT</button></li>
            </ul>
          </div>
        )}
      </div>
    </nav>
    </header>

    <div className="home-search-row">
      {/* From Input */}
      <div className="home-input-wrapper">
        <input
          type="text"
          placeholder="From"
          value={searchedFrom || selectedFrom || search.from}
          onChange={(e) => {
            setSearchedFrom(e.target.value);
            setSearch((prev) => ({ ...prev, from: e.target.value }));
          }}
          className="home-input"
        />
        {searchedFrom && (
          <ul className="home-dropdown">
            {filteredFromOptions.map((option, index) => (
              <li
                key={index}
                className="home-dropdown-item"
                onClick={() => {
                  setSelectedFrom(option);
                  setSearch((prev) => ({ ...prev, from: option }));
                  setSearchedFrom("");
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* To Input */}
      <div className="home-input-wrapper">
        <input
          type="text"
          placeholder="To"
          value={selectedTo || search.to}
          onChange={(e) => {
            setSearchedTo(e.target.value);
            setSearch((prev) => ({ ...prev, to: e.target.value }));
          }}
          className="home-input"
        />
        {searchedTo && (
          <ul className="home-dropdown">
            {filteredToOptions.map((option, index) => (
              <li
                key={index}
                className="home-dropdown-item"
                onClick={() => {
                  setSelectedTo(option);
                  setSearch((prev) => ({ ...prev, to: option }));
                  setSearchedTo("");
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Date Input */}
      <input
        type="date"
        value={search.date}
        onChange={(e) => setSearch((prev) => ({ ...prev, date: e.target.value }))}
        className="home-date-input"
      />

      {/* Search Button */}
      <button onClick={handleSearch} className="home-search-btn">
        SEARCH
      </button>
    </div>

    {/* Admin Panel Access */}
    {role === "admin" && (
      <button onClick={() => navigate("/adminpage")} className="home-admin-btn">
        Go to Admin Panel
      </button>
    )}
  </div>
  );
};

export default HomePage;
