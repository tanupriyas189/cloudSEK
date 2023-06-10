import React from "react";
import { Input, MantineProvider, Menu, Modal } from "@mantine/core";
import { useState } from "react";
import {
  IconBarbell,
  IconBuildingHospital,
  IconChefHat,
  IconHome,
  IconSettings,
  IconWeight,
} from "@tabler/icons-react";

function GridCard({ i, j, info }) {
  const [opened, setOpened] = useState(false);
  const [services, setServices] = useState([]);
  const [hospital, setHospital] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [gym, setGym] = useState(false);
  const [value, setValue] = useState(0);
  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Services">
        <div className="space-y-2">
          <h1>Please select a service or combiantion of services!</h1>
          <div className="flex justify-between"></div>
          <div
            onClick={() => setHospital(!hospital)}
            className={` cursor-pointer flex space-x-2 items-center border p-2 rounded-md ${
              hospital && "bg-indigo-200"
            }`}
          >
            <IconBuildingHospital />
            <h2>hospital</h2>
          </div>
          <div
            onClick={() => setRestaurant(!restaurant)}
            className={` cursor-pointer flex space-x-2 items-center border p-2 rounded-md ${
              restaurant && "bg-indigo-200"
            }`}
          >
            <IconChefHat />
            <h2>Restaurant</h2>
          </div>
          <div
            onClick={() => setGym(!gym)}
            className={` cursor-pointer flex space-x-2 items-center border p-2 rounded-md ${
              gym && "bg-indigo-200"
            }`}
          >
            <IconBarbell />
            <h2>Gym</h2>
          </div>

          <h1
            className="btn1"
            onClick={() => {
              setOpened(false);
            }}
          >
            Delete
          </h1>
        </div>
      </Modal>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div className="h-[90px] w-[160px] hover:bg-gray-100 rounded-md border"></div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Plot</Menu.Label>
          <Menu.Item
            className={`${value === 1 && "bg-indigo-200"}`}
            onClick={() => {
              setValue(1);
            }}
            icon={<IconHome size={14} />}
          >
            House
          </Menu.Item>
          <Menu.Item
            className={`${value === 2 && "bg-indigo-200"}`}
            onClick={() => {
              setValue(2);
              setOpened(true);
            }}
            icon={<IconSettings size={14} />}
          >
            Other Services
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default GridCard;
