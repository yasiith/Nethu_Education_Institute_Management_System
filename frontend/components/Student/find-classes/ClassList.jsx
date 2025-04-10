import { useRouter } from 'next/navigation';

const ClassList = ({ classes }) => {
  const router = useRouter();

  const handleClassClick = (cls) => {
    router.push(`/student/class-details?subject=${cls.subject}&grade=${cls.grade}&teacher=${cls.teacher}&classid=${cls.classid}`);
  };

  return (
    <div className="mt-8">
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classes.map((cls, index) => (
            <div
              key={index}
              onClick={() => handleClassClick(cls)}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
                <h2 className="text-xl font-bold text-white text-center">{cls.year}</h2>
              </div>
              
              {/* Card Body */}
              <div className="p-5">
                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                      Grade {cls.grade}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 text-center mb-2">{cls.subject}</h3>
                </div>
                
                <div className="flex items-center border-t border-gray-200 pt-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Teacher</p>
                    <p className="font-medium text-gray-900">{cls.teacher || 'Unknown Teacher'}</p>
                  </div>
                </div>
              </div>
              
              {/* Button/Indicator */}
              <div className="px-5 pb-4">
                <div className="flex justify-between items-center">
                  <div className="w-0 h-1 bg-gradient-to-r from-green-500 to-teal-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <p className="text-xl text-gray-600">No classes found.</p>
          <p className="text-gray-500 mt-2">Try searching with different criteria or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default ClassList;