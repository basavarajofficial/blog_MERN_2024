import { Button } from "flowbite-react"
import { AiFillGoogleCircle } from "react-icons/ai"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);

    const googleHandler =async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt : 'select_account'})
        try {
            const resFromGoogle = await signInWithPopup(auth, provider);
            const googleData = {
                name : resFromGoogle.user.displayName,
                email : resFromGoogle.user.email,
                googlePhotoURL : resFromGoogle.user.photoURL
            }

            const res = await fetch('/api/auth/google', {
                method : 'POST',
                headers : { "Content-Type": "application/json"},
                body: JSON.stringify(googleData),
            })

            const data = await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
        <Button type="button" onClick={googleHandler}
         gradientDuoTone="pinkToOrange" outline className="flex align-middle justify-center">
            <AiFillGoogleCircle size={22} className="mx-2" />  
            Continue with Google   
        </Button>
  )
}

export default OAuth