import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";

const SignIn = () => {

  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInForm = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .required("Please provide an email address")
          .email("Please enter a valid email address"),
        password: Yup.string().required("Please enter a password"),
      }),
      onSubmit: async (values) => {
        const { email, password } = values;
        let signInData = { email_address: email, password };
        const { payload } = await dispatch(userSignIn(signInData));
        if (payload.statusCode === 200) {
          navigate("/user-account")
          showSuccessMessage("sign in succesfull")
        }
      },
    });
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full md:w-[50%] lg:w-[35%] grid gap-4">
        <div className="grid gap-2 text-center">
          <img src={logo} alt="" className="h-14 justify-self-center" />
          <p className="secondary-font text-lg font-bold text-primary">
            Tailorlynk
          </p>
        </div>
        <form onSubmit={signInForm.handleSubmit} className="bg-white rounded-lg border px-5 py-14">
          <div className="flex justify-between items-center mb-10">
            <div className="font-bold text-primary">Sign in</div>
            <Link to={"/sign-up"} className="underline underline-offset-2 text-brandGreen text-xs">
              Create an account
            </Link>
          </div>
          <div className="grid gap-4">
            <Input
              label={"Email address:"}
              name={"email"}
              value={signInForm.values.email}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              onError={
              signInForm.touched.email && signInForm.errors.email ? signInForm.errors.email : null}
            />
            <Input
              label={"Password:"}
              isPassword={"true"}
              type={"password"}
              name={"password"}
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              onError={
              signInForm.touched.password && signInForm.errors.password ? signInForm.errors.password : null}
            />
          </div>
          <div className="mt-6 flex justify-between items-center">
            <Button buttonText={"Sign in"} otherStyles={"bg-primary text-white"} loading={loading}/>
            <Button buttonRole={"link"} destination={"/forgot-password"} buttonText={"Forgot password"} otherStyles={"text-xs font-semibold underline text-primary text-end"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
