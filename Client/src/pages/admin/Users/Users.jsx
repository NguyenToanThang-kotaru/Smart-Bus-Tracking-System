import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PhuHuynh from "./PhuHuynh/PhuHuynh"
export default function User() {
  return (
    <div className="p-6 h-full bg-theme">
      <Tabs defaultValue="PhuHuynh" className="w-full h-full">
        {/* Thanh Tab */}
        <TabsList className="bg-white border-b w-full flex justify-start align-middle px-6">
          {[
            ["PhuHuynh", "Phụ huynh"],
            ["TaiXeXeBuyt", "Tài xế xe buýt"],
            ["QuanLyXeBuyt", "Quản lý xe buýt"],
            ["QuanTriVien", "Quản trị viên"],
            ["PhanQuyenVaiTro", "Phân quyền vai trò"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="relative mr-20 text-left px-0 text-sm pl-0 pr-10 hover:opacity-45 cursor-pointer font-semibold text-mainBlue focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-none data-[state=active]:shadow-none data-[state=active]:after:content-[''] data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-[1px] data-[state=active]:after:h-[2px] data-[state=active]:after:bg-mainBlue"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>


        <TabsContent
          value="PhuHuynh"
          className="w-full rounded-4xl max-h-full"
        >
          {/* Phu Huynh Content */}
          <PhuHuynh />
        </TabsContent>

        <TabsContent
          value="TaiXeXeBuyt"
          className="w-full p-10 rounded-4xl max-h-full"
        >
          Tai Xe Content
          {/* <Invoices /> */}
        </TabsContent>
        <TabsContent
          value="QuanLyXeBuyt"
          className="w-full p-10 rounded-4xl max-h-full"
        >
          Quan Ly Xe Bus Content
          {/* <Invoices /> */}
        </TabsContent>
        <TabsContent
          value="QuanTriVien"
          className="w-full p-10 rounded-4xl max-h-full"
        >
          Quan Tri Vien Content
          {/* <Invoices /> */}
        </TabsContent>
        <TabsContent
          value="PhanQuyenVaiTro"
          className="w-full p-10 rounded-4xl max-h-full"
        >
          Phan Quyen Vai Tro Content
          {/* <Invoices /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
