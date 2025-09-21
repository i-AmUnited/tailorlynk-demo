import React from "react";
import { useSelector } from "react-redux";

const AccountDetails = () => {

  const userSessionData = useSelector((state) => state.user.userSession)
  return <div>AccountDetails</div>;
};

export default AccountDetails;
