import AdminNav from "@components/Admin/AdminNav"
import Delete from "@components/Admin/students/Delete"
import Footer from "@components/footer"

const page = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background with reduced opacity */}
      <div 
        className="absolute inset-0 bg-[url('/assets/images/pattern.svg')] bg-auto bg-center bg-fixed z-0"
        style={{ opacity: 0.15 }} // Reduced opacity on the background
      ></div>
      
      {/* Content */}
      <div className="relative z-10">
        <AdminNav />
        <Delete />
        <Footer />
      </div>
    </div>
  )
}

export default page
