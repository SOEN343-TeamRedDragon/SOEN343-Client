import React, { useRef, useState } from "react";

export default function SHC({
  toggleAllLights,
  toggleRoomLights,
  changeRoomRef,
}) {
  const [selectValue, setSelectValue] = useState("true");
  const [isOpen, setIsOpen] = useState(true);

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const roomNumberRef = useRef(1);
  const handleChange = (e) => {
    roomNumberRef.current = e.target.value;
    // console.log(roomNumberRef);
  };
  return (
    <div>
      <h1>SHC</h1>

      <div>
        <p className="mt-2">Turn room light status.</p>
        <div className="flex flex-row ">
          <div className="flex justify-between rounded-md border-slate-800 ">
            <input
              className="h-7 w-24 mx-2 border-2"
              type="number"
              min="1"
              placeholder="Enter room number"
              defaultValue={roomNumberRef.current}
              onChange={handleChange}
            />
            <select value={selectValue} onChange={handleSelectChange}>
              <option value="true">ON</option>
              <option value="false">OFF</option>
            </select>
          </div>
          <button
            onClick={() => toggleRoomLights(roomNumberRef.current)}
            className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
          >
            Set
          </button>
        </div>
        <label>Turn off All lights:</label>
        <button
          className="rounded-md bg-slate-800 text-white px-2 m-2"
          onClick={() => toggleAllLights(false)}
        >
          TURN OFF ALL
        </button>
        <div className="flex flex-row items-center">
          <label>Turn on All lights:</label>
          <button
            className="rounded-md bg-slate-800 text-white px-2 m-2"
            onClick={() => toggleAllLights(true)}
          >
            TURN ON ALL
          </button>
        </div>
      </div>
    </div>
  );
}
