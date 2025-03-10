import React, { useEffect, useState } from 'react';
import Sidebar from './component/Sidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import No_Trans1 from '../assets/No_Trans1.webp';

const Transactions = () => {
  const { user_id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fData = new FormData();
        fData.append("user_id", user_id);
        const response = await axios.post("http://localhost/backend/transcation.php", fData);
        setTransactions(response.data);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user_id]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ?
        `<span style="background-color: yellow;">${part}</span>` : part
    ).join('');
  };


  const filteredTransactions = Array.isArray(transactions)
  ? transactions.filter((item) => {
      const searchTerm = search.toLowerCase();
      if (searchTerm === '') return true;
      return Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchTerm)
      );
    })
  : [];



  return (
    <div className="dashboard-container">
      <Sidebar user_id={user_id} />
      <div className="content">
        <div className='p-3 m-4 border '>
          <h1 className='text-3xl capitalize'>Your Transactions</h1>
        </div>
        {
          transactions.length <=0 ? "" :  <input
          type="text"
          placeholder="Search any data.."
          className="p-2 m-3 border border-zinc-500 w-[50%] text-black"
          onChange={(e) => setSearch(e.target.value)}
          />
        }
        {transactions.length <=0 ? 
        <div>
          <img src={No_Trans1} />
        <p className="m-3 text-center">No transactions found. Start by making your first transaction!</p>
        </div> : 
      
        <div className="max-h-[500px] overflow-auto">
          {loading ? (
            <p className="m-3 text-center">Loading...</p>
          ) : error ? (
            <p className="m-3 text-center text-red-500">{error}</p>
          ) : (
            <table className="m-3 mt-3 text-center">
              <thead>
                <tr>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Transaction ID</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Transaction Type</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Sender Account Number</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Receiver Account Number</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Account Number</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Amount</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Transaction Date</th>
                  <th className="p-1 text-lg font-normal border border-zinc-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="w-[95px] p-3 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.transaction_id, search) }}></td>
                      <td className="w-[130px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.transaction_type, search) }}></td>
                      <td className="w-[140px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.sender_account_number, search) }}></td>
                      <td className="w-[140px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.receiver_account_number, search) }}></td>
                      <td className="w-[140px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.account_number, search) }}></td>
                      <td className="w-[140px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.amount, search) }}></td>
                      <td className="w-[230px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.transaction_date, search) }}></td>
                      <td className="w-[130px] p-1 text-lg border border-zinc-700" dangerouslySetInnerHTML={{ __html: highlightText(transaction.status, search) }}></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-3 text-xl text-center text-red-600 pt-7">Data Not Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>}
      </div>
    </div>
  );
};

export default Transactions;
