import { RiCalendarScheduleLine } from "react-icons/ri";
import { type IconType } from "react-icons";
import { Link } from "react-router-dom";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdLogout } from "react-icons/md";

type AsideProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: AsideProps) {
  return (
    <aside
      className={`${isOpen ? `w-64 border-r-gray-300` : ` lg:w-64 w-0 lg:border-r-gray-300 border-r-transparent`} 
      h-full fixed pt-14 top-0 bottom-0 left-0 shrink-0 lg:static lg:pt-0 z-10 overflow-hidden duration-200! border-r bg-white`}
    >
      <div className={`flex flex-col h-full p-4`}>
        <List
          className={``}
          title={"Schedule"}
          icon={RiCalendarScheduleLine}
          to='/schedule'
          onClick={onClose}
        />
        <List
          className={``}
          title={"History"}
          icon={AiOutlineSchedule}
          to='/history'
          onClick={onClose}
        />
        <List
          className={`mt-auto`}
          title={"Logout"}
          icon={MdLogout}
          to='/'
          onClick={onClose}
        />
      </div>
    </aside>
  );
}

interface ListProps {
  className: string;
  title: string;
  icon: IconType;
  to: string;
  onClick?: () => void;
}

const List = ({ className, title, icon: Icon, to, onClick }: ListProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${className} flex items-center gap-3 font-samsung-medium rounded-xl hover:bg-gray-200 px-4 py-3 cursor-pointer`}
    >
      <Icon size={20} />
      <span className={`text-sm`}>{title}</span>
    </Link>
  );
};
