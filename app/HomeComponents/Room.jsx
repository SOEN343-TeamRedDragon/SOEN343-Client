import React, { useState, useEffect } from "react";
import Light from "../SmartElements/light";
import Door from "../SmartElements/door";

export default function Room({ roomData }) {
  const [room, setRoom] = useState(roomData);

  useEffect(() => {
    console.log("Room data changed in room: " + roomData.roomId);
    setRoom(roomData);
  }, [roomData]);

  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div
      className="border border-black flex items-center flex-col justify-center"
      style={{
        backgroundColor: generateRandomColor(),
      }}
    >
      {room.roomType}
      {room &&
        room.smartElementList.map((element, index) => {
          if (element.elementType === "Light") {
            return (
              <Light key={index} lightData={element} roomId={room.roomId} />
            );
          } else if (element.type === "Door") {
            return <Door key={index} doorData={element} roomId={room.roomId} />;
          }
          return null;
        })}
    </div>
  );
}
