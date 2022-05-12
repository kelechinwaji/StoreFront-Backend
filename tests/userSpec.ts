import { verifyAuthToken } from "../src/auth services/verifyAuth";
import { userStore } from "../src/models/users";


//const auth = new verifyAuthToken();
const store = new userStore()

describe('Testing users models', () =>{
    it('should have a index method', ()=>{
      expect(store.index).toBeDefined();
    });
    it('should have a show method', ()=>{
        expect(store.show).toBeDefined();
      });
      it('should have a create method', ()=>{
        expect(store.create).toBeDefined();
      });
      it('should have a login method', ()=>{
        expect(store.authenticate).toBeDefined();
      });
      it('should have a update method', ()=>{
        expect(store.update).toBeDefined();
      });
      it('should have a delete method', ()=>{
        expect(store.destroy).toBeDefined();
      });
})