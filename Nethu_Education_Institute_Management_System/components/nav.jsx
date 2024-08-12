import Link from 'next/link';

const Navbar = () => {
    return (
        <>
            <nav className='bg-blue-950 backdrop-blur-sm  start-0 fixed w-full z-20 top-0 border-b '>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <span className='text-white self-center text-2xl font-semibold whitespace-nowrap'>NEIMS</span>
                    <div className='flex md:order-2 space-x-3 md:space-x-0'>
                        <button type='button' className='text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-lg px-10 py-2 pt-2 text-center'>
                            Login
                        </button>
                    </div>
                    <div className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1' id="navbar-sticky">
                        <ul className='flex flex-col p-4 md:p-0 font-medium  rounded-lg bg-blue-950 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-blue-950 md:dark:bg-blue-950 dark:border-gray-400">'>
                            <li>
                                <Link 
                                    href='#home_section'
                                    className='block py-2 px-3 text-white md:hover:text-blue-700 md:p-0 ' aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='/'
                                    className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-blue-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                                    >
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#classes_section'
                                    className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-blue-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                                    >
                                    Classes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#teachers_section'
                                    className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-blue-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                                    >
                                    Teachers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#contact_section'
                                    className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-blue-400 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                                    >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
