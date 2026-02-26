import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";

export default function NextTimeFeed() {
  const [nextTime, setNextTime] = useState<string>("--:--");

  useEffect(() => {
    const jadwalRef = ref(db, "jadwal_makan");

    const unsubscribe = onValue(jadwalRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const data = snapshot.val();

      // Ambil semua jam dan buang yang "---"
      const times: string[] = Object.values(data).filter(
        (jam: any) => jam !== "---",
      ) as string[];

      if (times.length === 0) return;

      // Urutkan waktu
      const sortedTimes = times.sort();

      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      let foundNext = null;

      for (let time of sortedTimes) {
        const [hour, minute] = time.split(":").map(Number);
        const totalMinutes = hour * 60 + minute;

        if (totalMinutes > currentMinutes) {
          foundNext = time;
          break;
        }
      }

      // Kalau semua sudah lewat → ambil jadwal pertama (besok)
      if (!foundNext) {
        foundNext = sortedTimes[0];
      }

      setNextTime(foundNext);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='flex flex-1 h-50 border border-black/30 rounded-xl m-4 p-4 font-samsung-medium text-2xl bg-white'>
      NEXT FEED TIME : {nextTime}
    </div>
  );
}
