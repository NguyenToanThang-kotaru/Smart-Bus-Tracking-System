import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsContent  from "./Student/StudentContent"

export default function StudentManagement() {
  return (
    <div className="h-full bg-theme">
      <Tabs defaultValue="HocSinh" className="w-full h-full select-none">
        <TabsList className="bg-white shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] w-full flex justify-start align-middle rounded-none gap-5 h-1/15 p-2 px-5">
          {[
            ["HocSinh", "Học Sinh"],
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


        <TabsContent value="HocSinh" className="w-full rounded-4xl max-h-full">
          <StudentsContent />
        </TabsContent>

        
      </Tabs>
    </div>
  );
}
