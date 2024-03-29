import React, { useState, useEffect } from "react";
import Light from "../SmartElements/light";
import Door from "../SmartElements/door";
import Window from "../SmartElements/window";
import { IoMan } from "react-icons/io5";

export default function Room({ roomData }) {
  const [room, setRoom] = useState(roomData);
  const [userRoom, setUserRoom] = useState(false);
  const [lights, setLights] = useState(
    room.smartElementList.filter((element) => element.elementType === "Light")
  );
  const [doors, setDoors] = useState(
    room.smartElementList.filter((element) => element.elementType === "Door")
  );
  const [windows, setWindows] = useState(
    room.smartElementList.filter((element) => element.elementType === "Window")
  );

  useEffect(() => {
    if (room.userList.length > 0) {
      setUserRoom(true);
    }
    setRoom(roomData);
    setLights(
      roomData.smartElementList.filter(
        (element) => element.elementType === "Light"
      )
    );
    setDoors(
      roomData.smartElementList.filter(
        (element) => element.elementType === "Door"
      )
    );
    setWindows(
      roomData.smartElementList.filter(
        (element) => element.elementType === "Window"
      )
    );
  }, [roomData]);

  // console.log(userRoom , ' room status in ' , room.roomId)
  return (
    <div className="bg-slate-400 border border-black flex flex-1 flex-col items-start justify-start">
      <div className="bg-white border border-black px-2  top-0 left-0">
        {room.roomType} Zone: 1
      </div>

      <div className="flex w-full justify-center items-center">
        {room &&
          lights.map((light, index) => (
            <Light key={index} lightData={light} roomId={room.roomId} />
          ))}
        {room &&
          doors.map((door, index) => (
            <Door key={index} doorData={door} roomId={room.roomId} />
          ))}
        {room &&
          windows.map((window, index) => (
            <Window key={index} windowData={window} roomId={room.roomId} />
          ))}
        {userRoom ? <IoMan size={30} /> : ""}
      </div>
    </div>
  );
}
