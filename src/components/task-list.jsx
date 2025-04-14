"use client"

import { useContext } from "react"
import LanguageContext from "../context/LanguageContext"
import TaskItem from "./task-item"
import "../App.css"

function TaskList({ tasks }) {
  const { t } = useContext(LanguageContext)

  return (
    <div className="taskList-header">
      <h2 className="text-center">{t("tasks.taskList")}</h2>
      <div className="taskList-wrapper">
        {tasks.length === 0 ? (
          <p className="text-center">{t("tasks.noTasks")}</p>
        ) : (
          <div className="taskListContainer row-container">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} className="row-item" />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList