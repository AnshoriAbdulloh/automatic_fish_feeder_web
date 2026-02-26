import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import NextTimeFeed from "./components/NextTimeFeed";
import Time from "./components/Time";
import History from "./components/History";
import Schedule from "./components/Schedule";
import Feed from "./components/Feed";

export default function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const IO_URL = import.meta.env.VITE_AIO_URL;
  const IO_KEY = import.meta.env.VITE_AIO_KEY;

  return (
    <div
      className={`**:transition-all **:duration-300 **:ease-in-out
      h-screen  pt-14`}
    >
      <Navbar toggleAside={() => setIsOpen(!isOpen)} />
      <div className={`h-full flex bg-gray-100`}>
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <main className={`relative w-full overflow-scroll`}>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <button
                    type='button'
                    onClick={async () => {
                      try {
                        const response = await fetch(IO_URL, {
                          method: "POST",
                          headers: {
                            "X-AIO-Key": IO_KEY,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ value: "test" }),
                        });
                        if (response.ok) {
                          console.log(`succes`);
                        } else {
                          console.log(`error`);
                        }
                      } catch (error) {
                        console.error("error:", error);
                      }
                    }}
                    className={`fixed z-50 bg-white rounded-xl py-2 px-20 mb-4 mr-4 border border-black/30 right-0 bottom-0 cursor-pointer hover:bg-gray-200`}
                  >
                    FEED NOW
                  </button>
                  <div className={`md:flex static`}>
                    <div className={`flex-1`}>
                      <NextTimeFeed />
                      <Time />
                    </div>
                    <div className={`flex-1 flex md:flex-col md:max-w-80`}>
                      <Schedule />
                      <Feed />
                    </div>
                  </div>
                  <History />
                </>
              }
            />
            <Route path='/schedule' element={<Schedule />} />
            <Route path='/history' element={<History editable={true} />} />
          </Routes>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`${isOpen ? `pointer-events-auto opacity-50` : `pointer-events-none opacity-0`} fixed w-full h-screen top-0 bottom-0 text-transparent bg-black`}
          >
            penutup hitam
          </div>
        </main>
      </div>
    </div>
  );
}
