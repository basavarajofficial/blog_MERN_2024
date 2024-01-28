import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Alert, Button, FileInput, Progress, Select, TextInput } from 'flowbite-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';

function CreatePosts() {
    const [file, setFile] = useState(null);
    const [imageProgress, setImageProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [publishError, setPublishError] = useState(null);


    const [ formData, setFormData] = useState({});

    const navigate = useNavigate();

    const uploadImageHandler = async() => {
        try {
            if(!file){
                return setImageUploadError("Please select an image");
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime()+ "-" + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError("Image upload failed ", error);
                    setImageProgress(null);
                },
                () => getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
                    setImageProgress(null);
                    setImageUploadError(null);
                    setFormData({...formData, image: downloadURL});
                } )
            )
        } catch (error) {
            setImageUploadError("Image upload failed ", error);
            setImageProgress(null);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const res = await fetch('/api/post/create', {
                method : "POST",
                headers : { "Content-Type": "application/json"},
                body : JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                setPublishError(data.message);
            }
            if(res.ok){
                setPublishError(null);
                navigate(`/post/${data?.slug}`);
            }
        } catch (error) {
            setPublishError("Something went wrong");
        }
    }
  return (
    <div className="min-h-screen p-3 mx-auto max-w-3xl ">
        <h1 className="text-center text-2xl sm:text-3xl font-bold my-7">Create a Post</h1>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput placeholder='Title' required className='caret-pink-600 flex-1' onChange={(e) => setFormData({...formData, title : e.target.value})}  />
            <Select onChange={(e) => setFormData({...formData, catagory : e.target.value})}>
                <option value="uncategorized" >Select a Catagory</option>
                <option value="javascript" >Javascript</option>
                <option value="html" >HTML</option>
                <option value="css" >CSS</option>
                <option value="react" >React</option>
                <option value="mongodb" >MongoDB</option>
                <option value="nextjs" >Next Js</option>
            </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-2 rounded-xl p-4 drop-shadow-xl'>
                <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
                <span>
                {
                imageProgress && <Progress color='purple' className='w-64' progress={imageProgress} size="xl" labelProgress /> 
                    }
                </span>
                <Button disabled={imageProgress} onClick={uploadImageHandler}  outline>
                   Upload image
                </Button>
            </div>

            {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

            {formData?.image && (
                <img src={formData?.image} alt="image" className='w-full h-72 object-cover' />
            )}
            
            
            <ReactQuill theme="snow" placeholder='write something..' 
                className='border-2 border-gray-500 h-80 pb-11 rounded-xl drop-shadow-xl' required onChange={(value) => {setFormData({...formData, content: value})}}
            />

            <Button type='submit'  >Publish</Button>
        </form>

        {publishError && (
            <Alert color='failure'>{publishError}</Alert>
        )}
    
    </div>
  )
}

export default CreatePosts