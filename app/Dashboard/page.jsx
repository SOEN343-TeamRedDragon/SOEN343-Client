"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";

import SideNav from "../Components/SideNav/SideNav";
import CommandsContainer from "./CommandsContainer";
import HouseContainer from "./HouseContainer";

import SHC from "../Modules/SHC";
import SHS from "../Modules/SHS";
import SHP from "../Modules/SHP";
import SHH from "../Modules/SHH";
import SimulationOff from "./SimulationOff";

import { LogsContainer } from "../Logger/Console";
import { useHomeStore } from "../Store/home.store";
import { useAuthStore } from "../Store/user.store";
import { toggleClock } from "../lib/clock";
import { useTempStore } from "../Store/temp.store";
import { useSimlulationStore } from "../Store/simulation.store";

import Modal from "../Modals/Modal";
import ModalContent from "../Modals/ModalContent";
import ModalToggler from "../Modals/ModalToggler";
import EditContext from "../Components/SideNav/EditContext";

export default function SmartHomeSimulator() {
  const { awayMode } = useSimlulationStore();
  const { location } = useAuthStore();
  let role = localStorage.getItem("role");
  let userName = localStorage.getItem("userName");
  let outdoorTemp = localStorage.getItem("outdoorTemp");
  let indoorTemp = localStorage.getItem("indoorTemp");
  let date = localStorage.getItem("date");

  const [activeElement, setActiveElement] = useState("SHS");
  const [open, setOpen] = useState(false);
  const [latestState, setLatestState] = useState("");
  const [simulation, setSimulation] = useState(true);
  const roomNumberRef = useRef("1");

  // Fetch home layout on component mount
  useEffect(() => {
    toggleClock(true);
  }, []);

  const onClickSimumlation = async (e) => {
    e.preventDefault();
    if (simulation) {
      setLatestState(activeElement);
      setActiveElement(null);
    } else {
      setActiveElement(latestState);
    }

    await toggleClock(!simulation);

    setSimulation(!simulation);
  };

  const handleClick = (e) => {
    setActiveElement(e);
  };

  return (
    <div className="flex flex-row">
      <SideNav
        role={role}
        name={userName}
        indoorTemp={indoorTemp}
        date={date}
        location={location}
        onClickSimulation={onClickSimumlation}
        simulation={simulation}
      >
        <div className="mt-4 text-center border-white border-2">
          <Modal>
            <ModalToggler>
              <div>
                <button>Edit Simulation</button>
              </div>
            </ModalToggler>
            <ModalContent
              title="Edit Simulation Context"
              description="Edit the information associated with the simulation. We will generate the rest for you!"
              onExit={() => console.log("exit")}
            >
              <EditContext name={userName} />
            </ModalContent>
          </Modal>
        </div>
      </SideNav>
      <CommandsContainer>
        {simulation ? (
          <div>
            <ul className="flex space-x-4 bg-slate-800 py-4">
              <li
                onClick={() => handleClick("SHS")}
                className={`cursor-pointer border-2 border-white my-2 mx-1 px-6 py-2 ${
                  activeElement === "SHS"
                    ? "bg-white text-bg-slate-800"
                    : "text-white bg-slate-800"
                }`}
              >
                SHS
              </li>
              <li
                onClick={() => handleClick("SHC")}
                className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${
                  activeElement === "SHC"
                    ? "bg-white text-bg-slate-800"
                    : "text-white"
                }`}
              >
                SHC
              </li>
              <li
                onClick={() => handleClick("SHP")}
                className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${
                  activeElement === "SHP"
                    ? "bg-white text-bg-slate-800"
                    : "text-white"
                }`}
              >
                SHP
              </li>
              <li
                onClick={() => handleClick("SHH")}
                className={`cursor-pointer border-2 border-white mx-1 my-2 px-6 py-2  ${
                  activeElement === "SHH"
                    ? "bg-white text-bg-slate-800"
                    : "text-white border-1"
                }`}
              >
                SHH
              </li>
              {/* Navigation items */}
              {/* ... */}
            </ul>
          </div>
        ) : (
          <SimulationOff title={"SIMULATION TURNED OFF"} />
        )}
        {/* Depending which element is chosen from the nav, load the appropriate module. */}

        {activeElement === "SHC" && <SHC />}
        {activeElement === "SHS" && <SHS />}
        {activeElement === "SHH" && <SHH />}
        {activeElement === "SHP" && <SHP />}
      </CommandsContainer>
      <div className="flex flex-col w-1/2">
        <HouseContainer />

        <LogsContainer />
      </div>
    </div>
  );
}
