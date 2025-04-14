"use client"

import { useContext, useState } from "react"
import TaskContext from "../context/TaskContext"
import NotificationContext from "/src/context/NotificationContext"
import LanguageContext from "../context/LanguageContext"
import "../App.css"

function AddTaskForm() {
  const { addTask } = useContext(TaskContext)
  const { addNotification } = useContext(NotificationContext)
  const { t } = useContext(LanguageContext)
  const [newTask, setNewTask] = useState({
    title: "",
    category: "Work",
    priority: "1",
    dueDate: "", // Will now store combined date and time
    reminder: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "dueDate" && e.target.type === "date") {
      setNewTask((prevTask) => ({
        ...prevTask,
        dueDate: value + (prevTask.dueDate.split("T")[1] || "T00:00"),
      }))
    } else if (name === "dueDate" && e.target.type === "time") {
      setNewTask((prevTask) => ({
        ...prevTask,
        dueDate: (prevTask.dueDate.split("T")[0] || "") + "T" + value,
      }))
    } else {
      setNewTask({ ...newTask, [name]: value })
    }
  }

  const handleAddTask = () => {
    if (!newTask.title) {
      addNotification(t("notifications.enterTitle"), "warning")
      return
    }

    if (!newTask.dueDate) {
      addNotification(t("notifications.selectDueDate"), "warning")
      return
    }

    addTask(newTask)
    addNotification(t("notifications.taskAdded"), "success")
    setNewTask({ title: "", category: "Work", priority: "1", dueDate: "", reminder: "" })
  }

  const validateReminder = (value) => {
    const isValid = /^\d+[mh]$/.test(value)
    if (!isValid && value) {
      addNotification(t("notifications.reminderFormat"), "warning")
    }
  }

  return (
    <div className="mb-4 border p-4 rounded bg-gray-100 taskFormContainer">
      <input
        type="text"
        placeholder={t("tasks.title")}
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        className="border p-2 w-full rounded mb-2 taskInput"
      />
      <select
        name="category"
        value={newTask.category}
        onChange={handleInputChange}
        className="border p-2 w-full rounded mb-2 taskSelect"
      >
        <option value="Work">{t("categories.work")}</option>
        <option value="Personal">{t("categories.personal")}</option>
        <option value="School">{t("categories.school")}</option>
        <option value="Shopping">{t("categories.shopping")}</option>
        <option value="Health">{t("categories.health")}</option>
      </select>
      <select
        name="priority"
        value={newTask.priority}
        onChange={handleInputChange}
        className="border p-2 w-full rounded mb-2 taskSelect"
      >
        <option value="1">{t("priorities.low")}</option>
        <option value="2">{t("priorities.medium")}</option>
        <option value="3">{t("priorities.high")}</option>
      </select>
      <div className="flex gap-2 mb-2">
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate.split("T")[0] || ""}
          onChange={handleInputChange}
          className="border p-2 w-1/2 rounded taskInput"
        />
        <input
          type="time"
          name="dueDate"
          value={newTask.dueDate.split("T")[1]?.slice(0, 5) || "00:00"}
          onChange={handleInputChange}
          className="border p-2 w-1/2 rounded taskInput"
        />
      </div>
      <input
        type="text"
        placeholder={t("tasks.reminder")}
        name="reminder"
        value={newTask.reminder}
        onChange={(e) => {
          handleInputChange(e)
          validateReminder(e.target.value)
        }}
        className="border p-2 w-full rounded mb-2 taskInput"
      />
      <button onClick={handleAddTask} className="bg-green-500 text-white p-2 rounded w-full">
        {t("tasks.add")}
      </button>
    </div>
  )
}

export default AddTaskForm
