import Footer from "@components/footer";
import Announcements from "@components/Admin/announcements/Dashboard";
import AdminNav from "@components/Admin/AdminNav";
const page = () => {
  return (
    <div>
      <AdminNav />
      <Announcements />
      <Footer />
    </div>
  );
};

export default page;
