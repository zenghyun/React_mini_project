import React, {Fragment, useEffect, useState } from 'react';

import NewTask from './components/NewTask/NewTask';
import Tasks from './components/Tasks/Tasks';
import useHttp from './hooks/use-http';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error ,sendRequest: fetchTasks } = useHttp();

  useEffect( () => {
    const transformTasks = tasksObj => {
      const loadedTasks = []; 

      for( const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
      setTasks(loadedTasks);

    }; 

    fetchTasks({
      url:'https://custom-hook-6de65-default-rtdb.firebaseio.com/tasks.json',
    }, transformTasks);
    }, [fetchTasks]);

  const taskAddHandler = task => {
    setTasks( prevTasks => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler}/>
      <Tasks 
      items={tasks}
      loading={isLoading}
      error={error}
      onFetch={fetchTasks}
      />

    </Fragment>
  );
};

export default App;