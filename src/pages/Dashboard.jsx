// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

//  helper functions
import {
  generateRandomColor,
} from "../helpers";
import {
  addCategory,
  addTransaction,
  deleteTransaction,
  getCategories,
  getTransactions
} from "../services/finance-tracker.service"

// loader
export async function dashboardLoader() {
  const [categories, transactions] = await Promise.all([
    getCategories(),
    getTransactions(),
  ]);

  const userName = localStorage.getItem("userName") ? JSON.parse(localStorage.getItem("userName")) : null;
  return { userName, budgets: categories, expenses: transactions };
}

// action
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    localStorage.setItem("userName", JSON.stringify(values.userName));
    return toast.success(`Welcome, ${values.userName}`);
  }

  if (_action === "createBudget") {
    const color = await generateRandomColor();
    await addCategory({
      name: values.newBudget,
      budgetLimit: parseFloat(values.newBudgetAmount),
      description: "",
      color
    });
    return toast.success("Budget created!");
  }

  if (_action === "createExpense") {
    await addTransaction({
      description: values.newExpense,
      amount: parseFloat(values.newExpenseAmount),
      type: "EXPENSE",
      categoryId: values.newExpenseBudget,
      date: new Date().toISOString().split("T")[0]
    });
    window.location.reload()
    return toast.success(`Expense ${values.newExpense} created!`);
  }

  if (_action === "deleteExpense") {
    await deleteTransaction(values.expenseId);
    return toast.success("Expense deleted!");
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.date - a.date)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default Dashboard;
