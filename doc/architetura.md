IPOTESI BASE DELL'ARCHITETTURE (senza GUI, molto elementare)



           +---------------------+
           |    Discord Server   |
           | (Utenti & Canali)   |
           +---------+-----------+
                     |
                     v
           +---------------------+
           |   discord.js Bot    |   <== Entry point: gestisce eventi, messaggi
           | (JavaScript App)    |
           +---------+-----------+
                     |
    +----------------+----------------+
    |                                 |
    v                                 v
+------------+              +-----------------+
|  User/Auth |              |   Command/Event |
|  Manager   |              |     Handler     |
+-----+------+              +-----------------+
      |
      v
+----------------+
| Lista Utenti   |
| Lista Admins   |  <== autorizzazioni, ruoli, filtri
+----------------+
      |
      v
+----------------+
|   Database     |  <== può essere SQLite, MongoDB, PostgreSQL ecc.
| (da definire)  |
+----------------+
      |
      v
+----------------+
| Elenco         |
| delle Richieste|  <== dati persistenti: log, richieste utenti, ecc.
+----------------+
