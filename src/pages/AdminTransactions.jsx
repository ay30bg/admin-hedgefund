import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import "../styles/transactions.css";

const AdminTransactions = () => {
  const [txs, setTxs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;
  const API = process.env.REACT_APP_API_URL;

  // =========================
  // TOKEN
  // =========================
  const getToken = () => localStorage.getItem("token");

  // =========================
  // FETCH TRANSACTIONS
  // =========================
  useEffect(() => {
    const fetchTx = async () => {
      try {
        const token = getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API}/api/admin/transactions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTxs(res.data);
      } catch (err) {
        console.error(err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTx();
  }, [API]);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (tx, status) => {
    try {
      const token = getToken();

      const endpoint =
        tx.type === "deposit" ? "deposit" : "withdrawal";

      await axios.patch(
        `${API}/api/admin/transactions/${endpoint}/${tx._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTxs((prev) =>
        prev.map((item) =>
          item._id === tx._id ? { ...item, status } : item
        )
      );
    } catch (err) {
      console.error(err?.response?.data || err.message);
    }
  };

  // =========================
  // HELPERS
  // =========================
  const formatType = (type) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
      case "confirmed":
        return "status approved";
      case "rejected":
      case "failed":
        return "status rejected";
      default:
        return "status pending";
    }
  };

  // =========================
  // FILTER
  // =========================
  const filteredData = useMemo(() => {
    return txs.filter(
      (t) =>
        t.userEmail
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        t.reference
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [txs, search]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // =========================
  // EXPORT CSV (RESTORED)
  // =========================
  const handleExport = () => {
    const csv = [
      ["Reference", "User", "Amount", "Type", "Status", "Date"],
      ...filteredData.map((t) => [
        t.reference,
        t.userEmail,
        t.amount,
        t.type,
        t.status,
        t.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  if (loading) {
    return <div className="tx-page">Loading transactions...</div>;
  }

  return (
    <div className="tx-page">
      <div className="tx-header">
        <h2>Transactions</h2>
      </div>

      {/* CONTROLS */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by user or reference..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="buttons-right">
          <button className="btn btn-export" onClick={handleExport}>
            Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>User</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((tx) => (
              <tr key={tx._id}>
                <td data-label="Reference">{tx.reference}</td>

                <td data-label="User">{tx.userEmail}</td>

                <td data-label="Amount">
                  ${tx.amount.toLocaleString()}
                </td>

                <td data-label="Type">{formatType(tx.type)}</td>

                <td data-label="Status">
                  <span className={getStatusClass(tx.status)}>
                    {formatType(tx.status)}
                  </span>
                </td>

                <td data-label="Date">{formatDate(tx.date)}</td>

                <td data-label="Action">
                  {tx.status === "pending" ||
                  tx.status === "waiting" ? (
                    <div className="actions">
                      <button
                        className="btn approve"
                        onClick={() => updateStatus(tx, "approved")}
                      >
                        Approve
                      </button>

                      <button
                        className="btn reject"
                        onClick={() => updateStatus(tx, "rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminTransactions;
