// src/components/MenuItem.tsx
import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import { MenuItemType } from './types';
import { useActiveId } from '../context/ActiveIdContext';
import { useMenuItems } from '../context/MenuItemsContext';
import UpdateItem from './UpdateItem';
import ArrowIcon from '../assets/ArrowIcon';

interface MenuItemProps {
    item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {


    const {setMenuItems  } = useMenuItems();
    const { activeId, setActiveId } = useActiveId();


    const updateSubItems = (newSubItems: MenuItemType[]) => {
        setMenuItems(prevItems => prevItems.map(prevItem =>
            prevItem.id === item.id ? { ...prevItem, subItems: newSubItems } : prevItem
        ));
    };

    const handleClick = (id: string) => {
        if (id === activeId) {
            setActiveId(null);
        }
        else {
            setActiveId(id);
        }


    }

    return (
        <div className={`p-2 menu-item  rounded mb-2 ${activeId === item.id  ? 'active' : '' }`}>
            <div className={`  border`}>
            <h3 className='p-3 border-b flex justify-between cursor-pointer' onClick={() => handleClick(item.id)} >{item.label} <ArrowIcon/> </h3>
            {
                activeId === item.id  && (
                    <UpdateItem id={item.id} label={item.label} url={item.url}/>
                )
            }
            </div>

            
            {item.subItems && (
                <ReactSortable
                    list={item.subItems}
                    setList={updateSubItems}
                    animation={200}
                    swapThreshold={0.5}
                    group={{ name: 'shared', pull: 'clone', put: false }}
                >
                    {item.subItems.map(subItem => (
                        <MenuItem key={subItem.id} item={subItem}  />
                    ))}
                </ReactSortable>
            )}
        </div>
    );
};

export default MenuItem;
