import Footer from "@components/footer";

import Dashboard from "@components/Admin/announcements/Dashboard";


// <<<<<<< announcements
//import Announcements from "@components/Admin/announcements/Dashboard";
// =======
// import Dashboard from "@components/Admin/announcements/Dashboard";

import AdminNav from "@components/Admin/AdminNav";
const page = () => {
  return (
    <div>
      <AdminNav />
      <Dashboard />
// <<<<<<< announcements
   //   <Announcements />
// =======
//       <Dashboard />
// >>>>>>> main
      <Footer />
    </div>
  );
};

export default page;
