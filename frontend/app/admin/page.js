import AdminNav from "@components/Admin/AdminNav";
import Dashboard from "@components/Admin/Dashboard";
import Footer from "@components/footer";
import Chatbot from "@/components/Chatbot";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Content (ensures it's above the overlay) */}
      <div className="relative z-10 flex-grow">
        <AdminNav />
        <div className="flex-grow">
          <Dashboard />
        </div>
        <Chatbot />
      </div>
      <Footer />
    </div>
  );
};

export default Page;