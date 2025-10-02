import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "../../../../src/index.css";
import axiosClient from "../../../middleware/axiosClient";
import { useState, useEffect, use } from "react";

export default function Statistics() {
  const [ingredients, setIngredients] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [stay, setStay] = useState(0); // số khách tại quán
  const [takeAway, setTakeAway] = useState(0); // số khách mang về
  const [products, setProducts] = useState([]); 

  let totalProfit = 0;

  // Lấy danh sách nguyên liệu
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await axiosClient.get("/ingredient");
        if (JSON.stringify(res.data) !== JSON.stringify(ingredients)) {
          setIngredients(res.data);
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu nguyên liệu:", err);
      }
    };
    fetchIngredients();
  }, []);

  // Lấy doanh thu trong tháng
  useEffect(() => {
    const fetchRevenueInMonth = async () => {
      try {
        const res = await axiosClient.get("/invoice/month/2025/8");
        setRevenue(res.data); // lưu vào state
        console.log("Doanh thu:", res.data);
      } catch (err) {
        console.error("Lỗi khi lấy doanh thu trong tháng:", err);
      }
    };
    fetchRevenueInMonth();
  }, []); // chỉ gọi 1 lần khi mount

  for (const item of revenue) {
    totalProfit += Number(item.TongTien);
  }

  // Dữ liệu biểu đồ tỉ lệ
  useEffect(() => {
    const fetchTakeAway = async () => {
      try {
        const res = await axiosClient.get("/invoice/takeaway");
        setTakeAway(res.data.length);
      } catch (err) {
        console.error("Lỗi khi lấy số lượng khách mang về:", err);
      }
    }
    const fetchStay = async () => {
      try {
        const res = await axiosClient.get("/invoice/stay");
        setStay(res.data.length);
      } catch (err) {
        console.error("Lỗi khi lấy số lượng khách tại quán:", err);
      }
    }
    fetchTakeAway();
    fetchStay();
  });

  // Lấy top 5 món bán chạy nhất
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axiosClient.get("/product/count");
        setProducts(res.data.slice(0, 5)); // Lấy 5 món bán chạy nhất
        console.log("Top món bán chạy:", res.data);
      } catch (err) {
        console.error("Lỗi khi lấy top món bán chạy:", err);
      }
    };
    fetchTopProducts();
  }, [])

  const data = [
    { name: "Mang về", value: takeAway },
    { name: "Tại quán", value: stay },
  ];
  const COLORS = ["#FACC15", "#22C55E"]; // vàng và xanh lá

  return (
    <div className="w-full h-full flex gap-5 ">
      {/* Trạng thái tồn kho */}
      <div className="bg-white p-4 min-h-full w-2/7 rounded-2xl shadow-md flex flex-col">
        <h2 className="font-bold mb-5 text-mainBlue">Trạng Thái Tồn Kho</h2>

        <div
          className=" 
        space-y-2 flex-1 overflow-y-auto pr-2
        max-h-[40vh]    /* mobile */
        sm:max-h-[50vh] /* >=640px */
        md:max-h-[60vh] /* >=768px */
        lg:max-h-[70vh] /* >=1024px */
        xl:max-h-[467px] /* >=1280px */
        2xl:max-h-[597px] 
        "
        >
          {ingredients
            // .filter(item => item.SoLuongTon < 10) // chỉ những món sắp hết
            .sort((a, b) => a.SoLuongTon - b.SoLuongTon) // sắp xếp tăng dần số lượng tồn
            .map((item, i) => (
              <div
                key={item.id || i} // ưu tiên id từ DB
                className="bg-mainRed border-4 border-[#8C0004] justify-between items-center flex text-white p-2 rounded-3xl font-bold"
              >
                <div>
                  <div>{item.TenNL}</div>
                  <div>
                    Còn {item.SoLuongTon} ({item.DonViNL})
                  </div>
                </div>
                <div className="text-center">
                  {item.quantity < 5 ? "Sắp hết" : "Đủ dùng"}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className=" w-full flex gap-5 flex-col max-h-467">
        <div className="flex h-2/3 gap-5 w-full">
          {/* Doanh thu theo tháng */}
          <div className="bg-white p-4 rounded-2xl shadow-md w-3/4">
            <h2 className="font-bold mb-2 border-b-mainBlue border-b-4 text-mainBlue text-2xl">
              Doanh Thu Theo Tháng
            </h2>
            <div className="flex flex-col justify-between h-4/5">
              {/* Danh sách ngày + giá */}
              <ul
                className="
              space-y-1 overflow-y-auto        
              max-h-[40vh]    /* mobile */
              sm:max-h-[50vh] /* >=640px */
              md:max-h-[60vh] /* >=768px */
              lg:max-h-[70vh] /* >=1024px */
              xl:max-h-[150px] /* >=1280px */
              2xl:max-h-[191.75px]"
              >
                {revenue

                  .sort((a, b) => new Date(b.NgayXuat) - new Date(a.NgayXuat))

                  .map((item, i) => (
                    <li
                      key={i}
                      className="flex font-bold text-2xl text-mainBlue justify-between"
                    >
                      <span>
                        {new Date(item.Ngay).toLocaleDateString("vi-VN")}
                      </span>
                      <span>
                        {Number(item.TongTien).toLocaleString("vi-VN")} VND
                      </span>
                    </li>
                  ))}
              </ul>

              {/* Tổng */}
              <p className="mt-2 text-left font-bold text-2xl text-mainBlue">
                Tổng: {totalProfit.toLocaleString("vi-VN")} VNĐ
              </p>
            </div>
          </div>

          {/* Biểu đồ tỉ lệ */}
          <div className="bg-white p-4 rounded-2xl w-1/4 shadow-md">
            <h2 className="font-bold mb-2">Tỉ Lệ</h2>
            <div className="flex justify-center">
              {/* Bạn có thể thay bằng chart từ recharts */}
              <PieChart width={200} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="mt-2 flex-col text-center text-sm">
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-yellow-300 inline-block"></div> Mang
                về
              </div>
              <div className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-green-500 inline-block"></div> Tại
                quán
              </div>
            </div>
          </div>
        </div>

        {/* Top  món bán chạy */}
        <div className="bg-white flex-1 p-4 rounded-2xl shadow-md ">
          <h2 className="font-bold mb-2 text-2xl text-mainBlue w-full border-b-4 border-b-mainBlue">
            Top Món Bán Chạy
          </h2>
          <ul className="space-y-1 overflow-y-scroll max-h-2/3">
            {products.map((item, i) => (
              <li key={item.MaSP || i }className="flex font-bold text-l  justify-between">
                <span>{item.TenSP}</span>
                <span>{Number(item.TongSoLuong).toLocaleString("vi-VN")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
