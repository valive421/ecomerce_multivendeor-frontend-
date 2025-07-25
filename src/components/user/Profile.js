import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../common/Sidebar";
import axios from "axios";
function Profile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profilePic: "",
    username:'',
    mobile: '',
  });
  const customerid = localStorage.getItem("customer_id");
  const [edit, setEdit] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (customerid) {
      fetch(`http://127.0.0.1:8000/api/customer/${customerid}/`)
        .then(res => res.json())
        .then(data => {
          // Map API response to profile state
          setProfile({
            firstName: data.user?.first_name || "",
            lastName: data.user?.last_name || "",
            email: data.user?.email || "",
            profilePic: (data.profilepic && data.profilepic.length > 0) ? data.profilepic[0].image : "", // Show first profile pic if exists
            username: data.user?.username || "",
            mobile: data.mobile || "",
          });
        });
    }
  }, [customerid]);

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
    // Prepare form data for PATCH request
    const formData = new FormData();
    formData.append("first_name", profile.firstName);
    formData.append("last_name", profile.lastName);
    formData.append("email", profile.email);
    formData.append("username", profile.username);
    formData.append("mobile", profile.mobile);

    // If a new profile picture is selected (base64), upload it
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    // Update user info (PATCH to /api/customer/<id>/)
    fetch(`http://127.0.0.1:8000/api/customer/${customerid}/`, {
      method: "PATCH",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        // Optionally, update UI with new data
        setEdit(false);
        // Refetch profile to update UI with backend changes (including new profile pic)
        fetch(`http://127.0.0.1:8000/api/customer/${customerid}/`)
          .then(res => res.json())
          .then(data => {
            setProfile({
              firstName: data.user?.first_name || "",
              lastName: data.user?.last_name || "",
              email: data.user?.email || "",
              profilePic: (data.profilepic && data.profilepic.length > 0) ? data.profilepic[0].image : "",
              username: data.user?.username || "",
              mobile: data.mobile || "",
            });
          });
      });
  }

  return (
    <div className="container py-5">
      <div className="row">
        <Sidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-4 text-center"><i className="fa fa-user me-2"></i>Profile</h2>
            <div className="text-center mb-3">
              <img src={profile.profilePic || "/default-profile.png"} alt="Profile" className="rounded-circle mb-2" style={{ width: 100, height: 100, objectFit: "cover" }} />
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
                <label className="form-label">Username</label>
                <input name="username" className="form-control" value={profile.username} onChange={handleChange} disabled={!edit} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" className="form-control" value={profile.email} onChange={handleChange} disabled={!edit} />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile</label>
                <input name="mobile" className="form-control" value={profile.mobile} onChange={handleChange} disabled={!edit} />
              </div>
              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  ref={fileInputRef}
                  onChange={handleImageChange}
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

