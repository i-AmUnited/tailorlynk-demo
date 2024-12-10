import close from "../assets/icons/close.svg";

const Modal = ({isVisible, onClose, modalTitle, children}) => {
    if(!isVisible) return null;
    return (
      <div className="fixed inset-0 bg-black/80">
        <div className="flex items-center justify-center h-[100vh]">
          <div className="bg-white py-8 px-8 rounded-lg w-[90%] md:w-[50%] lg:w-[40%] grid max-h-[80%] overflow-y-scroll relative">
            <div className="flex justify-between items-center mb-6">
              <div className="font-bold text-[15px]">{modalTitle}</div>
              <div onClick={() => onClose()} className="size-8 rounded-md bg-primary/15 flex items-center justify-center cursor-pointer">
                <img src={close} alt="" className="h-4 rotate-90" />
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
}
 
export default Modal;