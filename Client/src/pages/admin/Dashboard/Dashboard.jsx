import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {

  const [Schedule, setSchedule] = useState([
    { maLT: "LT000007", maTX: "TX000001", ngayHanhTrinh: "20-10-2025", caHanhTrinh: "Sáng", TrangThai: "1" },
    { maLT: "LT000008", maTX: "TX000002", ngayHanhTrinh: "20-10-2025", caHanhTrinh: "Chiều", TrangThai: "0" },
    { maLT: "LT000009", maTX: "TX000003", ngayHanhTrinh: "21-10-2025", caHanhTrinh: "Chiều", TrangThai: "1" },
  ]);

  const [ChartData, setChartData] = useState([]);

  const COLORS = ["#4CAF50", "#F44336"];

  useEffect(() => {
    const completed = Schedule.filter((obj) => obj.TrangThai === "1").length;
    const incompleted = Schedule.filter((obj) => obj.TrangThai === "0").length;

    setChartData([
      { name: "Hoàn thành", value: completed },
      { name: "Chưa hoàn thành", value: incompleted },
    ]);
  }, [Schedule]);

  return (
    <div className="p-[50px] h-full bg-theme flex gap-x-[50px] select-none">
      <div className="h-full w-1/3 bg-white rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] p-6 flex flex-col gap-y-[50px] items-center justify-start">
        <h2 className="text-2xl font-bold text-mainBlue">
          CHUYẾN ĐI HÔM NAY
        </h2>

        <div className="w-full h-2/3">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={ChartData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                dataKey="value" //thuộc tính của data => thuộc tính value của ChartData
              >
                {ChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="h-full w-2/3 bg-white rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] p-6">
        hello
      </div>
    </div>
  );
}

//useState: Dùng để lưu và thay đổi dữ liệu trong component
// Cú pháp
// const [state, setState] = useState(initialValue);

//useEffect: Dùng để chạy code khi có sự thay đổi hoặc khi component render
// useEffect(() => {
//   // Code chạy mỗi khi component render hoặc dependency thay đổi
// }, [dependency]);