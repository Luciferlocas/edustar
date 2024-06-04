import React from "react";
import bg from "../../public/bg.jpg";
import {
  Card,
  Skeleton,
  CardHeader,
  CardBody,
  CardFooter,
  Progress,
} from "@nextui-org/react";
import Image from "next/image";

interface Props {
  loading: boolean;
  total: number;
  present: number;
  name: string;
}

const TotalCard = (props: Props) => {
  return (
    <Card
      isPressable
      isFooterBlurred
      className="bg-black border-[0.5px] border-zinc-600 h-60 hover:border-white w-full"
    >
      <CardHeader className="absolute z-10 top-1 font-bold text-2xl text-left">
        <Skeleton isLoaded={!props.loading} className="rounded-full">
          {props.loading ? "Total Attendance" : props.name || "Attendance"}
        </Skeleton>
      </CardHeader>
      <CardBody className="absolute z-10 top-20 flex gap-3 text-lg">
        <Skeleton isLoaded={!props.loading} className="rounded-md">
          <p>Total Lectures - {props.total}</p>
        </Skeleton>
        <Skeleton isLoaded={!props.loading} className="rounded-md">
          <p>Total Lectures Attended - {props.present}</p>
        </Skeleton>
      </CardBody>
      <Image
        className="-z-0 w-auto h-auto"
        height={320}
        width={580}
        alt="background"
        src={bg}
        priority
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 w-full border-t-[1px] border-zinc-600">
        <Skeleton isLoaded={!props.loading} className="rounded-md max-w-60">
          <Progress
            size="sm"
            radius="sm"
            classNames={{
              base: "w-60",
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
      </CardFooter>
    </Card>
  );
};

export default TotalCard;
