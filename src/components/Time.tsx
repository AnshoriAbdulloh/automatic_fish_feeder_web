import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { onValue, ref } from "firebase/database";

import Clock from "../assets/image/clock.png";

export default function Time() {
  const [rtcTime, setRtcTime] = useState<string>("--:--");

  useEffect(() => {
    const rtcRef = ref(db, "RTC");

    const unsubscribe = onValue(rtcRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log(`Tidak ada data`);
        setRtcTime("");
        return;
      }

      const data = snapshot.val();
      if (data) {
        setRtcTime(data);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={`flex flex-1 h-50 gap-4 m-4`}>
      <div
        className={`flex-1 flex flex-col justify-end items-center shrink rounded-xl border border-black/30 font-samsung-medium p-4 bg-white`}
      >
        <img src={Clock} alt='Clock' className={`max-w-25 mb-2`} />
        <span className={`text-sm mb-1`}>LOCAL TIME</span>
        <h1 className={`sm:text-5xl text-4xl`}>
          <DigitalClock />
        </h1>
      </div>
      <div
        className={`flex-1 flex flex-col justify-end items-center shrink rounded-xl border border-black/30 font-samsung-medium p-4 bg-white`}
      >
        <img src={Clock} alt='Clock' className={`max-w-25 mb-2`} />
        <span className={`text-sm mb-1`}>RTC TIME</span>
        <h1 className={`sm:text-5xl text-4xl`}>{rtcTime}</h1>
      </div>
    </div>
  );
}

const DigitalClock: React.FC = () => {
  const [localTime, setLocalTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setLocalTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = localTime.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Memastikan format 24 jam
  });

  return (
    <div className={``}>
      <p>{formatTime}</p>
    </div>
  );
};
