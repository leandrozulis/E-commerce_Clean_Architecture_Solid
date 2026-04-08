# Criação do E-commerce

## O que o sistema precisará ter:

[ ] - Produto (Item)
  - Nome do Produto
  - Preço unitário
  - Preço promocional
  - Descrição curta (Copy)
  - Descrição longa
  - Categoria
  - Subcategoria
  - Marca
  - Variações:
    - Cor
    - Tamanho
  - Quantidade em Estoque
  - Avaliação média
  - Número de avaliações
  - Quantidade vendida
  - Favorito (Boolean)

[ ] - Carrinho
  - Lista de itens
    - ID do produto
    - Nome
    - Preço unitário
    - Quantidade selecionada
    - Subtotal por item
    - Total geral
    - Aplicação de cupom
    - Cálculo de frete
    - Remover item
    - Atualizar quantidade
    - Salvar carrinho

[ ] - Usuário (Cliente)
  - Nome
  - Email
  - Senha
  - Telefone
  - CPF/CNPJ
  - Endereços
    - Rua
    - Número Casa
  - Histórico de pedidos
  - Lista de favoritos

[ ] - Pedido
  - ID do pedido
  - Usuário
  - Lista de produtos
  - Status:
   - Concluído
   - Cancelado
  - Valor total
  - Frete
  - Cupom aplicado
  - Método de pagamento
  - Código de rastreio
  - Data do pedido

[ ] - Pagamento
  - ID do pagamento
  - Forma de pagamento
  - Usuário
  - Valor total
  - Status Pagamento

[ ] - Avaliações
  - Usuário
  - Produto
  - Nota (1 a 5)
  - Comentário
  - Data

[ ] - Cupons e Promoções
  - Código do cupom
  - Tipo:
    - Porcentagem
    - Valor fixo
  - Validade
  - Quantidade de cupons
  - Produtos aplicáveis (Item)
  - Produtos aplicavéis (Categoria)
