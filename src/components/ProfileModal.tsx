import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Skeleton,
  Divider,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { useProfile } from "@/context/ProfileContext";
import moment from "moment";

export default function ProfileModal({ open }: { open: UseDisclosureReturn }) {
  const { isOpen, onOpenChange } = open;
  const { userProfile, blob, loading } = useProfile();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="bottom"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-2xl">
            Profile
          </ModalHeader>
          <ModalBody className="flex flex-col">
            <div className="flex gap-6 items-end">
              <Skeleton
                isLoaded={!loading}
                className="w-20 aspect-square rounded-full"
              >
                <img
                  src={
                    blob !== 0
                      ? `/api/photo?photoId=${blob}`
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXA-Uu5DzOUC3DEEh789elx46nvfe-0s-7xg&usqp=CAU"
                  }
                  className="bg-white w-20 aspect-square rounded-full object-cover object-top"
                  alt=""
                />
              </Skeleton>
              <div className="flex flex-col">
                <p className="text-primary-400 font-bold text-lg">
                  {userProfile.firstName +
                    " " +
                    userProfile.middleName +
                    " " +
                    userProfile.lastName}
                </p>
                <p className="uppercase text-sm">{userProfile.sectionName}</p>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <p>Date of Birth</p>
                <p className="text-primary-400">
                  {moment(userProfile.dob).format("DD MMM, YYYY")}
                </p>
              </div>
              <div>
                <p>Mobile No.</p>
                <p className="text-primary-400">
                  {userProfile.smsMobileNumber}
                </p>
              </div>
              <div>
                <p>Admission N0.</p>
                <p className="text-primary-400">
                  {userProfile.admissionNumber}
                </p>
              </div>
              <div>
                <p>Roll No.</p>
                <p className="text-primary-400">{userProfile.rollNumber}</p>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
