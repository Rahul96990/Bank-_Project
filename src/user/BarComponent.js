import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BarComponent = () => {
  const { user_id } = useParams();
  const signal = "records";
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fData = new FormData();
        fData.append("user_id", user_id);
        fData.append("signal", signal);
        const response = await axios.post("http://localhost/backend/transcation.php", fData);

        const successTransactions = response.data
          .filter(txn => txn.status === "Successful") // ✅ Only successful transactions
          .map(txn => ({
            amount: parseFloat(txn.amount), // Convert amount to number
            date: txn.transaction_date,
            type: txn.transaction_type // ✅ Fixing incorrect key name
          }));

        setTransactions(successTransactions);
        setFilteredTransactions(successTransactions); // Set initial filtered data
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };

    fetchData();
  }, [user_id]);

  // Function to filter transactions
  const changeFilter = (e) => {
    const selectedType = e.target.value;
    setFilterData(selectedType);

    if (selectedType) {
      setFilteredTransactions(transactions.filter(txn => txn.type === selectedType));
    } else {
      setFilteredTransactions(transactions); // Show all if no filter is selected
    }
  };

  // Custom Tooltip to show date and amount
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: "#fff", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}>
          <p><b>Date:</b> {payload[0].payload.date}</p>
          <p><b>Amount:</b> ₹{payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: "100%", height: 400 }} className="mt-4 border-2">
      {transactions.length <= 0 ? <p>You don't have any transaction yet</p> : 
      <div className="flex justify-between p-3">
        <h2 className="text-indigo-900">Transaction's Bar Chart</h2>
        <select value={filterData} onChange={changeFilter} className="p-2 border-2">
          <option value="">All Transactions</option>
          <option value="Deposite">Deposite</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>
      }

      {transactions.length <= 0  ? <p></p> : 

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={filteredTransactions} margin={{ top: 10, right: 10, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={false} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      }
    </div>
  );
};

export default BarComponent;
