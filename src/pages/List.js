import React, { useState, useMemo } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useGetUserListQuery, useDeleteUserMutation } from "../services/adminApi";

export default function List() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const token = localStorage.getItem("token");

  const {
    data: result,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserListQuery({ page, perPage: rowsPerPage, token });

  const [deleteUser] = useDeleteUserMutation();

  const users = useMemo(() => {
    if (!result || !result.data) return [];
    return result.data.map((user, index) => ({
      id: user.id,
      srno: (page - 1) * rowsPerPage + index + 1,
      name: user.name || "-",
      email: user.email || "-",
      phoneno: user.phone || "-",
      gender: user.gender || "-",
    }));
  }, [result, page, rowsPerPage]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser({ id, token }).unwrap();
      refetch(); // refresh user list after deletion
    } catch (err) {
      alert(err?.data?.message || "Delete failed");
    }
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  const columns = [
    { title: "#", dataIndex: "srno", key: "srno" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone No", dataIndex: "phoneno", key: "phoneno" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Action",
      render: (item) => (
        <div className="flex gap-1 text-center justify-center">
          <button onClick={() => handleDelete(item.id)}>
            <Trash2 color="#ff0000" size={16} />
          </button>
        </div>
      ),
      key: "action",
      width: 90,
    },
  ];

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <h3 className="!text-defaulttextcolor text-left text-[1.125rem] font-semibold">List</h3>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="flex justify-end mb-3 p-2">
            <Link
              to="/Stepperform"
              className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
            >
              Add
            </Link>
          </div>
          {isError && <p className="text-red-500 mb-3">{error?.data?.message || "Failed to load users"}</p>}
          <Table
            cols={columns}
            data={users}
            page={page}
            totalPages={result?.lastPage || 1}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            isTableLoading={isLoading}
          />
        </div>
      </div>
    </Layout>
  );
}
