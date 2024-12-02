const Button = ({otherStyles, buttonText}) => {
    return ( 
        <div>
          <button className={`${otherStyles} text-xs font-medium py-5 px-8 rounded-md`}>
             {buttonText}
          </button>
        </div>
     );
}
 
export default Button;