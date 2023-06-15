// class ver
class Todo {
    id: string;
    text: string;

    constructor(todoText:string) {
        this.text = todoText;
        this.id = new Date().toString();
    }
}

// type ver
// type Todo = {
//     id: string,
//     text: string,
// };

export default Todo;