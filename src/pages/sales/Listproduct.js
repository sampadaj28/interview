import React, { useEffect, useState } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://reactinterviewtask.codetentaclestechnologies.in/api/api/product-list?page=${page}&per_page=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      if (res.ok && result.data) {
        const transformed = result.data.map((item, index) => ({
          srno: (page - 1) * rowsPerPage + index + 1,
          id: item.id,
          name: item.name || "-",
          productimg: item.image || "",
          description: item.description || "-",
          Price: item.price ? `Rs.${item.price}/-` : "-",
        }));

        setProducts(transformed);
        setTotalPages(result.lastPage || 1);
      } else {
        setError(result.message || "Failed to load products");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, rowsPerPage]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const columns = [
    { title: "#", dataIndex: "srno", key: "srno" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    {
      title: "Product Image",
      dataIndex: "productimg",
      key: "productimg",
      render: (img) => (
        <div className="m-auto flex justify-center">
          <img
            src={img || "/assets/image/shirt.webp"}
            alt="product"
            width="50px"
            height="50px"
            className="rounded"
          />
        </div>
      ),
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Price", dataIndex: "Price", key: "Price" },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="!text-defaulttextcolor text-left text-[1.125rem] font-semibold">
          Product
        </h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Add-product"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add Product
            </Link>
          </div>
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <Table
            cols={columns}
            data={products}
            rowsPerPage={rowsPerPage}
            page={page}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            isTableLoading={isLoading}
          />
        </div>
      </div>
    </Layout>
  );
}
