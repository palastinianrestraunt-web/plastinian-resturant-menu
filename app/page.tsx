import menuData from "@/public/data.json";
import { groupArrayByCategory } from "@/helpers";
import { MenuItem } from "@/models/menu";
import MenuPage from "./components/MenuPage";

export default function Home() {
  const data = menuData as unknown as MenuItem[];
  const grouped = groupArrayByCategory(data);
  return <MenuPage grouped={grouped} />;
}
