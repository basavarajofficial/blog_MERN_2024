import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { Suspense, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value.trim()});
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAlertMessage(null)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers : { 'Content-Type': 'application/json'},
        body : JSON.stringify(formData)
      });

      const data = await res.json();
        setAlertMessage(data);
        setLoading(false);
        if(res.ok){
          navigate('/signin')
        }
      
    } catch (error) {
      setAlertMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-20">
    <div className="flex flex-wrap p-3 max-w-2xl mx-auto justify-center gap-12 flex-col sm:flex-row md:max-w-4xl">

      <div className="flex-1">
      <Link to={"/"} className="text-4xl font-bold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-[rgba(0,152,43,1)] via-[rgb(32,12,43)] to-[rgba(0,212,255,1)] rounded-xl text-white">
          TECH
        </span>
        Blogs
      </Link>
      <div className="mt-4">
        <p>Wel come to the tech-blogs</p>
        <p>You can signup eith your email and password or with google</p>
      </div>
      </div>

      <div className="flex-1 max-w-md" >
        <Suspense fallback={<Loading />}>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Your Username" />
        </div>
        <TextInput id="username" type="text" placeholder="username" onChange={handleChange}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput id="email" type="email" placeholder="example@gmail.com" onChange={handleChange}/>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
        </div>
        <TextInput id="password" type="password" onChange={handleChange}/>
      </div>
      
      <Button gradientDuoTone="purpleToPink"  outline type="submit" disabled={loading} >
        {loading ? (<>
          <Spinner size='sm' />
          <span>Loading...</span>
        </>) : "Sign up"}
      </Button>
    </form>
    </Suspense>
    <div className="mt-6 flex gap-2">
      <span>Already a user?</span>
      <Link to={"/signin"}>
        <button className="font-semibold text-blue-600 underline" >Sign in</button>
      </Link>
    </div>

    {(alertMessage) && (
      <Alert className="mt-5" color={(alertMessage.statusCode !==200) ? 'failure' : 'success' }>
        {alertMessage?.message}
      </Alert>
    )}

      </div>
    </div>
  </div>
  )
}

export default SignUp


function Loading() {
  return <h2>🌀 Loading...</h2>;
}