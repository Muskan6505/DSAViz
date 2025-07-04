import React from "react";

export default function Problems() {
  const problems = [
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Binary Search", difficulty: "Medium" },
    { id: 3, title: "LRU Cache", difficulty: "Hard" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Problems</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr
                key={problem.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3">{problem.title}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    problem.difficulty === "Easy"
                      ? "text-green-600"
                      : problem.difficulty === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {problem.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
