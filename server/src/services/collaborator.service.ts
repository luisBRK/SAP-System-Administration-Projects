import { userI } from '../interfaces/project';
import { serviceInterface, getMessageI, getCollaboratorI } from '../interfaces/system';
import { Project, User } from '../models';

export async function addCollaborator(
  projectId: string,
  collabData: userI,
  userData: userI
): Promise<serviceInterface<getMessageI>> {
  if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }

  if (project.creator.toString() !== userData._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  // const { email } = collabData;
  const collaborator = await User.findOne({ email: collabData.email }).select(
    '-__v -confirmed -createdAt -password -token -updatedAt '
  );
  if (!collaborator) {
    return { status: 404, error: 'COLLAB_NOT_FOUND' };
  }

  if (project.creator.toString() === collaborator._id.toString()) {
    return { status: 404, error: 'COLLAB_NOT_BE_ADMIN' };
  }

  if (project.collaborators.includes(collaborator._id)) {
    return { status: 404, error: 'COLLAB_ADDED' };
  }

  try {
    project.collaborators.push(collaborator._id);
    await project.save();

    return { status: 200, result: { message: 'Collaborator added successfully to the project' } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function searchCollaborator(
  collabData: userI,
  userData: userI
): Promise<serviceInterface<getCollaboratorI>> {
  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    const collaborator = await User.findOne({ email: collabData.email }).select(
      '-__v -confirmed -createdAt -password -token -updatedAt '
    );
    if (!collaborator) {
      return { status: 404, error: 'COLLAB_NOT_FOUND' };
    }

    return { status: 200, result: { collaboratorData: collaborator } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}

export async function deleteCollaborator(
  projectId: string,
  collabData: userI,
  userData: userI
): Promise<serviceInterface<getMessageI>> {
  if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
    return { status: 404, error: 'INVALID_ID' };
  }

  const user = await User.findById(userData._id);
  if (!user) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  const project = await Project.findById(projectId);
  if (!project) {
    return { status: 404, error: 'PROJECT_NOT_FOUND' };
  }

  if (project.creator.toString() !== userData._id.toString()) {
    return { status: 403, error: 'ACCES_DENIED' };
  }

  try {
    const collabIndex = project.collaborators.indexOf(collabData._id);
    if (collabIndex > -1) {
      project.collaborators.splice(collabIndex, 1);
    } else {
      return { status: 404, error: 'COLLAB_NOT_FOUND' };
    }

    await project.save();

    return { status: 200, result: { message: 'Collaborator deleted successfully of the project' } };
  } catch (event) {
    console.log(event);
    return { status: 502, error: 'SERVER_CONFLICT_ERROR' };
  }
}
