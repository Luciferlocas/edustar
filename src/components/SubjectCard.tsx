import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
  Progress,
} from "@nextui-org/react";
import React from "react";
import bg from "../../public/bg.jpg";
import Image from "next/image";

interface Props {
  loading: boolean;
  name: string;
  total: number;
  present: number;
}

const Subjectcard = (props: Props) => {
  return (
    <Card
      isFooterBlurred
      isPressable
      className="bg-black border-[0.5px] border-zinc-600 min-w-80 h-40 hover:border-white"
    >
      <CardHeader className="absolute z-10 top-1 font-bold text-lg text-left">
        <Skeleton isLoaded={!props.loading} className="rounded-md">
          {props.loading ? "Subject Name" : props.name || "Subject"}
        </Skeleton>
      </CardHeader>
      <Image
        className="-z-0"
        height={160}
        width={320}
        alt="background"
        src={bg}
        priority
      />
      <CardBody className="absolute z-10 top-12">
        <Skeleton
          isLoaded={!props.loading}
          className={`rounded-md max-w-48 ${props.loading ? "h-2" : ""}`}
        >
          <Progress
            size="sm"
            radius="sm"
            classNames={{
              base: "max-w-48",
              track: "drop-shadow-md",
              indicator: "bg-gradient-to-r from-black to-white",
              label: "tracking-wider font-medium text-default-600",
              value: "text-foreground/60",
            }}
            label=" "
            value={((props.present || 0) * 100) / props.total || 0}
            showValueLabel={true}
          />
        </Skeleton>
      </CardBody>
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 w-full border-t-[1px] border-zinc-600">
        <Skeleton isLoaded={!props.loading} className="rounded-md">
          Attendance - {props.present || 0} / {props.total || 0}
        </Skeleton>
      </CardFooter>
    </Card>
  );
};

export default Subjectcard;
