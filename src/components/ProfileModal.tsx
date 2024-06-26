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
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl">
                Profile
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <div className="flex gap-6 items-end">
                  <Skeleton isLoaded={!loading} className="w-20 aspect-square rounded-full">
                    <img
                      src={
                        blob !== 0
                          ? `/api/photo?photoId=${blob}`
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXA-Uu5DzOUC3DEEh789elx46nvfe-0s-7xg&usqp=CAU"
                      }
                      className="w-20 aspect-square rounded-full object-cover object-top"
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
