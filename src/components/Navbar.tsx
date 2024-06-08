"use client";

import React from "react";
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
import { useProfile } from "@/context/ProfileContext";

const Navmenu = () => {
  const { logout } = useAuth();
  const profileModal = useDisclosure();
  const { profile, loading } = useAttendance();
  const qoute = getRandomQuote();
  const { UserData } = useProfile();

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
          {moment(new Date()).format("DD MMM YYYY  h:mm A")}
        </Card>
        <Dropdown
          classNames={{
            content: "bg-black border-[0.5px] border-zinc-600",
          }}
          backdrop="blur"
          placement="bottom-end"
        >
          <DropdownTrigger onClick={UserData}>
            <Skeleton isLoaded={!loading} className="rounded-xl min-w-10">
              <Avatar
                radius="md"
                as="button"
                className="transition-transform min-w-10"
                name="Jason Hughes"
                src="https://images.pexels.com/photos/3512506/pexels-photo-3512506.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </Skeleton>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            variant="flat"
            onAction={(key) => {
              if (key === "openProfile") {
                profileModal.onOpen();
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
            <DropdownSection key="2" title="">
              <DropdownItem
                key="logout"
                color="danger"
                textValue="Actions"
                onClick={logout}
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        <ProfileModal open={profileModal} />
      </NavbarContent>
    </Navbar>
  );
};

export default Navmenu;
