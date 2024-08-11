import Navbar from "@components/nav";
import Who from "@components/who";
import Login from "@components/login";

const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <Who />
        <Login />
      </div>
    </>
  );
};

export default Home;
