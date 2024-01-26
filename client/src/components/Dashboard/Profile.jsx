import { Alert, Button, Card, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  // const { error } = useSelector((state) => state.user);

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageFileError, setImageFileError] = useState(null);
  const [formData, setFormData] = useState({});

  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadingSuccess, setFileUploadingSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);




  const filePickerRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (photo) {
      updateImage();
    }
  }, [photo]);

  const uplaodImage = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPhotoURL(URL.createObjectURL(file));
  };

  const updateImage = async () => {
    setFileUploading(true);
    setImageFileError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + photo.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
        setPhoto(null);
        setPhotoURL(null);
      },
      () => {
        setImageFileError("Error uploading image");
        setImageUploadProgress(null);
        setFileUploading(false)
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          if (downloadURL) {
            setPhotoURL(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setFileUploading(false)
      
          }
        })
    );
  };

  //* update user functionality

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    setUpdateUserError(null)
    setFileUploadingSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes were made");
      return;
    }
    if(fileUploading){
      setUpdateUserError("Please wait for image uploading")
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setFileUploadingSuccess("Your profile updated successfully")
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setFileUploadingSuccess(error.message)
    }
  };

  return (
    <div className="w-full md:w-3xl  p-3">
      <Card className=" sm:min-w-3xl mx-auto max-w-lg h-full mt-10 bg-blue-200">
        <form>
          <div className="flex flex-col items-center py-6">
            <h1 className="text-xl sm:text-3xl font-semibold pb-4">Profile</h1>
            <input
              type="file"
              accept="image/*"
              onChange={uplaodImage}
              ref={filePickerRef}
              hidden
            />

            <span
              onClick={() => filePickerRef.current.click()}
              className="flex align-middle justify-center p-2 sm:p-3 rounded-full cursor-pointer bg-blue-300 text-slate-600 font-bold relative top-10 left-10 border-4 border-[navy] z-10"
            >
              <HiPencil />
            </span>

            <div className="w-32 h-32 mb-6 overflow-hidden rounded-full shadow-lg relative">
              {imageUploadProgress && (
                <CircularProgressbar
                  value={imageUploadProgress || 0}
                  text={`${imageUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
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
                className={`w-full h-full border-8 border-[lightgray] rounded-full  object-cover ${
                  imageUploadProgress &&
                  imageUploadProgress < 100 &&
                  "filter blur-sm"
                }`}
              />
            </div>

            {imageFileError && <Alert color="failure">{imageFileError}</Alert>}


        <div className="w-full flex flex-col gap-3 mb-6">
            <div>
              <TextInput
                id="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextInput
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <TextInput
                id="password"
                type="password"
                placeholder="password***"
                onChange={handleChange}
                required
              />
            </div>
            </div>

            {/* { error && 
              <Alert color="failure">
                {error.message}
              </Alert>
            } */}

            <div className="flex flex-col sm:flex-row gap-4 ">
            <div className=" transition duration-0 hover:duration-150 ease-in-out">
              <Button
                
                className="w-56 hover:bg-green-500 outline transition duration-0 hover:duration-700 ease-in-out"
                onClick={submitHandler}
              >
                update
              </Button>
            </div>

            <div className=" cursor-pointer rounded-lg border-2 border-red-500 hover:border-red-800 px-4 py-2 text-center text-sm font-medium hover:bg-red-400 hover:text-slate-800 ">
              Delete Account
            </div>
            </div>

           { fileUploadingSuccess && 
              <Alert color="success" className="mt-5">
                {fileUploadingSuccess}
              </Alert>
            }
           { updateUserError && 
              <Alert color="warning" withBorderAccent className="mt-5">
                {updateUserError}
              </Alert>
            }

          </div>
        </form>
      </Card>
    </div>
  );
}

export default Profile;

// const SubData = async () => {

// }
