import TeacherNav from "@components/Teacher/TeacherNav";
import GradeCreateForm from "@components/Teacher/gradeCreateForm";
import Footer from "@components/footer";

const Page = () => {
  return (
    <div>
      <TeacherNav />
      <GradeCreateForm />
      <Footer />
    </div>
  );
};

export default Page;
