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
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
    enableReinitialize: true,
    validationSchema: Yup.object({
      old_password: Yup.string().required("Please provide your old password"),
      new_password: Yup.string().required("Please provide your password"),
      confirm_password: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
    onSubmit: async (values, {resetForm}) => {
      const { old_password, new_password, confirm_password } = values;
      let changePasswordData = { old_password, new_password, confirm_password };
      const { payload } = await dispatch(updateUserPassword(changePasswordData));
      // console.log(changePasswordData)
      if (payload.statusCode === 200) {
        // showSuccessMessage(payload.message);
        resetForm();
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
              name="old_password"
              value={changePasswordForm.values.old_password}
              onChange={changePasswordForm.handleChange}
              onBlur={changePasswordForm.handleBlur}
              onError={
                changePasswordForm.touched.old_password && changePasswordForm.errors.old_password
                  ? changePasswordForm.errors.old_password
                  : null
              }
            />
          <Input
            label="New password"
            type={"password"}
            isPassword={"true"}
            name="new_password"
            value={changePasswordForm.values.new_password}
            onChange={changePasswordForm.handleChange}
            onBlur={changePasswordForm.handleBlur}
            onError={
              changePasswordForm.touched.new_password && changePasswordForm.errors.new_password
                ? changePasswordForm.errors.new_password
                : null
            }
          />
          <Input
            label="Confirm password"
            type={"password"}
            isPassword={"true"}
            name="confirm_password"
            value={changePasswordForm.values.confirm_password}
            onChange={changePasswordForm.handleChange}
            onBlur={changePasswordForm.handleBlur}
            onError={
              changePasswordForm.touched.confirm_password && changePasswordForm.errors.confirm_password
                ? changePasswordForm.errors.confirm_password
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