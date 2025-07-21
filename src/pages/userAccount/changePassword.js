import Input from "../../components/input";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserPassword } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";


const ChangePassword = () => {
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

    const changePasswordForm = useFormik({
    initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    enableReinitialize: true,
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please provide your old password"),
      newPassword: Yup.string().required("Please provide your password"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
    }),
    onSubmit: async (values) => {
      const { oldPassword, newPassword, confirmPassword } = values;
      let changePasswordData = { oldPassword, newPassword, confirmPassword };
      const { payload } = await dispatch(updateUserPassword(changePasswordData));
      // console.log(changePasswordData)
      if (payload.statusCode === 200) {
        showSuccessMessage(payload.message);
      }
    },
  });

  return (
    <div className="rounded-lg bg-white">
      <div className="px-4 py-6 border-b text-md font-bold">Change Password</div>
      <form onSubmit={changePasswordForm.handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Old password"
              type={"password"}
              isPassword={"true"}
              name="oldPassword"
              value={changePasswordForm.values.oldPassword}
              onChange={changePasswordForm.handleChange}
              onBlur={changePasswordForm.handleBlur}
              onError={
                changePasswordForm.touched.oldPassword && changePasswordForm.errors.oldPassword
                  ? changePasswordForm.errors.oldPassword
                  : null
              }
            />
          <Input
            label="New password"
            type={"password"}
            isPassword={"true"}
            name="newPassword"
            value={changePasswordForm.values.newPassword}
            onChange={changePasswordForm.handleChange}
            onBlur={changePasswordForm.handleBlur}
            onError={
              changePasswordForm.touched.newPassword && changePasswordForm.errors.newPassword
                ? changePasswordForm.errors.newPassword
                : null
            }
          />
          <Input
            label="Confirm password"
            type={"password"}
            isPassword={"true"}
            name="confirmPassword"
            value={changePasswordForm.values.confirmPassword}
            onChange={changePasswordForm.handleChange}
            onBlur={changePasswordForm.handleBlur}
            onError={
              changePasswordForm.touched.confirmPassword && changePasswordForm.errors.confirmPassword
                ? changePasswordForm.errors.confirmPassword
                : null
            }
          />
          
        </div>
        <Button
          buttonRole="submit"
          buttonText="Update password"
          otherStyles="mt-4 bg-primary text-white"
          loading={loading}
        />
      </form>
    </div>
  );
};

export default ChangePassword;