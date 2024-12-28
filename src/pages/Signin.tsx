import Quote from "../components/Quote";
import Auth from "../components/Auth";

type Props = {};

export default function Signup({}: Props) {

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <Auth type="signin" />
      <div className="lg:w-1/2 w-full flex justify-center items-center bg-gray-100 px-6 lg:px-0 py-10 lg:py-0">
        <Quote />
      </div>
    </div>
  );
}
