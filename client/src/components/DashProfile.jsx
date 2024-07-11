import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getStorage } from 'firebase/storage'
import { app } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import  {updateStart, updateSuccess, updateFailure} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice'


const DashProfile = () => {
    const { currentUser, error } = useSelector(state => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [showModel, setShowModel] = useState(false);


    const [formData, setFormData] = useState({});

    const filePickerRef = React.useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {

            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        setImageFileUploading(true);
        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError
                    ('An error occurred while uploading the image(File Must be less than 2mb');

                setImageFileUploadProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
                setImageFileUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({ ...formData, profilePicture: downloadURL });
                    setImageFileUploading(false);
                });
            }
        )
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('Please update at least one field');
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait while the image is being uploaded');
            return;
        }
        try {
           dispatch(updateStart()); 
           const res = await fetch(`/api/user/update/${currentUser._id}`, { 
                method: 'PUT',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
                const data = await res.json();
                if (!res.ok) {
                    dispatch(updateFailure(data.message));
                    setUpdateUserError(data.message);
                } else {
                    dispatch(updateSuccess(data));
                    setUpdateUserSuccess("Profile updated successfully");
                }
        } catch (error) {
           dispatch(updateFailure(error.message)); 
            setUpdateUserError(error.message);
        }
    }

    const handleDeleteUser = async () => {
        setShowModel(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(deleteUserFailure(data.message));
            } else {
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }

        
    };
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-2xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
                <input type="file" accept='image/*' onChange={handleImageChange}
                    ref={filePickerRef} hidden />

                <div className='relative w-32 h-32 self-center cursor-pointer shadow-md
                overflow-hidden rounded-full' onClick={() =>
                        filePickerRef.current.click()}>

                    {imageFileUploadProgress && (
                        <CircularProgressbar
                            value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(0, 128, 0, ${imageFileUploadProgress / 100})`,
                                },

                            }}
                        />
                    )}

                    <  img src={imageFileUrl || currentUser.profilePicture} alt="user"
                        className={`rounded-full w-full h-full border-8 border-[lightgray]
                            ${imageFileUploadProgress &&
                            imageFileUploadProgress < 100 &&
                            'opacity-60'
                            }`} />
                </div>
                {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}


                <TextInput type='text' id='username' placeholder='username'
                    defaultValue={currentUser.username} onChange={handleChange}/>
                <TextInput type='email' id='email' placeholder='email'
                    defaultValue={currentUser.email} onChange={handleChange}/>
                <TextInput type='password' id='password' placeholder='password'onChange={handleChange}
                />
                <Button type="submit" gradientDuoTone='PurpleToBlue'
                    className="noto-sans-button-text border border-green-500">Save</Button>
            </form>
            <div className='text-green-600 flex justify-between mt-5'>
                <span onClick={()=>setShowModel(true)} className='cursor-pointer' >Delete Account</span>
                <span className='cursor-pointer' >Log Out</span>
            </div>
            {updateUserSuccess && <Alert color='success'>{updateUserSuccess}</Alert>}
            {updateUserError && <Alert color='failure'>{updateUserError}</Alert>}

            {error && <Alert color='failure'>{error}</Alert>}

            <Modal show={showModel} onClose={()=>setShowModel(false)} 
            popup size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <h1 className='text-center text-2xl font-semibold'>Delete Account</h1>
                    <p className='text-center text-sm text-gray-500'>Are you sure you want to delete your account?</p>
                    <div className='flex justify-between mt-5'>
                        <Button color='failure' onClick={()=>setShowModel(false)}>Cancel</Button>
                        <Button onClick={handleDeleteUser} color='success'>Delete</Button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}


export default DashProfile