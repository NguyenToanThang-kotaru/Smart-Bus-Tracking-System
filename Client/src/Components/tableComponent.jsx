// src/components/Table.jsx
export default function TableCPN({ data }) {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">Không có dữ liệu</p>;
    }

    return (

        <table className="w-full border-collapse overflow-hidden select-none">
            <thead className="select-none">
                <tr className="bg-[#F5F5F5] text-mainBlue text-left text-[13px]">
                    {Object.keys(data[0]).map((key) => (
                        <th key={key} className="p-3 px-10 last:text-center">
                            {key.toUpperCase()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr
                        key={i}
                        className="bg-white border-b last:border-none hover:bg-gray-200 transition text-[13px]"
                    >
                        {Object.values(row).map((val, j, arr) => (
                            <td
                                key={j}
                                className={`p-2 px-10 ${
                                    j === arr.length - 1
                                        ? "flex justify-center items-center"
                                        : ""
                                }`}
                            >
                                {val}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
