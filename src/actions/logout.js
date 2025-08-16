// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
// import { 
//   getCategories, 
//   deleteCategory, 
//   getTransactions, 
//   deleteTransaction 
// } from "../services/finance-tracker.service";

export async function logoutAction() {
  localStorage.removeItem("userName");

  toast.success("You’ve deleted your account!")
  // return redirect
  return redirect("/")
}