import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CallbacksType, StatesType, TodoItemType } from "../AppContainer";

type PropsType = { callbacks: CallbacksType; states: StatesType };
type TodoParam = { id?: string };

const EditTodo = ({ callbacks, states }: PropsType) => {
  const navigate = useNavigate();
  const { id } = useParams<TodoParam>();

  const todoItem = states.todoList.find(
    (item) => item.id === parseInt(id ? id : "0")
  );
  if (!todoItem) {
    navigate("/todos");
    return <></>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [todoOne, setTodoOne] = useState<TodoItemType>({ ...todoItem });

  const updateTodoHandler = () => {
    if(todoOne.todo.trim() === "" || todoOne.desc.trim() === "") {
        alert("반드시 할 일 설명을 입력해야 합니다.");
        return;
    }
    const { id, todo, desc, done } = todoOne;
    callbacks.updateTodo(id, todo, desc, done);
    navigate("/todos");
  };

  return (
    <>
        <div className="row">
            <div className="col p-3">
                <h2>할 일 수정</h2>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <div className="form-group">
                    <label htmlFor="todo">할 일:</label>
                    <input type="text" className="form-control" id="todo" value={todoOne.todo}
                    onChange={e => setTodoOne({...todoOne, todo: e.target.value})}/>
                </div>
                <div className="form-group">
            <label htmlFor="desc">설명 :</label>
            <textarea
              className="form-control"
              id="desc"
              rows={3}
              value={todoOne.desc}
              onChange={(e) => setTodoOne({...todoOne, desc:e.target.value})}
            />
          </div>
          <div className="form-group">
            <label htmlFor="done">완료 여부 : </label>{" "}
            <input type="checkbox" checked={todoOne.done}
            onChange={e => setTodoOne({...todoOne, done:e.target.checked })} />
          </div>
          <div className="form-group">
          <button
              type="button"
              className="btn btn-primary m-1"
              onClick={updateTodoHandler}
            >
              수정
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


export default EditTodo;
