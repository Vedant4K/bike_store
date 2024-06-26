"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Dialog, Transition } from "@headlessui/react";
import { CarProps } from "@types";
import { generateCarImageUrl } from "@utils";
import { CustomButton } from "@components";
import BookTestDrive from "./BookTestDrive";
import { useAuth } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CarDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  car: CarProps;
}

const CarDetails = ({ isOpen, closeModal, car }: CarDetailsProps) => {

  const [isBooking, setIsBooking] = useState(false)
  const { isSignedIn } = useAuth();

  const handleBooking = () => {
    if(!isSignedIn){
      toast.info("Please sign in to book a test ride", {
        theme: "colored",
      });
      return;
    }
    else {
      setIsBooking(true)
    }
  }
  

  return( 
  <>
    <Transition appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="relative w-full max-w-lg max-h-[95vh] transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-5">
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

                <div className="flex-1 flex flex-col gap-3">
                  <div className="relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg">
                    <Image
                      src={`/${car.imgURL}.jpeg`}
                      alt="car model"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl capitalize">
                      {car.name}
                    </h2>
                    <CustomButton
                      title="Book a test ride"
                      btnType="button"
                      containerStyles="text-white rounded-full bg-primary-blue min-w-[130px]"
                      handleClick={handleBooking}
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4">
                    {Object.entries(car).map(
                      ([key, value]) =>
                        // Exclude the 'imgURL' attribute
                        key !== "imgURL" && (
                          <div
                            className="flex justify-between gap-5 w-full text-right"
                            key={key}
                          >
                            <h4 className="text-grey capitalize">
                              {key.split("_").join(" ")}
                            </h4>
                            <p className="text-black-100 font-semibold">
                              {value}
                            </p>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    <BookTestDrive isBooking={isBooking} closeModal={() => setIsBooking(false)} car={car} />
    <ToastContainer />
  </>
)};

export default CarDetails;
