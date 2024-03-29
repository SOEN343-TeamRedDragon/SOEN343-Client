import React, { useState, useEffect } from "react";
import { getHomeLayout } from "../lib/home";
import SimulationOff from "../Dashboard/SimulationOff";
import { getZones, addZone } from "../lib/zones";
export default function SHH() {
  const [roomList, setRoomList] = useState([]);
  const [active, setActive] = useState(true);
  const [zones, setZones] = useState([]);

  const [newZone, setNewZone] = useState({
    zone: 0.0,
    AM: 0.0,
    PM: 0.0,
    NIGHT: 0.0,
  });

  useEffect(() => {
    async function fetchData() {
      const CurrentZones = await getZones();
      setZones(CurrentZones);
    }
    fetchData();
  }, [newZone]);

  const onClickSetActive = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  const onZoneChange = (e) => {
    setNewZone((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onClickSetRoomTemp = (e) => {};

  const onAddZone = async (e) => {
    e.preventDefault();
    try {
      // Call addZone function to add the new zone
      await addZone(newZone);
      // Fetch the updated zones data after adding the new zone
      // const updatedZones = await getZones();

      // // Update the zones state with the updated data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {active ? (
        <div>
          <div className="mx-4 my-4">
            <button onClick={onClickSetActive}>
              <span>
                <p className="bg-slate-800 text-white border px-8 py-2">
                  SHH: {active ? "ON" : "OFF"}
                </p>
              </span>
            </button>
          </div>
          <div>
            <table className="w-3/4 border-2 my-4">
              <thead className="bg-gray-500 text-white">
                <tr>
                  <th>Zone #</th>
                  <th>AM</th>
                  <th>PM</th>
                  <th>NIGHT</th>
                </tr>
              </thead>
              <tbody>
                {zones.length > 0 &&
                  zones.map((zone) => {
                    return (
                      <tr className="border-2" key={zone.zoneId}>
                        <td className="border-2">Zone {zone.zoneId}</td>
                        <td className="border-2">{zone.amTemp}˚ C</td>
                        <td className="border-2">{zone.pmTemp}˚ C</td>
                        <td className="border-2">{zone.nightTemp}˚ C</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>

          <p className="font-bold ml-4">Create Zone:</p>
          <table className="w-full my-4 ">
            <thead>
              <tr>
                <th>Zone #</th>
                <th>AM</th>
                <th>PM</th>
                <th>NIGHT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>
                  <input
                    name="zone"
                    min="2"
                    max="4"
                    type="number"
                    onChange={onZoneChange}
                    className="w-3/4 border-2 border-md"
                  />
                </td>
                <td>
                  <input
                    name="AM"
                    type="number"
                    onChange={onZoneChange}
                    className="w-2/4 border-2 border-md"
                  />
                  °C{" "}
                </td>
                <td>
                  <input
                    name="PM"
                    type="number"
                    onChange={onZoneChange}
                    className="w-2/4 border-2 border-md"
                  />
                  °C{" "}
                </td>
                <td>
                  <input
                    name="NIGHT"
                    type="number"
                    onChange={onZoneChange}
                    className="w-2/4 border-2 border-md"
                  />
                  °C{" "}
                </td>
                <td>
                  <button
                    className="rounded-md bg-slate-800 text-white ml-4 px-8"
                    onClick={onAddZone}
                  >
                    SET
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="mt-2 font-bold">Set Zone Settings</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              <select
                className="h-7 w-1/5 border-2"
                name="role"
                placeholder="zone#"
              >
                <option min="1" value="">
                  1
                </option>
              </select>
              <select
                onChange={onZoneChange}
                className="h-7 border-2 w-1/4"
                name="role"
              >
                <option name="AM" value="AM">
                  AM
                </option>
                <option name="PM" value="PM">
                  PM
                </option>
                <option name="NIGHT" value="NIGHT">
                  NIGHT
                </option>
              </select>
              <input
                className="h-7 w-2/5 border-2"
                type="text"
                placeholder="Temperature"
                name="temperature"
              />
            </div>
            <button
              className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
              onClick={() => onAddUser(newProfile)}
            >
              SET
            </button>
          </div>
          <p className="mt-2 font-bold">Set Room Temperature</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              <select className="h-7 border-2" name="role">
                {roomList.map((room, index) => {
                  return (
                    <option key={index} value={room.roomId}>
                      {room.roomType}
                    </option>
                  );
                })}
              </select>
              <input
                className="h-7 w-2/5 border-2"
                type="text"
                placeholder="Temperature"
                name="temperature"
              />
            </div>
            <button
              className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
              onClick={() => onAddUser(newProfile)}
            >
              SET
            </button>
          </div>
          <p className="mt-2 font-bold">Assign Room to Zone</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              <select className="h-7 border-2" name="role">
                {roomList.map((room, index) => {
                  return (
                    <option key={index} value={room.roomId}>
                      {room.roomType}
                    </option>
                  );
                })}
              </select>
              <input
                className="h-7 w-2/5 border-2"
                type="text"
                placeholder="Zone #"
                name="temperature"
              />
            </div>
            <button
              className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
              onClick={() => onAddUser(newProfile)}
            >
              SET
            </button>
          </div>
        </div>
      ) : (
        <SimulationOff title={"SHH MODULE OFF"}>
          <button className="pt-8" onClick={onClickSetActive}>
            <span>
              <p className="bg-slate-800 text-white border px-8 py-2">
                SHH: {active ? "ON" : "OFF"}
              </p>
            </span>
          </button>
        </SimulationOff>
      )}
    </div>
  );
}
