import { metadata } from "@app/page"
import AdminNav from "@components/Admin/AdminNav"
import Dashboard from "@components/Admin/students/Dashboard"
import Footer from "@components/footer"



const page = () => {
  return (
    <div className="relative min-h-screen">
      
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
