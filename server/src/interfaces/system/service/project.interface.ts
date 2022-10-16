import { projectI } from '../../project';

export interface newProjectI {
  dataProject: Partial<projectI>;
}

export interface getAllProjectsI {
  projectsList: Array<projectI>;
}

export interface getOneProjectI {
  project: projectI;
}

export interface editProjectI {
  project: projectI;
}

export interface deleteProjectI {
  message: string;
}
