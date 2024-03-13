import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

interface FavoritoState {
  itens: Produto[]
}

const initialState: FavoritoState = {
  itens: []
}

export const favSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    favoritar: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload

      const itemIndex = state.itens.findIndex((p) => p.id === produto.id)
      if (itemIndex !== -1) {
        state.itens.splice(itemIndex, 1)
      } else {
        state.itens.push(produto)
      }
    }
  }
})

export const { favoritar } = favSlice.actions

export default favSlice.reducer
