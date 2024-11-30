import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

// Create a slice with a name, initial state, and reducers

const initialState = {
  Cartitems: [], // Ensuring this is an empty array instead of null
  totalAmount: 0,
  totalQuantity: 0,
  ShippingCharges:20,
  TotalPrice:0,
  TotalNumItems:0,
  cartstatus:false,
  Discount:10
};

const CartSlice = createSlice({
    name: 'Cart', // Name of the slice (used in the Redux store)
    initialState,
    reducers: {
        AddItems: (state, action) => {
            const oldItem = state.Cartitems.find((item)=>item.id === action.payload.id)
            const index = state.Cartitems.indexOf(oldItem);
            if(oldItem)
            {
                state.Cartitems[index] = action.payload;
                state.cartstatus = true;
            }
            else{   
                state.Cartitems = [...state.Cartitems,action.payload]
                state.cartstatus = true;
            }
            state.TotalPrice = TotalItemsPrice(state.Cartitems);
            state.TotalNumItems = TotalNumItemsFun(state.Cartitems);
            //const index = state.Cartitems.indexOf(oldItem);
          },
          UpdateItems: (state, action) => {
           
            const oldItem = state.Cartitems.find((item)=>item.id === action.payload.id)
            if(oldItem != "undefined")
            {
             const index = state.Cartitems.indexOf(oldItem);
             state.Cartitems[index]= action.payload;
             state.TotalPrice = TotalItemsPrice(state.Cartitems);
             state.TotalNumItems = TotalNumItemsFun(state.Cartitems);
            }
   
            
            //const index = state.Cartitems.indexOf(oldItem);
          },
          RemoveItemAC: (state, action) => {
           
           
            const oldItem = state.Cartitems.find((item)=>item.id === action.payload.id)
            //const index = (oldItem != "undefined")?"":state.Cartitems.indexOf(oldItem)
            //const index = state.Cartitems.indexOf(oldItem);
            
            if(oldItem != "undefined")
            {
            let index = state.Cartitems.indexOf(oldItem)
            state.Cartitems.splice(index,1)
            state.TotalPrice = TotalItemsPrice(state.Cartitems);
            state.TotalNumItems = TotalNumItemsFun(state.Cartitems);
            //console.log("Item is rmoved  : ")
  
            }
            
            //const index = state.Cartitems.indexOf(oldItem);
          },
          EmptyCartAC: (state,act)=>{
            state.Cartitems = []
           // console.log("Cart is empty successfull!")
          }
          
     }, 
  
  }); 

  function TotalItemsPrice(Items)
  {
    
    let total = Items.reduce((start,itm)=>
            {
            return start + (itm.price * itm.qty)
            },0)
           return total
  }

  function TotalNumItemsFun(Items)
  {
    let total = Items.reduce((start,itm)=>
            {
            return start + itm.qty
            },0)
           return total

  }
export const { AddItems,UpdateItems,RemoveItemAC,EmptyCartAC } = CartSlice.actions;
export default CartSlice.reducer;