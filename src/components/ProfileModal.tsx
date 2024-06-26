import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Divider,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { useProfile } from "@/context/ProfileContext";

export default function ProfileModal({ open }: { open: UseDisclosureReturn }) {
  const { isOpen, onOpenChange } = open;
  const { userProfile, blob } = useProfile();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="bottom"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                Profile
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <div className="flex gap-6 items-end">
                  <img
                    src={`/api/photo?photoId=${blob}`}
                    className="bg-white w-20 aspect-square rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <p className="text-primary-400 font-bold text-lg">
                      {userProfile.firstName +
                        " " +
                        userProfile.middleName +
                        " " +
                        userProfile.lastName}
                    </p>
                    <p>{userProfile.email}</p>
                  </div>
                </div>
                <Divider />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
