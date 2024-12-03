import logo from "../../assets/logos/logo.svg";
import Button from "../../components/button";
import Input from "../../components/input";

const SignIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full md:w-[50%] lg:w-[40%] grid gap-4">
        <div className="grid gap-2 text-center">
          <img src={logo} alt="" className="h-14 justify-self-center" />
          <p className="secondary-font text-lg font-bold text-primary">
            Tailorlynk
          </p>
        </div>
        <div className="bg-white rounded-lg border px-5 py-14">
          <div className="flex justify-between items-center mb-10">
            <div className="font-bold text-primary">Sign in</div>
            <div className="underline underline-offset-2 text-brandGreen">
              Create an account
            </div>
          </div>
          <div className="grid gap-4">
            <Input label={"Email address:"} />
            <div>
              <Input label={"Password:"} isPassword={"true"} />
              <div className="mt-4 text-xs font-semibold underline text-primary text-end">Forgot password</div>
            </div>
          </div>
          <div className="">
            <Button buttonText={"Sign in"} otherStyles={"bg-primary text-white"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
