import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ExternalLink } from "lucide-react";
import "./Sidebar.css";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
        <a href={import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"} className="sidebar-option" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="frontend-link-icon" size={24} />
          <p>Go to Frontend</p>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
