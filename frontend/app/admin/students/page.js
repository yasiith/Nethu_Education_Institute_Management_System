import { metadata } from "@app/page"
import AdminNav from "@components/Admin/AdminNav"
import Dashboard from "@components/Admin/students/Dashboard"
import Footer from "@components/footer"



const page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with reduced opacity */}
      <div 
        className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] bg-auto bg-center bg-fixed opacity-30 z-0"
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        <AdminNav />
        <Dashboard />
        <Footer />
      </div>
    </div>
  )
}

export default page
