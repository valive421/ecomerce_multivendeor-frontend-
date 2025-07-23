import React, { useState, useRef } from "react";
import Sidebar from "../common/Sidebar";

function Profile() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    profilePic: "https://via.placeholder.com/120x120?text=Profile"
  });
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef();

  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        setProfile((prev) => ({ ...prev, profilePic: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEdit(false);
    // Save logic here
  }

  return (
    <div className="container py-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-4 text-center"><i className="fa fa-user me-2"></i>Profile</h2>
            <div className="text-center mb-3">
              <img src={profile.profilePic} alt="Profile" className="rounded-circle mb-2" style={{ width: 100, height: 100, objectFit: "cover" }} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input name="firstName" className="form-control" value={profile.firstName} onChange={handleChange} disabled={!edit} />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input name="lastName" className="form-control" value={profile.lastName} onChange={handleChange} disabled={!edit} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" className="form-control" value={profile.email} onChange={handleChange} disabled={!edit} />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  disabled={!edit}
                />
              </div>
              {edit ? (
                <button type="submit" className="btn btn-success w-100 mb-2">Save</button>
              ) : (
                <button type="button" className="btn btn-primary w-100 mb-2" onClick={() => setEdit(true)}>Edit</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
