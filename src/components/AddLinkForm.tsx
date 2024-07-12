    import React from "react";
    import { MenuItemType } from "../components/types";
import { useActiveId } from "../context/ActiveIdContext";
import { useMenuItems } from "../context/MenuItemsContext";

    const AddLinkForm = () =>{

        const urlRef = React.useRef<HTMLInputElement>(null);
        const labelRef = React.useRef<HTMLInputElement>(null);
        const { activeId } = useActiveId();
        const {  setMenuItems } = useMenuItems();

        const addMenuItemRecursive = (items: MenuItemType[], newItem: MenuItemType): MenuItemType[] => {
            return items.map(item => {
                if (item.id === activeId) {
                    return {
                        ...item,
                        subItems: [...item.subItems, newItem]
                    };
                } else if (Array.isArray(item.subItems) && item.subItems.length > 0) {
                    return {
                        ...item,
                        subItems: addMenuItemRecursive(item.subItems, newItem)
                    };
                } else {
                    return item;
                }
            });
        };


        const addMenuItem = (url: string, label: string) => {
            const newItem: MenuItemType = {
            id: new Date().getTime().toString(),
            label: label,
            url: url,
            subItems: [],
            };


            
            setMenuItems(prev => {
                if (activeId !== null) {
                    return addMenuItemRecursive(prev, newItem);
                } else {
                    return [...prev, newItem];
                }
            });
        };


        const handleSubmit = (e:React.FormEvent)=>{
            e.preventDefault();
            const url = urlRef.current?.value || '';
            const label = labelRef.current?.value || '';
            
            if(url.trim() === '' || label.trim() === '') return;


            addMenuItem(url,label);

            if (urlRef.current && labelRef.current) {
                urlRef.current.value = "";
                labelRef.current.value = "";
            }
        }


        return (
            <form className="w-full " onSubmit={handleSubmit}>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/5">
                        <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" htmlFor="add-url">
                            URL
                        </label>
                    </div>
                    <div className="md:w-4/5">
                        <input ref={urlRef} className=" appearance-none border  rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white " id="add-url" type="text" />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/5">
                        <label className="block text-gray-500 font-bold  mb-1 md:mb-0 pr-4" htmlFor="add-label">
                            Label
                        </label>
                    </div>
                    <div className="md:w-4/5">
                        <input ref={labelRef} className=" appearance-none border  rounded w-full py-2 px-4  leading-tight focus:outline-none focus:bg-white " id="add-label" type="text" />
                    </div>
                </div>
            
                
                <div className="md:flex md:items-center">
                    
                    <div className="ms-auto">
                        <button className="border  focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded" type="submit">
                            Add Menu item
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    export default AddLinkForm