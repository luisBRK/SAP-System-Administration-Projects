import { taskI, userI } from '../interfaces/project';
import { serviceInterface, getDataTaskI, getMessageI } from '../interfaces/system';
import { Project, Task, User } from '../models';

export async function newTask(taskData: taskI, userData: userI): Promise<serviceInterface<getDataTaskI>> {
  const user = await User.findById(userData._id);
  console.log('user', user);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const projectVerify = await Project.findById(taskData.project);
  console.log('projectverify', projectVerify);
  if (!projectVerify) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }

  if (projectVerify.creator.toString() !== user._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    const storedTask = await Task.create(taskData);
    projectVerify.tasks.push(storedTask._id);
    await projectVerify.save();
    return { status: 201, result: { dataTask: storedTask } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function getOneTask(taskId: string, userData: userI): Promise<serviceInterface<getDataTaskI>> {
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return { status: 404, error: 'TASK_NOT_FOUND' };
    }

    const projectVerify = await Project.findById(task.project);
    if (!projectVerify) {
      return { status: 404, error: 'PROJECT_NOT_FOUND' };
    }

    if (projectVerify.creator.toString() !== userData._id.toString()) {
      return { status: 403, error: 'ACCES_DENIED' };
    }

    return { status: 200, result: { dataTask: task } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function updateTask(
  taskId: string,
  taskData: taskI,
  userData: userI
): Promise<serviceInterface<getDataTaskI>> {
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const projectVerify = await Project.findById(taskData.project);
  if (!projectVerify) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return { status: 404, error: 'TASK_NOT_FOUND' };
  }

  // TODO: collabs id = user session id??
  if (projectVerify.creator.toString() !== userData._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  task.name = taskData.name || task.name;
  task.description = taskData.description || task.description;
  task.state = taskData.state || task.state;
  task.dateDelivery = taskData.dateDelivery || task.dateDelivery;
  task.priority = taskData.priority || task.priority;

  if (task.state === 'to-do') {
    task.takedBy = null;
    task.completedBy = null;
  }
  if (task.state === 'in-progress') {
    task.takedBy = userData._id;
    task.completedBy = null;
  }
  if (task.state === 'done') {
    task.completedBy = userData._id;
  }

  try {
    await task.save();
    const storedTask = await Task.findById(taskId)
      .populate({ path: 'takedBy', select: 'name' })
      .populate({ path: 'completedBy', select: 'name' });

    return { status: 200, result: { dataTask: storedTask! } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function deleteTask(taskId: string, userData: userI): Promise<serviceInterface<getMessageI>> {
  if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const task = await Task.findById(taskId);
  if (!task) {
    return { status: 404, error: 'TASK_NOT_FOUND' };
  }

  const projectVerify = await Project.findById(task.project);
  if (!projectVerify) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }

  if (projectVerify.creator.toString() !== userData._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    const taskIndex = projectVerify.tasks.indexOf(task._id);
    if (taskIndex > 1) {
      projectVerify.tasks.splice(taskIndex, 1);
    }

    await Promise.allSettled([await projectVerify.save(), await task.deleteOne()]);

    return { status: 200, result: { message: 'Task deelted successfully' } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}
