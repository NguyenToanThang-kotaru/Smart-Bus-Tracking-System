import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContentTuyenDuong from "./Route/RouteContent"
import ContentTram from "./Station/StationContent"
import ContentXeBuyt from "./Bus/BusContent"

export default function RouteManagement() {
  return (
    <div className="w-full h-full">
      <Tabs defaultValue="TuyenDuong" className="w-full h-full select-none">
        <TabsList className="bg-white shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-full flex justify-start align-middle rounded-none gap-5 h-1/15 py-2 px-4">
          {[
            ["TuyenDuong", "Tuyến đường"],
            ["Tram", "Trạm"],
            ["XeBuyt", "Xe buýt"],
          ].map(([value, label]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-none w-fit flex-none text-left px-1 justify-start flex-shrink-0 border-b-2 border-transparent text-[18px]
                relative hover:text-mainYellow cursor-pointer font-bold text-mainBlue 
                data-[state=active]:shadow-none data-[state=active]:px-3
                data-[state=active]:after:content-[''] data-[state=active]:after:absolute 
                data-[state=active]:after:left-1/2 data-[state=active]:after:translate-x-[-50%] 
                data-[state=active]:after:bottom-[-1px] data-[state=active]:after:w-[50px] 
                data-[state=active]:after:h-[1.8px] data-[state=active]:after:bg-mainBlue   
                hover:data-[state=active]:after:bg-mainYellow transition-all duration-400 ease-in-out"
              // className="rounded-none border-none w-fit flex-none text-left px-1 justify-start flex-shrink-0 border-transparent text-[18px]
              //   relative hover:text-mainYellow cursor-pointer font-bold text-mainBlue 
              //   data-[state=active]:shadow-[0_-2px_3px_rgba(0,0,0,0.25),2px_0_3px_rgba(0,0,0,0.25),-2px_0_3px_rgba(0,0,0,0.25)]
              //   data-[state=active]:rounded-tl-2xl data-[state=active]:rounded-tr-2xl
              //   data-[state=active]:after:content-[''] data-[state=active]:after:absolute 
              //   data-[state=active]:bottom-[-1px] 
              //   data-[state=active]:border-b-0
              //   data-[state=active]:px-4
              //   data-[state=active]:z-20
              //   data-[state=active]:before:content-[''] 
              //   data-[state=active]:before:absolute 
              //   data-[state=active]:before:bottom-[-4px]
              //   data-[state=active]:before:left-0
              //   data-[state=active]:before:w-full
              //   data-[state=active]:before:h-[4px]
              //   data-[state=active]:before:bg-white
              //   hover:data-[state=active]:after:bg-mainYellow transition-all duration-400 ease-in-out"
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

