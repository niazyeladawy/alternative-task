import { NavbarProps } from "../types";

const NavbarItem: React.FC<NavbarProps> = ({ items }) => {
    return (
        <ul className="  text-sm text-gray-700 dark:text-gray-200 submenu absolute shadow">
            {items.map(item => (
                <li key={item.id} className="li">
                    <a href={item.url} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        {item.label}
                    </a>
                    {item.subItems && item.subItems.length > 0 && <NavbarItem items={item.subItems} />}
                </li>
            ))}
        </ul>
    );
};

export default NavbarItem