import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase.ts";
import type { History } from "../types/history.ts";

export default function Schedule() {
  const [history, setHistory] = useState<History[]>([]);

  useEffect(() => {
    const historyRef = ref(db, "riwayat_makan");

    onValue(historyRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formatted: History[] = [];

        Object.entries(data).forEach(([id, value]: any) => {
          Object.entries(value).forEach(([waktu, status]: any) => {
            formatted.push({
              id,
              waktu,
              status,
            });
          });
        });

        setHistory(formatted);
      }
    });
  }, []);

  return (
    <div
      className={`bg-white m-4 p-4 mt-0 rounded-xl border border-black/30 font-samsung-medium`}
    >
      <h1 className={`mb-1 text-lg`}>
        Riwayat pemberian pakan <button></button>
      </h1>

      {history.map((item) => (
        <div
          key={item.id}
          className='hover:bg-gray-200 cursor-pointer p-3 rounded-xl flex gap-2'
        >
          <p>{item.waktu}</p>

          <p
            className={
              item.status === "BERHASIL" ? "text-green-400" : "text-red-400"
            }
          >
            {item.status}
          </p>
        </div>
      ))}
    </div>
  );
}
