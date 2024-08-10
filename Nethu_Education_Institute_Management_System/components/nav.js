import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <div className='w-full h-20 bg-gray-800 sticky top-0'>
                <div className='container mx-auto px-4 h-full'>
                    <div className='flex justify-between items-center h-full'>
                        <ul className='hidden md:flex gap-x-6 text-white'>
                            <li>
                                <Link href='/'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href='/'>
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href='/'>
                                    Classes
                                </Link>
                            </li>
                            <li>
                                <Link href='/'>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href='/'>
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div> 
                </div>
            </div>
        </>
    )
}

export default Navbar;
