"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";
import { CarProps } from "@types";
import { ToastContainer, toast } from "react-toastify";
import { useUser } from "@clerk/nextjs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface BookTestDriveProps {
  isBooking: boolean;
  closeModal: () => void;
  car: CarProps;
}

const BookTestDrive = ({ isBooking, closeModal, car }: BookTestDriveProps) => {

  const { user, isLoaded } = useUser();

  if(!isLoaded){
    return <div>Loading...</div>;
  }

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [modelName, setModelName] = useState(car.name);
  const [timeSlot, setTimeSlot] = useState(0);

  const handleDateChange = (e: any) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const handleDropdownChange = (e: any) => {
    setModelName(e.target.value);
  };

  const handleToggleChange = (value: any) => {
    setTimeSlot(value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Here you can handle form submission
    if(!firstName || !lastName || !email || !date || !modelName || !timeSlot){
      toast.info("Please enter all details");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5555/bookings", {
        firstName,
        lastName,
        email,
        modelName: modelName,
        date: date,
        timeSlot: timeSlot,
      });
      console.log(response.data.message);
      if (response.data.message == "Booking successful") {
      }
      // Reset form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setModelName("");
      setDate("");
      setTimeSlot(0);
      toast.success("Your booking was successful!", {
        theme: "colored",
      });
      closeModal();
    } catch (error: any) {
      console.error("Error:", error?.response?.data.message);
      if (error?.response && error?.response?.status === 400) {
        toast.error("Slot is already booked! Please check another slot.", {
          theme: "colored",
        });
      } else {
        console.error("Error:", error);
      }
    }
  };


  return (
    <>
      <ToastContainer />
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
                    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-4">
                      <h1 className="text-3xl font-semibold mb-2 text-center">
                        Book your test ride
                      </h1>
                      <form>
                        <div className="mb-2">
                          <label htmlFor="firstName" className="block mb-2">
                            First Name:
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            value={firstName || "John"}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="lastName" className="block mb-2">
                            Last Name:
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            value={lastName || "Doe"}
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
                        <div className="mb-2">
                          <label htmlFor="dropdown" className="block mb-2">
                            Select Model:
                          </label>
                          <select
                            id="dropdown"
                            value={modelName}
                            onChange={handleDropdownChange}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          >
                            <option value="">Select...</option>
                            <option value="BMW R 1250 GSA">BMW R 1250 GSA</option>
                            <option value="BMW R 1250 GS">BMW R 1250 GS</option>
                            <option value="BMW S1000 RR">BMW S1000 RR</option>
                            <option value="RE Super Meteor 650">
                              RE Super Meteor 650
                            </option>
                            <option value="RE Himalayan 450">
                              RE Himalayan 450
                            </option>
                            <option value="BMW F 850 GSA">BMW F 850 GSA</option>
                            <option value="BMW F 850 GS">BMW F 850 GS</option>
                            <option value="RE Continental GT 650">
                              RE Continental GT 650
                            </option>
                            <option value="Honda CB 500X">Honda CB 500X</option>
                            <option value="Honda Highness CB 350">
                              Honda Highness CB 350
                            </option>
                          </select>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="date" className="block mb-2">
                            Date:
                          </label>
                          <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handleDateChange}
                            className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-400"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block mb-2">Time:</label>
                          <div>
                            <button
                              className={`border rounded-lg py-2 px-3 mr-2 focus:outline-none ${
                                timeSlot === 1
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => handleToggleChange(1)}
                              type="button"
                            >
                              11.00 - 12.00
                            </button>
                            <button
                              className={`border rounded-lg py-2 px-3 mr-2 focus:outline-none ${
                                timeSlot === 2
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => handleToggleChange(2)}
                              type="button"
                            >
                              12.00 - 13.00
                            </button>
                            <button
                              className={`border rounded-lg py-2 px-3 focus:outline-none ${
                                timeSlot === 3
                                  ? "bg-blue-500 text-white"
                                  : "bg-white"
                              }`}
                              onClick={() => handleToggleChange(3)}
                              type="button"
                            >
                              13.00 - 14.00
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            type="submit"
                            className="bg-primary-blue text-white py-2 px-4 rounded-lg focus:outline-none hover:bg-blue-600"
                            onClick={handleSubmit}
                          >
                            Submit
                          </button>
                        </div>
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
