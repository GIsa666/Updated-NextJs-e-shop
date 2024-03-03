"use client";

import { Order,User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/products/Heading";
import Status from "@/app/components/products/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/products/ActionBtn";
import { useRouter } from "next/navigation";
import moment from "moment";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";

interface OrdersClientProps {
  orders: ExtendedOrders[]; 
  item: CartProductType;
}
type ExtendedOrders = Order & { user: User };
const OrdersClient: React.FC<OrdersClientProps> = ({ orders,item }) => {
  
  
  let rows: any = [];
  const router = useRouter();
  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount(USD)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
   
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" ? (
              <Status
                bg="bg-slate-200"
                color="text-slate-700"
                icon={MdAccessTimeFilled}
                text="pending"
              />
            ) : params.row.paymentStatus === "complete" ? (
              <Status
                bg="bg-green-200"
                color="text-green-700"
                icon={MdDone}
                text="completed"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" ? (
              <Status
                bg="bg-slate-200"
                color="text-slate-700"
                icon={MdAccessTimeFilled}
                text="pending"
              />
            ) : params.row.deliveryStatus === "dispatched" ? (
              <Status
                bg="bg-purple-200"
                color="text-purple-700"
                icon={MdDeliveryDining}
                text="dispatched"
              />
            ) : params.row.deliveryStatus === "delivered" ? (
              <Status
                bg="bg-green-200"
                color="text-green-700"
                icon={MdDone}
                text="delivered"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  
  ];


  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 9 },
            },
          }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default OrdersClient;
