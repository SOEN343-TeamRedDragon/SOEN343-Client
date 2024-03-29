import React from 'react'
import { FaExclamationCircle } from "react-icons/fa";
export default function SimulationOff(props) {
  return (
    <div className="flex flex-col gap-40 w-full justify-center">
        <div className="flex flex-col items-center my-40">
            <h1 className=" mb-12 text-gray-400">{props.title}</h1>
            <FaExclamationCircle size={140} color="gray"/>
            {props.children}
        </div>
    
    </div>
  )
}
