import AdminNav from "@components/Admin/AdminNav"
import Delete from "@components/Admin/students/Delete"
import Footer from "@components/footer"

const page = () => {
  return (
    <div>
      <AdminNav />
      <Delete />
      <Footer />
    </div>
  )
}

export default page
