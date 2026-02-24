import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase.ts";
import type { JadwalMakan } from "../types/jadwal.ts";

export default function Schedule() {
  const [jadwal, setJadwal] = useState<JadwalMakan[]>([]);

  useEffect(() => {
    const jadwalRef = ref(db, "jadwal_makan");

    const unsubscribe = onValue(jadwalRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log(`Tidak ada data`);
        setJadwal([]);
        return;
      }

      const data = snapshot.val();
      console.log(`Data Firebase:`, data);

      const result: JadwalMakan[] = Object.entries(data).map(
        ([key, value]: any) => ({
          id: key,
          jam: value,
        }),
      );

      setJadwal(result);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`mx-4 my-4 md:mt-4 mt-0 p-4 md:ml-0 flex-1 bg-white rounded-xl border border-black/30 font-samsung-medium `}
    >
      <h1 className={`mb-1 text-lg`}>Jadwal Makan</h1>

      {jadwal.map((item) => (
        <p
          key={item.id}
          className={`cursor-pointer text-md py-2 px-3 rounded-xl hover:bg-gray-200`}
        >
          {item.jam}
        </p>
      ))}
    </div>
  );
}
