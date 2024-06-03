import {
  Card,
  CardFooter,
  CardHeader,
  Skeleton,
  Image,
} from "@nextui-org/react";
import React from "react";

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
        className="max-w-80 -z-0 h-full"
        src="https://img.freepik.com/free-vector/white-outline-geometric-hexagonal-bipyramid-background-vector_53876-176699.jpg?w=996&t=st=1717439318~exp=1717439918~hmac=e8919ddd4429887e3d46c41dc861cde724b09c28d983892cedcf66a84478a194"
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
