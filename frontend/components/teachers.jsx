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
      <h1 className="font-bold text-center text-gray-800 text-7xl">Our Teacher</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 max-w-[400px] md:max-w-6xl place-items-center mx-auto">
      <div className="relative group">
        <Image
          src={Maths}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="Maths Image"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">JAYANATH PRIYASHANTHA</p>
            <p className="text-lg text-center text-normal">[MATHS-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Ict}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="Ict"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">YASIRU RATHNAYAKE</p>
            <p className="text-lg text-center text-normal">[ICT-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={English1}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="English"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">H.VISHWAJITH</p>
            <p className="text-lg text-center text-normal">[ENGLISH-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Science1}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="Science"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">BRIAN DE SILVA</p>
            <p className="text-lg text-center text-normal">[SCIENCE-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Commerce}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="commerce"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">JANITH CHATHURANGA</p>
            <p className="text-lg text-center text-normal">[COMMERCE-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={History}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="history"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">ASITHA EKANAYAKE</p>
            <p className="text-lg text-center text-normal">[HISTORY-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Science2}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="science"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">SAMPATH GALLAGE</p>
            <p className="text-lg text-center text-normal">[SCIENCE-ORDINARY LEVEL]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={English2}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="english"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">SHASHIKALA SEWWANDI</p>
            <p className="text-lg text-center text-normal">[ENGLISH-PRIMARY GRADES]</p>
          </div>
        </div>
      </div>
      <div className="relative group">
        <Image
          src={Scholar}
          className="transition duration-500 transform hover:scale-105 grayscale-0 hover:grayscale"
          alt="scholarship"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white transition duration-500 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex flex-col">
            <p className="text-2xl font-semibold text-center">BANDULA MAPA</p>
            <p className="text-lg text-center text-normal">[SCHOLARSHIP-GRADE 5]</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Teachers
