import { useDispatch, useSelector } from "react-redux";
import infoIcon from "../../assets/icons/brownInfo.svg";
import Button from "../../components/button";
import Input from "../../components/input";
import { useMeasurements } from "../reuseableEffects";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { updateMeasurements } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";
import Spinner from "../../components/Spinners/pageLoadingSpinner";

const Measurements = () => {
  const loading = useSelector((state) => state.user.loading);

  const userMeasurements = useMeasurements();
  // console.log(userMeasurements)
  const [measurementsData, setMeasurementsData] = useState(null);

  const fieldsToCheck = ["armHole", "chest", "hip", "longSleeveLength", "neck", "others", "shirtLength", "shortSleeveLength", "shoulder", "thigh", "waist"];

  const isMeasurementsEmpty = fieldsToCheck.every(
  (key) => (measurementsData?.[key] || "") === ""
  );
  
  useEffect(() => {
    if (userMeasurements) {
      setMeasurementsData(userMeasurements);
    }
  }, [userMeasurements]);
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMeasurementsModalOpen, setIsMeasurementsModalOpen] = useState(false);
  
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
    if (measurementsData) {
      setInitialValues({
        chest: measurementsData?.chest || "",
        hip: measurementsData?.hip || "",
        long_sleeve_length: measurementsData?.longSleeveLength || "",
        neck: measurementsData?.neck || "",
        shirt_length: measurementsData?.shirtLength || "",
        short_sleeve_length: measurementsData?.shortSleeveLength || "",
        shoulder: measurementsData?.shoulder || "",
        thigh: measurementsData?.thigh || "",
        waist: measurementsData?.waist || "",
        arm_hole: measurementsData?.armHole || "",
        others: measurementsData?.others || "",
      });
    }
  }, [measurementsData]);

  const userMeasurementsForm = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const { chest, hip, long_sleeve_length, neck, shirt_length, short_sleeve_length, shoulder, thigh, waist, arm_hole, others } = values;
      const measurementsPayload = {
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
      const { payload } = await dispatch(updateMeasurements(measurementsPayload));
      
      if (payload.statusCode === 200) {        
        // Update local measurements data immediately
        setMeasurementsData({
          chest: chest || "",
          hip: hip || "",
          longSleeveLength: long_sleeve_length || "",
          neck: neck || "",
          shirtLength: shirt_length || "",
          shortSleeveLength: short_sleeve_length || "",
          shoulder: shoulder || "",
          thigh: thigh || "",
          waist: waist || "",
          armHole: arm_hole || "",
          others: others || "",
        });
        
        // Close modal
        setIsModalOpen(false);
        // Reset form
        userMeasurementsForm.resetForm();
      }
    },
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    userMeasurementsForm.resetForm();
  };

  const openMeasurementsModal = () => {
    setIsMeasurementsModalOpen(true);
  };

  const closeMeasurementsModal = () => {
    setIsMeasurementsModalOpen(false);
  };

  return (
    <div className="rounded-lg bg-white">
      <Spinner loading={useSelector((state) => state.user).loading} />
      <div className="px-4 py-6 border-b text-md font-bold">Measurement</div>
      {/* check if all items inside shippingAddress is empty */}
            {isMeasurementsEmpty ? (
              <div className="p-6">
                <p className="text-gray-500 mb-4">You do not have your mesurements saved yet in your tailorlynk profile.</p>
              </div>
            ) : (
              <>
      <div className="p-6">
        <div className="flex items-start gap-2 text-xs mb-6">
          <img src={infoIcon} alt="" className="h-4" />
          <span>
            For best results, measurements are displayed in centimeters{" "}
            <span
              className="text-primary underline font-medium cursor-pointer"
              onClick={openMeasurementsModal}
            >
              View measurements guide
            </span>
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="grid">
            <span className="text-xs opacity-50">Chest/Bust:</span>
            <span>{measurementsData?.chest}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Waist:</span>
            <span>{measurementsData?.waist}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Hip:</span>
            <span>{measurementsData?.hip}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Shoulder:</span>
            <span>{measurementsData?.shoulder}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Short sleeve length:</span>
            <span>{measurementsData?.shortSleeveLength}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Long sleeve length:</span>
            <span>{measurementsData?.longSleeveLength}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Thigh:</span>
            <span>{measurementsData?.thigh}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Neck:</span>
            <span>{measurementsData?.neck}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Arm-hole:</span>
            <span>{measurementsData?.armHole}</span>
          </div>
          <div className="grid">
            <span className="text-xs opacity-50">Shirt length:</span>
            <span>{measurementsData?.shirtLength}</span>
          </div>
          <div className="grid col-span-2">
            <span className="text-xs opacity-50">Others:</span>
            <span>{measurementsData?.others}</span>
          </div>
        </div>
      </div>
      </>
      )}
      {/* Update Profile Info Button */}
      <div className="px-6 pb-6">
        <Button
          buttonRole="custom"
          buttonText="Update measurements"
          otherStyles="bg-primary text-white w-fit"
          onClick={openModal}
        />
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="font-bold">Update Measurements</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>
            <form onSubmit={userMeasurementsForm.handleSubmit} className="p-6">
              <div className="flex items-center gap-2 text-xs text-primary mb-6">
                <img src={infoIcon} alt="" className="h-4" />
                <span>
                  For best results, please enter your measurements in
                  centimeters
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
                <span>
                  Enter your "Others" measurements in the following format:
                </span>
                <span className="font-bold">
                  Bust - 14, Laps - 12, Packs and Habs - 15
                </span>
                <span>Make sure to separate each measurement with a comma</span>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  buttonRole="submit"
                  buttonText="Save measurements"
                  otherStyles="bg-primary text-white"
                  loading={loading}
                />
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Measurements Modal */}
      {isMeasurementsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="font-bold">Measurements guide</h2>
              <button
                onClick={closeMeasurementsModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>
            <iframe
              src="https://docs.google.com/document/d/1yQ7La7mSKRsgjcx9J9leRKbbqd8gm9QAqca1ehylihU/preview"
              width="100%"
              className="h-[500px] rounded-md"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default Measurements;