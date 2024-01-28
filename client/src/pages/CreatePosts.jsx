import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function CreatePosts() {
  return (
    <div className="min-h-screen p-3 mx-auto max-w-3xl ">
        <h1 className="text-center text-2xl sm:text-3xl font-bold my-7">Create a Post</h1>
        <form className="flex flex-col gap-4">
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput placeholder='Title' required className='caret-pink-600 flex-1'  />
            <Select>
                <option value="uncategorized" >Select a Catagory</option>
                <option value="javascript" >Javascript</option>
                <option value="html" >HTML</option>
                <option value="css" >CSS</option>
                <option value="react" >React</option>
                <option value="mongodb" >MongoDB</option>
                <option value="nextjs" >Next Js</option>
            </Select>
            </div>
            <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-4'>
                <FileInput type='file' accept='image/*' />
                <Button size='sm' outline>Upload Image</Button>
            </div>
            <ReactQuill theme="snow" placeholder='write something..' 
                className='h-80 mb-4' required
            />;

            <Button type='submit' color='none' className='bg-[navy] text-white dark:text-slate-200 hover:bg-slate-200 hover:text-slate-800 dark:hover:text-slate-800' >Publish</Button>
        </form>
    
    </div>
  )
}

export default CreatePosts