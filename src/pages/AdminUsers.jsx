// // import React, { useState, useMemo } from "react";
// // import "../styles/users.css";

// // const AdminUsers = () => {
// //   const [users, setUsers] = useState([
// //     {
// //       _id: "1",
// //       email: "user1@mail.com",
// //       balance: 500,
// //       totalDeposit: 2000,
// //       dateJoined: "2026-01-12",
// //       blocked: false,
// //       activePlans: ["Starter", "Pro"],
// //       machines: [{ name: "Machine A" }, { name: "Machine B" }],
// //     },
// //     {
// //       _id: "2",
// //       email: "user2@mail.com",
// //       balance: 1200,
// //       totalDeposit: 5000,
// //       dateJoined: "2026-02-03",
// //       blocked: true,
// //       activePlans: ["Gold"],
// //       machines: [{ name: "Machine C" }],
// //     },
// //   ]);

// //   const [search, setSearch] = useState("");
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const rowsPerPage = 5;

// //   // modal state
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   const filteredUsers = useMemo(() => {
// //     return users.filter((u) =>
// //       u.email.toLowerCase().includes(search.toLowerCase())
// //     );
// //   }, [users, search]);

// //   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

// //   const paginatedUsers = filteredUsers.slice(
// //     (currentPage - 1) * rowsPerPage,
// //     currentPage * rowsPerPage
// //   );

// //   const toggleBan = (id) => {
// //     setUsers((prev) =>
// //       prev.map((u) =>
// //         u._id === id ? { ...u, blocked: !u.blocked } : u
// //       )
// //     );
// //   };

// //   const deleteUser = (id) => {
// //     if (!window.confirm("Delete this user?")) return;
// //     setUsers((prev) => prev.filter((u) => u._id !== id));
// //   };

// //   const editUser = (id) => {
// //     const user = users.find((u) => u._id === id);
// //     if (!user) return;

// //     const email = prompt("Edit Email", user.email);
// //     const balance = prompt("Edit Balance", user.balance);

// //     if (!email || !balance) return;

// //     setUsers((prev) =>
// //       prev.map((u) =>
// //         u._id === id
// //           ? { ...u, email, balance: Number(balance) }
// //           : u
// //       )
// //     );
// //   };

// //   const formatDate = (date) =>
// //     new Date(date).toLocaleDateString("en-NG", {
// //       day: "2-digit",
// //       month: "short",
// //       year: "numeric",
// //     });

// //   return (
// //     <div className="users-page">
// //       <div className="users-header">
// //         <h2>Users</h2>
// //       </div>

// //       {/* SEARCH */}
// //       <div className="table-controls">
// //         <input
// //           type="text"
// //           className="search-input"
// //           placeholder="Search by email..."
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //         />
// //       </div>

// //       {/* TABLE */}
// //       <div className="table-wrapper">
// //         <table className="users-table">
// //           <thead>
// //             <tr>
// //               <th>Email</th>
// //               <th>Balance</th>
// //               <th>Total Deposit</th>
// //               <th>Date Joined</th>
// //               <th>Plans</th>
// //               <th>Machines</th>
// //               <th>Status</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {paginatedUsers.map((user) => (
// //               <tr
// //                 key={user._id}
// //                 onClick={() => setSelectedUser(user)}
// //                 style={{ cursor: "pointer" }}
// //               >
// //                 <td data-label="Email">{user.email}</td>

// //                 <td data-label="Balance">
// //                   ${user.balance.toLocaleString()}
// //                 </td>

// //                 <td data-label="Total Deposit">
// //                   ${user.totalDeposit.toLocaleString()}
// //                 </td>

// //                 <td data-label="Date Joined">
// //                   {formatDate(user.dateJoined)}
// //                 </td>

// //                 <td data-label="Plans">
// //                   {user.activePlans?.length || 0}
// //                 </td>

// //                 <td data-label="Machines">
// //                   {user.machines?.length || 0}
// //                 </td>

// //                 <td data-label="Status">
// //                   <span
// //                     className={
// //                       user.blocked ? "status blocked" : "status active"
// //                     }
// //                   >
// //                     {user.blocked ? "Banned" : "Active"}
// //                   </span>
// //                 </td>

// //                 <td data-label="Action">
// //                   <div className="actions">
// //                     <button
// //                       className="btn block"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         toggleBan(user._id);
// //                       }}
// //                     >
// //                       {user.blocked ? "Unban" : "Ban"}
// //                     </button>

// //                     <button
// //                       className="btn edit"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         editUser(user._id);
// //                       }}
// //                     >
// //                       Edit
// //                     </button>

// //                     <button
// //                       className="btn delete"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         deleteUser(user._id);
// //                       }}
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* PAGINATION */}
// //       <div className="pagination">
// //         <button
// //           onClick={() =>
// //             setCurrentPage((p) => Math.max(1, p - 1))
// //           }
// //           disabled={currentPage === 1}
// //         >
// //           Prev
// //         </button>

// //         <span>{currentPage}</span>

// //         <button
// //           onClick={() =>
// //             setCurrentPage((p) =>
// //               Math.min(totalPages, p + 1)
// //             )
// //           }
// //           disabled={currentPage === totalPages}
// //         >
// //           Next
// //         </button>
// //       </div>

// //       {/* ================= MODAL ================= */}
// //       {selectedUser && (
// //         <div
// //           className="modal-overlay"
// //           onClick={() => setSelectedUser(null)}
// //         >
// //           <div
// //             className="modal"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <h2>User Details</h2>

// //             <p><b>Email:</b> {selectedUser.email}</p>
// //             <p><b>Balance:</b> ${selectedUser.balance}</p>
// //             <p><b>Total Deposit:</b> ${selectedUser.totalDeposit}</p>
// //             <p><b>Date Joined:</b> {formatDate(selectedUser.dateJoined)}</p>

// //             <h3>Active Plans</h3>
// //             <ul>
// //               {selectedUser.activePlans?.map((plan, i) => (
// //                 <li key={i}>{plan}</li>
// //               ))}
// //             </ul>

// //             <h3>Machines</h3>
// //             <ul>
// //               {selectedUser.machines?.map((m, i) => (
// //                 <li key={i}>{m.name}</li>
// //               ))}
// //             </ul>

// //             <button
// //               className="btn close"
// //               onClick={() => setSelectedUser(null)}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminUsers;

// import React, {
//   useEffect,
//   useMemo,
//   useState,
//   useCallback,
//   useMemo as reactUseMemo,
// } from "react";
// import axios from "axios";
// import "../styles/users.css";

// // ================= API URL =================
// const API_URL = process.env.REACT_APP_API_URL;

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const [selectedUser, setSelectedUser] =
//     useState(null);

//   // ================= EDIT MODAL =================
//   const [editModal, setEditModal] =
//     useState(false);

//   const [editForm, setEditForm] =
//     useState({
//       email: "",
//       balance: "",
//     });

//   const rowsPerPage = 5;

//   // ================= TOKEN =================
//   const token =
//     localStorage.getItem("token");

//   // ================= AUTH CONFIG =================
//   const authConfig = reactUseMemo(
//     () => ({
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }),
//     [token]
//   );

//   // ================= FETCH USERS =================
//   const fetchUsers = useCallback(async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(
//         `${API_URL}/api/admin/users`,
//         authConfig
//       );

//       setUsers(data.users || []);
//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to fetch users"
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, [authConfig]);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   // ================= SEARCH =================
//   const filteredUsers = useMemo(() => {
//     return users.filter((u) =>
//       u.email
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [users, search]);

//   // ================= PAGINATION =================
//   const totalPages = Math.ceil(
//     filteredUsers.length / rowsPerPage
//   );

//   const paginatedUsers = filteredUsers.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   // ================= TOGGLE BAN =================
//   const toggleBan = async (id) => {
//     try {
//       const { data } = await axios.put(
//         `${API_URL}/api/admin/users/${id}/toggle-ban`,
//         {},
//         authConfig
//       );

//       setUsers((prev) =>
//         prev.map((u) =>
//           u._id === id
//             ? {
//                 ...u,
//                 blocked:
//                   data.user.blocked,
//               }
//             : u
//         )
//       );

//       if (selectedUser?._id === id) {
//         setSelectedUser(data.user);
//       }
//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to update user"
//       );
//     }
//   };

//   // ================= DELETE USER =================
//   const deleteUser = async (id) => {
//     if (
//       !window.confirm(
//         "Delete this user?"
//       )
//     )
//       return;

//     try {
//       await axios.delete(
//         `${API_URL}/api/admin/users/${id}`,
//         authConfig
//       );

//       setUsers((prev) =>
//         prev.filter(
//           (u) => u._id !== id
//         )
//       );

//       if (selectedUser?._id === id) {
//         setSelectedUser(null);
//       }
//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to delete user"
//       );
//     }
//   };

//   // ================= OPEN EDIT MODAL =================
//   const editUser = (user) => {
//     setEditForm({
//       email: user.email || "",
//       balance: user.balance || 0,
//     });

//     setSelectedUser(user);

//     setEditModal(true);
//   };

//   // ================= UPDATE USER =================
//   const updateUser = async () => {
//     try {
//       const { data } = await axios.put(
//         `${API_URL}/api/admin/users/${selectedUser._id}`,
//         {
//           email: editForm.email,
//           balance: Number(
//             editForm.balance
//           ),
//         },
//         authConfig
//       );

//       setUsers((prev) =>
//         prev.map((u) =>
//           u._id ===
//           selectedUser._id
//             ? data.user
//             : u
//         )
//       );

//       setSelectedUser(data.user);

//       setEditModal(false);

//       alert(
//         "User updated successfully"
//       );
//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to update user"
//       );
//     }
//   };

//   // ================= FORMAT DATE =================
//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString(
//       "en-NG",
//       {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       }
//     );

//   return (
//     <div className="users-page">
//       <div className="users-header">
//         <h2>Users</h2>
//       </div>

//       {/* SEARCH */}
//       <div className="table-controls">
//         <input
//           type="text"
//           className="search-input"
//           placeholder="Search by email..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* TABLE */}
//       <div className="table-wrapper">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>Email</th>
//               <th>Balance</th>
//               <th>Total Deposit</th>
//               <th>Date Joined</th>
//               <th>Plans</th>
//               <th>Machines</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="8">
//                   Loading users...
//                 </td>
//               </tr>
//             ) : paginatedUsers.length >
//               0 ? (
//               paginatedUsers.map(
//                 (user) => (
//                   <tr
//                     key={user._id}
//                     onClick={() =>
//                       setSelectedUser(
//                         user
//                       )
//                     }
//                     style={{
//                       cursor:
//                         "pointer",
//                     }}
//                   >
//                     <td data-label="Email">
//                       {user.email}
//                     </td>

//                     <td data-label="Balance">
//                       $
//                       {user.balance?.toLocaleString()}
//                     </td>

//                     <td data-label="Total Deposit">
//                       $
//                       {user.totalDeposit?.toLocaleString()}
//                     </td>

//                     <td data-label="Date Joined">
//                       {formatDate(
//                         user.createdAt
//                       )}
//                     </td>

//                     <td data-label="Plans">
//                       {user.activePlans
//                         ?.length || 0}
//                     </td>

//                     <td data-label="Machines">
//                       {user.machines
//                         ?.length || 0}
//                     </td>

//                     <td data-label="Status">
//                       <span
//                         className={
//                           user.blocked
//                             ? "status blocked"
//                             : "status active"
//                         }
//                       >
//                         {user.blocked
//                           ? "Banned"
//                           : "Active"}
//                       </span>
//                     </td>

//                     <td data-label="Action">
//                       <div className="actions">
//                         <button
//                           className="btn block"
//                           onClick={(
//                             e
//                           ) => {
//                             e.stopPropagation();

//                             toggleBan(
//                               user._id
//                             );
//                           }}
//                         >
//                           {user.blocked
//                             ? "Unban"
//                             : "Ban"}
//                         </button>

//                         <button
//                           className="btn edit"
//                           onClick={(
//                             e
//                           ) => {
//                             e.stopPropagation();

//                             editUser(
//                               user
//                             );
//                           }}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           className="btn delete"
//                           onClick={(
//                             e
//                           ) => {
//                             e.stopPropagation();

//                             deleteUser(
//                               user._id
//                             );
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               )
//             ) : (
//               <tr>
//                 <td colSpan="8">
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="pagination">
//         <button
//           onClick={() =>
//             setCurrentPage((p) =>
//               Math.max(
//                 1,
//                 p - 1
//               )
//             )
//           }
//           disabled={
//             currentPage === 1
//           }
//         >
//           Prev
//         </button>

//         <span>{currentPage}</span>

//         <button
//           onClick={() =>
//             setCurrentPage((p) =>
//               Math.min(
//                 totalPages,
//                 p + 1
//               )
//             )
//           }
//           disabled={
//             currentPage ===
//               totalPages ||
//             totalPages === 0
//           }
//         >
//           Next
//         </button>
//       </div>

//       {/* USER DETAILS MODAL */}
//       {selectedUser &&
//         !editModal && (
//           <div
//             className="modal-overlay"
//             onClick={(e) => {
//               if (
//                 e.target ===
//                 e.currentTarget
//               ) {
//                 setSelectedUser(
//                   null
//                 );
//               }
//             }}
//           >
//             <div
//               className="modal"
//               onClick={(e) =>
//                 e.stopPropagation()
//               }
//             >
//               <h2>
//                 User Details
//               </h2>

//               <p>
//                 <b>Email:</b>{" "}
//                 {
//                   selectedUser.email
//                 }
//               </p>

//               <p>
//                 <b>Balance:</b> $
//                 {
//                   selectedUser.balance
//                 }
//               </p>

//               <p>
//                 <b>
//                   Total Deposit:
//                 </b>{" "}
//                 $
//                 {
//                   selectedUser.totalDeposit
//                 }
//               </p>

//               <p>
//                 <b>
//                   Referral Earnings:
//                 </b>{" "}
//                 $
//                 {
//                   selectedUser.referralEarnings
//                 }
//               </p>

//               <p>
//                 <b>
//                   Wallet Address:
//                 </b>{" "}
//                 {selectedUser.walletAddress ||
//                   "N/A"}
//               </p>

//               <p>
//                 <b>Network:</b>{" "}
//                 {
//                   selectedUser.network
//                 }
//               </p>

//               <p>
//                 <b>
//                   Verified:
//                 </b>{" "}
//                 {selectedUser.isVerified
//                   ? "Yes"
//                   : "No"}
//               </p>

//               <p>
//                 <b>Status:</b>{" "}
//                 {selectedUser.blocked
//                   ? "Banned"
//                   : "Active"}
//               </p>

//               <p>
//                 <b>
//                   Date Joined:
//                 </b>{" "}
//                 {formatDate(
//                   selectedUser.createdAt
//                 )}
//               </p>

//               <h3>
//                 Active Plans
//               </h3>

//               <ul>
//                 {selectedUser.activePlans
//                   ?.length >
//                 0 ? (
//                   selectedUser.activePlans.map(
//                     (
//                       plan,
//                       i
//                     ) => (
//                       <li
//                         key={i}
//                       >
//                         {plan}
//                       </li>
//                     )
//                   )
//                 ) : (
//                   <li>
//                     No active
//                     plans
//                   </li>
//                 )}
//               </ul>

//               <h3>Machines</h3>

//               <ul>
//                 {selectedUser.machines
//                   ?.length >
//                 0 ? (
//                   selectedUser.machines.map(
//                     (
//                       m,
//                       i
//                     ) => (
//                       <li
//                         key={i}
//                       >
//                         {m.name}
//                       </li>
//                     )
//                   )
//                 ) : (
//                   <li>
//                     No machines
//                   </li>
//                 )}
//               </ul>

//               <button
//                 className="btn close"
//                 onClick={() =>
//                   setSelectedUser(
//                     null
//                   )
//                 }
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//       {/* EDIT MODAL */}
//       {editModal && (
//         <div
//           className="modal-overlay"
//           onClick={(e) => {
//             if (
//               e.target ===
//               e.currentTarget
//             ) {
//               setEditModal(false);
//               setSelectedUser(
//                 null
//               );
//             }
//           }}
//         >
//           <div
//             className="modal"
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//           >
//             <h2>Edit User</h2>

//             <div className="form-group">
//               <label>Email</label>

//               <input
//                 type="email"
//                 value={
//                   editForm.email
//                 }
//                 onChange={(e) =>
//                   setEditForm({
//                     ...editForm,
//                     email:
//                       e.target
//                         .value,
//                   })
//                 }
//               />
//             </div>

//             <div className="form-group">
//               <label>
//                 Balance
//               </label>

//               <input
//                 type="number"
//                 value={
//                   editForm.balance
//                 }
//                 onChange={(e) =>
//                   setEditForm({
//                     ...editForm,
//                     balance:
//                       e.target
//                         .value,
//                   })
//                 }
//               />
//             </div>

//             <div className="modal-actions">
//               <button
//                 className="btn close"
//                 onClick={() => {
//                   setEditModal(
//                     false
//                   );
//                   setSelectedUser(
//                     null
//                   );
//                 }}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="btn edit"
//                 onClick={
//                   updateUser
//                 }
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;

// AdminUsers.jsx

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useMemo as reactUseMemo,
} from "react";

import axios from "axios";

import "../styles/users.css";

// ================= API URL =================
const API_URL =
  process.env.REACT_APP_API_URL;

const AdminUsers = () => {
  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const rowsPerPage = 5;

  // ================= TOKEN =================
  const token =
    localStorage.getItem("token");

  // ================= AUTH CONFIG =================
  const authConfig = reactUseMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  // ================= FETCH USERS =================
  const fetchUsers =
    useCallback(async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `${API_URL}/api/admin/users`,
            authConfig
          );

        setUsers(data.users || []);
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed to fetch users"
        );
      } finally {
        setLoading(false);
      }
    }, [authConfig]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ================= SEARCH =================
  const filteredUsers =
    useMemo(() => {
      return users.filter((u) =>
        u.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }, [users, search]);

  // ================= PAGINATION =================
  const paginatedUsers =
    filteredUsers.slice(
      (currentPage - 1) *
        rowsPerPage,
      currentPage * rowsPerPage
    );

  // ================= TOGGLE BAN =================
  const toggleBan = async (id) => {
    try {
      const { data } =
        await axios.put(
          `${API_URL}/api/admin/users/${id}/toggle-ban`,
          {},
          authConfig
        );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? data.user
            : u
        )
      );

      if (
        selectedUser?._id === id
      ) {
        setSelectedUser(
          data.user
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to update user"
      );
    }
  };

  // ================= DELETE USER =================
  const deleteUser = async (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this user?"
      )
    )
      return;

    try {
      await axios.delete(
        `${API_URL}/api/admin/users/${id}`,
        authConfig
      );

      setUsers((prev) =>
        prev.filter(
          (u) =>
            u._id !== id
        )
      );

      if (
        selectedUser?._id === id
      ) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to delete user"
      );
    }
  };

  // ================= FORMAT DATE =================
  const formatDate = (date) =>
    new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  return (
    <div className="users-page">
      {/* ================= HEADER ================= */}
      <div className="users-header">
        <h2>Users</h2>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="table-controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );

            setCurrentPage(1);
          }}
        />
      </div>

      {/* ================= TABLE ================= */}
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
            {loading ? (
              <tr>
                <td colSpan="8">
                  Loading users...
                </td>
              </tr>
            ) : paginatedUsers.length >
              0 ? (
              paginatedUsers.map(
                (user) => (
                  <tr
                    key={
                      user._id
                    }
                    onClick={() =>
                      setSelectedUser(
                        user
                      )
                    }
                    style={{
                      cursor:
                        "pointer",
                    }}
                  >
                    <td data-label="Email">
                      {
                        user.email
                      }
                    </td>

                    <td data-label="Balance">
                      $
                      {user.balance?.toLocaleString()}
                    </td>

                    <td data-label="Total Deposit">
                      $
                      {user.totalDeposit?.toLocaleString()}
                    </td>

                    <td data-label="Date Joined">
                      {formatDate(
                        user.createdAt
                      )}
                    </td>

                    <td data-label="Plans">
                      {user.activePlansCount ||
                        0}
                    </td>

                    <td data-label="Machines">
                      {user.activeMachinesCount ||
                        0}
                    </td>

                    <td data-label="Status">
                      <span
                        className={
                          user.blocked
                            ? "status blocked"
                            : "status active"
                        }
                      >
                        {user.blocked
                          ? "Banned"
                          : "Active"}
                      </span>
                    </td>

                    <td data-label="Action">
                      <div className="actions">
                        <button
                          className="btn block"
                          onClick={(
                            e
                          ) => {
                            e.stopPropagation();

                            toggleBan(
                              user._id
                            );
                          }}
                        >
                          {user.blocked
                            ? "Unban"
                            : "Ban"}
                        </button>

                        <button
                          className="btn delete"
                          onClick={(
                            e
                          ) => {
                            e.stopPropagation();

                            deleteUser(
                              user._id
                            );
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="8">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="pagination">
        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.max(
                1,
                p - 1
              )
            )
          }
          disabled={
            currentPage === 1
          }
        >
          Prev
        </button>

        <span>
          {currentPage}
        </span>

        <button
          onClick={() =>
            setCurrentPage((p) =>
              paginatedUsers.length <
              rowsPerPage
                ? p
                : p + 1
            )
          }
          disabled={
            paginatedUsers.length <
            rowsPerPage
          }
        >
          Next
        </button>
      </div>

      {/* ================= USER DETAILS MODAL ================= */}
      {selectedUser && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (
              e.target ===
              e.currentTarget
            ) {
              setSelectedUser(
                null
              );
            }
          }}
        >
          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <h2>
              User Details
            </h2>

            <p>
              <b>Email:</b>{" "}
              {
                selectedUser.email
              }
            </p>

            <p>
              <b>Balance:</b> $
              {
                selectedUser.balance
              }
            </p>

            <p>
              <b>
                Total Deposit:
              </b>{" "}
              $
              {
                selectedUser.totalDeposit
              }
            </p>

            <p>
              <b>
                Total Withdraw:
              </b>{" "}
              $
              {
                selectedUser.totalWithdraw
              }
            </p>

            <p>
              <b>
                Referral Earnings:
              </b>{" "}
              $
              {
                selectedUser.referralEarnings
              }
            </p>

            <p>
              <b>
                Wallet Address:
              </b>{" "}
              {selectedUser.walletAddress ||
                "N/A"}
            </p>

            <p>
              <b>Network:</b>{" "}
              {
                selectedUser.network
              }
            </p>

            <p>
              <b>
                Verified:
              </b>{" "}
              {selectedUser.isVerified
                ? "Yes"
                : "No"}
            </p>

            <p>
              <b>Status:</b>{" "}
              {selectedUser.blocked
                ? "Banned"
                : "Active"}
            </p>

            <p>
              <b>
                Active Plans:
              </b>{" "}
              {selectedUser.activePlansCount ||
                0}
            </p>

            <p>
              <b>
                Active Machines:
              </b>{" "}
              {selectedUser.activeMachinesCount ||
                0}
            </p>

            <p>
              <b>
                Date Joined:
              </b>{" "}
              {formatDate(
                selectedUser.createdAt
              )}
            </p>

            {/* ================= PLANS ================= */}
            <h3>
              Active Plans
            </h3>

            <ul>
              {selectedUser.activePlans
                ?.length > 0 ? (
                selectedUser.activePlans.map(
                  (
                    plan,
                    i
                  ) => (
                    <li
                      key={i}
                    >
                      {plan}
                    </li>
                  )
                )
              ) : (
                <li>
                  No active
                  plans
                </li>
              )}
            </ul>

            {/* ================= MACHINES ================= */}
            <h3>
              Machines
            </h3>

            <ul>
              {selectedUser.machines
                ?.length > 0 ? (
                selectedUser.machines.map(
                  (
                    machine,
                    i
                  ) => (
                    <li
                      key={i}
                    >
                      {
                        machine.name
                      }{" "}
                      (
                      {
                        machine.status
                      }
                      )
                    </li>
                  )
                )
              ) : (
                <li>
                  No machines
                </li>
              )}
            </ul>

            <button
              className="btn close"
              onClick={() =>
                setSelectedUser(
                  null
                )
              }
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
