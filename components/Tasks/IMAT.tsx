import { RiArrowDownSFill } from "react-icons/ri";
import { useDropzone } from "react-dropzone";
import Firebase from "@/lib/firebase";
import { Spinner } from "../Spinner";
const firebase = new Firebase();

import { useState, useEffect } from "react";

type registeredProfessionals = {
  name: string;
  licenseNo: string;
  dateOfValidity: string;
  certDisplayed: string;
  cpdCompliant: string;
  aipoMember: string;
  scopeOfWork: string;
  workload: string;
};

type employees = {
  name: string;
  qualifications: string;
  scopeOfWork: string;
  workload: string;
};

export default function IMATVS({
  inspection_id,
  handlesubmittedIMATVS,
}: {
  inspection_id: string;
  handlesubmittedIMATVS: any;
}) {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      multiple: false,
      accept: {
        ".docx": [],
        ".doc": [],
        ".pdf": [],
      },
    });

  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const removeFile = () => {
    setFile(null);
  };

  useEffect(() => {
    if (
      acceptedFiles[0]?.name?.endsWith(".doc") ||
      acceptedFiles[0]?.name?.endsWith(".docx") ||
      acceptedFiles[0]?.name?.endsWith(".pdf")
    ) {
      setFile(acceptedFiles[0]);
    } else {
      if (acceptedFiles.length > 0) alert("Invalid file");
    }
  }, [acceptedFiles]);

  const [registeredProfessionals, setRegisteredProfessionals] = useState<
    registeredProfessionals[]
  >([
    {
      name: "",
      licenseNo: "",
      dateOfValidity: "",
      certDisplayed: "",
      cpdCompliant: "",
      aipoMember: "",
      scopeOfWork: "",
      workload: "",
    },
  ]);

  const handleRegisteredProfessionals = (
    index: number,
    key: string,
    value: any
  ) => {
    const list = [...registeredProfessionals] as any;
    list[index][key] = value;
    setRegisteredProfessionals(list);
  };

  const addRegisteredProfessional = () => {
    setRegisteredProfessionals([
      ...registeredProfessionals,
      {
        name: "",
        licenseNo: "",
        dateOfValidity: "",
        certDisplayed: "",
        cpdCompliant: "",
        aipoMember: "",
        scopeOfWork: "",
        workload: "",
      },
    ]);
  };

  const removeEmployee = (index: number) => {
    const list = [...employees] as any;
    list.splice(index, 1);
    setEmployees(list);
  };

  const removeRegisteredProfessional = (index: number) => {
    const list = [...registeredProfessionals];
    list.splice(index, 1);
    setRegisteredProfessionals(list);
  };

  const [employees, setEmployees] = useState<employees[]>([
    {
      name: "",
      qualifications: "",
      scopeOfWork: "",
      workload: "",
    },
  ]);

  const addEmployee = () => {
    setEmployees([
      ...employees,
      {
        name: "",
        qualifications: "",
        scopeOfWork: "",
        workload: "",
      },
    ]);
  };

  const handleEmployees = (index: number, key: string, value: any) => {
    const list = [...registeredProfessionals] as any;
    list[index][key] = value;
    setEmployees(list);
  };

  const onSubmit = async () => {
    if (file == null) {
      alert("Please upload a file");
      return;
    }

    setIsLoading(true);

    await firebase.uploadVS(file, inspection_id);

    await handlesubmittedIMATVS();

    setIsLoading(false);
  };

  return (
    <div className="h-full bg-white border border-[#D5D7D8] flex flex-col rounded-[10px] p-6 gap-6">
      <h1 className="font-monts font-bold text-lg text-darkerGray underline">
        Inspection Task - IMAT & Verification Statement
      </h1>
      <form className="flex flex-col gap-4  ">
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
          {registeredProfessionals.map((registeredProfessional, index) => {
            return (
              <>
                <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Name:
                    </h6>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleRegisteredProfessionals(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      value={registeredProfessional.name}
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
                      onChange={(e) =>
                        handleRegisteredProfessionals(
                          index,
                          "licenseNo",
                          e.target.value
                        )
                      }
                      value={registeredProfessional.licenseNo}
                      placeholder="License No."
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Date of Validity:
                    </h6>
                    <input
                      type="date"
                      onChange={(e) =>
                        handleRegisteredProfessionals(
                          index,
                          "dateOfValidity",
                          e.target.value
                        )
                      }
                      value={registeredProfessional.dateOfValidity}
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Cert. Displayed?
                    </h6>
                    <div className="w-full relative">
                      <select
                        onChange={(e) =>
                          handleRegisteredProfessionals(
                            index,
                            "certDisplayed",
                            e.target.value
                          )
                        }
                        value={registeredProfessional.certDisplayed}
                        className="block cursor-pointer appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                        id="certificate"
                        aria-label="certificate"
                      >
                        <option value="displayed">Displayed</option>
                        <option value="not displayed">Not Displayed</option>
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
                        onChange={(e) =>
                          handleRegisteredProfessionals(
                            index,
                            "cpdCompliant",
                            e.target.value
                          )
                        }
                        value={registeredProfessional.cpdCompliant}
                        className="block cursor-pointer appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                        id="cpd"
                        aria-label="cpd"
                      >
                        <option value="compliant">Compliant</option>
                        <option value="non-compliant">Non-compliant</option>
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
                        onChange={(e) =>
                          handleRegisteredProfessionals(
                            index,
                            "aipoMember",
                            e.target.value
                          )
                        }
                        value={registeredProfessional.aipoMember}
                        className="block cursor-pointer appearance-none w-full border bg-white border-[#D5D7D8] rounded-lg font-monts font-medium text-sm text-darkerGray h-fit p-2.5 pr-6 outline-none"
                        id="member"
                        aria-label="member"
                      >
                        <option value="member">Member</option>
                        <option value="non-member">Non-member</option>
                      </select>

                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <RiArrowDownSFill className="flex w-4 h-4 object-contain cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  {/* <div className="w-full flex flex-col space-y-4">
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
          </div> */}
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Scope of Work:
                    </h6>
                    <input
                      onChange={(e) =>
                        handleRegisteredProfessionals(
                          index,
                          "scopeOfWork",
                          e.target.value
                        )
                      }
                      type="text"
                      placeholder="Work"
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Workload:
                    </h6>
                    <input
                      type="text"
                      onChange={(e) =>
                        handleRegisteredProfessionals(
                          index,
                          "workload",
                          e.target.value
                        )
                      }
                      placeholder="Workload"
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                </div>
                {registeredProfessionals.length > 1 && (
                  <>
                    <div className="w-full flex items-center gap-2">
                      <div className="w-full h-[2px] bg-primaryBlue " />
                      <p
                        className="font-monts text-primaryBlue cursor-pointer"
                        onClick={() => removeRegisteredProfessional(index)}
                      >
                        Remove
                      </p>
                      <div className="w-full h-[2px] bg-primaryBlue" />
                    </div>
                  </>
                )}
              </>
            );
          })}
          <button
            type="button"
            onClick={() => addRegisteredProfessional()}
            className="w-full flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue hover:bg-blue-300 rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            + Add another registered and licensed professional
          </button>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Employee/Staff
          </h6>
          {employees.map((employee, index) => {
            return (
              <>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Name:
                    </h6>
                    <input
                      type="text"
                      value={employee.name}
                      onChange={(e) =>
                        handleEmployees(index, "name", e.target.value)
                      }
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Qualifications/Credentials:
                    </h6>
                    <input
                      type="text"
                      value={employee.qualifications}
                      onChange={(e) =>
                        handleEmployees(index, "qualifications", e.target.value)
                      }
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Scope of work:
                    </h6>
                    <input
                      type="text"
                      value={employee.scopeOfWork}
                      onChange={(e) =>
                        handleEmployees(index, "scopeOfWork", e.target.value)
                      }
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                  <div className="w-full flex flex-col space-y-4">
                    <h6 className="font-monts font-semibold text-sm text-darkerGray">
                      Workload:
                    </h6>
                    <input
                      type="text"
                      value={employee.workload}
                      onChange={(e) =>
                        handleEmployees(index, "workload", e.target.value)
                      }
                      className="text-darkerGray border border-[#D5D7D8] rounded-[8px] font-monts font-medium text-[14px] leading-[20px] block  p-2.5 outline-none"
                    />
                  </div>
                </div>
                {employees.length > 1 && (
                  <>
                    <div className="w-full flex items-center gap-2">
                      <div className="w-full h-[2px] bg-primaryBlue " />
                      <p
                        className="font-monts text-primaryBlue cursor-pointer"
                        onClick={() => removeEmployee(index)}
                      >
                        Remove
                      </p>
                      <div className="w-full h-[2px] bg-primaryBlue" />
                    </div>
                  </>
                )}
              </>
            );
          })}
          <button
            type="button"
            onClick={() => addEmployee()}
            className="w-full flex items-center justify-center gap-2 cursor-pointer text-gray border bg-primaryBlue hover:bg-blue-300 rounded-lg font-monts font-semibold text-sm text-white h-fit p-2.5"
          >
            + Add another employee/staff
          </button>
        </div>
        <hr className="w-full border-[#D5D7D8]"></hr>
        <div className="flex flex-col gap-4">
          <h6 className="font-monts font-semibold text-base text-darkerGray">
            Verification Statement:
          </h6>
          <div className="mb-4">
            <div
              {...getRootProps({
                className: "dropzone",
              })}
              className="w-full h-full flex flex-col justify-center items-center my-4 gap-2 px-14 py-16 border-2 border-dashed border-black/25 rounded-[10px] cursor-pointer"
            >
              <div className="py-4 border-t-black/20">
                <div className="flex flex-col items-center justify-center dropzone">
                  <input {...getInputProps()} />
                  <p className=" font-monts disable-text-selection text-sm w-full h-full text-black text-center">
                    {isDragActive ? (
                      "Drop the file here ..."
                    ) : file == undefined || file.length == 0 ? (
                      <>
                        Click or drag and drop to upload verification statement
                      </>
                    ) : (
                      `Files uploaded: ${file?.name}`
                    )}
                  </p>
                </div>
              </div>
            </div>
            {file && (
              <>
                {" "}
                {file.name}{" "}
                <button className="text-blue-900" onClick={() => removeFile()}>
                  Remove
                </button>
              </>
            )}
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
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}
