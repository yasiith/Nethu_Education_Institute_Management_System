import Classes from "@components/classes"
import Footer from "@components/footer"
import Navbar from "@components/nav"
import Teachers from "@components/teachers"
import Who from "@components/who"


const Home = () => {
  return (
    <>
      <div>
        <section id="home_section"> 
          <Navbar />
        </section>
        <section id="about_section">
          <Who />
        </section>
        <section id="classes_section">
          <Classes />
        </section>
        <section id="teachers_section">
          <Teachers />
        </section>
        <section id="contact_section">
          <Footer/>
        </section>
        
      </div>
    </>
  );
};

export default Home;
