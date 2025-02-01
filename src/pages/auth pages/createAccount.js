import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  completeUserRegistration,
  userAccountRegistration,
  verifyUserEmail,
} from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";

const CreateAccount = () => {
  const [provideEmail, setProvideEmail] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [completeSetup, setCompleteSetup] = useState(false);

  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const provideEmailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please provide an email address")
        .email("Please enter  a valid email address"),
    }),
    onSubmit: async (values) => {
      const { email } = values;
      let emailData = { email_address: email };
      const { payload } = await dispatch(userAccountRegistration(emailData));
      if (payload.statusCode === 410) {
        setProvideEmail(false);
        setVerifyEmail(false);
        setCompleteSetup(true);
        completeregistrationForm.setFieldValue("email", email);
        console.log(payload.statusCode, values);
      } else if (payload.statusCode === 200) {
        setProvideEmail(false);
        setVerifyEmail(true);
        setCompleteSetup(false);
        verifyEmailForm.setFieldValue("email", email);
        completeregistrationForm.setFieldValue("email", email);
        console.log(payload.statusCode);
      }
    },
  });

  const verifyEmailForm = useFormik({
    initialValues: {
      code: "",
      email: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Please provide your verification code"),
    }),
    onSubmit: async (values) => {
      const { email, code } = values;
      let verificationData = { email_address: email, code };
      const { payload } = await dispatch(verifyUserEmail(verificationData));
      if (payload.statusCode === 200) {
        setProvideEmail(false);
        setVerifyEmail(false);
        setCompleteSetup(true);
      }
    },
  });

  const completeregistrationForm = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Please provide your full name"),
      phoneNumber: Yup.string().required("Please provide your phone number"),
      password: Yup.string().required("Please provide your password"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const { email, fullName, phoneNumber, password, confirmPassword } =
        values;
      let registrationData = {
        email_address: email,
        full_name: fullName,
        phone_number: phoneNumber,
        password,
        confirm_password: confirmPassword,
      };
      const { payload } = await dispatch(
        completeUserRegistration(registrationData)
      );
      console.log(payload, "hello");
      if (payload.statusCode === 200) {
        setProvideEmail(false);
        setVerifyEmail(false);
        setCompleteSetup(true);
        showSuccessMessage("Registration successfull");
        navigate("/sign-in");
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full md:w-[50%] lg:w-[35%] grid gap-4">
        <Link to={"/"} className="grid gap-2 text-center">
          <img src={logo} alt="" className="h-14 justify-self-center" />
          <p className="secondary-font text-lg font-bold text-primary">
            Tailorlynk
          </p>
        </Link>
        <div className="bg-white rounded-lg border px-5 py-14">
          {/* Provide email address */}
          {provideEmail && (
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
                    provideEmailForm.touched.email &&
                    provideEmailForm.errors.email
                      ? provideEmailForm.errors.email
                      : null
                  }
                />
                <div className="text-center text-xs text-brandGreen">
                  Please make sure you are providing a valid email address.
                  We’ll send an email verification code to complete your account
                  creation.
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  buttonText={"Verify email address"}
                  otherStyles={"bg-primary text-white"}
                  loading={loading}
                />
              </div>
            </form>
          )}

          {/* Verify email address */}
          {verifyEmail && (
            <form onSubmit={verifyEmailForm.handleSubmit}>
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-primary">
                  Verify email address.
                </div>
                <Link
                  to={"/sign-in"}
                  className="text-red-500 text-xs font-bold"
                >
                  Cancel
                </Link>
              </div>
              <p className="mb-10 text-black/60 text-[13px]">
                We’ve sent a verification code to your email address. Please
                provide the code below.
              </p>
              <div className="grid gap-4">
                <Input
                  label={"Email address:"}
                  name={"email"}
                  value={verifyEmailForm.values.email}
                  disabled={true}
                />
                <Input
                  label={"Verification code:"}
                  name={"code"}
                  value={verifyEmailForm.values.code}
                  onChange={verifyEmailForm.handleChange}
                  onBlur={verifyEmailForm.handleBlur}
                  onError={
                    verifyEmailForm.touched.code && verifyEmailForm.errors.code
                      ? verifyEmailForm.errors.code
                      : null
                  }
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  buttonText={"Continue"}
                  otherStyles={"bg-primary text-white"}
                  loading={loading}
                />
              </div>
            </form>
          )}

          {/* Complete setup */}
          {completeSetup && (
            <form onSubmit={completeregistrationForm.handleSubmit}>
              <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-primary">
                  Complete account setup
                </div>
                <Link
                  to={"/sign-in"}
                  className="text-red-500 text-xs font-bold"
                >
                  Cancel
                </Link>
              </div>
              <div className="grid gap-4">
                <Input
                  label={"Email address:"}
                  name={"email"}
                  value={completeregistrationForm.values.email}
                  disabled={true}
                />
                <Input
                  label={"Full name:"}
                  name={"fullName"}
                  value={completeregistrationForm.values.fullName}
                  onChange={completeregistrationForm.handleChange}
                  onBlur={completeregistrationForm.handleBlur}
                  onError={
                    completeregistrationForm.touched.fullName &&
                    completeregistrationForm.errors.fullName
                      ? completeregistrationForm.errors.fullName
                      : null
                  }
                />
                <Input
                  label={"Phone number:"}
                  name={"phoneNumber"}
                  value={completeregistrationForm.values.phoneNumber}
                  onChange={completeregistrationForm.handleChange}
                  onBlur={completeregistrationForm.handleBlur}
                  onError={
                    completeregistrationForm.touched.phoneNumber &&
                    completeregistrationForm.errors.phoneNumber
                      ? completeregistrationForm.errors.phoneNumber
                      : null
                  }
                />
                <Input
                  label={"Create password:"}
                  type={"password"}
                  isPassword={"true"}
                  name={"password"}
                  value={completeregistrationForm.values.password}
                  onChange={completeregistrationForm.handleChange}
                  onBlur={completeregistrationForm.handleBlur}
                  onError={
                    completeregistrationForm.touched.password &&
                    completeregistrationForm.errors.password
                      ? completeregistrationForm.errors.password
                      : null
                  }
                />
                <Input
                  label={"Confirm password:"}
                  type={"password"}
                  isPassword={"true"}
                  name={"confirmPassword"}
                  value={completeregistrationForm.values.confirmPassword}
                  onChange={completeregistrationForm.handleChange}
                  onBlur={completeregistrationForm.handleBlur}
                  onError={
                    completeregistrationForm.touched.confirmPassword &&
                    completeregistrationForm.errors.confirmPassword
                      ? completeregistrationForm.errors.confirmPassword
                      : null
                  }
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  buttonText={"Create account"}
                  otherStyles={"bg-primary text-white"}
                  loading={loading}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
