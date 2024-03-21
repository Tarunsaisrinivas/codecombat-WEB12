
import BlueLinks from "@/components/BlueLinks";
import { getSession,getSubmit, getTime, getValue } from '@/app/api/route';
import StartPage from "@/components/StartPage";
import QuizApp from "@/components/QuizApp";
import PopLogOut from "@/components/PopLogOut";
import Register from "@/components/Register";
import LoginCode from "@/components/LoginCode";
import Submit from "@/components/Submit";

const Home = async () => {
  const session = await getSession();
  const value = await getValue();
  const isSubmit = await getSubmit();
  const date = await getTime();


  if (isSubmit) {
    return (
      <div className="w-full">
        <PopLogOut />
        <Submit />
      </div>);
  } else if (session && session !== "Logged") {
    return (
      <div className="w-full">
        <PopLogOut />
        {value ? <QuizApp year={JSON.parse(session)[1]} date={date} /> : <StartPage />}
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <BlueLinks />
        {session === "Logged" ? <Register /> : <LoginCode />}
      </div>
    );
  }
};

export default Home;
