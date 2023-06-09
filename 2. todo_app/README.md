# Todo_App 

<br>

## 필요한 라이브러리 설치
```
yarn add node-sass classnames react-icons
```
1. node-sass : Sass를 사용하기 위해 설치할 라이브러리
2. classnames : 조건부 스타일링을 편하게 하기 위해 설치할 라이브러리
3. react-icons : 리액트에서 다양하고 예쁜 아이콘을 사용할 수 있는 라이브러리 

<br>

## Prettier 설정

### .prettierrc
```javascript
{
    "singleQuote" : true,
    "semi" : true,
    "useTabs" : false,
    "tabWidth" : 2,
    "trailingComma" : "all",
    "printWidth" : 80
}
``` 

<br>

## UI 구성하기
<br>

### **App**
<br>

```javascript
import React, { useState, useRef, useCallback } from 'react';

import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 공부하기',
      checked: true,
    },
    {
      id: 2,
      text: 'JS 공부하기',
      checked: true,
    },
    {
      id: 3,
      text: 'TS 공부하기',
      checked: false,
    },
  ]);
  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const nextTodo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(nextTodo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

```

<br>

### **TodoTemplate : 화면을 가운데에 정렬시켜 주며, 앱 타이틀(일정 관리)을 보여준다.**
<br>

```javascript
import React from 'react';
import './TodoTemplate.scss'

const TodoTemplate = ({children}) => {
    return (
        <div className='TodoTemplate'>
            <div className='app-title'>일정 관리</div>
            <div className='content'>{children}</div>
        </div>
    );
};

export default TodoTemplate;
```

<br>

### **TodoInsert : 새로운 항목을 입력하고 추가할 수 있는 컴포넌트**
<br>

```javascript
import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

  
    const onSubmit = useCallback( e => {
        onInsert(value);
        setValue('');
        e.preventDefault();
}, [onInsert, value]);

  return (
    <form className='TodoInsert' onSubmit={onSubmit}>
        <input placeholder='할 일을 입력하세요' value={value} onChange={onChange}/>
        <button type='submit'>
            <MdAdd />
        </button>
    </form>
  );
};

export default TodoInsert;

```
<br>

### **TodoListItem: 각 할 일 항목에 대한 정보를 보여주는 컴포넌트**
<br>

```javascript
import React from 'react';
import { 
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle}) => {
    const { id, text, checked } = todo; 
    return (
        <div className='TodoListItem'>
            <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                { checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className='text'>{text}</div>
            </div>
            <div className='remove' onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default TodoListItem;
```
<br>

### **TodoList: todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용하여 여러 개의 TodoListItem 컴포넌트로 반환하여 보여준다.**
<br>

```javascript
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        <div className='TodoList'>
           {todos.map(todo => (
            <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
           ))}
        </div>
    );
};

export default TodoList;
```

<br>

## 현 문제점 
일정 항목이 작을 때는 별 문제가 되지 않지만, 만약 일정 항목이 몇 만개씩 생긴다면 새로운 항목을 축하하거나 기존 항목을 삭제 및 토글할 때 지연이 발생할 수 있다. 

클라이언트 자원을 더욱 효율적으로 사용하려면 불필요한 리렌더링을 방지해야 한다. 

<br>

📌 만약 할 일이 2500개 정도 된다면? 

=> 항목을 하나하나 체크할 때 속도가 이전보다 현저히 느려진다. 

```javascript
import React, { useState, useRef, useCallback } from 'react';

import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const createBulkTodos = () => {
  const array = [];
  for(let i = 1; i<= 2500; i++) {
    array.push({
      id:i,
      text: `할 일${i}`,
      checked: false,
    });
  }
  return array;
};

function App() {
  const [todos, setTodos] = useState(
   createBulkTodos
  );
  const nextId = useRef(2501);

  const onInsert = useCallback(
    (text) => {
      const nextTodo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(nextTodo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

```

## 느려진 원인 
컴포넌트는 다음과 같은 상황에서 리렌더링이 발생합니다.

1. 자신이 전달받은 props가 변경될 떄

2. 자신의 state가 바뀔 때

3. 부모 컴포넌트가 리렌더링 될 때

4. forceUpdate 함수가 실행될 때 

현 상황을 분석해 보면 '할 일 1' 항목을 체크할 경우 App 컴포넌트의 state가 변경되면서 App 컴포넌트가 리렌더링 됩니다. 부모 컴포넌트가 리렌더링 되었으니 TodoList 컴포넌트가 리렌더링 되고 그 안의 무수한 컴포넌트들도 리렌더링 됩니다. 

'할 일1' 항목은 리렌더링되어야 하는 것이 맞지만, '할 일2'부터 '할 일 2500'까지는 리렌더링을 안 해도 되는 상황인데 모두 리렌더링 되고 있으므로 이렇게 느린 것입니다. 

컴포넌트의 개수가 많지 않다면 모든 컴포넌트를 리렌더링 해도 느려지지 않는데, 지금처럼 약 2,000개가 넘어가면 성능이 저하됩니다.

이럴 때는 컴포넌트 리렌더링 성능을 최적화해 주는 작업을 해 주어야 합니다.

**즉, 리렌더링이 불 필요할 때는 리렌더링을 방지해 주어야 합니다.** 

<br>

## 해결책 
 
 ### 1. React.memo 사용하기
 <br>

 ```javascript
 import React from 'react';
import { 
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle}) => {
    const { id, text, checked } = todo; 
    return (
        <div className='TodoListItem'>
            <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                { checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className='text'>{text}</div>
            </div>
            <div className='remove' onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default React.memo(TodoListItem);
 ```

다음과 같이 React.memo를 사용하면 todo, onRemove, onToggle이 바뀌지 않으면 리렌더링을 하지 않습니다. 

<br>

### 2. useState의 함수형 업데이트 
기존에 setTodos 함수를 사용할 때는 새로운 상태를 파라미터로 넣어 주었습니다. setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣을 수도 있습니다. 이를 함수형 업데이트라고 부릅니다.

<br>

```javascript
import React, { useState, useRef, useCallback } from 'react';

import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const createBulkTodos = () => {
  const array = [];
  for(let i = 1; i<= 2500; i++) {
    array.push({
      id:i,
      text: `할 일${i}`,
      checked: false,
    });
  }
  return array;
};

function App() {
  const [todos, setTodos] = useState(
   createBulkTodos
  );
  const nextId = useRef(2501);

  const onInsert = useCallback(
    (text) => {
      const nextTodo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos => todos.concat(nextTodo));
      nextId.current += 1;
    },
    [],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos => todos.filter((todo) => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    id => {
      setTodos( todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

```

<br>

### 3. TodoList 컴포넌트 최적화하기 
리스트에 관련된 컴포넌트를 최적화할 때는 리스트 내부에서 사용하는 컴포넌트도 최적화해야 하고, 리스트로 사용되는 컴포넌트 자체도 최적화해 주는 것이 좋습니다.

TodoList 컴포넌트를 다음과 같이 수정할 수 있습니다. 

```javascript
import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({todos, onRemove, onToggle}) => {
    return (
        <div className='TodoList'>
           {todos.map(todo => (
            <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
           ))}
        </div>
    );
};

export default React.memo(TodoList);
```

<br>

위 최적화 코드는 현재 프로젝트 성능에 전혀 영향을 주지 않습니다. 왜냐하면, TodoList 컴포넌트의 부모 컴포넌트인 App 컴포넌트가 리렌더링 되는 유일한 이유가 todos 배열이 업데이트 될 때이기 때문입니다. 

즉, 지금 TodoList 컴포넌트는 불필요한 리렌더링이 발생하지 않습니다. 

하지만, App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트 될 때는 TodoList 컴포넌트가 불필요한 리렌더링을 할 수도 있ㅅ브니다. 그렇기 때문에 지금 React.memo를 사용해서 미리 최적화 해준 것 입니다.

**리스트 관련 컴포넌트를 작성할 때는 리스트 아이템과 리스트, 이 두가지 컴포넌트를 최적화해주는 것을 잊으면 안됩니다.** 

<br>

### 4. react-virtualized를 사용한 렌더링 최적화 
일정 관리 애플리케이션에 초기 데이터가 2,500개 등록되어 있는데, 실제 화면에 나오는 항목은 아홉 개뿐입니다. 
나머지는 스크롤해야 볼 수 있습니다. 

현재 컴포넌트가 맨 처음 렌더링 될 때 2,500개 컴포넌트 중 2,491개 컴포넌트는 스크롤하기 전에는 보이지 않음에도 불구하고 렌더링이 이루어집니다. 그리고 나중에 todos 배열에 변동이 생길 때도 TodoList 컴포넌트 내부의 map 함수에서 배열의 처음붙어 끝까지 컴포넌트로 변환해 주는데, 이 중에서 2,491개는 보이지 않기 때문에 시스템 자원 낭비입니다.

이는 **react-virtualized**를 사용하면 리스트 컴포넌트에서 스크롤되기 전에 보이지 않는 컴포넌트는 렌더링하지 않고 크기만 차지하게끔 할 수 있습니다. 그리고 만약 스크롤되면 해당 스크롤 위치에서 보여 주어야 할 컴포넌트를 자연스럽게 렌더링 시킬 수 있습니다. 

<br>

#### install
```
yarn add react-virtualized
```

이 라이브러리를 사용하면 TodoList 컴포넌트의 성능을 최적화 할 수 있습니다.

단, 최적화를 수행하려면 사전에 먼저 해야할 작업이 있는데, 바로 **각 항목의 실제 크기를 px단위로 알아내는 것입니다.** 

TodoList 컴포넌트를 아래와 같이 수정해주세요.

<br>

```javascript
import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );
  return (
    <div
      className="TodoList"
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링 할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    >
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default React.memo(TodoList);

```
<br>

List 컴포넌트를 사용하기 위해 rowRender라는 함수를 새로 작성해 주었습니다. 이 함수는 react-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링 할 때 사용하며, 이 함수를 List 컴포넌트의 props로 설정해주어야 합니다. 

이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아 와서 사용합니다. 

List 컴포넌트를 사용할 때는 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링 할 때 사용해야 하는 함수, 그리고 배열을 props로 넣어 주어야 합니다. 

그러면 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화해 줍니다.

<br>

TodoListItem을 아래와 같이 수정해줍니다. 
<br>

```javascript
import React from 'react';
import { 
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({todo, onRemove, onToggle, style}) => {
    const { id, text, checked } = todo; 
    return (
        <div className='TodoListItem-virtualized' style={style}>
            <div className={cn('checkbox', {checked})} onClick={() => onToggle(id)}>
                { checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className='text'>{text}</div>
            </div>
            <div className='remove' onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default React.memo(TodoListItem);
```
