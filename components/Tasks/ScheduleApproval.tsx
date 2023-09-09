import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";

function formatDate(dateString: string) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the name of the day of the week
  const dayName = weekdays[date.getDay()];

  // Get the year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so +1
  const day = String(date.getDate()).padStart(2, "0");

  // Return formatted date string
  return `${dayName}, ${year}/${month}/${day}`;
}

export function PendingNegotiation() {
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

export function ScheduleApproval({ requestedDate, decision, isLoading }: any) {
  const [page, setPage] = useState(1);
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  //If date is less than 40 days from today, then alert the user that the date is too soon and they need to pick another date
  useEffect(() => {
    if (date) {
      const selectedDate = new Date(date).getTime();
      const today = new Date().getTime();
      const timeDifference = selectedDate - today;
      const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      if (dayDifference < 40) {
        alert("Date is too soon. Please pick another date.");
        setDate("");
      }
    }
  }, [date]);

  if (page === 1) {
    return (
      <div className="min-h-full bg-white border border-[#D5D7D8] flex flex-col justify-between rounded-[10px] p-6">
        <div className="flex flex-col gap-5">
          <h1 className="font-monts font-bold text-lg text-darkerGray underline">
            Schedule Approval
          </h1>
          <div className="flex flex-col gap-2">
            <p className="font-monts text-sm text-darkerGray font-normal">
              PRB requested to schedule the inspection date to be on {` `}
              <span className="font-bold">{formatDate(requestedDate)}</span>
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
            onClick={() => setPage(2)}
          >
            No, I want to reschedule
          </button>
          <button
            type="button"
            onClick={() => decision(1, date, reason)}
            className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            {isLoading && (
              <>
                <Spinner /> Submitting...
              </>
            )}
            Yes, the set time and date works fine{" "}
          </button>
        </div>
      </div>
    );
  } else {
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
              placeholder="Select date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              type="date"
              id="date"
              title="date"
              className="text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block w-full p-2.5 outline-none"
            />
            <p className="font-monts text-sm text-darkerGray font-normal mt-4">
              PRB requested to schedule the inspection date to be on {` `}
              <span className="font-bold">{formatDate(requestedDate)}</span>
            </p>
          </div>
          <div className="w-full lg:w-3/4 h-full flex flex-col">
            <p className="font-monts text-sm text-darkerGray font-bold">
              Comment/Reason:{" "}
            </p>
            <textarea
              placeholder="Type your comment here..."
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              rows={4}
              id="text"
              title="text"
              className="text-[#7C7C7C] border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block w-full p-2.5 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-end gap-2">
          <button
            onClick={() => setPage(1)}
            type="button"
            className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => decision(2, date, reason)}
            className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            Re-negotiate schedule
          </button>
        </div>
      </div>
    );
  }
}
