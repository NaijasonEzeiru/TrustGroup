"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Dashboard.module.css";
import Modal from "@/components/Modal";
import { API_URL } from "@/helpers/vars";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]) as any;
  const [seletedTransaction, setSelectedTransaction] = useState({}) as any;
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTransactions();
  }, []);

  const getAllTransactions = async () => {
    const res = await fetch(`${API_URL}/admin/all-transactions`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
    if (res.ok) {
      setTransactions(data);
    } else {
      setTransactions([]);
    }
  };

  const editTransaction = (i: number) => {
    let trans = transactions[i];
    setSelectedTransaction({
      ...trans,
      created_at: trans.created_at?.substring(
        0,
        trans.created_at?.lastIndexOf(":")
      ),
    });
  };

  // Amount cannot be zero use delete instead

  const updatedTranscationDetailsSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    let { id, amount, created_at, charge, currency } = seletedTransaction;
    const adjustedTime = new Date(created_at);
    created_at = adjustedTime.toISOString();
    let difference =
      type == "Deposit"
        ? seletedTransaction.amount - +transactions[id - 1].amount
        : seletedTransaction.amount + -transactions[id - 1].amount;
    const res = await fetch(`${API_URL}/admin/all-transactions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id,
        amount,
        created_at,
        charge,
        currency,
        difference,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      getAllTransactions();
      alert(data.message);
      setOpenModal(false);
      setLoading(false);
    } else {
      alert(data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal openModal={openModal}>
        <div className={styles.editTransactionModal}>
          <button
            className={styles.transactionModalCancel}
            onClick={() => setOpenModal(false)}
          >
            X
          </button>
          <h6 className="tac" style={{ color: "#e12454" }}>
            Update Details
          </h6>
          <form onSubmit={updatedTranscationDetailsSubmitHandler}>
            <label>
              {" "}
              <p>Amount:</p>
              <input
                type="number"
                placeholder="Amount"
                value={seletedTransaction.amount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...seletedTransaction,
                    amount: +e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Currency:</p>
              {/* <input
								type='radio'
								value='$'
								name='currency'
								checked={seletedTransaction.currency === '$'}
								onClick={(e: any) =>
									setSelectedTransaction({
										...seletedTransaction,
										currency: +e.target.value
									})
								}
							/>{' '}
							$
							<input
								type='radio'
								value='€'
								name='currency'
								checked={seletedTransaction.currency === '€'}
								onClick={(e: any) =>
									setSelectedTransaction({
										...seletedTransaction,
										currency: +e.target.value
									})
								}
							/>{' '}
							€ */}
              <select
                value={seletedTransaction.currency}
                onChange={(e: any) =>
                  setSelectedTransaction({
                    ...seletedTransaction,
                    currency: e.target.value,
                  })
                }
              >
                <option value="$">$</option>
                <option value="€">€</option>
              </select>
            </label>
            <label>
              <p>Date:</p>
              <input
                type="datetime-local"
                value={seletedTransaction.created_at}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...seletedTransaction,
                    created_at: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <p>Charge:</p>
              <input
                type="number"
                value={seletedTransaction.charge}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...seletedTransaction,
                    charge: +e.target.value,
                  })
                }
              />
            </label>
            {/* <label>
							<p>Method:</p>
							<input
								type='text'
								value={method}
								onChange={(e) => setMethod(e.target.value)}
							/>
						</label> */}

            <button
              type="submit"
              style={{ background: "#e12454" }}
              className={styles.btn_modal}
              disabled={loading}
            >
              Submit
            </button>
            {error && <p className={styles.pin_error}>{error}</p>}
          </form>
        </div>
      </Modal>
      <div className={styles.details}>
        <div className={`${styles["con"]} ${styles["over"]}`}>
          <p>All Transactions</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>User</th>
                <th>AC Number</th>
                <th>DR/CR</th>
                <th>Type</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {transactions ? (
              <tbody>
                {transactions.map((transaction: any, i: any) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {transaction.created_at.substring(0, 10)}</td>
                    <td>{transaction.to}</td>
                    <td>{+transaction.userAccount_no + 1002784563}</td>

                    <td>{transaction.cr_or_dr}</td>
                    <td>{transaction.type}</td>
                    <td>Manual</td>
                    <td>
                      <p
                        style={
                          transaction.cr_or_dr == "CR"
                            ? {
                                color: "#08e308",
                              }
                            : { color: "red" }
                        }
                      >
                        {transaction.currency}
                        {transaction.amount?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </td>
                    <td>{transaction.condition}</td>
                    <td>
                      <td>
                        <button
                          onClick={(e) => {
                            setOpenModal(true);
                            console.log([
                              i,
                              transaction.created_at,
                              +transaction.userAccount_no + 1002784563,
                            ]);
                            editTransaction(i);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default AllTransactions;
