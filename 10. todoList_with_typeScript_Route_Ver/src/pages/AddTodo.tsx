import { useState } from "react";
import { useNavigate } from "react-router";
import { CallbacksType } from "../AppContainer";

type PropsType = { callbacks: CallbacksType };

const AddTodo = ({ callbacks }: PropsType) => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const addTodoHandler = () => {
    if (todo.trim() === "" || desc.trim() === "") {
      alert("반드시 할 일, 설명을 입력해야 합니다.");
      return;
    }
    callbacks.addTodo(todo, desc);
    navigate("/todos");
  };

  return (
    <>
      <div className="row">
        <div className="col p-3">
          <h2>할 일 추가</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label htmlFor="todo">할 일 :</label>
            <input
              type="text"
              className="form-control"
              id="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="desc">설명 :</label>
            <textarea
              className="form-control"
              id="desc"
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="form-group">
          <button
              type="button"
              className="btn btn-primary m-1"
              onClick={addTodoHandler}
            >
              추가
            </button>
            <button
              type="button"
              className="btn btn-primary m-1"
              onClick={() => navigate("/todos")}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
