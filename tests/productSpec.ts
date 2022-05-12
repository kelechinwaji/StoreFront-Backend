import { ProductStore, Product } from '../src/models/products';



const store = new ProductStore()

describe('Testing product models', () =>{
    it('should have a index method', ()=>{
      expect(store.index).toBeDefined();
    });
    it('should have a show method', ()=>{
        expect(store.show).toBeDefined();
      });
      it('should have a create method', ()=>{
        expect(store.create).toBeDefined();
      });
      it('should have a update method', ()=>{
        expect(store.update).toBeDefined();
      });
      it('should have a delete method', ()=>{
        expect(store.destroy).toBeDefined();
      });
})