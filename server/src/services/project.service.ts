import { Project, User } from '../models';
import { projectI, userI } from '../interfaces/project';
import { serviceInterface, newProjectI, getAllProjectsI, getDataProjectI, getMessageI } from '../interfaces/system';

export async function newProject(projectData: projectI, userData: userI): Promise<serviceInterface<newProjectI>> {
  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const project = new Project(projectData);
  project.creator = userData._id;

  try {
    await project.save();
    return { status: 201, result: { dataProject: project } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function getAllProjects(userData: userI): Promise<serviceInterface<getAllProjectsI>> {
  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    // TODO: return collabs
    const projects = await Project.find().where('creator').equals(user);
    return { status: 200, result: { projectsList: projects } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function getOneProject(projectId: string, userData: userI): Promise<serviceInterface<getDataProjectI>> {
  if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    const project = await Project.findById(projectId).populate({
      path: 'tasks',
      populate: [
        { path: 'takedBy', model: 'User', select: 'name' },
        { path: 'completedBy', model: 'User', select: 'name' },
      ],
    });
    if (!project) {
      return { status: 404, error: 'PROJECT_NOT_FOUND' };
    }

    // TODO: collabs id = user session id??
    if (project.creator.toString() !== userData._id.toString()) {
      return { status: 403, error: 'ACCES_DENIED' };
    }

    return { status: 200, result: { project: project } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function editProject(
  projectId: string,
  projectData: projectI,
  userData: userI
): Promise<serviceInterface<getDataProjectI>> {
  if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const project = await Project.findById(projectId.trim());
  if (!project) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }
  if (project.creator.toString() !== userData._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  project.name = projectData.name || project.name;
  project.description = projectData.description || project.description;
  project.bgColor = projectData.bgColor || project.bgColor;
  project.dateDelivery = projectData.dateDelivery || project.dateDelivery;
  project.client = projectData.client || project.client;

  try {
    await project.save();
    return { status: 200, result: { project: project } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function deleteProject(projectId: string, userData: userI): Promise<serviceInterface<getMessageI>> {
  if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const project = await Project.findById(projectId.trim());

  if (!project) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }

  if (project.creator.toString() !== user._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    await project.deleteOne();
    return { status: 200, result: { message: 'Project deleted successfully' } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}
