import { Outlet } from "react-router-dom";

const UserAccountStructure = () => {
    return ( 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-3 bg-white border rounded-md">
              <div className="px-4 py-5 border-b font-medium text-primary">[Back to homepage]</div>
              <div className="px-4 py-5 grid gap-4">
                <div>Personal information</div>
                <div>Measurements</div>
                <div>Saved styles</div>
                <div>Message center</div>
                <div>Orders</div>
                <div>Shipping address</div>
                <div>Change password</div>
                <div>Feedback</div>
              </div>
            </div>
            <div className="lg:col-span-9">
              <Outlet />
            </div>
        </div>
     );
}
 
export default UserAccountStructure;