import React, { useEffect } from "react";
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

function GridCard({
  i,
  j,
  info,
  setInfo,
  bestHouseX,
  bestHouseY,
  setBestHouseX,
  setBestHouseY,
}) {
  const [opened, setOpened] = useState(false);
  const [services, setServices] = useState([]);
  const [hospital, setHospital] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [gym, setGym] = useState(false);
  const [value, setValue] = useState(0);
  const [home, setHome] = useState(false);

  const updateInfo = () => {
    var tmpInfo = info[i][j];
    console.log(tmpInfo);
    tmpInfo = {
      hasHouse: home,
      hasHospital: hospital,
      hasGym: gym,
      hasRestaurant: restaurant,
    };

    console.log(tmpInfo);
    info[i][j] = tmpInfo;
    setInfo(info);
  };

  useEffect(() => {
    updateInfo();
    console.log(info);
    setBestHouseX(-1);
    setBestHouseX(-1);
  }, [home, hospital, restaurant, gym]);
  useEffect(() => {
    setHospital(false);
    setRestaurant(false);
    setGym(false);
    setValue(0);
    setHome(false);
    setBestHouseX(-1);
    setBestHouseX(-1);
  }, []);

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Services">
        <div className="space-y-2">
          <h1>Please select a service or combiantion of services!</h1>
          <div className="flex justify-between"></div>
          <div
            onClick={() => {
              setHospital(!hospital);
              // updateInfo();
            }}
            className={` cursor-pointer flex space-x-2 items-center border p-2 rounded-md ${
              hospital && "bg-indigo-200"
            }`}
          >
            <IconBuildingHospital />
            <h2>hospital</h2>
          </div>
          <div
            onClick={() => {
              setRestaurant(!restaurant);
              // updateInfo();
            }}
            className={` cursor-pointer flex space-x-2 items-center border p-2 rounded-md ${
              restaurant && "bg-indigo-200"
            }`}
          >
            <IconChefHat />
            <h2>Restaurant</h2>
          </div>
          <div
            onClick={() => {
              setGym(!gym);
              // updateInfo();
            }}
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
            Apply
          </h1>
        </div>
      </Modal>

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div
            className={`h-[90px] w-[160px] ${
              bestHouseX == i && bestHouseY == j
                ? "bg-indigo-600 text-white"
                : "bg-indigo-50"
            }  hover:bg-indigo-100 rounded-md border flex flex-col items-center justify-center cursor-pointer`}
          >
            {home == true && <h1>Home</h1>}
            {hospital == true && <h1>Hospital</h1>}
            {gym == true && <h1>Gym</h1>}
            {restaurant == true && <h1>Restaurant</h1>}
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Plot</Menu.Label>
          <Menu.Item
            className={`${value === 1 && "bg-indigo-200"}`}
            onClick={() => {
              setValue(1);
              setHome(true);
              setHospital(false);
              setRestaurant(false);
              setGym(false);
              // updateInfo();
            }}
            icon={<IconHome size={14} />}
          >
            House
          </Menu.Item>
          <Menu.Item
            className={`${value === 2 && "bg-indigo-200"}`}
            onClick={() => {
              setValue(2);
              setHome(false);
              setOpened(true);
            }}
            icon={<IconSettings size={14} />}
          >
            Other Services
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setValue(0);
              setHome(false);
              setHospital(false);
              setRestaurant(false);
              setGym(false);
            }}
            icon={<IconSettings size={14} />}
          >
            Clear All
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}

export default GridCard;
