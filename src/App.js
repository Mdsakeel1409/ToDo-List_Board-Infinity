import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './index.css'; // Ensure your styles are defined here

const Dashboard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : []; // Parse JSON or return empty array
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'todo',
    priority: '',
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTaskStatus = (id, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCreateTask = () => {
    const taskId = tasks.length + 1; // Simple ID assignment
    setTasks(prevTasks => [...prevTasks, { id: taskId, ...newTask }]);
    setNewTask({ title: '', description: '', dueDate: '', status: 'todo', priority: '' });
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside

    const { source, destination } = result;

    // Rearrange tasks based on drag and drop
    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="dashboard">
        <div className="header">
          <h1>Desktop & Mobile Application</h1>
          <button className="create-task-button" onClick={() => setIsModalOpen(true)}>Create Task</button>
        </div>

        <div className="task-columns">
          <Droppable droppableId="todo">
            {(provided) => (
              <div
                className="task-column todo"
                style={{ backgroundColor: '#d9edf7' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>TODO</h2>
                {tasks.filter(task => task.status === 'todo').map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task-header">
                          <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                          <h3>{task.title}</h3>
                        </div>
                        <p>{task.description}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <label htmlFor={`status-${task.id}`}>Change Status:</label>
                        <select
                          id={`status-${task.id}`}
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        >
                          <option value="todo">Todo</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="in-progress">
            {(provided) => (
              <div
                className="task-column in-progress"
                style={{ backgroundColor: '#fff3cd' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>IN PROGRESS</h2>
                {tasks.filter(task => task.status === 'in-progress').map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task-header">
                          <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                          <h3>{task.title}</h3>
                        </div>
                        <p>{task.description}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <label htmlFor={`status-${task.id}`}>Change Status:</label>
                        <select
                          id={`status-${task.id}`}
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        >
                          <option value="todo">Todo</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="completed">
            {(provided) => (
              <div
                className="task-column completed"
                style={{ backgroundColor: '#d4edda' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2>COMPLETED</h2>
                {tasks.filter(task => task.status === 'completed').map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <div
                        className="task-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="task-header">
                          <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                          <h3>{task.title}</h3>
                        </div>
                        <p>{task.description}</p>
                        <p>Due Date: {task.dueDate}</p>
                        <label htmlFor={`status-${task.id}`}>Change Status:</label>
                        <select
                          id={`status-${task.id}`}
                          value={task.status}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        >
                          <option value="todo">Todo</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button className="delete-button" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Create New Task</h2>
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
              />
              <label>Select Date *</label>
              <input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                required
              />
              <label>Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleInputChange}
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <label>Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInputChange}
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <div className="modal-buttons">
                <button onClick={handleCreateTask}>Create Task</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
