import { Link } from "react-router-dom";
import logo from "../../assets/logos/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userAccountRegistration, verifyUserEmail } from "../../hooks/local/reducer";

const CreateAccount = () => {
  const [provideEmail, setProvideEmail] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [completeSetup, setCompleteSetup] = useState(false);

  const dispatch = useDispatch();

  const provideEmailForm = useFormik({
    initialValues:{
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please provide an email address")
        .email("Please enter a valid email address"),
    }),
    onSubmit: async(values) => {
      const {email} = values; 
      let emailData = {emailAddress:email};
      const {payload} = await dispatch(userAccountRegistration(emailData));
      if(payload.statusCode === 200) {
        setProvideEmail(false);
        setVerifyEmail(true);
        setCompleteSetup(false);
        console.log("Email sent!")
      }
    }
    })

    const verifyEmailForm = useFormik({
      initialValues:{
        code: "",
        email: "",
      },
      validationSchema: Yup.object({
        code: Yup.string()
          .required("Please provide your verification code")
      }),
      onSubmit: async(values) => {
        const {email, code} = values; 
        let verificationData = {emailAddress:email, code};
        const {payload} = await dispatch(verifyUserEmail(verificationData));
        if(payload.statusCode === 200) {
          setProvideEmail(false);
          setVerifyEmail(false);
          setCompleteSetup(true);
        }
      }
      })

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full md:w-[50%] lg:w-[35%] grid gap-4">
        <div className="grid gap-2 text-center">
          <img src={logo} alt="" className="h-14 justify-self-center" />
          <p className="secondary-font text-lg font-bold text-primary">
            Tailorlynk
          </p>
        </div>
        <div className="bg-white rounded-lg border px-5 py-14">
          {/* Provide email address */}
          {provideEmail && 
          <form onSubmit={provideEmailForm.handleSubmit}>
            <div className="flex justify-between items-center mb-10">
              <div className="font-bold text-primary">Create an account</div>
              <Link
                to={"/sign-in"}
                className="underline underline-offset-2 text-brandGreen text-xs"
              >
                Sign in
              </Link>
            </div>
            <div className="grid gap-4">
              <Input
                label={"Email address:"}
                name={"email"}
                value={provideEmailForm.values.email}
                onChange={provideEmailForm.handleChange}
                onBlur={provideEmailForm.handleBlur}
                onError={
                provideEmailForm.touched.email && provideEmailForm.errors.email ? provideEmailForm.errors.email : null}
              />
              <div className="text-center text-xs text-brandGreen">
                Please make sure you are providing a valid email address. We’ll
                send an email verification code to complete your account creation.
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                buttonText={"Verify email address"}
                otherStyles={"bg-primary text-white"}
              />
            </div>
          </form>
          }

          {/* Verify email address */}
          {verifyEmail &&
          <form onSubmit={verifyEmailForm.handleSubmit}>
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-primary">Verify email address</div>
              <Link to={"/sign-in"} className="text-red-500 text-xs font-bold">
                Cancel
              </Link>
            </div>
            <p className="mb-10 text-black/60 text-[13px]">We’ve sent a verification code to your email address. Please provide the code below.</p>
              <Input label={"Email address:"} name={"email"} value={provideEmailForm.values.email} disabled={true}/>
              <Input
                label={"Verification code:"}
                name={"code"}
                  value={verifyEmailForm.values.code}
                  onChange={verifyEmailForm.handleChange}
                  onBlur={verifyEmailForm.handleBlur}
                  onError={
                  verifyEmailForm.touched.code && verifyEmailForm.errors.code ? verifyEmailForm.errors.code : null}
              />
            <div className="mt-6 flex justify-center">
              <Button
                buttonText={"Continue"}
                otherStyles={"bg-primary text-white"}
              />
            </div>
          </form>
          }

          {/* Complete setup */}
          {completeSetup &&
          <div>
          <div className="flex justify-between items-center mb-10">
              <div className="font-bold text-primary">Complete account setup</div>
              <Link to={"/sign-in"} className="text-red-500 text-xs font-bold">
                Cancel
              </Link>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label={"First name:"} />
                <Input label={"Last name:"} />
              </div>
              <Input label={"Create password:"} type={"password"} isPassword={"true"}/>
              <Input label={"Confirm password:"} type={"password"} isPassword={"true"}/>
            </div>
            <div className="mt-6 flex justify-center">
              <Button
                buttonText={"Create account"}
                otherStyles={"bg-primary text-white"}
              />
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
