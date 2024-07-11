import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import MenuItem from './MenuItem';
import { MenuItemType } from './types';
import { useMenuItems } from '../context/MenuItemsContext';


const MenuBuilder = () => {

    const { menuItems,setMenuItems } = useMenuItems();


    const updateMenuItems = (newItems: MenuItemType[]) => {
        setMenuItems(newItems);
    };

    return (
         
            <div className='border-r-neutral-500 border'>
                <ReactSortable list={menuItems} setList={updateMenuItems} animation={200} swapThreshold={0.5}>
                    {menuItems.map(item => (
                        <MenuItem key={item.id} item={item}  />
                    ))}
                </ReactSortable>
            </div>
    );
};

export default MenuBuilder;
