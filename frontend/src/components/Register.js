import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~=-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { ...errors };

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 to 15 digits.";
      valid = false;
    } else {
      newErrors.phoneNumber = "";
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must have at least one uppercase letter, one number, and one special character.";
      valid = false;
    } else {
      newErrors.password = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);

    if (valid) {
      console.log("Form submitted", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="register">
      <div className="register-card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="First Name" required name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div>
            <input type="text" placeholder="Last Name" required name="lastName" value={formData.lastName} onChange={handleChange} />
          </div>
          <div>
            <input type="tel" placeholder="Phone Number" required name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>
          <div>
            <input type="password" placeholder="Password" required name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <input type="password" placeholder="Confirm Password" required name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default Register;
