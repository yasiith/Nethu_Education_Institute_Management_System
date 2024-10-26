import Classes from "@components/classes";
import Footer from "@components/footer";
import Navbar from "@components/nav";
import Teachers from "@components/teachers";
import Who from "@components/who";
import ScrollInCounter from "@components/counter";
import LandingPage from "./LandingPage/page";
import Dashboard from "@components/Teacher/Dashboard";
import Page1 from "./teachers/page";
import Page from "./teachers/gradeCreateForm/page";
import TeaTeacherNavLeft from "./teachers/insideGrade/page";

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
