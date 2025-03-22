import AdminNav from "@components/Admin/AdminNav"
import Register from "@components/Admin/students/Register"
import Footer from "@components/footer"

const page = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background div with opacity */}
      <div 
        className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] bg-auto bg-center bg-fixed z-0"
        style={{ opacity: 0.1 }}  // Adjust opacity here for better visibility
      ></div>
      
      {/* Content container with full opacity */}
      <div className="relative z-10">
        <AdminNav />
        <Register />
        <Footer />
      </div>
    </div>
  )
}

export default page
