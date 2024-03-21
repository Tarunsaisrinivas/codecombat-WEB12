import Image from 'next/image'

import logo from '@/app/logo.png'
import nipuna from '@/app/nipuna.png'
import bracket from '@/app/bracket.png'

const NavBar = () => {

  return (
    <>
<nav className="bg-[#173358] text-white border-gray-200 p-4 fixed w-full top-0 z-50">
    <div className="container mx-auto">
        <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo} alt="alt" width={50} height={50} />
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">I S T E</span>
    </div>
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
    <Image src={bracket} alt="alt" width={50} height={50} />
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CODE COMBAT</span>
    </div>
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
    <Image src={nipuna} alt="alt" width={50} height={50} />
    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NIPUNA</span>
    </div>
        </div>
    </div>
</nav>
  </>
  )
}

export default NavBar