import LandingPage from "./LandingPage/page";


import Dashboard from "@components/Teacher/Dashboard";
import Page1 from "./teachers/page";
import Page from "./teachers/gradeCreateForm/page";
import TeaTeacherNavLeft from "./teachers/insideGrade_/page";
import Calendar from "@components/Teacher/Calander";
import InsideGrade_ from "./teachers/insideGrade_/page";


export const metadata = {
  title: "NEIMS",
  description: "Learn at Ease"
};

const Home = () => {
  return (
    <>
      <div>
        <LandingPage />
      </div>
    </>
  );
};

export default Home;
