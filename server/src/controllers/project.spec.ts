import request from 'supertest';
import app from '../app';

describe('Test GET /api/projects', () => {
  const noProjectsCreated = [{}];

  test('It should response with status 200', async () => {
    const response = await request(app).get('/api/projects').expect('Content-Type', /json/).expect(200);

    expect(response.body).toMatchObject(noProjectsCreated);
  });
});

// describe('Test GET /api/projects', () => {
//   let mockRequest: Partial<customReq>;
//   let mockResponse: Partial<Response>;
//   let responseObject: {};

//   beforeEach(() => {
//     mockRequest = {};
//     // mockRequest.user = userReqGood;

//     mockResponse = {
//       statusCode: 0,
//       send: jest.fn().mockImplementation((result) => {
//         responseObject = result;
//       }),
//     };
//   });

//   test('It should response with status 200', async () => {
//     const expectedStatusCode = 200;
//     const expectedResponse = {
//       projectsList: [],
//     };

//     projectController.getAllProjects(mockRequest as Request, mockResponse as Response);

//     expect(mockResponse.statusCode).toBe(expectedStatusCode);

//     expect(responseObject).toEqual(expectedResponse);

//     const response = await request(app).get('/api/projects').expect('Content-Type', /json/).expect(200);

//     expect(response.body).toMatchObject(noProjectsCreated);
//   });
// });
