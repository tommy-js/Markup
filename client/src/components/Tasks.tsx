import React, { useState, useEffect, useContext } from "react";
import { taskQuery } from "../queries/queries";
import { ClearTaskList } from "./ClearTaskList";
import { flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { IndividualTask } from "./IndividualTask";
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
  const [stateTasks, setStateTasks] = useState([
    { id: 0, content: "Example task" }
  ]);

  console.log(data);

  function addTasks(addParam: string) {
    let newTask = { title: addParam, id: stateTasks.length };
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
        {data.tasks.map((task: any) => (
          <IndividualTask
            key={task.id}
            task={task.content}
            displayTask={displayTask}
          />
        ))}
        <div className="task_buttons">
          <AddTask addTasks={addTasks} clearTasks={clearTasks} />
        </div>
      </div>
    );
  }
};

export default compose(graphql(taskQuery, { name: "taskQuery" }))(Tasks);
