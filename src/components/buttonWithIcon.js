const IconButton = ({onClick, buttonText, icon, otherStyles, padText, btnSize}) => {
    return (
      <div>
        <div
          onClick={onClick}
          className={`${otherStyles} cursor-pointer font-medium text-xs py-5 md:py-4 px-6 rounded flex items-center gap-2 truncate`}
        >
          <img src={icon} alt="" className="h-4" />
          <div className={`${padText} truncate`}>{buttonText}</div>
        </div>
      </div>
    );
}
 
export default IconButton;