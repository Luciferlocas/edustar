import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import moment from "moment";

interface Props {
  open: UseDisclosureReturn;
  name: string;
  data: AttendanceEntries;
}

interface AttendanceEntry {
  date: string;
  P: number;
  A: number;
}

type AttendanceEntries = AttendanceEntry[];

export default function AttModal(prop: Props) {
  const { isOpen, onOpenChange } = prop.open;
  const data = (prop.data || []).slice().reverse();
  function stringOfAT(n: number, s: string) {
    if (s == "A") return "A".repeat(n);
    return "P".repeat(n);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold text-lg">
                {prop.name}
              </ModalHeader>
              <ModalBody>
                <Card className="max-h-96 shadow-none">
                  <CardHeader className="flex bg-primary-100 justify-between sticky">
                    <span>Date</span>
                    <span>Attendance</span>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-2">
                    {data.map((item: AttendanceEntry, i: number) => (
                      <>
                        <div
                          id={i + "subject"}
                          className="flex justify-between"
                        >
                          <span>
                            {moment(item.date).format("DD MMM, YYYY")}
                          </span>
                          <div>
                            <span className="text-success-400 font-semibold">{stringOfAT(item.P, "P")}</span>
                            <span className="text-danger-400 font-semibold">{stringOfAT(item.A, "A")}</span>
                          </div>
                        </div>
                        <Divider />
                      </>
                    ))}
                  </CardBody>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
