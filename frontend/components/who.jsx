import Logo from '@public/assets/images/logo.png';
import Image from 'next/image';

const Who = () => {
  return (
    <div className="container max-w-4xl px-4 mx-auto">
      <h1 className="mt-20 mb-4 text-4xl font-bold leading-none tracking-tight text-center text-gray-800 md:text-7xl">
        Who we are
      </h1>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <div className="flex-shrink-0">
          <Image
            src={Logo}
            alt="Nethu Education Institute Logo"
            className="w-auto h-auto"
          />
        </div>
        <p className="mt-4 text-justify text-gray-800 md:mt-0 md:ml-4">
          Established in 2013, Nethu Education Institute has quickly become a
          trusted name in the field of education, dedicated to guiding young
          minds towards academic excellence. With a mission to empower the next
          generation to achieve their full potential, we have earned the
          confidence of both parents and students alike.
        </p>
      </div>
    </div>
  );
};

export default Who;