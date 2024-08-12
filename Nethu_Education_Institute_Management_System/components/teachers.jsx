import Image from "next/image"
import Maths from '@public/assets/images/4 blue.png'
import Ict from '@public/assets/images/3 blue.png'
import English1 from '@public/assets/images/8 blue.png'
import Science1 from '@public/assets/images/1 blue.png'
import History from '@public/assets/images/5 blue.png'
import Science2 from '@public/assets/images/9 blue.png'
import English2 from '@public/assets/images/7 blue.png'
import Scholar from '@public/assets/images/6 blue.png'
import Commerce from '@public/assets/images/2 blue.png'


const Teachers = () => {
  return (
    <div>
      <h1 className="text-gray-800 text-center font-bold text-7xl">Our Teachers</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 max-w-[400px] md:max-w-6xl place-items-center mx-auto">
      <div className="relative group">
        <Image
          src={Maths}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="Maths Image"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">JAYANATH PRIYASHANTHA</p>
            <p className="text-center text-lg text-normal">[MATHS-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Ict}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="Ict"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">YASIRU RATHNAYAKE</p>
            <p className="text-center text-lg text-normal">[ICT-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={English1}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="English"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">H.VISHWAJITH</p>
            <p className="text-center text-lg text-normal">[ENGLISH-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Science1}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="Science"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">BRIAN DE SILVA</p>
            <p className="text-center text-lg text-normal">[SCIENCE-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Commerce}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="commerce"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">JANITH CHATHURANGA</p>
            <p className="text-center text-lg text-normal">[COMMERCE-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={History}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="history"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">ASITHA EKANAYAKE</p>
            <p className="text-center text-lg text-normal">[HISTORY-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Science2}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="science"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">SAMPATH GALLAGE</p>
            <p className="text-center text-lg text-normal">[SCIENCE-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={English2}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="english"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">SHASHIKALA SEWWANDI</p>
            <p className="text-center text-lg text-normal">[ENGLISH-PRIMARY GRADES]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Scholar}
          className="hover:scale-105 transform transition duration-500 grayscale-0 hover:grayscale"
          alt="scholarship"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="flex flex-col">
            <p className="text-center font-semibold text-2xl">BANDULA MAPA</p>
            <p className="text-center text-lg text-normal">[SCHOLARSHIP-GRADE 5]</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Teachers
