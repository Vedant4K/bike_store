"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  const { name, year, model } = car;

  const [isOpen, setIsOpen] = useState(false);

  // const carRent = calculateCarRent(city_mpg, year);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {name}
        </h2>
      </div>

      <p className='flex mt-2 text-lg leading-[38px] font-bold text-gray-800'>
        {/* <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span> */}
        {car.price} onwards
        {/* <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span> */}
      </p>

      <div className='relative w-full h-40 my-3 object-contain'>
        <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' />
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible w-full justify-between text-grey font-semibold'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <Image src='/piston.svg' width={25} height={25} alt='steering wheel' />
            <p className='text-[14px] leading-[17px]'>
              {car.power}
            </p>
          </div>
          <div className="car-card__icon">
            <Image src="/power.svg" width={25} height={25} alt="seat" />
            <p className="car-card__icon-text">{car.torque}</p>
          </div>
          <div className="car-card__icon">
            <Image src="/fuel.svg" width={25} height={25} alt="seat" />
            {<p className="car-card__icon-text">{car.mileage} km/L</p> }
          </div>
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title='View More'
            containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
            textStyles='text-white text-[14px] leading-[17px] font-bold'
            rightIcon='/right-arrow.svg'
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
