import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="col-md-3 mb-4 mb-md-0">
          <ul className="list-group">
            <li className="list-group-item active">
              Dashboard
            </li>
            <li className="list-group-item">
              <Link to="/orders" className="text-decoration-none text-dark">Orders</Link>
            </li>
            <li className="list-group-item">
              <Link to="/wishlist" className="text-decoration-none text-dark">Wishlist</Link>
            </li>
            <li className="list-group-item">
              <Link to="/profile" className="text-decoration-none text-dark">Profile</Link>
            </li>
            <li className="list-group-item">
              <Link to="/addresses" className="text-decoration-none text-dark">Addresses</Link>
            </li>
          </ul>
        </div>
  );
}

export default Sidebar;