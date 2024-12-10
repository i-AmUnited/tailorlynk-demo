import { useState } from "react";
import showPasswordIcon from "../assets/icons/eye.svg"
import hidePasswordIcon from "../assets/icons/eyeShut.svg"

const Input = ({label, type, placeholder, value, name, readOnly, disabled, customStyles, onChange, onBlur, onError, isPassword}) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"))
  }
  return (
    <div>
          <div className="grid gap-[2px]">
            <span className="text-xs">{label}</span>
            <div className="relative w-full">
            {isPassword === "true" ?
                <div className="absolute top-0 h-full right-0 p-1 cursor-pointer" onClick={togglePassword}>
                  <span className="aspect-square bg-white h-full flex items-center justify-center">
                  <img src={inputType === "password" ? showPasswordIcon : hidePasswordIcon} alt="Toggle Password Visibility" className="h-4" />
                  </span>
                </div> :
                null
              }
              <div><input type={inputType} readOnly={readOnly} disabled={disabled} onChange={onChange} placeholder={placeholder} value={value} name={name} onBlur={onBlur} className={`w-full px-4 py-5 md:py-4 border text-sm focus:outline focus:outline-primary rounded-md ${customStyles}`}/></div>
            </div>
          </div>
          <span className="text-red-500 text-xs">{onError}</span>
        </div> 
  );
}
 
export default Input;