import React, { useState, useMemo } from "react";
import "../styles/users.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([
    {
      _id: "1",
      email: "user1@mail.com",
      balance: 500,
      totalDeposit: 2000,
      dateJoined: "2026-01-12",
      blocked: false,
      activePlans: ["Starter", "Pro"],
      machines: [{ name: "Machine A" }, { name: "Machine B" }],
    },
    {
      _id: "2",
      email: "user2@mail.com",
      balance: 1200,
      totalDeposit: 5000,
      dateJoined: "2026-02-03",
      blocked: true,
      activePlans: ["Gold"],
      machines: [{ name: "Machine C" }],
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // modal state
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === id ? { ...u, blocked: !u.blocked } : u
      )
    );
  };

  const deleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const editUser = (id) => {
    const user = users.find((u) => u._id === id);
    if (!user) return;

    const email = prompt("Edit Email", user.email);
    const balance = prompt("Edit Balance", user.balance);

    if (!email || !balance) return;

    setUsers((prev) =>
      prev.map((u) =>
        u._id === id
          ? { ...u, email, balance: Number(balance) }
          : u
      )
    );
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-NG", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="users-page">
      <div className="users-header">
        <h2>Users</h2>
      </div>

      {/* SEARCH */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Balance</th>
              <th>Total Deposit</th>
              <th>Date Joined</th>
              <th>Plans</th>
              <th>Machines</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                onClick={() => setSelectedUser(user)}
                style={{ cursor: "pointer" }}
              >
                <td data-label="Email">{user.email}</td>

                <td data-label="Balance">
                  ${user.balance.toLocaleString()}
                </td>

                <td data-label="Total Deposit">
                  ${user.totalDeposit.toLocaleString()}
                </td>

                <td data-label="Date Joined">
                  {formatDate(user.dateJoined)}
                </td>

                <td data-label="Plans">
                  {user.activePlans?.length || 0}
                </td>

                <td data-label="Machines">
                  {user.machines?.length || 0}
                </td>

                <td data-label="Status">
                  <span
                    className={
                      user.blocked ? "status blocked" : "status active"
                    }
                  >
                    {user.blocked ? "Banned" : "Active"}
                  </span>
                </td>

                <td data-label="Action">
                  <div className="actions">
                    <button
                      className="btn block"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBan(user._id);
                      }}
                    >
                      {user.blocked ? "Unban" : "Ban"}
                    </button>

                    <button
                      className="btn edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        editUser(user._id);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUser(user._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
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
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* ================= MODAL ================= */}
      {selectedUser && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>User Details</h2>

            <p><b>Email:</b> {selectedUser.email}</p>
            <p><b>Balance:</b> ${selectedUser.balance}</p>
            <p><b>Total Deposit:</b> ${selectedUser.totalDeposit}</p>
            <p><b>Date Joined:</b> {formatDate(selectedUser.dateJoined)}</p>

            <h3>Active Plans</h3>
            <ul>
              {selectedUser.activePlans?.map((plan, i) => (
                <li key={i}>{plan}</li>
              ))}
            </ul>

            <h3>Machines</h3>
            <ul>
              {selectedUser.machines?.map((m, i) => (
                <li key={i}>{m.name}</li>
              ))}
            </ul>

            <button
              className="btn close"
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
