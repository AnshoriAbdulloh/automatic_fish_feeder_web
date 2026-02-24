import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function Feed() {
  const [persen, setPersen] = useState<number>(0);

  useEffect(() => {
    const pakanRef = ref(db, "pakan");
    const unsubscribe = onValue(pakanRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setPersen(data);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`flex relative justify-center md:justify-start items-end md: border border-black/30 rounded-xl grow mb-4 mr-4 bg-white md:max-h-32 max-w-32 md:max-w-80 overflow-hidden`}
    >
      <div
        style={{ width: `${persen}%`, height: `${persen}%` }}
        className={`bg-sky-300 md:h-full! md:min-w-0 min-w-32 rounded-xl text-transparent`}
      >
        d
      </div>
      <h1
        className={`absolute z-0 grid place-items-center h-full w-full font-samsung-medium text-4xl`}
      >
        {persen}%
      </h1>
    </div>
  );
}
