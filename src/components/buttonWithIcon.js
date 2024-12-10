const IconButton = ({onClick, buttonText, icon, otherStyles}) => {
    return ( 
        <div>
            <div onClick={onClick} className={`${otherStyles} cursor-pointer text-xs font-medium py-5 px-6 rounded flex items-center gap-4`}> 
              <img src={icon} alt="" className="h-4"/>
              {buttonText}
            </div>
        </div>
     );
}
 
export default IconButton;