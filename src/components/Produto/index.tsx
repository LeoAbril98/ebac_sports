import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../../App'
import * as S from './styles'
import { RootReducer } from '../../store'
import { adicionar, removeFromCart } from '../../store/reducers/carrinho'
import { favoritar } from '../../store/reducers/favoritos'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type Props = {
  produto: ProdutoType
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()
  const carrinho = useSelector((state: RootReducer) => state.carrinho)
  const favoritos = useSelector((state: RootReducer) => state.favorito)

  const estaNoCarrinho = carrinho.itens.some((item) => item.id === produto.id)
  const estaNosFavoritos = favoritos.itens.some(
    (item) => item.id === produto.id
  )

  const handleAddToCart = () => {
    if (!estaNoCarrinho) {
      dispatch(adicionar(produto))
    } else {
      dispatch(removeFromCart(produto))
    }
  }

  const handleAddToFavorites = () => {
    if (!estaNosFavoritos) {
      dispatch(favoritar(produto))
    } else {
      dispatch(favoritar(produto)) // Remover dos favoritos
    }
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleAddToCart} type="button">
        {estaNoCarrinho ? '- Remover do carrinho' : '+ Adicionar ao carrinho'}
      </S.BtnComprar>
      <S.BtnComprar onClick={handleAddToFavorites} type="button">
        {estaNosFavoritos ? (
          <>
            <AiOutlineHeart style={{ marginRight: '5px' }} />
            Remover dos favoritos
          </>
        ) : (
          <>
            <AiFillHeart style={{ marginRight: '5px' }} />
            Adicionar aos favoritos
          </>
        )}
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
