import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

// Assume these icons are imported from an icon library
import {
  ChevronDownIcon,
  HorizontaLDots,
  powerIcon as PowerIcon,
  WorkspaceIcon,
  MessageIcon,
  ReportIcon,
  GridIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuth } from "../context/AuthContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
  action?: () => void;
};

const navItems: NavItem[] = [
   {
     icon: <GridIcon />,
     name: "Inicio",
     path: "/",
   },
  //{
  //  icon: <CalenderIcon />,
  //  name: "Calendario",
  //  path: "/calendar",
  //},
  {
    icon: <MessageIcon />,
    name: "Inbox",
    path: "/recibidos",
  },
  {
    icon: <ReportIcon />,
    name: "Reportes",
    path: "/informes",
  },
  {
    icon: <WorkspaceIcon />,
    name: "Espacios",
    path: "/espacios",
  },
  //{
  //  name: "Formularios",
  //  icon: <ListIcon />,
  //  subItems: [{ name: "Elementos de Formulario", path: "/form-elements", pro: false }],
  //},
  //{
  //  name: "Tablas",
  //  icon: <TableIcon />,
  //  subItems: [{ name: "Tablas Básicas", path: "/basic-tables", pro: false }],
  //},
  //{
  //  name: "Páginas",
  //  icon: <PageIcon />,
  //  subItems: [
  //   { name: "Página en Blanco", path: "/blank", pro: false },
  //    { name: "Error 404", path: "/error-404", pro: false },
  // ],
  //},
];

const othersItemsStatic: NavItem[] = [
  //{
  //  icon: <PieChartIcon />,
  //  name: "Gráficos",
  //  subItems: [
  //    { name: "Gráfico de Líneas", path: "/line-chart", pro: false },
  //    { name: "Gráfico de Barras", path: "/bar-chart", pro: false },
  //  ],
  //},
  //{
  //  icon: <BoxCubeIcon />,
  //  name: "Elementos UI",
  //  subItems: [
  //    { name: "Alertas", path: "/alerts", pro: false },
  //    { name: "Avatar", path: "/avatars", pro: false },
  //    { name: "Insignias", path: "/badge", pro: false },
  //    { name: "Botones", path: "/buttons", pro: false },
  //    { name: "Imágenes", path: "/images", pro: false },
  //    { name: "Videos", path: "/videos", pro: false },
  //  ],
  //},
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  const othersItems: NavItem[] = [
    ...othersItemsStatic,
  ];

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group flex flex-col items-center gap-2 ${openSubmenu?.type === menuType && openSubmenu?.index === index
                ? "menu-item-active"
                : "menu-item-inactive"
                } cursor-pointer`}
            >
              <span
                className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>
              <span className="menu-item-text text-center text-xs">{nav.name}</span>
              {(isExpanded || isMobileOpen) && (
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                    ? "rotate-180 text-brand-500"
                    : ""
                    }`}
                />
              )}
            </button>
          ) : nav.action ? (
            <button
              onClick={nav.action}
              className={`menu-item group flex flex-col items-center gap-2 menu-item-inactive cursor-pointer hover:text-brand-500 transition-colors`}
            >
              <span className={`menu-item-icon-size menu-item-icon-inactive`}>
                {nav.icon}
              </span>
              <span className="menu-item-text text-center text-xs">{nav.name}</span>
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group flex flex-col items-center gap-2 ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`menu-item-icon-size ${isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>
                <span className="menu-item-text text-center text-xs">{nav.name}</span>
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${isActive(subItem.path)
                        ? "menu-dropdown-item-active"
                        : "menu-dropdown-item-inactive"
                        }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${isActive(subItem.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                              } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#180D5B] dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[340px]"
          : "w-[120px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
    >
      <div
        className={`py-8 flex ${!isExpanded ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/">
          {isExpanded || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo-blanco.png"
                alt="Logo"
                width={220}
                height={40}
                style={{ margin: 0 }}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-blanco.png"
                alt="Logo"
                width={220}
                height={40}
                style={{ margin: 0 }}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-mobil.png"
              alt="Logo"
              width={48}
              height={48}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-white ${!isExpanded
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-white ${!isExpanded
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
      </div>
      <div className="mt-auto border-t border-gray-700 pt-4 pb-4">
        <button
          onClick={handleLogout}
          className={`w-full menu-item group menu-item-inactive cursor-pointer flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-colors duration-200 hover:text-brand-500 ${
            !isExpanded ? "lg:justify-center" : "lg:justify-start"
          }`}
        >
          <PowerIcon className="w-6 h-6" />
          {(isExpanded || isMobileOpen) && (
            <span className="text-xs font-medium text-gray-300 text-center">
              Cerrar Sesión
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
