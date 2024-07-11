import React, { createContext, useContext, useState } from 'react';
import { MenuItemType } from '../components/types';

interface MenuItemsContextType {
    menuItems: MenuItemType[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItemType[]>>;
    updateMenuItem: (itemId: string, updatedLabel: string, updatedUrl: string) => MenuItemType[];
    deleteMenuItem: (itemId: string, items?: MenuItemType[]) => MenuItemType[];
}

const initialMenuItems: MenuItemType[] = [
    {
        id: '1',
        label: 'Home',
        url: '/',
        subItems: []
    },
    {
        id: '2',
        label: 'About',
        url: '/about',
        subItems: [
            {
                id: '3',
                label: 'Team',
                url: '/about/team',
            },
            {
                id: '4',
                label: 'Careers',
                url: '/about/careers',
            },
        ],
    },
];

const MenuItemsContext = createContext<MenuItemsContextType | undefined>(undefined);

export const useMenuItems = () => {
    const context = useContext(MenuItemsContext);
    if (!context) {
        throw new Error('useMenuItems must be used within a MenuItemsProvider');
    }
    return context;
};

interface MenuItemsProviderProps {
    children: React.ReactNode;
}

export const MenuItemsProvider: React.FC<MenuItemsProviderProps> = ({ children }) => {
    const [menuItems, setMenuItems] = useState<MenuItemType[]>(initialMenuItems);

    const updateMenuItem = (itemId: string, updatedLabel: string, updatedUrl: string, items: MenuItemType[] = menuItems): MenuItemType[] => {

        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    label: updatedLabel,
                    url: updatedUrl
                };
            } else if (item.subItems && item.subItems.length > 0) {
                return {
                    ...item,
                    subItems: updateMenuItem(itemId, updatedLabel, updatedUrl, item.subItems)
                };
            }
            return item;
        });

        return updatedItems;
    };

    const deleteMenuItem = (itemId: string, items: MenuItemType[] = menuItems) => {
        const updatedItems = items.filter(item => {
            if (item.id === itemId) {
                return false; // Exclude item to be deleted
            } else if (item.subItems && item.subItems.length > 0) {
                item.subItems = deleteMenuItem(itemId, item.subItems); // Recursively delete from sub-items
                return true;
            }
            return true;
        });

            // setMenuItems(updatedItems);
            return updatedItems 

    };

    const contextValue: MenuItemsContextType = {
        menuItems,
        setMenuItems,
        updateMenuItem,
        deleteMenuItem
    };

    return (
        <MenuItemsContext.Provider value={contextValue}>
            {children}
        </MenuItemsContext.Provider>
    );
};
