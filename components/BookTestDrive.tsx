"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { CarProps } from "@types";


interface BookTestDriveProps {
  isBooking: boolean;
  closeModal: () => void;
  car: CarProps;
}

const BookTestDrive = ({ isBooking, closeModal, car }: BookTestDriveProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [toggleValue, setToggleValue] = useState("");
  const [carName, setCarName] = useState<string | undefined>(undefined);

  const handleDropdownChange = (e: any) => {
    setDropdownValue(e.target.value);
  };

  const handleToggleChange = (value: string) => {
    setToggleValue(value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Here you can handle form submission
    console.log("Form submitted:", {
      firstName,
      lastName,
      email,
      dropdownValue,
      toggleValue,
    });
  };


  return (
    <>
      <Transition appear show={isBooking} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-lg max-h-[90vh] transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
                  <button
                    type="button"
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                    onClick={closeModal}
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>

                  <div className="bg-blue-100">
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
                      <h1 className="text-3xl font-semibold mb-6 text-center">
                        BOOK A TEST RIDE!
                      </h1>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="firstName" className="block mb-2">
                            First Name:
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="lastName" className="block mb-2">
                            Last Name:
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="email" className="block mb-2">
                            Email:
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="dropdown" className="block mb-2">
                            Select Model:
                          </label>
                          <select
                            id="dropdown"
                            value={dropdownValue}
                            onChange={handleDropdownChange}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          >
                            <option value="">Select...</option>
                            <option value="BMW R 1250 GS">BMW R 1250 GS</option>
                            <option value="BMW R 1250">BMW R 1250</option>
                            <option value="BMW F 850 GS">BMW F 850 GS</option>
                            <option value="BMW F 850">BMW F 850</option>
                            <option value="BMW S1000 RR">BMW S1000 RR</option>
                            <option value="RE Super Meteor 650">
                              RE Super Meteor 650
                            </option>
                            <option value="RE Himalayan 450">
                              RE Himalayan 450
                            </option>
                            <option value="Honda Highness CB 350 RS">
                              Honda Highness CB 350 RS
                            </option>
                            <option value="Honda CB 500X">Honda CB 500X</option>
                            <option value="RE Continental GT 650">
                              RE Continental GT 650
                            </option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Timing:</label>
                          <div>
                            <button
                              className={`border rounded-lg py-2 px-3 mr-2 focus:outline-none ${
                                toggleValue === "11to12"
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => handleToggleChange("11to12")}
                            >
                              11.00 - 12.00
                            </button>
                            <button
                              className={`border rounded-lg py-2 px-3 mr-2 focus:outline-none ${
                                toggleValue === "12to1"
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => handleToggleChange("12to1")}
                            >
                              12.00 - 13.00
                            </button>
                            <button
                              className={`border rounded-lg py-2 px-3 focus:outline-none ${
                                toggleValue === "1to2"
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => handleToggleChange("1to2")}
                            >
                              13.00 - 14.00
                            </button>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookTestDrive;
