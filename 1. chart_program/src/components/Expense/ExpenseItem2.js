import React from "react";

import Card2 from "../UI/Card2";
import ExpenseDate2 from "./ExpenseDate2";
import "./ExpenseItem.css";

const ExpenseItem2 = (props) => {
  return (
    <li>
      <Card2 className="expense-item">
        <ExpenseDate2 date={props.date} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
        </div>
      </Card2>
    </li>
  );
};

export default ExpenseItem2;
