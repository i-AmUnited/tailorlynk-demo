import { Link } from "react-router-dom";

const Button = ({onClick, buttonText, buttonRole, destination, icon, otherStyles, loading}) => {
    return ( 
        <div>
            { buttonRole === "link" ?
            <Link to={destination} className={`${otherStyles} text-xs font-medium py-5 px-8 rounded`}>
              {buttonText}
            </Link>
            : buttonRole === "externalLink" ?
            <a href={destination} target="_blank" rel="noreferrer" className={`${otherStyles} text-xs font-medium py-5 px-8 rounded w-fit`}>
              {buttonText}
            </a>
            : buttonRole === "custom" ?
            <div onClick={onClick} className={`${otherStyles} cursor-pointer text-xs font-medium py-5 px-8 rounded`}> 
              {buttonText}
            </div>
            :
            <button type="submit" disabled={loading} className={`${otherStyles} text-xs font-medium py-5 px-8 rounded`}> 
              {loading ? 
              <div className="flex items-end">
                loading...
                {/* add a spinner here */}
              </div>
              : 
              <div className="w-full">
                <span>{buttonText}</span>
              </div>
              }
            </button>
            }
        </div>
     );
}
 
export default Button;