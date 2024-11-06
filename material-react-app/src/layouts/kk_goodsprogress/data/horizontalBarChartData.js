import { Numbers, SquareFoot } from "@mui/icons-material";
import { stringify } from "stylis";

export default {
  item_lot_1: {
    labels: ["Geo-textile Bags", "Geo Fabric Sheet", "Sewing Thread"],
    datasets: [
      {
        label: "Lot-1 Supply of Goods",
        data: [396200, 36560, 2275830],
        color: "info", // Optional: you can add color here or handle it separately in the component
      },
      {
        label: "Lot-1 Physical Progress %",
        data: [15, 21, 8],
        color: "info",
      },
    ],
  },

  item_lot_2: {
    labels: ["Geo-textile Bags", "Geo Fabric Sheet", "Sewing Thread"],
    datasets: [
      {
        label: "Lot-2 Supply of Goods",
        data: [374300, 18280, 2275830],
        color: "info",
      },
    ],
  },
  item_lot_3: {
    labels: ["Geo-textile Bags", "Geo Fabric Sheet", "Sewing Thread"],
    datasets: [
      {
        label: "Lot-3 Supply of Goods",
        data: [284300, 18280, 2275830],
        color: "info",
      },
    ],
  },
};
