import logo from "./logo.svg";
import "./App.css";
import { Input, MantineProvider, Menu, Modal } from "@mantine/core";
import { useState, useEffect } from "react";
import {
  IconHome,
  IconHotelService,
  IconServicemark,
  IconSettings,
} from "@tabler/icons-react";
import GridCard from "./components/GridCard";

function App() {
  const [grid, setGrid] = useState([]);
  const [gridInfo, setGridInfo] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const resetGrid = () => {
    setGrid([]);
    setGridInfo([]);
    setX(0);
    setY(0);
    console.log("Called");
  };

  const createGrid = () => {
    console.log(x, y);

    var tmpGrid = [];
    var tmpGridInfo = [];

    for (let i = 0; i < x; i++) {
      var tmp = [];
      var tmp2 = [];
      for (let j = 0; j < y; j++) {
        tmp.push([i, j]);
        tmp2.push({
          hasHouse: false,
          hasHospital: false,
          hasGym: false,
          hasRestaurant: false,
        });
      }
      tmpGrid.push(tmp);
      tmpGridInfo.push(tmp2);
    }
    setGrid(tmpGrid);
    setGridInfo(tmpGridInfo);

    console.log(grid);
    setGridShow(true);
  };

  const [gridShow, setGridShow] = useState(false);

  const [bestHouseX, setBestHouseX] = useState(-1);
  const [bestHouseY, setBestHouseY] = useState(-1);
  const [reset, setReset] = useState(false);

  const findBestHouse = () => {
    const houses = [];
    const hospitals = [];
    const gyms = [];
    const restaurants = [];
    console.log(gridInfo);
    for (var i = 0; i < x; i++) {
      for (var j = 0; j < y; j++) {
        if (gridInfo[i][j].hasHouse == true) {
          houses.push([i, j]);
        }
        if (gridInfo[i][j].hasHospital == true) {
          hospitals.push([i, j]);
        }
        if (gridInfo[i][j].hasGym == true) {
          gyms.push([i, j]);
        }
        if (gridInfo[i][j].hasRestaurant == true) {
          restaurants.push([i, j]);
        }
      }
    }

    console.log(houses);
    console.log(hospitals);
    console.log(gyms);
    console.log(restaurants);

    var score = 1000000;
    var houseIndex = -1;

    houses.map((h, index) => {
      var hotelDistance = x * y;
      var gymDistance = x * y;
      var restautantlDistance = x * y;

      hospitals.map((service) => {
        hotelDistance = Math.min(
          hotelDistance,
          Math.sqrt(
            (service[0] - h[0]) * (service[0] - h[0]) +
              (service[1] - h[1]) * (service[1] - h[1])
          )
        );
      });
      gyms.map((service) => {
        gymDistance = Math.min(
          gymDistance,
          Math.sqrt(
            (service[0] - h[0]) * (service[0] - h[0]) +
              (service[1] - h[1]) * (service[1] - h[1])
          )
        );
      });
      restaurants.map((service) => {
        restautantlDistance = Math.min(
          restautantlDistance,
          Math.sqrt(
            (service[0] - h[0]) * (service[0] - h[0]) +
              (service[1] - h[1]) * (service[1] - h[1])
          )
        );
      });

      if (hotelDistance + gymDistance + restautantlDistance <= score) {
        score = hotelDistance + gymDistance + restautantlDistance;
        houseIndex = index;
      }
    });

    if (houseIndex != -1) {
      setBestHouseX(houses[houseIndex][0]);
      setBestHouseY(houses[houseIndex][1]);
    }
  };

  return (
    <>
      <MantineProvider withGlobalStyles>
        <header className="h-16 w-full px-8 py-2 flex items-center shadow-md">
          <h1 className="text-xl font-semibold text-indigo-800">
            CloudSEK Housing Plan
          </h1>
        </header>

        <main className="p-8 h-screen ">
          <h1 className="text-lg font-semibold text-indigo-900 pb-8 ">
            Want to create a Housing Layout?
          </h1>
          <div className="flex items-center space-x-4 ">
            {!reset && (
              <h2 className="text-lg font-semibold text-indigo-900 ">
                Tell us about your dimensions
              </h2>
            )}
            {!reset && (
              <Input
                onChange={(e) => setX(e.target.value)}
                type="number"
                placeholder="Number of rows"
              />
            )}
            {!reset && (
              <Input
                onChange={(e) => setY(e.target.value)}
                type="number"
                placeholder="Number of columns"
              />
            )}
            {!reset ? (
              <h3
                className="btn1"
                onClick={() => {
                  // resetGrid();
                  setReset(true);
                  createGrid();
                }}
              >
                Create
              </h3>
            ) : (
              <h3
                className="btn1"
                onClick={() => {
                  // resetGrid();
                  setReset(false);
                  resetGrid();
                }}
              >
                Reset
              </h3>
            )}
          </div>
          <div className="p-8 flex flex-col space-y-4">
            {reset && (
              <div className="flex space-x-16 items-center">
                <h1 className="text-2xl font-semibold text-indigo-900">
                  Layout
                </h1>
                <h2 className="text-lg btn1" onClick={findBestHouse}>
                  Show best House
                </h2>
              </div>
            )}
            {grid.map((item) => (
              <div className="flex space-x-4">
                {item.map((e) => (
                  <div className="">
                    <GridCard
                      bestHouseX={bestHouseX}
                      bestHouseY={bestHouseY}
                      setBestHouseX={setBestHouseX}
                      setBestHouseY={setBestHouseY}
                      i={e[0]}
                      j={e[1]}
                      info={gridInfo}
                      setInfo={setGridInfo}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </main>
      </MantineProvider>
    </>
  );
}

export default App;
