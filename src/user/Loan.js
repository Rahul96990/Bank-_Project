import React, { useState } from "react";
import Sidebar from "./component/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const LoanApplication = () => {
  const { user_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loanData, setLoanData] = useState({
    loan_type: "",
    loan_amount: "",
    tenure: "",
    interest_rate: "",
    monthly_income: "",
    account_number: "",
  });

  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loanData.loan_type || !loanData.loan_amount || !loanData.tenure) {
      toast.error("Please fill all required fields!");
      return;
    }

    setLoading(true); // Set loading to true when request starts


    const url = "http://localhost/backend/loan.php";

    let fData = new FormData();
    fData.append("user_id", user_id);
    fData.append("loan_amount", loanData.loan_amount);
    fData.append("interest_rate", loanData.interest_rate);
    fData.append("loan_type", loanData.loan_type);
    fData.append("monthly_income", loanData.monthly_income);
    fData.append("tenure", loanData.tenure);
    fData.append("account_number", loanData.account_number);

    try {
      // Make API call
      const response = await axios.post(url, fData);

      // Extract data from the API response
      const APIResponse = response.data.message;

      if (APIResponse === "Loan Approved!") {
        toast.success("Loan Approved!!");
      }
      if (APIResponse === "Loan application failed") {
        toast.success("Loan application failed!");
      }

      if (APIResponse === "Bank does not have enough balance to approve this loan. Loan application rejected.") {
        toast.success("Bank does not have enough balance to approve this loan. Loan application rejected.");
      }



    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again.");
    }
    finally {
      setLoading(false); // Reset loading state after request finishes
    }

  };

  return (
    <div className="flex dashboard-container">
      <Sidebar user_id={user_id} />
      <div className="w-full p-2 pb-0">
        <div className='p-3 m-4 border'>
          <h1 className='text-3xl capitalize'>Loan Application</h1>
        </div>
        <div className="p-2 m-5 border-2 rounded-xl w-[97%] border-zinc-300">
          <form className="p-0 m-0 border-none" method="POST" onSubmit={handleSubmit}>
            <table className="w-[80%]">
              <tbody>
                <tr className="h-[80px]">
                  <td className="p-4 w-[35%]">
                    <span className="text-lg">Loan Type:</span>
                  </td>
                  <td className="pl-8">
                    <select
                      name="loan_type"
                      value={loanData.loan_type}
                      onChange={handleChange}
                      className="w-[90%] p-3 rounded-xl border-2 border-zinc-400"
                      required
                    >
                      <option value="" hidden>Select Loan Type</option>
                      <option value="personal">Personal Loan</option>
                      <option value="home">Home Loan</option>
                      <option value="car">Car Loan</option>
                      <option value="business">Business Loan</option>
                    </select>
                  </td>
                </tr>

                <tr className="h-[80px]">
                  <td className="p-4 w-[35%]">
                    <span className="text-lg">Loan Amount:</span>
                  </td>
                  <td className="pl-8">
                    <input
                      name="loan_amount"
                      type="number"
                      value={loanData.loan_amount}
                      onChange={handleChange}
                      className="w-[90%] p-3 rounded-xl border-2 border-zinc-400"
                      required
                    />
                  </td>
                </tr>
                <tr className="h-[80px]">
                  <td className="p-4 w-[35%]">
                    <span className="text-lg">Account Number:</span>
                  </td>
                  <td className="pl-8">
                    <input
                      name="account_number"
                      type="number"
                      value={loanData.account_number}
                      onChange={handleChange}
                      className="w-[90%] p-3 rounded-xl border-2 border-zinc-400"
                      required
                    />
                  </td>
                </tr>

                <tr className="h-[80px]">
                  <td className="p-4 w-[35%]">
                    <span className="text-lg">Loan Tenure (Months):</span>
                  </td>
                  <td className="pl-8">
                    <input
                      name="tenure"
                      type="number"
                      value={loanData.tenure}
                      onChange={handleChange}
                      className="w-[90%] p-3 rounded-xl border-2 border-zinc-400"
                      required
                    />
                  </td>
                </tr>

                <tr className="h-[80px]">
                  <td className="p-4 w-[35%]">
                    <span className="text-lg">Interest Rate (%):</span>
                  </td>
                  <td className="pl-8">
                    <input
                      name="interest_rate"
                      type="number"
                      step="0.1"
                      value={loanData.interest_rate}
                      onChange={handleChange}
                      className="w-[90%] p-3 rounded-xl border-2 border-zinc-400"
                    />
                  </td>
                </tr>

                <tr className="h-[80px]">
                  <td className="p-4 w-[35%]">
                    <span className="text-lg">Monthly Income:</span>
                  </td>
                  <td className="pl-8">
                    <input
                      name="monthly_income"
                      type="number"
                      value={loanData.monthly_income}
                      onChange={handleChange}
                      className="w-[90%] p-3 rounded-xl border-2 border-zinc-400"
                      required
                    />
                  </td>
                </tr>

                <tr className="h-[80px]">
                  <td colSpan={2} className="p-5 w-[100%]">
                    <button className="p-3 text-white bg-indigo-600 border rounded-xl hover:bg-indigo-500 w-[8rem]">
                      {loading ? <div className="loader"></div> : "Apply Now"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <ToastContainer />
          <style>
            {`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
