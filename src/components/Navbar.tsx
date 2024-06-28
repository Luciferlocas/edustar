"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Input,
  Card,
  Avatar,
  Skeleton,
  useDisclosure,
  DropdownSection,
} from "@nextui-org/react";
import moment from "moment";
import { useAttendance } from "@/context/AttendanceContext";
import { useAuth } from "@/context/AuthContext";
import { getRandomQuote } from "@/utils/getRandomQuote";
import ProfileModal from "./ProfileModal";
import PasswordModal from "./ChangePass";
import { useProfile } from "@/context/ProfileContext";

const Navmenu = () => {
  const { logout } = useAuth();
  const profileModal = useDisclosure();
  const passModal = useDisclosure();
  const { profile, loading } = useAttendance();
  const qoute = getRandomQuote();
  const { blob, userProfile } = useProfile();
  const [time, setTime] = useState(
    moment(new Date()).format("DD MMM YYYY  h:mm A")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment(new Date()).format("DD MMM YYYY  h:mm A"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Navbar
      maxWidth="full"
      height={32}
      isBlurred
      classNames={{
        wrapper: "px-0 py-0",
      }}
      className="bg-black z-[9999] h-[4rem]"
    >
      <NavbarContent as="div" className="items-center">
        <Input
          value={qoute.text}
          radius="md"
          isReadOnly
          className="w-full"
          variant="bordered"
          classNames={{
            inputWrapper:
              "bg-black border-[0.5px] border-zinc-600 hover:bg-none",
          }}
        />
        <Card
          className="sm:grid place-content-center bg-gradient-to-br from-60% from-black via-zinc-800 to-black border-[0.5px] border-zinc-600 lg:col-span-3 col-span-8 text-center text-sm shadow-none h-10 md:min-w-80 min-w-40 hidden"
          radius="md"
        >
          {time}
        </Card>
        <Dropdown
          classNames={{
            content: "bg-black border-[0.5px] border-zinc-600",
          }}
          backdrop="blur"
          placement="bottom-end"
        >
          <DropdownTrigger>
            <Skeleton isLoaded={!loading} className="rounded-xl min-w-10">
              <Avatar
                radius="md"
                as="button"
                className="transition-transform min-w-10"
                name={userProfile.firstName}
                src={
                  blob !== 0
                    ? `/api/photo?photoId=${blob}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXA-Uu5DzOUC3DEEh789elx46nvfe-0s-7xg&usqp=CAU"
                }
              />
            </Skeleton>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={(key) => {
              if (key === "openProfile") {
                profileModal.onOpen();
              } else if (key === "passwordchange") {
                passModal.onOpen();
              }
            }}
          >
            <DropdownSection title="" showDivider>
              <DropdownItem
                key="openProfile"
                textValue="Profile"
                className="h-14 gap-2"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-primary-500">
                  {profile.length > 0
                    ? profile[0].firstName +
                      " " +
                      profile[0].middleName +
                      " " +
                      profile[0].lastName
                    : " "}
                </p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection key="2" title="" showDivider>
              <DropdownItem
                key="passwordchange"
                color="warning"
                textValue="Password"
              >
                Change Password
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                textValue="Actions"
                onClick={logout}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
            <DropdownSection key="3" title="">
              <DropdownItem key="About" isReadOnly className="text-center">
                <a href="https://www.linkedin.com/in/rohit-somvanshi/">
                  Designed & Developed <br /> with 🤍 by{" "}
                  <span className="font-bold">Rohit</span>
                </a>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <ProfileModal open={profileModal} />
        <PasswordModal open={passModal} />
      </NavbarContent>
    </Navbar>
  );
};

export default Navmenu;
