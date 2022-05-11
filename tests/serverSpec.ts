import supertest from "supertest";
import app from '../src/server'


describe('serve endpoint test', () =>{
    it('should test the server to be running', async ()=>{
        const request = supertest(app);
        const response = await request.get('/');
        expect(response.status).toEqual(200);
    })
})


