import { projectI } from '../../project';

export interface newProjectI {
  dataProject: Partial<projectI>;
}

export interface getAllProjectsI {
  projectsList: Array<projectI>;
}

export interface getDataProjectI {
  project: projectI;
}
