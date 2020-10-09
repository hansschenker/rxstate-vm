export interface Item {
  id: number;
  name: string;
}
export interface Viewmodel<T> {
  selectedItem: T | undefined;
  items: T[];
}
