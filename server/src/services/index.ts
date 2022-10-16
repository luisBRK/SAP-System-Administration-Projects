export * from './token-generator.service';
export * from './auth-logged.service';

import * as authService from './auth.service';
export { authService };

import * as projectService from './project.service';
export { projectService };
