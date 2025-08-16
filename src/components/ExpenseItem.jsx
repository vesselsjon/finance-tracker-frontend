import { useEffect, useState } from "react";

// rrd imports
import { Link, useFetcher } from "react-router-dom";

// library import
import { TrashIcon } from "@heroicons/react/24/solid";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
} from "../helpers";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    async function fetchBudget() {
      const result = await getAllMatchingItems({
        category: "categories",
        key: "id",
        value: expense.category.id,
      });
      setBudget(result[0] || null);
    }
    fetchBudget();
  }, [expense.category.id]);
  // const budget = expense.category;

  return (
    <>
      <td>{expense.description}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.date)}</td>
      {showBudget && budget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.description} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default ExpenseItem;
