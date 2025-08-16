// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { getAllMatchingItems } from "../helpers";
import { deleteCategory, deleteTransaction } from "../services/finance-tracker.service";

export async function deleteBudget({ params }) {
  try {
    await deleteCategory(params.id);

    const associatedExpenses = await getAllMatchingItems({
      category: "transactions",
      key: "categoryId",
      value: params.id,
    });

    for (const expense of associatedExpenses) {
      await deleteTransaction(expense.id);
    }

    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
  return redirect("/");
}
