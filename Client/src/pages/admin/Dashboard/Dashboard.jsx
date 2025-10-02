import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Statictis from "./Statictics";
import Invoices from "./Invoice";
export default function Dashboard() {
  return (
    <div className="p-6 h-full bg-theme">
      <Tabs defaultValue="thongke" className="w-full h-full">
        {/* Thanh Tab */}
        <TabsList className="bg-gray-200 rounded-lg p-1">
          <TabsTrigger value="thongke" className="font-bold text-mainBlue cursor-pointer px-4 py-2 hover:bg-gray-300">
            THỐNG KÊ
          </TabsTrigger>
          <TabsTrigger value="hoadon" className="px-4 py-2 font-bold text-mainBlue cursor-pointer hover:bg-gray-300">
            HÓA ĐƠN
          </TabsTrigger>
        </TabsList>

        {/* Tab Thống Kê */}
        <TabsContent
          value="thongke"
          className="w-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] p-10 rounded-4xl max-h-full"
        >
          <Statictis />
        </TabsContent>

        {/* Tab Hóa Đơn */}
        <TabsContent
          value="hoadon"
          className="w-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] p-10 rounded-4xl max-h-full"
        >
          <Invoices />
        </TabsContent>
      </Tabs>
    </div>
  );
}
