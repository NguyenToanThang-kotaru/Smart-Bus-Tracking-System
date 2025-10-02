// src/components/Table.jsx
export default function TableCPN({ data }) {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">Không có dữ liệu</p>;
    }

    return (

        <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
                <tr className="bg-[#2A435D] text-white text-left">
                    {Object.keys(data[0]).map((key) => (
                        <th key={key} className="p-3">
                            {key.toUpperCase()}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr
                        key={i}
                        className="bg-white border-b last:border-none hover:bg-gray-300 transition"
                    >
                        {Object.values(row).map((val, j) => (
                            <td key={j} className="p-3">
                                {val}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
