import { Fragment, useState } from 'react';
import logo from './../assets/logo.png'
import mainImage from './../assets/main.jpg'
import { Dialog, Transition } from '@headlessui/react';

const Sidebar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
    <>
        <div className="isolate flex flex-col h-screen">
          <div onClick={() => setMobileMenuOpen(true)}>
            <span
              className="flex lg:hidden absolute text-white text-4xl top-5 right-12 cursor-pointer"
              title="open mobile menu">
              <i className="bx bx-menu bx-sm px-3 p-3 bg-blue hover:bg-indigo-600 rounded-md bg-blue opacity-50 hover:bg-blue-100"></i>
            </span>
          </div>
          <div className="hidden lg:flex flex-col w-64 bg-white flex-shrink-0 h-screen">
            <a target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="Nora" className="py-6 ml-4 w-52" />
            </a>
            {/* <div className="mt-8 ml-8">
              <div className="font-rub text-3xl font-semibold text-white text-center w-48 bg-blue h-10">Nova</div>
            </div> */}
            <div className="text-black font-semibold text-left w-64 h-10 mt-2 ml-8">
              <div className="font-rub text-25 font-semibold leading-20 tracking-wider">Истражи,</div>
              <div className="font-rub text-25 font-semibold leading-20 tracking-wider">уживај и забави се!</div>
            </div>
            <div className="flex-grow"></div>
            <img src={mainImage} alt="MainImage" className="w-auto h-auto mt-4" />
          </div>
          {/* mobile menu */}
          <Transition appear show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-x-5"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-2"
                leaveTo="opacity-0 translate-x-1">
                <Dialog.Panel className="fixed inset-0 z-20 overflow-y-auto backdrop-blur  py-1 lg:hidden">
                  <div className="flex lg:hidden flex-col  pr-5 w-64 h-screen bg-white flex-shrink-0 ">
                    <div className="flex items-center justify-between">
                      <Transition.Child
                        as={Fragment}
                        show={mobileMenuOpen.toString()}
                        enter="transition ease-out duration-500"
                        enterFrom="opacity-0 delay-3 translate-y-10"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-10">
                        <div className="flex flex-col h-screen">
                          <div className="flex flex-row h-12 w-full">
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <img src={logo} alt="LogoIcon" className="py-8 pl-6 pr-2" />
                            </a>
                          </div>
                          <div className="mt-36 pl-3">
                            <div className="font-rub text-3xl font-semibold text-center w-48 bg-blue h-10">Нова</div>
                          </div>
                          <div className="text-black font-semibold text-left w-64 h-10 pl-6">
                            <div className="font-rub text-25 font-semibold leading-20 tracking-wider">
                              Истражи,
                            </div>
                            <div className="font-rub text-25 font-semibold leading-20 tracking-wider">
                              уживај и забави се!
                            </div>
                          </div>
                          <div className="flex-grow"></div>
                          <img src={mainImage} alt="MainImage" className="w-auto h-auto mt-4 px-0 py-0" />
                        </div>
                      </Transition.Child>
  
                      <span
                        className="flex lg:hidden absolute text-white text-4xl top-5 right-12 cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                        title="close mobile menu">
                        <i className="bx bx-x bx-sm px-3 p-3 bg-blue hover:bg-blue rounded-md bg-blue opacity-50 hover:bg-blue"></i>
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </Dialog>
          </Transition>
        </div>
      </>)
}


export default Sidebar;