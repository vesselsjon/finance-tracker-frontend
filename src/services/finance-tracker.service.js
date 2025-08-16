const API_BASE_URL = "http://localhost:5000/api";

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const addCategory = async (category) => {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Failed to add category");
  return res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
};

export const getTransactions = async () => {
  const res = await fetch(`${API_BASE_URL}/transactions`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const addTransaction = async (transaction) => {
  const res = await fetch(`${API_BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  if (!res.ok) throw new Error("Failed to add transaction");
  return res.json();
};

export const deleteTransaction = async (id) => {
  const res = await fetch(`${API_BASE_URL}/transactions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete transaction");
};
