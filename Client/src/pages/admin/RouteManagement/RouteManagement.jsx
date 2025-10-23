import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContentTuyenDuong from "./Route/RouteContent"
import ContentTram from "./Station/StationContent"
import ContentXeBuyt from "./Bus/BusContent"

export default function RouteManagement() {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="TuyenDuong" className="w-full h-full select-none">
        <TabsList className="bg-white shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-full flex justify-start align-middle rounded-none gap-6 h-1/15 p-3 px-6">
          {[
            ["TuyenDuong", "Tuyến đường"],
            ["Tram", "Trạm"],
            ["XeBuyt", "Xe buýt"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-none w-fit flex-none text-left px-1 justify-start flex-shrink-0 border-b-2 border-transparent text-xl
                relative hover:text-mainYellow cursor-pointer font-bold text-mainBlue 
                data-[state=active]:shadow-none 
                data-[state=active]:after:content-[''] data-[state=active]:after:absolute 
                data-[state=active]:after:left-1/2 data-[state=active]:after:translate-x-[-50%] 
                data-[state=active]:after:bottom-[-1px] data-[state=active]:after:w-[50px] 
                data-[state=active]:after:h-[2px] data-[state=active]:after:bg-mainBlue 
                hover:data-[state=active]:after:bg-mainYellow transition-all duration-400 ease-in-out"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="TuyenDuong">
          <ContentTuyenDuong />
        </TabsContent>

        <TabsContent value="Tram">
          <ContentTram />
        </TabsContent>

        <TabsContent value="XeBuyt">
          <ContentXeBuyt />
        </TabsContent>
      </Tabs>
    </div>
  );
}

