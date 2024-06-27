"use client";

import React, { FormEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import { useProfile } from "@/context/ProfileContext";
import { CutEye } from "./CutEye";
import { Eye } from "./Eye";

interface Props {
  open: UseDisclosureReturn;
}

export default function PasswordModal(prop: Props) {
  const { isOpen, onOpenChange } = prop.open;
  const [oldp, setOldp] = useState("");
  const [newp, setNewp] = useState("");
  const [confirmp, setConfirmp] = useState("");
  const [error, setError] = useState(false);
  const [visibility, setVisibility] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const { changePassword, loading } = useProfile();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newp.length < 7) {
      setError(true);
      return;
    }
    await changePassword(oldp, newp, confirmp);
    setNewp("");
    setOldp("");
    setConfirmp("");
    onOpenChange();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setError(false);
          setNewp("");
          setOldp("");
          setConfirmp("");
        }}
        backdrop="blur"
        className="pb-2"
        placement="bottom"
      >
        <ModalContent>
          <ModalHeader className="font-bold text-xl">
            Change Password
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                isRequired
                onChange={(e) => setOldp(e.target.value)}
                label="Old Password"
                labelPlacement="outside"
                placeholder="Enter old password"
                type={visibility.old ? "text" : "password"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() =>
                      setVisibility((prev) => ({ ...prev, old: !prev.old }))
                    }
                  >
                    {visibility.old ? <CutEye /> : <Eye />}
                  </button>
                }
              />
              <Input
                isRequired
                onChange={(e) => {
                  setNewp(e.target.value);
                  setError(false);
                }}
                label="New Password"
                labelPlacement="outside"
                placeholder="Enter new password"
                type={visibility.new ? "text" : "password"}
                isInvalid={(oldp === newp && newp.length > 0) || error}
                errorMessage={
                  error
                    ? "Password length should be at least 7"
                    : "New password cannot be same as old password"
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() =>
                      setVisibility((prev) => ({ ...prev, new: !prev.new }))
                    }
                  >
                    {visibility.new ? <CutEye /> : <Eye />}
                  </button>
                }
              />
              <Input
                isRequired
                onChange={(e) => setConfirmp(e.target.value)}
                label="Confirm New Password"
                labelPlacement="outside"
                placeholder="Confirm new password"
                type={visibility.confirm ? "text" : "password"}
                isInvalid={newp !== confirmp && confirmp.length > 0}
                errorMessage="Confirm password is not same as new password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() =>
                      setVisibility((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                  >
                    {visibility.confirm ? <CutEye /> : <Eye />}
                  </button>
                }
              />
              <Button
                variant="flat"
                className="font-bold mt-6 ml-auto"
                color="primary"
                type="submit"
                isLoading={loading}
                isDisabled={
                  !(
                    oldp.length > 0 &&
                    newp.length > 0 &&
                    confirmp.length > 0 &&
                    newp === confirmp
                  )
                }
              >
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
