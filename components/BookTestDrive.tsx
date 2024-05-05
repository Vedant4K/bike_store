"use client";

import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useSearchParams } from 'next/navigation'
import { Transition } from '@headlessui/react';

interface BookTestDriveProps {
  isBooking: boolean;
  closeModal: () => void;
  bike: string;
}

const BookTestDrive = ({ isBooking, closeModal, bike}: BookTestDriveProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [toggleValue, setToggleValue] = useState("");
  const [carName, setCarName] = useState<string | undefined>(undefined);

  console.log(bike)

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
      <div className="bg-blue-100 min-h-screen py-10">
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
                <option value="RE Super Meteor 650">RE Super Meteor 650</option>
                <option value="RE Himalayan 450">RE Himalayan 450</option>
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
      </Transition>
    </>
  );
};

export default BookTestDrive;
