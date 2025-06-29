function handleMessage(message) {
  const content = message.content.trim();
  const username = message.author.username;

  // Ping command (case-sensitive)
  if (content === 'Ping') {
    message.channel.send(`Pong a ${username}!`);
    return;
  }

  // All commands are case-insensitive
  const lowerContent = content.toLowerCase();

  // WTB and WTS commands
  // Matches: WTB <item> [x<quantity>]
  const wtbWtsRegex = /^(wtb|wts)\s+(.+?)(?:\s*[xX]\s*(\d+))?$/i;
  const wtbWtsMatch = content.match(wtbWtsRegex);
  if (wtbWtsMatch) {
    const type = wtbWtsMatch[1].toUpperCase();
    const item = wtbWtsMatch[2];
    const quantity = wtbWtsMatch[3] ? ` x${wtbWtsMatch[3]}` : '';
    message.channel.send(`${username} ${type} ${item}${quantity}`);
    return;
  }

  // Market command
  // Matches: Market [<name>]
  const marketRegex = /^market\s*(.*)$/i;
  const marketMatch = content.match(marketRegex);
  if (marketMatch) {
    const name = marketMatch[1].trim();
    let reply = "Lista delle richieste attuali";
    if (name) {
      reply += ` di ${name}:`;
    } else {
      reply += ":";
    }
    reply += "\n*** nulla ***";
    message.channel.send(reply);
    return;
  }

  // Help commands
  const helpRegex = /^(help|aiuto|comandi|comando)$/i;
  if (helpRegex.test(content)) {
    message.channel.send(
      "comandi attivi:\nWTB <item> [x<quantity>]\nWTS <item> [x<quantity>]\nMarket [<name>]\nHelp | Aiuto | Comandi | Comando"
    );
    return;
  }
}

module.exports = { handleMessage };