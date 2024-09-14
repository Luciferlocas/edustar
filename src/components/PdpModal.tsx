import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@nextui-org/react";
import type { UseDisclosureReturn } from "@nextui-org/use-disclosure";
import moment from "moment";
import { motion } from "framer-motion";
import { useAttendance } from "@/context/AttendanceContext";

interface Props {
  open: UseDisclosureReturn;
}

interface AttendanceEntry {
  date: string;
  P: number;
  A: number;
}

export default function PdpModal(prop: Props) {
  const { isOpen, onOpenChange } = prop.open;
  function stringOfAT(n: number, s: string) {
    if (s == "A") return "A".repeat(n);
    return "P".repeat(n);
  }
  const { attendanceMap } = useAttendance();
  const pdp = Array.from(attendanceMap.values()).reverse();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        className="pb-6"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader className="font-bold text-lg">
            Personality Development Program
          </ModalHeader>
          <ModalBody className="px-3">
            <Card className="max-h-96 shadow-none">
              <CardHeader className="flex bg-primary-100 justify-between sticky">
                <span>Date</span>
                <span>Attendance</span>
              </CardHeader>
              <CardBody className="flex flex-col gap-2">
                {pdp.map((item: AttendanceEntry, i: number) => (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    key={i + "subject"}
                  >
                    <div className="flex justify-between">
                      <span>{moment(item.date).format("DD MMM, YYYY")}</span>
                      <div>
                        <span className="text-success-400 font-semibold">
                          {stringOfAT(item.P, "P")}
                        </span>
                        <span className="text-danger-400 font-semibold">
                          {stringOfAT(item.A, "A")}
                        </span>
                      </div>
                    </div>
                    <Divider
                      className={`mt-2 ${pdp.length === i + 1 && "hidden"}`}
                    />
                  </motion.div>
                ))}
              </CardBody>
            </Card>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
