import { useEffect, useState } from "react";

// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

// helper functions
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, budgetLimit, color } = budget;
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function fetchSpent() {
      try {
        const total = await calculateSpentByBudget(id);
        if (isMounted) setSpent(total);
      } catch (err) {
        console.error("Failed to calculate spent:", err);
      }
    }
    fetchSpent();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(budgetLimit)} Budgeted</p>
      </div>
      <progress max={budgetLimit} value={spent}>
        {formatPercentage(spent / budgetLimit)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(budgetLimit - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default BudgetItem;
