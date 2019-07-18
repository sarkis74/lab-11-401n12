'use strict';

const supergoose = require('./supergoose');
const auth = require('../src/auth/middleware');
const Users = require('../src/auth/users-model.js');


let users = {
    admin: {username: 'admin', password: 'password', role: 'admin'},
    editor: {username: 'editor', password: 'password', role: 'editor'},
    user: {username: 'user', password: 'password', role: 'user'},
};

beforeAll(async (done) => {
    await supergoose.startDB();
    const adminUser = await new Users(users.admin).save();
    const editorUser = await new Users(users.editor).save();
    const userUser = await new Users(users.user).save();
    done()
});

afterAll(supergoose.stopDB);

describe('auth middleware', () => {

    // admin:password: YWRtaW46cGFzc3dvcmQ=
    // admin:foo: YWRtaW46Zm9v

    let errorObject = {"message": "Invalid User ID/Password", "status": 401, "statusMessage": "Unauthorized"};

    describe('user authentication', () => {

        it('fails a login for a user (admin) with the incorrect basic credentials', () => {

            let req = {
                headers: {
                    authorization: 'Basic YWRtaW46Zm9v',
                },
            };
            let res = {};
            let next = jest.fn();
            let middleware = auth;

            return middleware(req, res, next)
                .then(() => {
                    expect(next).toHaveBeenCalledWith(errorObject);
                });

        });

        it('logs in an admin user with the right credentials', () => {

            let req = {
                headers: {
                    authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
                },
            };
            let res = {};
            let next = jest.fn();
            let middleware = auth;

            return middleware(req, res, next)
                .then(() => {
                    let savedToken = req.token;
                    expect(next).toHaveBeenCalledWith();
                });

        });
        it('gives error when unauthorized user tries to GET /books', () => {
            return mockRequest
                .get('/books')
                .then(results => {
                    console.log(results.text)
                    expect(results.status).toEqual(401);
                    expect(results.text).toEqual('{"error":"Invalid User ID/Password"}');
                });
        });

        it('returns books when an authorized user tries to GET /books', () => {
            return mockRequest
                .get('/books')
                .set('Authorization', 'Basic YWRtaW46cGFzc3dvcmQ=')
                .then(results => {
                    console.log(results.body)
                    expect(results.status).toEqual(200);
                    expect(results.body.count).toEqual(3);
                    expect(results.body.results[0].title).toEqual('Moby Dick');
                });
        });

    });
});