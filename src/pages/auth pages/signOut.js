import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signOut } from "../../hooks/local/reducer";

const SignOut = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state)=>state.user.isAuthenticated);
    useEffect(()=>{
        dispatch(signOut());
        window.location.reload();
    },[dispatch]);

    if (!isAuthenticated) {
        return (
            <>
              <Navigate to={'/'} />
            </>
        );
    }
}

export default SignOut;