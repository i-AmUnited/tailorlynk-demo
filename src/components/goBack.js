import arrow from "../assets/icons/arrow.svg"

const Back = () => {
    const goBack = () => {
        window.history.back();
   }
    return ( 
        <div onClick={goBack} className="size-8 rounded-md bg-primary/15 flex items-center justify-center cursor-pointer">
          <img src={arrow} alt="" className="h-5 rotate-90"/>
        </div>
     );
}
 
export default Back;