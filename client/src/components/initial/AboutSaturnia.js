import React, { useState } from "react";
import IndividualTask from "../homepage/tasks/IndividualTask.tsx";
import AddTask from "../homepage/tasks/AddTask";

export default function AboutSaturnia() {
  const [exampleTasks] = useState([
    { id: 3, exampleId: 123, content: "Write a paragraph", displayTask: true },
    { id: 3, exampleId: 123, content: "Write a paragraph", displayTask: true },
    { id: 3, exampleId: 123, content: "Write a paragraph", displayTask: true }
  ]);

  return (
    <div className="about_container">
      <h1>
        About <span className="pink_span">Saturnia</span>
      </h1>
      <h3>Effortless Collaboration</h3>
      <p>
        The goal of Saturnia is to make collaboration on your projects
        frictionless. In a world of productivity apps and messaging tools, our
        program is the first to actively improve the experience of developing
        for the developer, and managing for the project leads.
      </p>
      <h3>Contribute Together on Documents</h3>
      <p>
        Help each other write up plans or take notes on important topics. Manage
        who has viewing and editing permissions on the fly and invite or remove
        people with ease.
      </p>
      <h3>Keep Track of Tasks</h3>
      <p>
        Create tasks and tag specific people in them. Write your own personal
        task lists to keep track for yourself, or make them public on the
        project page.
      </p>
      <div className="about_tasklist">
        <div className="tasklist_container">
          {exampleTasks.map(task => (
            <IndividualTask
              key={task.id}
              userId={task.exampleId}
              id={task.id}
              task={task.content}
              displayTask={task.displayTask}
            />
          ))}
        </div>
      </div>
      <p>
        As a developer tagged on a task, set your progress on that task to
        "Working on it" to let your team know that it's being taken care of.
        When you're done or taking a break, go in and set your progress as such.
      </p>
      <h3>Avoid Distractions</h3>
      <p>
        A common point of contention with most modern workplace solutions is
        that they always seem to end up reducing productivity. We've taken great
        care at Saturnia to ensure that this isn't an issue. There are three
        statuses for your to choose from:
      </p>
      <ul>
        <li>
          <span id="active_green">Active</span>: you're available for discussion
          and want to see every notification
        </li>
        <li>
          <span id="active_red">Working</span>: you're busy with a task and only
          want to receive urgent notifications
        </li>
        <li>
          <span id="active_yellow">Break</span>: you're taking a break and want
          your team to know that you might be away for a while
        </li>
      </ul>
      <p>
        When you're ready to get started on a task, simply set your status as
        "Working" to get some peace and quiet. You'll only be notified with
        urgent matters. Want to get important notifications from a group of
        coworkers, even if you're busy with other matters? Just go into that
        group conversation and whitelist them for urgency.
      </p>
      <h3>Code Edit in Tandem</h3>
      <p>
        Faced with a difficult problem that you'd like your coworkers to take a
        look at? Just start a code message and paste in your work. Your
        coworkers can then take a look at it and make changes for you in
        real-time.
      </p>
      <h3>Keep Track of Importance</h3>
      <p>
        We want to make it easy for our users to cut through the chatter of
        conversations and keep track of what's essential. That's why there are a
        number of tools available to you in order to get ahold of the important
        things easier; list tasks in terms of time-sensitivity; tag messages as
        urgent and easily access them; receive reminders about work that needs
        to get done.
      </p>
      <p>
        Urgent messages in chat are outlined in red and can be easily accessed
        by clicking on the "Show urgent messages" button in any conversation.
        These chat messages are unique in that they can hold comments and be
        marked in a variety of ways, making it trivial to keep track of them.
      </p>
    </div>
  );
}
