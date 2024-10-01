import Footer from "@components/footer";
import Dashboard from "@components/Admin/announcements/Dashboard";
import AdminNav from "@components/Admin/AdminNav";
const page = () => {
  return (
    <div>
      <AdminNav />
      <Dashboard />
      <Footer />
    </div>
  );
};

export default page;
