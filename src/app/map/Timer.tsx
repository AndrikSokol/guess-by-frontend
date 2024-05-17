"use client";
import React, { useEffect, useState } from "react";
import { useRoundStore } from "../stores/zustand.store";

export const Timer = () => {
  const [timer, setTimer] = useState<number>(60);

  const { incrementRound } = useRoundStore();

  //   useEffect(() => {
  //     const timerId = setInterval(() => {
  //       if (!timer) {
  //         incrementRound();
  //         setTimer(60);
  //       }
  //       setTimer((prev: number) => (prev -= 1));
  //     }, 1000);
  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   });

  return (
    <div className="absolute w-36  text-center h-12 top-0  z-10 left-1/2  bg-black bg-opacity-30 text-white rounded-b-lg">
      <span>Time: {timer}</span>
    </div>
  );
};
