import Footer from "@components/footer";
// <<<<<<< announcements
import Announcements from "@components/Admin/announcements/Dashboard";
// =======
// import Dashboard from "@components/Admin/announcements/Dashboard";
// >>>>>>> main
import AdminNav from "@components/Admin/AdminNav";
const page = () => {
  return (
    <div>
      <AdminNav />
// <<<<<<< announcements
      <Announcements />
// =======
//       <Dashboard />
// >>>>>>> main
      <Footer />
    </div>
  );
};

export default page;
