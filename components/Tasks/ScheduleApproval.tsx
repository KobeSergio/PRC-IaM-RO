import React from "react";

function ScheduleApproval3() {
  return (
    <div className="h-fit lg:h-[45vh] bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-5">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Schedule Negotiation
      </h1>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-1/4 flex flex-col">
          <p className="font-monts text-sm text-darkerGray font-bold">
            Re-schedule inspection:
          </p>
          <input
            type="date"
            id="date"
            title="date"
            className="text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block w-full p-2.5 outline-none"
          />
        </div>
        <div className="w-full lg:w-3/4 h-full flex flex-col">
          <p className="font-monts text-sm text-darkerGray font-bold">
            Comment/Reason:{" "}
          </p>
          <textarea
            rows={4}
            id="text"
            title="text"
            className="text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block w-full p-2.5 outline-none"
          />
        </div>
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
          Re-negotiate schedule
        </button>
      </div>
    </div>
  );
}

function ScheduleApproval2() {
  return (
    <div className="min-h-full bg-white border border-[#D5D7D8] flex flex-col justify-between rounded-[10px] p-6">
      <div className="flex flex-col gap-5">
        <h1 className="font-monts font-bold text-lg text-darkerGray underline">
          Schedule Approval
        </h1>
        <div className="flex flex-col gap-2">
          <p className="font-monts text-sm text-darkerGray font-normal">
            You requested to schedule the inspection date to be at: {` `}
            <span className="font-bold">Thursday, 6/22/2023</span>
          </p>
          <p className="font-monts text-sm text-darkerGray font-normal">
            Please wait for the PRB to respond. Feel free to contact them for
            follow-ups.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleApproval1() {
  return (
    <div className="min-h-full bg-white border border-[#D5D7D8] flex flex-col justify-between rounded-[10px] p-6">
      <div className="flex flex-col gap-5">
        <h1 className="font-monts font-bold text-lg text-darkerGray underline">
          Schedule Approval
        </h1>
        <div className="flex flex-col gap-2">
          <p className="font-monts text-sm text-darkerGray font-normal">
            You requested to schedule the inspection date to be at: {` `}
            <span className="font-bold">Thursday, 6/22/2023</span>
          </p>
          <p className="font-monts text-sm text-darkerGray font-normal">
            Do you approve the set time and date?
          </p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-2">
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          No, I want to reschedule
        </button>
        <button
          type="button"
          className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
        >
          Yes, the set time and date works fine{" "}
        </button>
      </div>
    </div>
  );
}
