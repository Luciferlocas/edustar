import {
  Card,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import React from "react";
import bg from "../../public/bg.jpg"
import Image from "next/image";

interface Props {
  loading: boolean;
  name: string;
  total: number;
  present: number;
}

const Acard = (props: Props) => {
  return (
    <Card
      isFooterBlurred
      isPressable
      className="bg-black border-[0.5px] border-zinc-800 min-w-80 h-40 hover:border-white relative"
    >
      <CardHeader className="absolute z-10 top-1 left-1 font-bold text-lg text-left">
        <Skeleton isLoaded={!props.loading} className="rounded-md">
          {props.loading ? "Subject Name" : props.name}
        </Skeleton>
      </CardHeader>
      <Image
        className="-z-0"
        height={160}
        width={320}
        alt="background"
        src={bg}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 w-full border-t-[1px] border-zinc-800">
        <Skeleton isLoaded={!props.loading} className="rounded-md">
          Attendance - {props.total} / {props.present}
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default Acard;
