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

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [gridShow, setGridShow] = useState(false);
  return (
    <>
      <MantineProvider withGlobalStyles>
        <header className="h-16 w-full px-8 py-2 flex items-center shadow-md">
          <h1 className="text-xl font-semibold text-indigo-800">
            CloudSEK Housing Plan
          </h1>
        </header>
        <main className="p-8 ">
          <h1 className="text-lg font-semibold text-indigo-900 pb-8 ">
            Want to create a Housing Layout?
          </h1>
          <div className="flex items-center space-x-4 ">
            <h2 className="text-lg font-semibold text-indigo-900 ">
              Tell us about your dimensions
            </h2>
            <Input
              onChange={(e) => setX(e.target.value)}
              type="number"
              placeholder="Number of rows"
            />
            <Input
              onChange={(e) => setY(e.target.value)}
              type="number"
              placeholder="Number of columns"
            />
            <h3 className="btn1" onClick={() => createGrid()}>
              Create
            </h3>
          </div>

          {grid.map((item) => (
            <div className="flex">
              {item.map((e) => (
                <div className="">
                  <GridCard
                    i={e[0]}
                    j={e[1]}
                    info={gridInfo}
                    setInfo={setGridInfo}
                  />
                </div>
              ))}
            </div>
          ))}
        </main>
      </MantineProvider>
    </>
  );
}

export default App;
