import React, { useState } from "react";

import './ExpenseForm.css';

const ExpenseForm2 = (props) => {
    const [form, setForm] = useState({
        title: '',
        amount: '',
        date: ''
    });

    const { title, amount, date} = form; 

    const onChangeHandler = e => {
        const newForm = {
            ...form,
            [e.target.name] : e.target.value
        };

        setForm(newForm);
    };

    const submitHandler = e => {
        e.preventDefault(); 
        
        const expenseData = {
            title,
            amount: +amount, 
            date: new Date(date)
        };
        console.log(expenseData);
        props.onSaveExpenseData(expenseData);
        setForm({
            title: '',
            amount: '',
            date: ''
        });
    }

    return <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
            <div className="new-expense__control">
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={onChangeHandler} />
            </div>
            <div className="new-expense__control">
                <label>Amount</label>
                <input type="number" name="amount" min="0.01" step="0.01" value={amount} onChange={onChangeHandler}/>
            </div>
            <div className="new-expense__control">
                <label>Date</label>
                <input type="date" name="date" min="2019-01-01" max="2023-12-31" value={date} onChange={onChangeHandler}></input>
            </div>
        </div>
        <div className="new-expense__actions">
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button type="submit">Add Expense</button>
        </div>
    </form>
    };

export default ExpenseForm2;