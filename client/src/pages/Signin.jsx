import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {  useDispatch, useSelector } from "react-redux";
import { signInStart,
  signInSuccess,
  signInFailure, } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { PageLogo } from "../components/Logo";



function Signin() {

  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [alertMessage, setAlertMessage] = useState(null);

  
  const dispatch = useDispatch();
  const { loading, error : alertMessage} = useSelector(state => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  }
  
  const submitHandler = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method: "POST",
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(formData)
      });

      const data = await res.json();
      console.log(data);
      if(data?.success === false){
        dispatch(signInFailure(data?.message))
      }
      // setLoading(false);

      if(res.ok){
          dispatch(signInSuccess(data));
          navigate('/');
        }

    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  // setTimeout(() => {
  //   if(alertMessage !== null)
  //   setAlertMessage(null);
  // },4000)

  return (
    <div className="min-w-screen min-h-screen mt-20">
    <div className="flex  p-3 max-w-2xl mx-auto justify-center align-middle gap-12 flex-col sm:flex-row md:max-w-4xl">

      <div className="flex-1">
      <Link to={"/"} className="text-4xl font-bold dark:text-white w-20 h-20">
        <PageLogo />
      </Link>
      <div className=" mt-4 sm:text-xl">
        <p>Wel come to the tech-blogs</p>
        <p>You can signup eith your email and password or with google</p>
      </div>
      </div>

      <div className="flex-1 max-w-md" >
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
      
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
      
      <Button gradientDuoTone="purpleToPink"  outline type="submit" disabled={loading}  >
        {loading ? (<>
          <Spinner size='sm' />
          <span>Loading...</span>
        </>) : "Sign in"}
      </Button>
      <OAuth />
    </form>
  
    <div className="mt-6 flex gap-2">
      <span>not registered yet?</span>
      <Link to={"/signup"}>
        <button className="font-semibold text-blue-600 underline" >Signup</button>
      </Link>
    </div>

    {(alertMessage) && (
      <Alert className="mt-5" color='failure'>
        {alertMessage}
      </Alert>
    )}

      </div>
    </div>
  </div>
  )
}

export default Signin