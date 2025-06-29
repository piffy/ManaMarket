
# Struttura della Richiesta - Mana Market Bot

Ogni richiesta è rappresentata da un oggetto con le seguenti proprietà:

| Campo              | Tipo         | Descrizione |
|--------------------|--------------|-------------|
| `request_id`       | `string`     | ID univoco della richiesta |
| `user_id`          | `string`     | ID Discord dell'utente che ha fatto la richiesta |
| `username`         | `string`     | Username Discord (es. User123#4567) |
| `character_name`   | `string`     | Nome del personaggio EVE Online |
| `type`             | `string`     | Tipo richiesta: `WTS` (vendo) o `WTB` (compro) |
| `resource_name`    | `string`     | Nome della risorsa (es. Tritanium, Isogen, ecc.) |
| `quantity`         | `number`     | Quantità richiesta o offerta |
| `price_category`   | `string`     | Categoria prezzo: `jita_buy`, `jita_sell`, `split`, `tenal`, `custom` |
| `price_value`      | `number`     | Prezzo unitario secondo la categoria scelta |
| `special_price`    | `number` \| `null` | Prezzo speciale personalizzato (facoltativo) |
| `delivery_location`| `string`     | Luogo di consegna: es. Azbellina, Tatara, Hangarone |
| `notes`            | `string` \| `null` | Note aggiuntive o commenti |
| `timestamp`        | `ISO date`   | Data e ora della creazione della richiesta |

## Esempio JSON

```json
{
  "request_id": "req_1024",
  "user_id": "123456789012345678",
  "username": "User42#9876",
  "character_name": "Capsuleer42",
  "type": "WTB",
  "resource_name": "Tritanium",
  "quantity": 1000000,
  "price_category": "jita_buy",
  "price_value": 4.21,
  "special_price": null,
  "delivery_location": "Azbellina",
  "notes": "Urgente, consegna entro 24h",
  "timestamp": "2025-06-28T10:00:00Z"
}
```
