import image from "../../assets/images/image 2.jpg";
import IconButton from "../../components/buttonWithIcon";
import Input from "../../components/input";
import SelectInput from "../../components/select";
import remove from "../../assets/icons/trash.svg";
import info from "../../assets/icons/info.svg";
import { Link } from "react-router-dom";

const Cart = () => {
  const serviceType = [
    { value: 'express', label: 'Express service' },
    { value: 'standard', label: 'Standard service' },
  ];
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12 gap-4">
          <div className="md:col-span-4 lg:col-span-8">
            <div className="bg-white border rounded-md overflow-hidden">
              <div className="flex items-center justify-between bg-white px-4 py-6 border-b">
                <div className="font-bold secondary-font">My cart</div>
                <Link to={"/all-products"} className="text-xs text-primary font-semibold underline underline-offset-2 cursor-pointer">
                  Continue shopping
                </Link>
              </div>
              <div className="p-4">
                <div className="grid md:flex gap-4 pb-4 border-b last:pb-0 mb-4">
                  <img src={image} alt="" className="size-24 object-cover rounded-md" />
                  <div className="w-full">
                      <div className="mb-3">
                        Traditional agbada with Kampala material
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div>Tailor:</div>
                          <div className="text-black/50">Agbada specialist</div>
                        </div>
                        <div>
                          <div>Cost:</div>
                          <div className="text-black/50">25,000 naira</div>
                        </div>
                        <div>
                          <div>Material:</div>
                          <div className="text-black/50">
                            Traditional kampala material
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input label={"Quantity:"} type={"number"} />
                          <div className="md:col-span-2">
                            <SelectInput label={"Service type"} options={serviceType} />
                          </div>
                        </div>
                        <div className="flex justify-end">
                            <IconButton buttonText={"Remove item"} padText={"pt-[2px]"} otherStyles={"bg-red-100/20 border-[1.5px] border-white hover:border-red-500 transition-all w-fit text-red-500" } icon={remove} />
                        </div>
                      </div>
                  </div>
                </div>
                <div className="mt-4 grid md:flex gap-3 items-center">
                  <img alt="" src={info} />
                  <div className="text-xs leading-5">You haven’t added a clothing material to this purchase. Your tailor will need a material to work with. <span className="text-primary underline underline-offset-2">Explore “Traditional kampala” materials</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 lg:col-span-4">
            <div className="bg-white border rounded-md overflow-hidden">
              <div className="bg-primary text-white px-4 py-6 border-b">
                <div className="font-bold secondary-font">Payment summary</div>
              </div>
              <div className="p-4 grid gap-6">
                <div className="flex justify-between">
                  <div className="text-[#c4c4c4]">Transaction code:</div>
                  <div>VC115665</div>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Tailor charge:</div>
                    <div>&#8358;25,000 </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Material:</div>
                    <div>&#8358;5,000 </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Delivery:</div>
                    <div>&#8358;2,500 </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[#c4c4c4]">Insurance:</div>
                    <div>&#8358;2,500 </div>
                  </div>
                </div>
                <div className="flex justify-between text-primary text-sm font-semibold">
                    <div>Total:</div>
                    <div>&#8358;35,000 </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default Cart;