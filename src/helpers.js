import { 
  getCategories, 
  getTransactions 
} from "./services/finance-tracker.service.js";

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
export const generateRandomColor = async () => {
  const categories = await getCategories();
  const existingBudgetLength = categories.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

export const getAllMatchingItems = async ({ category, key, value }) => {
  let data = [];
  
  if (category === "budgets" || category === "categories") {
    data = await getCategories();
  } else if (category === "expenses" || category === "transactions") {
    data = await getTransactions();
  }

  return data.filter((item) => String(item[key]) === String(value));
};

// total spent by budget
export const calculateSpentByBudget = async (budgetId) => {
  const expenses = await getTransactions();

  return expenses
    .filter(
      (t) => Number(t.category.id) === Number(budgetId) && t.type === "EXPENSE"
    )
    .reduce((acc, expense) => acc + Number(expense.amount), 0);
};

// FORMATTING
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  if (amt === undefined || amt === null || isNaN(amt)) {
    return "$0";
  }

  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
