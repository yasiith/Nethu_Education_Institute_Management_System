import Logo from '@public/assets/images/logo.png'
import Image from 'next/image'

const Who = () => {
  return (
    <>
      <div className="container mx-auto max-w-4xl">
        <h1 className='mt-20 mb-4 text-7xl font-bold leading-none tracking-tight text-gray-800 text-clip text-center'>Who we are</h1>
        <div class='flex justify-center items-center'>
            <Image
              src={Logo}
              className='h-auto w-auto'
            >

            </Image>
            <p className='ml-4 text-gray-800 '>Established in 2013, Nethu Education Institute has quickly become a trusted name in the field of education, dedicated to guiding young minds towards academic excellence. With a mission to empower the next generation to achieve their full potential, we have earned the confidence of both parents and students alike.</p>
        </div>
        
      </div>
    </>
  )
}

export default Who
