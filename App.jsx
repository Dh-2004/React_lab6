import { useState, useEffect, useCallback } from "react";
import DOMPurify from "dompurify";

import "./App.css";
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const sanitizeInput = (value) => DOMPurify.sanitize(value);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value.trim()),
    }));

  };
  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = {}
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!formData.email || !emailPattern.test(formData.email)) {
      newErrors.email = "Inavlid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = "Password must have atleast 6 characters,one uppercase,one lowercase,one number and a special character";
      isValid = false;
    }
    setErrors(newErrors);
    setIsFormValid(isValid);
  }, [formData])

  useEffect(() => {
    validateForm();
  }, [formData, validateForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form Submitted: ", formData);
      setShowForm(true);
    }
  };

return (
  <div className="form-container">
    <h2 className="form-title">Registration Form</h2>
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
          className={`form-input ${errors.name ? "error" : " "}`}
          placeholder="Enter your name: " />

        {errors.name && <div className="error-message">{errors.name}
        </div>}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" id="email"
          name="email"
          value={formData.email} onChange={handleChange}
          className={`form-input ${errors.email ? "error" : " "}`}
          placeholder="Enter your email: " />
        {errors.email && <div className="error-message">{errors.email}
        </div>}
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" id="password"
          name="password"
          value={formData.password} onChange={handleChange}
          className={`form-input ${errors.password ? "error" : " "}`}
          placeholder="Enter your password " minLength={6} />
        {errors.password && <div className="error-message">{errors.password}
        </div>}
      </div>
      <div className="form-group password toggle">
        <label type="checkbox" checked={showPassword}
        onChange={()=> setShowPassword(!showPassword)}>Show Password</label>
        <div className="formgroup">
          <button type="submit" className="form-submit" disabled={!isFormValid}>Submit</button>

        </div>
      </div>

    </form >
    {showForm &&(
      <div className="result">
        <h3>Name: {formData.name}</h3>
        <h3>Email: {formData.email}</h3>
        </div>


      
      
    )}

  </div >
);
};
export default Form;