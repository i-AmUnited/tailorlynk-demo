const IconButton = ({onClick, buttonText, icon, otherStyles, padText}) => {
    return ( 
        <div>
            <div onClick={onClick} className={`${otherStyles} cursor-pointer text-xs font-medium py-5 px-6 rounded flex items-center gap-2`}> 
              <img src={icon} alt="" className="h-4"/>
              <div className={`${padText}`}>{buttonText}</div>
            </div>
        </div>
     );
}
 
export default IconButton;