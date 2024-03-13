import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootReducer } from '../../store'
import { Produto } from '../../App'

type CarrinhoState = {
  itens: Produto[]
}

const initialState: CarrinhoState = {
  itens: []
}

export const cartSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload

      if (state.itens.find((p) => p.id === produto.id)) {
        alert('Item já adicionado')
      } else {
        state.itens.push(produto)
      }
    },
    removeFromCart: (state, action: PayloadAction<Produto>) => {
      state.itens = state.itens.filter((item) => item.id !== action.payload.id)
    }
  }
})

export const { adicionar, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
