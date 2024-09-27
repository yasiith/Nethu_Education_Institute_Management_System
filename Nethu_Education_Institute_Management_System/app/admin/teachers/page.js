import AdminNav from "@components/Admin/AdminNav"
import Dashboard from "@components/Admin/teachers/Dashboard"
import Footer from "@components/footer"

const page = () => {
  return (
    <div>
      <AdminNav />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default page
