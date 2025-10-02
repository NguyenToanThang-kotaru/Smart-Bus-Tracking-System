import React, { useEffect, useState } from "react";
import Table from "../../../Components/table_cpn";
import SearchBar from "../../../Components/searchBar";
import AddOrEditProduct from "./AddOrEditProduct";
import eye from "../../../assets/Icon/Eye.png";
import edit from "../../../assets/Icon/Edit.png";
import deleteIcon from "../../../assets/Icon/delete.png";
import axiosClient from "../../../middleware/axiosClient";
import { toast } from "react-toastify";
import ConfirmDialog from "../../../Components/dialog/confirmDialog";

export default function Products() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);


  const fetchProducts = async () => {
    try {
      const res = await axiosClient.get("/product");
      setProducts(res.data); // lưu vào state
      // console.log("Sản phẩm:", res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const nextId = async () => {
    try {
      const res = await axiosClient.get("/product/nextid");
      console.log("nextid: ", res.data.nextId);
      return res.data.nextId; // trả về mã tiếp theo từ server
    } catch (err) {
      console.error("Lỗi khi lấy mã sản phẩm tiếp theo:", err);
      return ""; // nếu lỗi thì trả về chuỗi rỗng
    }
  }

  const handleDeleteClick = (product) => {
    const deleteProduct = async () => {
      try {
        console.log("Xóa sản phẩm:", selectedProduct);
        const res = await axiosClient.put(`/product/delete/${selectedProduct.MaSP}`);
        toast.success(res.data.message || "Xóa sản phẩm thành công");
        // cập nhật lại danh sách
        setProducts((prev) => prev.filter((p) => p.MaSP !== product.MaSP));
        fetchProducts();
        setOpenConfirm(false);
      } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        toast.error("Xóa sản phẩm thất bại");
      }
      // console.log("Xóa sản phẩm:", product);
    };
    deleteProduct();
  };

  const handleSearch = (value) => {
    const fetchSearchedProducts = async () => {
      try {
        const res = await axiosClient.get(`/product/search?keyword=${value}`);
        setProducts(res.data); // lưu vào state
        // console.log("Sản phẩm tìm kiếm:", res.data);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm sản phẩm:", err);
      }
    };
    fetchSearchedProducts();
  };

  const handleAddProduct = async (product) => {
    try {
      product.MaSP = await nextId();
      console.log("Them SP: ", product);

      const res = await axiosClient.post("/product", product);
      toast.success(res.data.message);
      // setProducts(...products, res.data); // thêm sản phẩm mới vào danh sách
      console.log("res them sp: ", res.data);
      fetchProducts()
      // toast("Thêm sản phẩm thành công!");
    } catch (err) {
      console.error("Lỗi khi thêm:", err);
    }
  };


  const handleUpdateProduct = async (product) => {
    try {
      const res = await axiosClient.put(`/product/update/${product.MaSP}`, product);
      // console.log(res.data)
      // setProducts((prev) => prev.filter((p) => p.MaSP !== product.MaSP));
      toast.success(res.data.message)
      fetchProducts();
    } catch (err) {
      console.error("Lỗi khi sửa:", err);
    }
  };
  // Lấy danh sách sản phẩm
  const handleSubmit = (product) => {
    if (selectedProduct) {
      // có data => sửa
      handleUpdateProduct(product);
    } else {  
      // không có data => thêm
      handleAddProduct(product);
    }
    setShowAddForm(false);
    setSelectedProduct(null);
  };


  function renderAddOrEditProduct(open, data = null) {
    return (
      <AddOrEditProduct
        data={data}
        open={open}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleSubmit}
      />);
  }

  // if (showAddForm) {
  //   return (
  //     <AddOrEditProduct
  //       data={selectedProduct} // \ truyền data khi sửa
  //       onBack={() => {
  //         setShowAddForm(false);
  //         setSelectedProduct(null); // clear lại khi đóng form
  //       }}
  //       onAdd={(newProduct) => {
  //         setProducts((prev) => [...prev, newProduct]); // khi thêm mới
  //         setShowAddForm(false);
  //       }}
  //       onUpdate={(updatedProduct) => {
  //         setProducts((prev) =>
  //           prev.map((p) =>
  //             p.MaSP === updatedProduct.MaSP ? updatedProduct : p
  //           )
  //         ); // khi sửa thì cập nhật lại state
  //         setShowAddForm(false);
  //         setSelectedProduct(null);
  //       }}
  //     />
  //   );
  // }
  const data = { products };
  console.log(data);

  return (
    <div className="h-full flex flex-col">
      {renderAddOrEditProduct(showAddForm, selectedProduct, handleAddProduct)}
      <ConfirmDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleDeleteClick}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa sản phẩm "${selectedProduct?.TenSP}" không?`}
      />

      {!showAddForm && (
        <div className="bg-[#2A435D] p-4 flex items-center justify-between h-[75px]">
          <SearchBar placeholder="Tìm kiếm sản phẩm..." onSearch={handleSearch} />
          <button
            className="bg-white text-[#2A435D] cursor-pointer font-bold px-6 h-12 rounded-full text-xl shadow-md hover:bg-gray-100 flex items-center justify-center"
            onClick={() => {
              setSelectedProduct(null);   // form thêm mới
              setShowAddForm(true);
            }}
          >
            <span>THÊM</span>
          </button>
        </div>
      )}

      <div className="bg-[#FFF8F0] m-5 rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-1 overflow-y-auto scrollbar-hide">
        <Table
          className=""
          data={products.map((item, index) => ({
            // ...item,
            Id: index + 1,
            Image: (
              <img
                src={"../src/assets/food/" + item.AnhSP}
                alt="eye"
                className="w-20 h-20 cursor-pointer"
              />
            ),
            Name: item.TenSP,
            Price: Number(item.GiaSP).toLocaleString("vi-VN") + " VND",
            watch: (
              <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" />
            ),
            edit: (
              <img
                src={edit}
                alt="eye"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setSelectedProduct(item);
                  setShowAddForm(true);
                }}
              />
            ),
            delete: (
              <img
                src={deleteIcon}
                alt="eye"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setOpenConfirm(true);
                  setSelectedProduct(item);
                }}
              />
            ),
          }))}
        />
      </div>
    </div>
  );
}
