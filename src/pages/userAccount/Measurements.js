import { useDispatch, useSelector } from "react-redux";
import infoIcon from "../../assets/icons/brownInfo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useMeasurements } from "../reuseableEffects";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateMeasurements } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";

const Measurements = () => {
  const loading = useSelector((state) => state.user.loading);
  const userMeasurements = useMeasurements()
  
    // console.log(userMeasurements);
  
    const dispatch = useDispatch();
  
    const [initialValues, setInitialValues] = useState({
      chest: "",
      hip: "",
      long_sleeve_length: "",
      neck: "",
      shirt_length: "",
      short_sleeve_length:"",
      shoulder:"",
      thigh:"",
      waist:"",
      arm_hole:"",
      others:""
    });
  
    useEffect(() => {
      if (userMeasurements) {
        setInitialValues({
          chest: userMeasurements?.chest || "",
          hip: userMeasurements?.hip || "",
          long_sleeve_length: userMeasurements?.longSleeveLength || "",
          neck: userMeasurements?.neck || "",
          shirt_length: userMeasurements?.shirtLength || "",
          short_sleeve_length: userMeasurements?.shortSleeveLength || "",
          shoulder: userMeasurements?.shoulder || "",
          thigh: userMeasurements?.thigh || "",
          waist: userMeasurements?.waist || "",
          arm_hole: userMeasurements?.armHole || "",
          others: userMeasurements?.others || "",
        });
      }
    }, [userMeasurements]);
  
      const userMeasurementsForm = useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: async (values) => {
        const { chest, hip, long_sleeve_length, neck, shirt_length, short_sleeve_length, shoulder, thigh, waist, arm_hole, others } = values;
        const measurementsData = {
          chest: String(chest || ""),
          hip: String(hip || ""),
          long_sleeve_length: String(long_sleeve_length || ""),
          neck: String(neck || ""),
          shirt_length: String(shirt_length || ""),
          short_sleeve_length: String(short_sleeve_length || ""),
          shoulder: String(shoulder || ""),
          thigh: String(thigh || ""),
          waist: String(waist || ""),
          arm_hole: String(arm_hole || ""),
          others: String(others || ""),
        };
        const { payload } = await dispatch(updateMeasurements(measurementsData));
        // console.log(updateUserData)
        if (payload.statusCode === 200) {
          showSuccessMessage("Measurements updated");
        }
      },
    });
  return (
    <div className="rounded-lg bg-white">
      <div className="px-4 py-6 border-b text-md font-bold">Measurement</div>
      <form  onSubmit={userMeasurementsForm.handleSubmit}  className="p-6">
        <div className="flex items-center gap-2 text-xs text-primary mb-6">
          <img src={infoIcon} alt="" className="h-4" />
          <span>
            For best results, please enter your measurements in centimeters
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 mb-4">
          <Input
            label="Chest / Bust"
            type="text"
            name="chest"
            value={userMeasurementsForm.values.chest}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.chest &&
              userMeasurementsForm.errors.chest
                ? userMeasurementsForm.errors.chest
                : null
            }
          />
          <Input
            label="Waist"
            type="number"
            name="waist"
            value={userMeasurementsForm.values.waist}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.waist &&
              userMeasurementsForm.errors.waist
                ? userMeasurementsForm.errors.waist
                : null
            }
          />
          <Input
            label="Hip"
            type="number"
            name="hip"
            value={userMeasurementsForm.values.hip}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.hip &&
              userMeasurementsForm.errors.hip
                ? userMeasurementsForm.errors.hip
                : null
            }
          />
          <Input
            label="Shoulder"
            type="number"
            name="shoulder"
            value={userMeasurementsForm.values.shoulder}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.shoulder &&
              userMeasurementsForm.errors.shoulder
                ? userMeasurementsForm.errors.shoulder
                : null
            }
          />
          <Input
            label="Short sleeve length"
            type="number"
            name="short_sleeve_length"
            value={userMeasurementsForm.values.short_sleeve_length}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.short_sleeve_length &&
              userMeasurementsForm.errors.short_sleeve_length
                ? userMeasurementsForm.errors.short_sleeve_length
                : null
            }
          />
          <Input
            label="Long sleeve length"
            type="number"
            name="long_sleeve_length"
            value={userMeasurementsForm.values.long_sleeve_length}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.long_sleeve_length &&
              userMeasurementsForm.errors.long_sleeve_length
                ? userMeasurementsForm.errors.long_sleeve_length
                : null
            }
          />
          <Input
            label="Thigh"
            type="number"
            name="thigh"
            value={userMeasurementsForm.values.thigh}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.thigh &&
              userMeasurementsForm.errors.thigh
                ? userMeasurementsForm.errors.thigh
                : null
            }
          />
          <Input
            label="Neck"
            type="number"
            name="neck"
            value={userMeasurementsForm.values.neck}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.neck &&
              userMeasurementsForm.errors.neck
                ? userMeasurementsForm.errors.neck
                : null
            }
          />
          <Input
            label="Arm-hole"
            type="number"
            name="arm_hole"
            value={userMeasurementsForm.values.arm_hole}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.arm_hole &&
              userMeasurementsForm.errors.arm_hole
                ? userMeasurementsForm.errors.arm_hole
                : null
            }
          />
          <Input
            label="Shirt length"
            type="number"
            name="shirt_length"
            value={userMeasurementsForm.values.shirt_length}
            onChange={userMeasurementsForm.handleChange}
            onBlur={userMeasurementsForm.handleBlur}
            onError={
              userMeasurementsForm.touched.shirt_length &&
              userMeasurementsForm.errors.shirt_length
                ? userMeasurementsForm.errors.shirt_length
                : null
            }
          />
          <div className="md:col-span-2">
            <Input
              label="Others"
              type="text"
              name="others"
              value={userMeasurementsForm.values.others}
              onChange={userMeasurementsForm.handleChange}
              onBlur={userMeasurementsForm.handleBlur}
              onError={
                userMeasurementsForm.touched.others &&
                userMeasurementsForm.errors.others
                  ? userMeasurementsForm.errors.others
                  : null
              }
              placeholder={"Please enter other measurements ..."}
            />
          </div>
        </div>
        <div className="mt-4 bg-brandGreen/10 p-4 rounded text-xs text-brandGreen grid gap-1">
          <span>Enter your "Other" measurements in the following format:</span>
          <span className="font-bold">Bust - 14, Laps - 12, Packs and Habs - 15</span>
          <span>Make sure to separate each measurement with a comma</span>
        </div>
        <div>
          <Button
            buttonRole="submit"
            buttonText="Save measurements"
            otherStyles="mt-4 bg-primary text-white"
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
}
 
export default Measurements;