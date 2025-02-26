import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, resetPasswordOTP, verifyUserEmail } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";

const ResetPassword = () => {
  const [provideEmail, setProvideEmail] = useState(true);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [createNewPassword, setCreateNewPassword] = useState(false);


  
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();

  const provideEmailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("An email is required to reset your password")
        .email("Please enter a valid email address"),
    }),
    onSubmit: async (values) => {
      const { email } = values;
      let emailData = { email_address: email };
      const { payload } = await dispatch(resetPasswordOTP(emailData));
      if (payload.statusCode === 200) {
        showSuccessMessage("OTP sent, Please check your email");
        setProvideEmail(false);
        setVerifyEmail(true);
        setCreateNewPassword(false);
        
        provideOTPForm.setFieldValue("email", email);
        resetPasswordForm.setFieldValue("email", email);
      }
    },
  });

  const provideOTPForm = useFormik({
    initialValues: {
      code: "",
      email: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Please provide your verification code"),
      email: Yup.string().email("Please enter a valid email address"),
    }),
    onSubmit: async (values) => {
      const { email, code } = values;
      let verifyData = { email_address: email, code };
      const { payload } = await dispatch(verifyUserEmail(verifyData));
      if (payload.statusCode === 200) {
        showSuccessMessage("Email verified! Reset your password");
        setProvideEmail(false);
        setVerifyEmail(false);
        setCreateNewPassword(true);
      }
    },
  });

  const resetPasswordForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter a valid email address"),
      password: Yup.string().required("Please provide your password"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      let changePasswordData = { email_address: email, password };
      const { payload } = await dispatch(changePassword(changePasswordData));
      if (payload.statusCode === 200) {
        showSuccessMessage(payload.message);
        navigate("/user-account")
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
        <div className="bg-white rounded-lg border px-5 py-14">
          {/* Provide email address */}
          {provideEmail && (
            <form onSubmit={provideEmailForm.handleSubmit}>
              <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-primary">Reset password</div>
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
                  Please make sure you provide the email address you used to
                  create your tailorlynk account. We’ll send a password reset
                  code to complete this process.
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  buttonText={"Send email"}
                  otherStyles={"bg-primary text-white"}
                  loading={loading}
                />
              </div>
            </form>
          )}

          {/* Verify email address */}
          {verifyEmail && (
            <form onSubmit={provideOTPForm.handleSubmit}>
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-primary">
                  Verify email address
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
              <Input label={"Email address:"} name={"email"} value={provideOTPForm.values.email} disabled={true}/>
              <Input
                label={"Verification code:"}
                name={"code"}
                value={provideOTPForm.values.code}
                onChange={provideOTPForm.handleChange}
                onBlur={provideOTPForm.handleBlur}
                onError={
                  provideOTPForm.touched.code &&
                  provideOTPForm.errors.code
                    ? provideOTPForm.errors.code
                    : null
                }
              />
              <div className="mt-6 flex justify-center">
                <Button
                  buttonText={"Continue"}
                  otherStyles={"bg-primary text-white"}
                  loading={loading}
                />
              </div>
            </form>
          )}

          {/* Create new password */}
          {createNewPassword && (
            <form onSubmit={resetPasswordForm.handleSubmit}>
              <div className="flex justify-between items-center mb-10">
                <div className="font-bold text-primary">
                  Create new password
                </div>
                <Link
                  to={"/sign-in"}
                  className="text-red-500 text-xs font-bold"
                >
                  Cancel
                </Link>
              </div>
              <div className="grid gap-4">
              <Input label={"Email address:"} name={"email"} value={resetPasswordForm.values.email} disabled={true}/>
                <Input
                  label={"Password:"}
                  type={"password"}
                  isPassword={"true"}
                  name={"password"}
                  value={resetPasswordForm.values.password}
                    onChange={resetPasswordForm.handleChange}
                    onBlur={resetPasswordForm.handleBlur}
                    onError={
                    resetPasswordForm.touched.password && resetPasswordForm.errors.password ? resetPasswordForm.errors.password : null}
                />
                <Input
                  label={"Confirm password:"}
                  type={"password"}
                  isPassword={"true"}
                  name={"confirmPassword"}
                  value={resetPasswordForm.values.confirmPassword}
                    onChange={resetPasswordForm.handleChange}
                    onBlur={resetPasswordForm.handleBlur}
                    onError={
                    resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword ? resetPasswordForm.errors.confirmPassword : null}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  buttonText={"Reset password"}
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

export default ResetPassword;
