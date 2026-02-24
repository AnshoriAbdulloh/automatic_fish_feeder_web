import { RxHamburgerMenu } from "react-icons/rx";

type HeaderProps = {
  toggleAside: () => void;
};

export default function Navbar({ toggleAside }: HeaderProps) {
  return (
    <header
      className={`h-14 w-full px-4 fixed top-0 z-20 flex gap-3 items-center border-b border-b-gray-400 bg-white`}
    >
      <button
        onClick={toggleAside}
        className={`grid place-items-center font-bold font-dmSans aspect-square rounded-full lg:hidden `}
      >
        <RxHamburgerMenu
          className={`hover:bg-gray-200 box-content p-3 rounded-md  `}
        />
      </button>
      <span
        className={`font-samsung-medium xl:text-red-500 lg:text-amber-300 md:text-green-400 sm:text-purple-500 text-blue-300`}
      >
        AUTOMATIC FISH FEEDER
      </span>
    </header>
  );
}
