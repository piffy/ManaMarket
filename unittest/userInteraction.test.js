const { login, register } = require('../src/userInteraction');
const { User } = require('../models/index');

// Mock User model methods
jest.mock('../models/index', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe('userInteraction_LoginAndRegister_ShouldBehaveCorrectly', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test: login_StateUserExists_ShouldReturnUserResource
   * Purpose: Should return the user resource if user exists in DB
   */
  test('login_StateUserExists_ShouldReturnUserResource', async () => {
    const mockUser = { id: 'alt1', discord_id: 'discord123', account: 'alt1' };
    User.findOne.mockResolvedValue(mockUser);

    const result = await login({ id: 'discord123' }, 'alt1');
    expect(User.findOne).toHaveBeenCalledWith({ where: { id: 'alt1' } });
    expect(result).toEqual(mockUser);
  });

  /**
   * Test: login_StateUserDoesNotExist_ShouldReturnGuestObject
   * Purpose: Should return a "fake user" object if user does not exist
   */
  test('login_StateUserDoesNotExist_ShouldReturnGuestObject', async () => {
    User.findOne.mockResolvedValue(null);

    const result = await login({ id: 'discord456' }, 'alt2');
    expect(User.findOne).toHaveBeenCalledWith({ where: { id: 'alt2' } });
    expect(result).toEqual({
      id: 'GUEST',
      discord_id: 'discord456',
      account: null,
    });
  });

  /**
   * Test: login_StateDiscordUserMissingId_ShouldReturnGuestObjectWithNullDiscordId
   * Purpose: Should handle edge case where discordUser is missing id
   */
  test('login_StateDiscordUserMissingId_ShouldReturnGuestObjectWithNullDiscordId', async () => {
    const result = await login({}, 'alt3');
    expect(result).toEqual({
      id: 'GUEST',
      discord_id: null,
      account: null,
    });
  });

  /**
   * Test: register_StateUserAlreadyExists_ShouldReturnAlreadyRegisteredMessage
   * Purpose: Should return a message indicating user is already registered
   */
  test('register_StateUserAlreadyExists_ShouldReturnAlreadyRegisteredMessage', async () => {
    User.findOne.mockResolvedValue({ id: 'alt4' });

    const result = await register('alt4');
    expect(User.findOne).toHaveBeenCalledWith({ where: { id: 'alt4' } });
    expect(result).toEqual('DEVELOP: User alt4 already registered');
    expect(User.create).not.toHaveBeenCalled();
  });

  /**
   * Test: register_StateUserDoesNotExist_ShouldCreateUserAndReturnSuccessMessage
   * Purpose: Should create a new user and return a success message
   */
  test('register_StateUserDoesNotExist_ShouldCreateUserAndReturnSuccessMessage', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ id: 'alt5' });

    const result = await register('alt5');
    expect(User.findOne).toHaveBeenCalledWith({ where: { id: 'alt5' } });
    expect(User.create).toHaveBeenCalledWith({
      id: 'alt5',
      account: 'alt5',
      discord_id: null,
      refresh_token: 'RTOKEN',
      access_token: 'ATOKEN',
    });
    expect(result).toEqual('DEVELOP User alt5 registered in database'); 
      });
});