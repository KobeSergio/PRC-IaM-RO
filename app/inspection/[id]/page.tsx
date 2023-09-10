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
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inspectionData, setInspectionData] = useState<Inspection>(
    {} as Inspection
  );

  const { data }: any = useSession();

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

  const handleSubmitCancellationRequest = async (
    reason: string,
    remarks: string
  ) => {
    //System shall allow the cancellation, if 1 is selected, must be at least seven (7) days before the day of inspection. If 2 is selected, at least one (1) month prior to the scheduled date of inspection.
    if (reason != "others") {
      const today = new Date();
      const inspectionDate = new Date(inspectionData.inspection_date);
      if (inspectionDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000)
        return alert(
          "Inspection is scheduled within the next 7 days, the system shall not allow the cancellation of inspection."
        );
    } else {
      //2.) If 1 is selected, must be at least seven (7) days before the day of inspection. If 2 is selected, at least one (1) month prior to the scheduled date of inspection.
      const today = new Date();
      const inspectionDate = new Date(inspectionData.inspection_date);
      if (inspectionDate.getTime() - today.getTime() < 30 * 24 * 60 * 60 * 1000)
        return alert(
          "For other reasons, inspection is scheduled within the next 30 days, the system shall not allow the cancellation of inspection"
        );
    }

    if (!reason || !remarks) return alert("Please fill out all fields.");
    if (
      !confirm(
        "Are you sure you want to request for cancellation? This action can't be undone."
      )
    ) {
      return;
    }

    setIsLoading(true);

    let inspection: Inspection = {} as Inspection;
    let log: Log = {} as Log;

    //1.) Create log
    log = {
      log_id: "",
      timestamp: new Date().toLocaleString(),
      client_details: inspectionData.client_details as Client,
      author_details: inspectionData.ro_details,
      action: "Requested for cancellation due to " + reason + ": " + remarks,
      author_type: "",
      author_id: "",
    };

    //2.) Update inspection
    inspection = {
      ...inspectionData,
      inspection_task: `For cancellation recommendation <${reason}/${remarks}>`,
    };

    await firebase.createLog(log, data.ro_id);
    await firebase.updateInspection(inspection);
    setInspectionData(inspection);
    setShowCancellationModal(false);
    setIsLoading(false);
  };

  const handleScheduleApproval = async (
    decision: Number,
    newDate: string,
    reason: string
  ) => {
    if (decision == 2 && (newDate == "" || reason == ""))
      return alert("Please fill out all fields.");
    console.log(data);
    if (!data.ro_id) return;
    setIsLoading(true);
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
          //If the inspection task is "Scheduling - RO <date/reason>", get the date and set it as the inspection date
          inspection_date: inspectionData.inspection_task.includes("<")
            ? inspectionData.inspection_task.split("<")[1].split("/")[0]
            : inspectionData.inspection_date,
        };
      } else {
        //Else, set inspection status to "For inspection recommendation"
        inspection = {
          ...inspectionData,
          status: "Approved",
          inspection_task: "For NIM",
          inspection_date: inspectionData.inspection_task.includes("<")
            ? inspectionData.inspection_task.split("<")[1].split("/")[0]
            : inspectionData.inspection_date,
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
          " for the reason of: " +
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

    await firebase.createLog(log, data.ro_id);
    await firebase.updateInspection(inspection);
    setInspectionData(inspection);
    setIsLoading(false);
  };

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
        setter={() => setShowCancellationModal(false)}
        isLoading={isLoading}
        onSubmit={handleSubmitCancellationRequest}
      />
      <div className="min-h-[75vh] w-full flex flex-col gap-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="w-full h-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-2">
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
                RO Assigned
              </h6>
              <p className="font-monts text-sm font-semibold text-darkerGray">
                {inspectionData.ro_details.office}
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
              .includes("recommendation")) &&
          !inspectionData.inspection_task
            .toLowerCase()
            .includes("cancellation") && (
            <div className="flex flex-row flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCancellationModal(true)}
                className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer text-gray border bg-[#973C3C] border-[#973C3C] rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
              >
                Request for cancellation
              </button>
            </div>
          )}

        {task.includes("scheduling - ro") ? (
          <ScheduleApproval
            requestedDate={
              //If the inspection task is "Scheduling - PRB <date/reason>", get the date
              inspectionData.inspection_task.includes("<")
                ? inspectionData.inspection_task.split("<")[1].split("/")[0]
                : inspectionData.inspection_date
            }
            reason={
              //If the inspection task is "Scheduling - PRB <date/reason>", get the reason
              inspectionData.inspection_task.includes("<")
                ? inspectionData.inspection_task.split("<")[1].split("/")[1]
                : ""
            }
            decision={handleScheduleApproval}
            isLoading={isLoading}
          />
        ) : task.includes("imat") ? (
          <IMAT />
        ) : (
          <PendingWaiting task={task} />
        )}
      </div>
    </>
  );
}
