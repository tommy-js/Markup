import React, { useState, useEffect, useContext } from "react";
import { taskQuery } from "../queries/queries";
import { ClearTaskList } from "./ClearTaskList";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import IndividualTask from "./IndividualTask";
import { userContext } from "../App";
import AddTask from "./AddTask";
import "../App.scss";

interface Props {
  taskQuery: () => object;
}

const Tasks: React.FC<Props> = props => {
  const { userVal, setUserVal } = useContext(userContext);
  const { data, loading } = useQuery(taskQuery, {
    variables: { userid: userVal.id }
  });
  const [displayTask, setDisplayTask] = useState(true);
  const [stateTasks, setStateTasks] = useState();
  const [loadIfEmpty, setLoadIfEmpty] = useState("");

  useEffect(() => {
    if (!loading) {
      if (data.tasks.length > 0) {
        setStateTasks(data.tasks);
        setLoadIfEmpty("");
      } else {
        setLoadIfEmpty("Add a task to start...");
      }
    }
  }, [data]);

  function addTasks(addParam: string) {
    let idLength = Math.floor(Math.random() * 1000000);
    let newTask = { content: addParam, id: idLength };
    setStateTasks((prev: any) => [...prev, newTask]);
  }

  function clearTasks() {
    setDisplayTask(!displayTask);
  }

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="task_box">
        <div className="tasklist_container">
          <p>{loadIfEmpty}</p>
          {stateTasks.map((task: any) => (
            <IndividualTask
              key={task.id}
              id={task.id}
              task={task.content}
              displayTask={displayTask}
            />
          ))}
        </div>
        <div className="task_buttons">
          <AddTask addTasks={addTasks} clearTasks={clearTasks} />
        </div>
      </div>
    );
  }
};

export default compose(graphql(taskQuery, { name: "taskQuery" }))(Tasks);
