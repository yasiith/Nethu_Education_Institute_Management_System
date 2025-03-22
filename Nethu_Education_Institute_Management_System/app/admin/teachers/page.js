import AdminNav from "@components/Admin/AdminNav"
import Dashboard from "@components/Admin/teachers/Dashboard"
import Footer from "@components/footer"

const page = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background div with opacity */}
      <div 
        className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] bg-auto bg-center bg-fixed opacity-20 z-0"
      ></div>
      
      {/* Content container with full opacity */}
      <div className="relative z-10">
        <AdminNav />
        <Dashboard />
        <Footer />
      </div>
    </div>
  )
}

export default page
