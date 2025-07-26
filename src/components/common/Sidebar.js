import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="col-md-3 mb-4 mb-md-0">
          <ul className="list-group">
            <Link to ='/dashboard' className="text-decoration-none text-dark">
              <li className="list-group-item active">
                Dashboard
              </li>
            </Link>
            <Link to="/orders" className="text-decoration-none text-dark">
              <li className="list-group-item">
                Orders
              </li>
            </Link>
            <Link to="/wishlist" className="text-decoration-none text-dark">
              <li className="list-group-item">
                Wishlist
              </li>
            </Link>
            <Link to="/profile" className="text-decoration-none text-dark">
              <li className="list-group-item">
                Profile
              </li>
            </Link>
            <Link to="/addresses" className="text-decoration-none text-dark">
              <li className="list-group-item">
                Addresses
              </li>
            </Link>
            <Link to="/changepassword" className="text-decoration-none text-dark">
              <li className="list-group-item">
                Change Password
              </li>
            </Link>
          </ul>
        </div>
  );
}

export default Sidebar;