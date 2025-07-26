import React, { useEffect, useState } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function List() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1); // reset to first page when changing rows per page
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://reactinterviewtask.codetentaclestechnologies.in/api/api/user-list?page=${page}&per_page=${rowsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      if (result && result.data) {
        const transformed = result.data.map((user, index) => ({
          id: user.id,
          srno: (page - 1) * rowsPerPage + index + 1,
          name: user.name || "-",
          email: user.email || "-",
          phoneno: user.phone || "-",
          gender: user.gender || "-",
        }));

        setUsers(transformed);
        setTotalPages(result.lastPage || 1);
      } else {
        setError(result.message || "Failed to load users");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://reactinterviewtask.codetentaclestechnologies.in/api/api/user-delete/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      const result = await res.json();
      if (res.ok) {
        fetchUsers(); // refresh list
      } else {
        alert(result.message || "Delete failed");
      }
    } catch (err) {
      alert("Network error while deleting user.");
    }
  };

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
          {error && <p className="text-red-500 mb-3">{error}</p>}
          <Table
            cols={columns}
            data={users}
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
