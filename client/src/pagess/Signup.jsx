import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData)
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill out all fields.');
      setTimeout(() => {
        // Check if still on the same URL (Signup page) to avoid infinite loops
        if (location.pathname === '/sign-up') {
           // Clear form data
          setErrorMessage(null); // Clear error message
          setLoading(false); // Reset loading state
        }
      }, 2000); // 1 second delay
      return
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log(formData)
      // const res = await axios.post("http://localhost:3000/api/auth/signup" , formData)
      const res = await fetch('http://localhost:3005/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setErrorMessage(data.message);
        // Schedule automatic reload after 1 second
        setTimeout(() => {
          // Check if still on the same URL (Signup page) to avoid infinite loops
          if (location.pathname === '/sign-up') {
            setFormData({}); // Clear form data
            setErrorMessage(null); // Clear error message
            setLoading(false); // Reset loading state
          }
        }, 2000); // 1 second delay
        return;
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
      setTimeout(() => {
        // Check if still on the same URL (Signup page) to avoid infinite loops
        
          setFormData({}); // Clear form data
          setErrorMessage(null); // Clear error message
          setLoading(false); // Reset loading state
        
      }, 2000); // 1 second delay
    }
  };



  return (
    <div className="min-h-screen mt-10">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" font-bold dark:text-white text-4xl">
          <span className='px-2 py-1 bg-gray-600 rounded-lg text-white'>
          Quizify  
            </span>
           
          </Link>
          <p className='text-sm mt-5'>
            Generate Quizes from the pdf and notes just by uploading and check your understanding and prepare for exams
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <Button
              bg-gray-600
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  {" "}
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 mt-5">
            <span>Have an account ?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
