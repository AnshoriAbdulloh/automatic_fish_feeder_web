import { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase/firebase.ts";
import type { History } from "../types/history.ts";
import { MdDelete } from "react-icons/md";

type Props = {
  editable?: boolean;
};

export default function Schedule({ editable = false }: Props) {
  const [history, setHistory] = useState<History[]>([]);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Yakin menghapus riwayat ini?");
    if (!confirmDelete) return;

    try {
      await remove(ref(db, `riwayat_makan/${id}`));
      console.log("Berhasil hapus");
    } catch (error) {
      console.error("Gagal hapus:", error);
    }
  };

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
      <h1 className={`mb-1 text-lg`}>Riwayat pemberian pakan</h1>

      {history.map((item) => (
        <div
          key={item.id}
          className='hover:bg-gray-200 p-3 rounded-xl flex gap-2 '
        >
          <p>{item.waktu}</p>

          <p
            className={
              item.status === "BERHASIL" ? "text-green-400" : "text-red-400"
            }
          >
            {item.status}{" "}
          </p>
          {editable && (
            <MdDelete
              onClick={() => handleDelete(item.id)}
              className={`ml-auto inline hover:opacity-75 cursor-pointer box-content rounded-sm p-1 bg-red-500 text-black`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
