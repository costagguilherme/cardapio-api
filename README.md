
# Cardápio API
## Inicializar a API
Para iniciar o servidor em modo de desenvolvimento:
```bash
npm  run  start:dev
```
## Rodar Testes
Para executar os testes da aplicação:
```bash
npm  run  test
```
## Endpoints
### `GET /menu`
Retorna o cardápio disponível.
### `POST /order`
Realiza um pedido com base no payload enviado.
#### Payload
```json
[
{
"id": 1,
"count": 2
},
{
"id": 5,
"count": 1
}
]
```
Cada objeto representa um item do cardápio, onde:
-  `id`: identificador do item.
-  `count`: quantidade desejada.