// import React, { useState, useMemo } from "react";
// import "../styles/transactions.css";

// const AdminTransactions = () => {
//   const [txs, setTxs] = useState([
//     {
//       _id: "1",
//       reference: "TXN-1001",
//       userEmail: "user1@mail.com",
//       amount: 200,
//       type: "deposit",
//       status: "pending",
//       date: "2026-05-01",
//     },
//     {
//       _id: "2",
//       reference: "TXN-1002",
//       userEmail: "user2@mail.com",
//       amount: 500,
//       type: "withdrawal",
//       status: "approved",
//       date: "2026-05-03",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;

//   const updateStatus = (id, status) => {
//     setTxs((prev) =>
//       prev.map((tx) =>
//         tx._id === id ? { ...tx, status } : tx
//       )
//     );
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "approved":
//         return "status approved";
//       case "rejected":
//         return "status rejected";
//       default:
//         return "status pending";
//     }
//   };

//   const formatType = (type) =>
//     type.charAt(0).toUpperCase() + type.slice(1);

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-NG", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//   /* =========================
//      SEARCH FILTER
//   ========================= */
//   const filteredData = useMemo(() => {
//     return txs.filter(
//       (t) =>
//         t.userEmail.toLowerCase().includes(search.toLowerCase()) ||
//         t.reference.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [txs, search]);

//   /* =========================
//      PAGINATION
//   ========================= */
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);

//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   /* =========================
//      EXPORT CSV
//   ========================= */
//   const handleExport = () => {
//     const csv = [
//       [
//         "Reference",
//         "User",
//         "Amount",
//         "Type",
//         "Status",
//         "Date",
//       ],
//       ...filteredData.map((t) => [
//         t.reference,
//         t.userEmail,
//         `₦${t.amount}`,
//         t.type,
//         t.status,
//         t.date,
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csv], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "transactions.csv";
//     link.click();
//   };

//   return (
//     <div className="tx-page">
//       <div className="tx-header">
//         <h2>Transactions</h2>
//       </div>

//       {/* =========================
//           TABLE CONTROLS
//       ========================= */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by user or reference..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />

//         <div className="buttons-right">
//           <button className="btn btn-export" onClick={handleExport}>
//             Export CSV
//           </button>
//         </div>
//       </div>

//       {/* =========================
//           TABLE
//       ========================= */}
//       <div className="table-wrapper">
//         <table className="tx-table">
//           <thead>
//             <tr>
//               <th>Reference</th>
//               <th>User</th>
//               <th>Amount</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedData.map((tx) => (
//               <tr key={tx._id}>
//                 <td data-label="Reference">{tx.reference}</td>

//                 <td data-label="User">{tx.userEmail}</td>

//                 <td data-label="Amount" className="amount">
//                   ${tx.amount.toLocaleString()}
//                 </td>

//                 <td data-label="Type" className="type">
//                   {formatType(tx.type)}
//                 </td>

//                 <td data-label="Status">
//                   <span className={getStatusClass(tx.status)}>
//                     {formatType(tx.status)}
//                   </span>
//                 </td>

//                 <td data-label="Date">{formatDate(tx.date)}</td>

//                 <td data-label="Action">
//                   {tx.status === "pending" ? (
//                     <div className="actions">
//                       <button
//                         className="btn approve"
//                         onClick={() =>
//                           updateStatus(tx._id, "approved")
//                         }
//                       >
//                         Approve
//                       </button>

//                       <button
//                         className="btn reject"
//                         onClick={() =>
//                           updateStatus(tx._id, "rejected")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   ) : (
//                     <span className="done">—</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* =========================
//           PAGINATION
//       ========================= */}
//       <div className="pagination">
//         <button
//           onClick={() =>
//             setCurrentPage((p) => Math.max(1, p - 1))
//           }
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>

//         <span className="current-page">{currentPage}</span>

//         <button
//           onClick={() =>
//             setCurrentPage((p) =>
//               Math.min(totalPages, p + 1)
//             )
//           }
//           disabled={currentPage === totalPages || totalPages === 0}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminTransactions;

import React, { useState, useMemo, useEffect } from "react";
import api from "../api/api";
import "../styles/transactions.css";

const AdminTransactions = () => {
  const [txs, setTxs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 5;

  // =========================
  // FETCH TRANSACTIONS
  // =========================
  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await api.get("/api/admin/transactions");
        setTxs(res.data);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTx();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (tx, status) => {
    try {
      const endpoint =
        tx.type === "deposit" ? "deposit" : "withdrawal";

      await api.patch(
        `/api/admin/transactions/${endpoint}/${tx._id}`,
        { status }
      );

      // update UI instantly
      setTxs((prev) =>
        prev.map((item) =>
          item._id === tx._id
            ? { ...item, status }
            : item
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // =========================
  // HELPERS
  // =========================
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

  const formatType = (type) =>
    type.charAt(0).toUpperCase() + type.slice(1);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  // =========================
  // SEARCH FILTER
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
  const totalPages = Math.ceil(
    filteredData.length / rowsPerPage
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // =========================
  // EXPORT CSV
  // =========================
  const handleExport = () => {
    const csv = [
      [
        "Reference",
        "User",
        "Amount",
        "Type",
        "Status",
        "Date",
      ],
      ...filteredData.map((t) => [
        t.reference,
        t.userEmail,
        `₦${t.amount}`,
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
    return (
      <div className="tx-page">Loading transactions...</div>
    );
  }

  return (
    <div className="tx-page">
      <div className="tx-header">
        <h2>Transactions</h2>
      </div>

      {/* =========================
          CONTROLS
      ========================= */}
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
          <button
            className="btn btn-export"
            onClick={handleExport}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* =========================
          TABLE
      ========================= */}
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
                <td>{tx.reference}</td>
                <td>{tx.userEmail}</td>
                <td>${tx.amount.toLocaleString()}</td>
                <td>{formatType(tx.type)}</td>

                <td>
                  <span className={getStatusClass(tx.status)}>
                    {formatType(tx.status)}
                  </span>
                </td>

                <td>{formatDate(tx.date)}</td>

                <td>
                  {tx.status === "pending" ||
                  tx.status === "waiting" ? (
                    <div className="actions">
                      <button
                        className="btn approve"
                        onClick={() =>
                          updateStatus(tx, "approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn reject"
                        onClick={() =>
                          updateStatus(tx, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="done">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =========================
          PAGINATION
      ========================= */}
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((p) => Math.max(1, p - 1))
          }
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>{currentPage}</span>

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(totalPages, p + 1)
            )
          }
          disabled={
            currentPage === totalPages ||
            totalPages === 0
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminTransactions;
