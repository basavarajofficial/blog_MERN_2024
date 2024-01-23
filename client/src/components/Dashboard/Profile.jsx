import { Alert, Card } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UpdateUser from './UpdateUser';

function Profile() {

  const { currentUser } = useSelector(state => state.user);

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);

  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileError, setImageFileError] = useState(null);

  const filePickerRef = useRef();

  useEffect(() => {
    if(photo){
      updateImage();
    }
  }, [photo]);

  const uplaodImage = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoURL(URL.createObjectURL(file));
  }

  const updateImage = () => {
    setImageFileError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + photo.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
        setPhoto(null);
        setPhotoURL(null);
      },
      () => {
        setImageFileError("Error uploading image");
        setImageUploadProgress(null);
      },
      () => getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setPhotoURL(downloadURL);
      })
    )
  }
  // console.log(photo, photoURL);

  return (
    <div className='w-full md:w-3xl  p-3'>
      <Card className=" sm:min-w-3xl mx-auto max-w-lg h-full mt-10 bg-blue-200">
        <form>

      <div className="flex flex-col items-center py-6">
        <h1 className='text-xl sm:text-3xl font-semibold pb-4'>Profile</h1>
        <input type="file" accept='image/*' onChange={uplaodImage} ref={filePickerRef} hidden/>

        <span 
          onClick={() => filePickerRef.current.click()}
        className='flex align-middle justify-center p-2 sm:p-3 rounded-full cursor-pointer bg-blue-300 text-slate-600 font-bold relative top-10 left-10 border-4 border-[navy] z-10'>
          <HiPencil />
        </span>

        <div className='w-32 h-32 mb-6 overflow-hidden rounded-full shadow-lg relative'>
        {imageUploadProgress && (
            <CircularProgressbar
              value={imageUploadProgress || 0}
              text={`${imageUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
        <img
          alt="Bonnie image"
          src={photoURL || currentUser.profilePicture}
          className={`w-full h-full border-8 border-[lightgray] rounded-full  object-cover ${imageUploadProgress && imageUploadProgress < 100 && 'filter blur-sm'}`}
        />
        </div>

        {imageFileError && <Alert color='failure'>{imageFileError}</Alert> }

        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{currentUser.username}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{currentUser.email}</span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          
          <UpdateUser />
          <div
            className="inline-flex cursor-pointer items-center rounded-lg border-2 dark:border-red-500 border-red-500 bg-white px-4 py-2 text-center text-sm font-medium hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Delete Account
          </div>
        </div>
      </div>
      </form>
    </Card>
    </div>
  )
}

export default Profile