import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null); // Corrected to null for initial state
  const [loading, setLoading] = useState(false); // Corrected to boolean false
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill in all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success === false) {
        setErrorMessage(data.message);
      }

      if (response.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Ensure loading is set to false in finally block
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 '>
        <div className='flex-1 border border-green-500 p-4'>
          <Link to="/" className='font-semibold dark:text-white text-3xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-green-500 via-green-500 to-green-500 rounded-lg text-white noto-sans-body-text'>Write</span>Assignment
          </Link>
          <p className='text-sm mt-5 noto-sans-body-text'>
            Next step to defining your path. We can help you solve any programming assignment, semester works, class works, sign up to get started now 🥰.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Username'/>
              <TextInput type='text' placeholder='Enter your username' id='username' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Email'/>
              <TextInput type='email' placeholder='@email' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Password'/>
              <TextInput type='password' placeholder='Enter your password' id='password' onChange={handleChange}/>
            </div>
            <Button type="submit" gradientDuoTone='PurpleToBlue' className="noto-sans-button-text border border-green-500" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>loading....</span>
                </>
              ) : ('Sign Up')}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-green-500'>Sign In</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;