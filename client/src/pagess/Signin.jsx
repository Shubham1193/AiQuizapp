import { Alert, Button, Label, TextInput, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart , signInSuccess , signInFailure  } from "../redux/user/userSlice";
// import axios from "axios";
import { useDispatch , useSelector } from "react-redux";
import OAuth from "../components/OAuth";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const {loading , error: errorMessage } = useSelector(state => state.user)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"))
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart())
      console.log(formData)
      // const res = await axios.post("http://localhost:3000/api/auth/signup" , formData)
      const res = await fetch('http://localhost:3005/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      const token = data.token;
      localStorage.setItem('access_token', token);
      if (data.success === false) {
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message))
      }
      // setLoading(false);
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(data.message))
    }
  };

  return (
    <div className='h-[80vh] flex item-center justify-center'>
      <div className='flex  item-center justify-center w-[90%] md:w-[50%] h-[50%] md:h-[80%] mt-10'>
        {/* left */}
        <div className='flex-1  flex  flex-col justify-center items-center border-4 p-6 rounded-2xl'>
          <Link to='/' className='font-bold dark:text-white text-4xl '>
            <span className='px-4 py-1  bg-gray-600  rounded-lg text-white'>
              Quizify
            </span>
            
          </Link>
          <p className='text-sm mt-10 mb-10 text-center'>
            Generate Quizes from the pdf and notes just by uploading and check your understanding and prepare for exams
          </p>
          <OAuth/>
        </div>
        {/* right */}

        {/* <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
               
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'

                onChange={handleChange}
              />
            </div>
            <Button
              bg-gray-600 
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div> */}
      </div>
    </div>
  );
}
export default Signin