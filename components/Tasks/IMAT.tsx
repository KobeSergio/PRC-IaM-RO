import React, { useState } from "react";
import {Spinner} from "../Spinner";
import { RiArrowDownSFill } from "react-icons/ri";

export default function IMAT() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitIMWPR = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="h-full lg:h-[45vh] bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-6">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Inspection Task - IMAT & Verification Statement
      </h1>
      <form className="flex flex-col gap-4 overflow-y-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="w-full lg:w-3/5 flex flex-col space-y-4">
            <h6 className="font-monts font-semibold text-sm text-darkerGray">
              Name of the Authorized Representative:
            </h6>
            <input
              type="text"
              id=""
              title="text"
              placeholder="John Doe"
              className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
            />
          </div>
          <div className="w-full lg:w-2/5 flex flex-col space-y-4">
            <h6 className="font-monts font-semibold text-sm text-darkerGray">
              Position:
            </h6>
            <input
              type="text"
              id=""
              title="text"
              placeholder="John Doe"
              className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
            />
          </div>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Registered and Licensed Professionals
          </h6>
          <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Name:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder="John Doe"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                License No:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder="John Doe"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Date of Validity:
              </h6>
              <input
                type="date"
                id=""
                title="text"
                placeholder="John Doe"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Cert. Displayed?
              </h6>
              <div className="w-full relative">
                <select
                  className="block cursor-pointer appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                  id="certificate"
                  aria-label="certificate"
                >
                  <option value="others">Displayed</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                CPD Compliant?
              </h6>
              <div className="w-full relative">
                <select
                  className="block cursor-pointer appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                  id="cpd"
                  aria-label="cpd"
                >
                  <option value="others">Displayed</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                AIPO/APO Member?
              </h6>
              <div className="w-full relative">
                <select
                  className="block cursor-pointer appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                  id="member"
                  aria-label="member"
                >
                  <option value="others">Displayed</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Other requirements:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder="Optional"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Scope of Work:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder="John Doe"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Workload:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder="John Doe"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#C1C1C1] border-[#C1C1C1] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            + Add another registered and licensed professional
          </button>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Employee/Staff
          </h6>
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Name:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder="John Doe"
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Qualifications/Credentials:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder=""
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Scope of work:
              </h6>
              <input
                type="date"
                id=""
                title="text"
                placeholder=""
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
            <div className="w-full flex flex-col space-y-4">
              <h6 className="font-monts font-semibold text-sm text-darkerGray">
                Workload:
              </h6>
              <input
                type="text"
                id=""
                title="text"
                placeholder=""
                className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
              />
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#C1C1C1] border-[#C1C1C1] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            + Add another employee/staff
          </button>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Verification Statement:
          </h6>
          <label
            htmlFor="dropzone-file"
            className="w-full h-full flex flex-col justify-center items-center gap-2 px-14 py-6 border-2 border-dashed border-black/25 rounded-[10px] cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="font-monts font-semibold text-sm text-center text-darkerGray">
                Click to upload verification statement here.
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <div className="flex flex-row flex-wrap justify-end gap-2">
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Cancel
        </button>
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Proceed
        </button>
      </div>
      </form>
    </div>
  );
}
