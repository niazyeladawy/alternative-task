export interface MenuItemType {
    id: string;
    label: string;
    url: string;
    subItems?: MenuItemType[];
}
export interface NavbarProps {
    items: MenuItemType[];
}