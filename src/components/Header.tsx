import { Menu } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
  onCollapseClick: () => void;
};

const Header = ({ onMenuClick, onCollapseClick }: HeaderProps) => {
  return (
    <div className="bg-[#F6F5F1] p-4 shadow-xl/30 border-b border-[#E7E4DC]">
      <div className="">
        <div className="flex gap-8 items-center">
          <button className="md:hidden" onClick={onMenuClick}>
            {" "}
            <Menu size={25} />
          </button>

          {/* Desktop collapse toggle — only shows at md and above */}
          <button className="hidden md:block" onClick={onCollapseClick}>
            <Menu size={25} />
          </button>

          <div>
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" required placeholder="Search" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
