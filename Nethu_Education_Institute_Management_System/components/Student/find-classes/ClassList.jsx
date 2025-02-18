import { useRouter } from 'next/navigation';

const ClassList = ({ classes }) => {
  const router = useRouter();

  const handleClassClick = (cls) => {
    router.push(`/student/class-details?subject=${cls.subject}&grade=${cls.grade}&teacher=${cls.teacher}&classid=${cls.classid}`);
  };

  return (
    <div className="mt-8">
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((cls, index) => (
            <button
              key={index}
              onClick={() => handleClassClick(cls)}
              className="p-6 bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 flex flex-col items-center"
            >
              <h2 className="text-xl font-bold text-white text-center">{cls.year}</h2>
              <h2 className="text-xl font-bold text-white text-center">{cls.subject}</h2>
              <p className="text-xl font-bold text-white text-center">Grade: {cls.grade}</p>
              <p className="text-xl font-bold text-white text-center">Teacher: {cls.teacher || 'Unknown Teacher'}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No classes found.</p>
      )}
    </div>
  );
};

export default ClassList;
