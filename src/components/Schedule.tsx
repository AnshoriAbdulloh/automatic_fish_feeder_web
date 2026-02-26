import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase/firebase.ts";
import type { JadwalMakan } from "../types/jadwal.ts";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Schedule() {
  const location = useLocation();
  const isEditable = location.pathname === "/schedule";
  const [jadwal, setJadwal] = useState<JadwalMakan[]>([]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin nonaktifkan jadwal ini?");
    if (!confirmDelete) return;

    try {
      await set(ref(db, `jadwal_makan/${id}`), "---");
      console.log("Berhasil nonaktifkan");
    } catch (error) {
      console.error("Gagal:", error);
    }
  };
  const handleEdit = async (id: string, currentJam: string) => {
    const newJam = prompt("Edit jam makan", currentJam);

    if (!newJam) return;

    try {
      await set(ref(db, `jadwal_makan/${id}`), newJam);
      console.log(`Berhasil update`);
    } catch (error) {
      console.error(`Gagal update:`, error);
    }
  };

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
          className={`flex items-center gap-2 text-md py-2 px-3 rounded-xl hover:bg-gray-200`}
        >
          {item.jam}{" "}
          {isEditable && (
            <>
              <MdDelete
                onClick={() => handleDelete(item.id)}
                className={`ml-auto inline hover:opacity-75 cursor-pointer box-content rounded-sm p-1 bg-red-500`}
              />
              <MdEdit
                onClick={() => handleEdit(item.id, item.jam)}
                className={`inline hover:opacity-75 cursor-pointer box-content rounded-sm p-1 bg-green-500`}
              />
            </>
          )}
        </p>
      ))}
    </div>
  );
}
