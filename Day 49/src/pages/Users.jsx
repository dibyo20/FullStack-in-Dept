function Users() {
  const users = [
    { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "Admin" },
    { id: 2, name: "Aman Verma", email: "aman@example.com", role: "User" },
    { id: 3, name: "Priya Das", email: "priya@example.com", role: "Editor" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="overflow-x-auto bg-[#111827] border border-slate-800 rounded-2xl">

        <table className="w-full text-left">
          <thead className="bg-[#1e293b] text-slate-300">
            <tr>
              <th className="p-5">Name</th>
              <th className="p-5">Email</th>
              <th className="p-5">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-800 hover:bg-slate-800/40">
                <td className="p-5 font-medium">{user.name}</td>
                <td className="p-5 text-slate-400">{user.email}</td>
                <td className="p-5">
                  <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-xs">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Users;