import { MenuItem, Categories, MenuCategory } from "@/models/menu";

export const groupArrayByCategory: (arr: MenuItem[]) => Array<MenuCategory> = (
  arr
) => {
  const newMenu: Array<MenuCategory> = [];
  if (arr) {
    const categoriesSet = new Set<Categories>(
      arr.map((e: MenuItem) => e.category)
    );
    categoriesSet.forEach((category: Categories) => {
      newMenu.push({
        category: category,
        items: arr.filter((item: MenuItem) => item.category === category),
      });
    });
  }
  return newMenu;
};
