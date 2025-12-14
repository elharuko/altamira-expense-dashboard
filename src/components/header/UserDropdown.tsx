import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useAuth } from "../../context/AuthContext";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const provider = user.app_metadata?.provider;

  if (!user) return null;

  const name =
    user.user_metadata?.full_name || user.user_metadata?.name || user.email;

  const email = user.email;

  const avatar =
    user.user_metadata?.avatar_url || user.user_metadata?.picture || null;

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    closeDropdown();
  }

  const isEmailProvider = provider === "email";

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11 flex items-center justify-center">
          {avatar && !isEmailProvider ? (
            <img
              src={avatar}
              alt="User"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-[#049c8d] to-[#27255f] text-white text-sm font-semibold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">{name}</span>

        <svg
          className={`stroke-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] w-[260px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div className="mb-3">
          <span className="block font-medium text-gray-700 text-theme-sm">
            {name}
          </span>
          <span className="block text-theme-xs text-gray-500">{email}</span>
        </div>

        <ul className="flex flex-col gap-1 pt-3 pb-3 border-b">
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/profile">
              Edit profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem onItemClick={closeDropdown} tag="a" to="/profile">
              Account settings
            </DropdownItem>
          </li>
        </ul>

        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2 mt-3 font-medium text-red-600 rounded-lg hover:bg-red-50"
        >
          Sign out
        </button>
      </Dropdown>
    </div>
  );
}
