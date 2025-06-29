const { handleMessage } = require('../src/messageParser');

// Mock message object for Discord.js
function createMockMessage(content, username = 'TestUser') {
  return {
    content,
    author: { username, bot: false },
    channel: { send: jest.fn() },
  };
}

describe('handleMessage', () => {
  // Setup and teardown for mocks
  let message;
  beforeEach(() => {
    message = createMockMessage('');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test: Ping command
  test('handleMessage_PingCommand_ShouldReplyWithPong', () => {
    message.content = 'Ping';
    handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith('Pong a TestUser!');
  });

  // Test: WTB command with quantity
  test('handleMessage_WTBCommandWithQuantity_ShouldReplyWithParsedMessage', () => {
    message.content = 'WTB Tritanium x10';
    handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith('TestUser WTB Tritanium x10');
  });

  // Test: WTS command without quantity
  test('handleMessage_WTSCommandWithoutQuantity_ShouldReplyWithParsedMessage', () => {
    message.content = 'WTS PLEX';
    handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith('TestUser WTS PLEX');
  });

  // Test: Market? command with name
  test('handleMessage_MarketCommandWithName_ShouldReplyWithList', () => {
    message.content = 'Market Alice';
    handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith(
      'Lista delle richieste attuali di Alice:\n*** nulla ***'
    );
  });

  // Test: Market command without name
  test('handleMessage_MarketCommandWithoutName_ShouldReplyWithList', () => {
    message.content = 'Market';
    handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith(
      'Lista delle richieste attuali:\n*** nulla ***'
    );
  });

  // Test: Help command (case-insensitive)
  test('handleMessage_HelpCommand_ShouldReplyWithHelp', () => {
    message.content = 'help';
    handleMessage(message);
    expect(message.channel.send).toHaveBeenCalledWith(
      "comandi attivi:\nWTB <item> [x<quantity>]\nWTS <item> [x<quantity>]\nMarket [<name>]\nHelp | Aiuto | Comandi | Comando"
    );
  });

  // Edge case: Unknown command
  test('handleMessage_UnknownCommand_ShouldNotReply', () => {
    message.content = 'foobar';
    handleMessage(message);
    expect(message.channel.send).not.toHaveBeenCalled();
  });
});