import React from "react";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const GraphCard = () => {
  return (
    <Card className="bg-black border-[0.5px] border-zinc-600 w-full min-h-fit hover:border-white">
      <CardHeader className="font-bold text-2xl border-b-1 border-zinc-600">
        Graphical Analysis
      </CardHeader>
      <CardBody className="flex lg:flex-row flex-col-reverse w-full min-h-fit gap-2">
        <LineChart />
        <Divider orientation="vertical" className="lg:flex hidden w-[0.5px] bg-zinc-600 min-h-[17.5rem]"/>
        <Divider orientation="horizontal" className="lg:hidden flex bg-zinc-600"/>
        <BarChart/>
      </CardBody>
    </Card>
  );
};

export default GraphCard;
