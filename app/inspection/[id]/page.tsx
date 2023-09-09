"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import CancellationRequest from "@/components/Modals/InspectionCalendar/CancellationRequest";
import IMAT from "@/components/Tasks/IMAT";
import PendingWaiting from "@/components/Tasks/PendingWaiting";
import {
  ScheduleApproval,
  PendingNegotiation,
} from "@/components/Tasks/ScheduleApproval";
import { useState, useEffect } from "react";
import { BsPencil, BsX } from "react-icons/bs";
import Firebase from "@/lib/firebase";
import { Inspection } from "@/types/Inspection";
import { Client } from "@/types/Client";
import { Log } from "@/types/Log";
import { useSession } from "next-auth/react";
import { RO } from "@/types/RO";
const firebase = new Firebase();

export default function Page({ params }: { params: { id: string } }) {
  const [showEditInspectionModal, setShowEditInspectionModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inspectionData, setInspectionData] = useState<Inspection>(
    {} as Inspection
  );

  const { data } = useSession();

  useEffect(() => {
    if (params.id) {
      firebase
        .getInspection(params.id as string)
        .then((data) => {
          if (data == null) return;
          setInspectionData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id]);

  const handleCloseCancellationRequest = () => {
    setShowCancellationModal(false);
  };

  const handleSubmitCancellationRequest = () => {
    //insert logic here
    setIsLoading(true);

    setTimeout(() => {
      setShowCancellationModal(false);
      setIsLoading(false);
    }, 2000);
  };

  const handleScheduleApproval = async (
    decision: Number,
    newDate: string,
    reason: string
  ) => {
    if (decision == 2 && (newDate == "" || reason == ""))
      return alert("Please fill out all fields.");
    if (!data) return;
    setIsLoading(true);
    const user = data.user as any;
    let inspection: Inspection = {} as Inspection;
    let log: Log = {} as Log;
    if (decision == 1) {
      //Approved
      //1.) Create log
      log = {
        log_id: "",
        timestamp: new Date().toLocaleString(),
        client_details: inspectionData.client_details as Client,
        author_details: inspectionData.ro_details,
        action: "Accomplished Scheduling",
        author_type: "",
        author_id: "",
      };

      //2.) Update inspection
      if (
        new Date(inspectionData.inspection_date).getFullYear() ==
        new Date().getFullYear()
      ) {
        //If inspection date is succeeding year, set inspection status to "Approved"
        inspection = {
          ...inspectionData,
          inspection_task: "For inspection recommendation",
        };
      } else {
        //Else, set inspection status to "For inspection recommendation"
        inspection = {
          ...inspectionData,
          status: "Approved",
          inspection_task: "For NIM",
        };
      }
    } else if (decision == 2) {
      //Negotiate
      //1.) Create log
      log = {
        log_id: "",
        timestamp: new Date().toLocaleString(),
        client_details: inspectionData.client_details as Client,
        author_details: inspectionData.ro_details,
        action:
          "Scheduled a new inspection date at " +
          newDate +
          "for the reason of: " +
          reason,
        author_type: "",
        author_id: "",
      };

      //2.) Update inspection
      inspection = {
        ...inspectionData,
        inspection_task: `Scheduling - PRB <${newDate}/${reason}>`,
      };
    }

    await firebase.createLog(log, user.ro_id);
    await firebase.updateInspection(inspection);
    setIsLoading(false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      // null check added here
      if (showEditInspectionModal) {
        body.style.overflow = "hidden"; // Disable scrolling
      } else {
        body.style.overflow = "auto"; // Enable scrolling
      }
    }
  }, [showEditInspectionModal]);

  if (Object.keys(inspectionData).length == 0) return <></>;

  const breadcrumbItems = [
    {
      name: "Home",
      route: "/dashboard",
    },
    {
      name: inspectionData.client_details.name,
    },
  ];

  const task = inspectionData.inspection_task.toLowerCase();

  return (
    <>
      <CancellationRequest
        isOpen={showCancellationModal}
        setter={handleCloseCancellationRequest}
        isLoading={isLoading}
        onSubmit={handleSubmitCancellationRequest}
      />
      <div className="min-h-[75vh] w-full flex flex-col gap-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="w-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-monts font-bold text-lg text-darkerGray">
              Inspection Details
            </h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Name
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.client_details.name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Type
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.client_details.type}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Location
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.client_details.address}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Email
              </h6>
              <p className="font-monts text-sm font-semibold text-primaryBlue hover:underline">
                {inspectionData.client_details.email}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Mode
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.inspection_mode}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Date Issued
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.createdAt}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="font-monts text-sm font-semibold text-darkGray">
                Inspection Date
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.inspection_task.includes("Scheduling")
                  ? "TBD"
                  : inspectionData.inspection_date}
              </p>
            </div>
          </div>
          {inspectionData.inspection_TO !== "" && (
            <div className="flex w-full justify-end">
              <h6 className="font-monts text-sm font-semibold text-darkerGray">
                Travel/Office Order No.:{" "}
                <span className="text-primaryBlue">#92152613734734</span>
              </h6>
            </div>
          )}
        </div>

        {/* If inspection data is scheduling and if a cancellation/rescheduling request is already ongoing, dont show the btns */}
        {task != "scheduling" &&
          task.includes("for") &&
          (task.includes("approval") ||
            inspectionData.inspection_task
              .toLowerCase()
              .includes("recommendation")) && (
            <div className="flex flex-row flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(true)}
                className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue border-primaryBlue rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
              >
                Request for rescheduling
              </button>
              <button
                type="button"
                onClick={() => setShowCancellationModal(true)}
                className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
              >
                Request for cancellation
              </button>
            </div>
          )}

        {task.includes("scheduling ") ? (
          task.includes("ro") ? (
            <ScheduleApproval
              requestedDate={inspectionData.inspection_date}
              decision={handleScheduleApproval}
              isLoading={isLoading}
            />
          ) : (
            <PendingNegotiation />
          )
        ) : task.includes("imat") ? (
          <IMAT />
        ) : (
          <PendingWaiting />
        )}
      </div>
    </>
  );
}
