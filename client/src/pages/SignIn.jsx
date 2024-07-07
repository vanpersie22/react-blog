import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';


const SignIn = () => {
 
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage } = useSelector (state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('please fill out all the fields'));
    }
    try {
      dispatch(signInStart());
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (response.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    } finally {
      setLoading(false); 
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
            Next step to defining your path. Login with your registered email and password only!.
          </p>
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Email'/>
              <TextInput type='email' placeholder='@email' id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Password'/>
              <TextInput type='password' placeholder='*********' id='password' onChange={handleChange}/>
            </div>
            <Button type="submit" gradientDuoTone='PurpleToBlue' className="noto-sans-button-text border border-green-500" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>loading....</span>
                </>
              ) : ('Sign In')}
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>D'ont have an account?</span>
            <Link to='/sign-up' className='text-green-500'>Sign Up</Link>
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

export default SignIn;