import { Link } from "react-router-dom";

const Button = ({onClick, buttonText, buttonRole, destination, icon, otherStyles, loading}) => {
    return ( 
        <div>
            { buttonRole === "link" ?
            <Link to={destination} className={`${otherStyles} text-xs py-5 md:py-4 px-8 rounded truncate`}>
              {buttonText}
            </Link>
            : buttonRole === "externalLink" ?
            <a href={destination} target="_blank" rel="noreferrer" className={`${otherStyles} text-xs py-5 md:py-4 px-8 rounded w-fit truncate`}>
              {buttonText}
            </a>
            : buttonRole === "custom" ?
            <div onClick={onClick} className={`${otherStyles} cursor-pointer text-xs py-5 md:py-4 px-8 rounded truncate`}> 
              {buttonText}
            </div>
            :
            <button type="submit" disabled={loading} className={`${otherStyles} text-xs py-5 md:py-4 px-8 rounded truncate`}> 
              {loading ? 
              <div className="flex items-end">
                loading...
                {/* add a spinner here */}
              </div>
              : 
              <div className="w-full truncate">
                {buttonText}
              </div>
              }
            </button>
            }
        </div>
     );
}
 
export default Button;