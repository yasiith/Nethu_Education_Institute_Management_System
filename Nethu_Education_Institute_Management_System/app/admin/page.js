import AdminNav from "@components/Admin/AdminNav";
import Dashboard from "@components/Admin/Dashboard";
import Footer from "@components/footer";
import Chatbot from "@/components/Chatbot";

const Page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with reduced opacity */}
      <div 
        className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] bg-auto bg-center bg-fixed opacity-20 z-0"
      ></div>
      {/* Content (ensures it's above the overlay) */}
      <div className="relative z-10">
        <AdminNav />
        <Dashboard />
        <Chatbot />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
