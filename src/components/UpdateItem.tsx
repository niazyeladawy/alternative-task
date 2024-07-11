import React, { useRef } from 'react';
import { useMenuItems } from '../context/MenuItemsContext';

interface ItemProps {
    id: string;
    label: string;
    url: string;
}

const UpdateItem: React.FC<ItemProps> = ({ id, label, url }) => {
    const urlRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLInputElement>(null);
    const { updateMenuItem, setMenuItems, deleteMenuItem } = useMenuItems()

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        const updated = updateMenuItem(id, labelRef.current?.value || '', urlRef.current?.value || '');
        setMenuItems(updated)

    };

    const handleDelete = () => {
        const updated = deleteMenuItem(id);
        setMenuItems(updated)

    }

    return (
        <form className="w-full mt-2 p-3" onSubmit={handleSubmit}>
            <div className="md:flex justify-between ">


                <div className="md:flex md:items-center mb-6 md:w-2/5">
                    <div className="md:w-1/5">
                        <label
                            className="block text-black font-bold mb-1 md:mb-0 pr-4"
                            htmlFor="update-url"
                        >
                            URL
                        </label>
                    </div>
                    <div className="md:w-4/5">
                        <input
                            defaultValue={url}
                            ref={urlRef}
                            className=" appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            id="update-url"
                            type="text"
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6  md:w-2/5">
                    <div className="md:w-1/5">
                        <label
                            className="block text-black font-bold mb-1 md:mb-0 pr-4"
                            htmlFor="update-label"
                        >
                            Label
                        </label>
                    </div>
                    <div className="md:w-4/5">
                        <input
                            defaultValue={label}
                            ref={labelRef}
                            className=" appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                            id="update-label"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="">
                    <button
                        onClick={handleDelete}
                        className="  text-blue-500 font-bold py-2 px-4 rounded"
                        type="button"
                    >
                        delete
                    </button>
                    <button
                        className="border focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Update  item
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateItem;
