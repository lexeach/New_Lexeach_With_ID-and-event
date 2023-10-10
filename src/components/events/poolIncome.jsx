// TransactionHistory.js
import React, { useState, useEffect } from "react";
import "./poolIncome.css";
// import Moralis from "moralis";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils"; // Import EvmChain from the correct package

function PoolIncome({ ...props }) {
  const [transactions, setTransactions] = useState([]);
  console.log("Props :", props.account, props);
  useEffect(() => {
    const runApp = async () => {
      if (!Moralis.Core.isStarted)
        await Moralis.start({
          apiKey:
            "khlUdKYkvJvA9Ruj0n0Ire7Foax3m7LY7g0inZbSqzZC8rttoDgxAqtggzGah91U",
        });
      const address = "0x7716dB181506939Ed6Ba6e35755A8668D8668D9A";
      const chain = EvmChain.BSC_TESTNET;
      const topic =
        "0x23b5ce99046ef19224b4cbceac4f2c894c141e5e60c2e62e7f3edff030f85645";
      const abi = {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_referrer",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_time",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "string",
            name: "Identity",
            type: "string",
          },
        ],
        name: "SponsorIncome",
        type: "event",
      };
      let limit = 10000;
      const response = await Moralis.EvmApi.events.getContractEvents({
        address,
        chain,
        limit,
        topic,
        abi,
      });
      console.log(response.toJSON());
      let datas = response.toJSON().result.map((transaction) => ({
        user: transaction.data._user,
        referrer: transaction.data._referrer,
        time: transaction.data._time,
        identity: transaction.data.Identity,
        transactionHash: transaction.transaction_hash,
      }));
      console.log("Transaction:", datas);
      setTransactions(datas);
    };

    runApp();
  }, []);

  const [filter, setFilter] = useState("All");
  const filteredTransactions =
    filter === "referrer"
      ? transactions.filter(
          (transaction) => transaction.referrer === props.account
        )
      : transactions.filter(
          (transaction) => transaction.user === props.account
        );
  console.log("Filter Transation", filteredTransactions);

  return (
    <div className="PoolIncome">
      <h1>Transaction History Of SponsorIncome</h1>

      <div>
        <label>
          Filter by Referrer:
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="No">No</option>
            <option value="referrer">Yes</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Referrer</th>
            <th>Time</th>
            <th>Identity</th>
            <th>Transaction Hash</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.user}>
              <td>{transaction.user}</td>
              <td>{transaction.referrer}</td>
              <td>{transaction._time}</td>
              <td>{transaction.Identity}</td>
              <td className="scrollable-column">
                {transaction.transaction_hash}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PoolIncome;