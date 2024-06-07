import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { useProfile } from "@/context/ProfileContext";

export default function ExampleModal({ open }: { open: UseDisclosureReturn }) {
  const { isOpen, onOpenChange } = open;
  const { userProfile } = useProfile();

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
              <ModalHeader className="flex flex-col gap-1">Profile</ModalHeader>
              <ModalBody>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
