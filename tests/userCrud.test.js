const { sequelize, User } = require('../models/index');

describe('UserModel_CRUDOperations_ShouldWorkCorrectly', () => {
  // Setup: Synchronize the database before each test to ensure a clean state
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  // Teardown: Close the connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  /**
   * Test: createUser_StateValidData_ShouldCreateUser
   * Purpose: Should create a user with valid data
   */
  test('createUser_StateValidData_ShouldCreateUser', async () => {
    const user = await User.create({
      account_id: 'acc1',
      discord_id: 'discord1',
      refresh_token: 'refresh1',
      access_token: 'access1',
      main: 'main1',
      alt: 'alt1',
      alt2: null,
    });
    expect(user).toBeDefined();
    expect(user.account_id).toEqual('acc1');
  });

  /**
   * Test: findUser_StateUserExists_ShouldReturnUser
   * Purpose: Should find a user by primary key
   */
  test('findUser_StateUserExists_ShouldReturnUser', async () => {
    const user = await User.create({
      account_id: 'acc2',
      discord_id: 'discord2',
      refresh_token: 'refresh2',
      access_token: 'access2',
      main: 'main2',
      alt: null,
      alt2: null,
    });
    const found = await User.findByPk(user.id);
    expect(found).not.toBeNull();
    expect(found.account_id).toEqual('acc2');
  });

  /**
   * Test: updateUser_StateUserExists_ShouldUpdateFields
   * Purpose: Should update fields of an existing user
   */
  test('updateUser_StateUserExists_ShouldUpdateFields', async () => {
    const user = await User.create({
      account_id: 'acc3',
      discord_id: 'discord3',
      refresh_token: 'refresh3',
      access_token: 'access3',
      main: 'main3',
      alt: null,
      alt2: null,
    });
    user.main = 'updated_main';
    await user.save();
    const updated = await User.findByPk(user.id);
    expect(updated.main).toEqual('updated_main');
  });

  /**
   * Test: deleteUser_StateUserExists_ShouldRemoveUser
   * Purpose: Should delete a user from the database
   */
  test('deleteUser_StateUserExists_ShouldRemoveUser', async () => {
    const user = await User.create({
      account_id: 'acc4',
      discord_id: 'discord4',
      refresh_token: 'refresh4',
      access_token: 'access4',
      main: 'main4',
      alt: null,
      alt2: null,
    });
    await user.destroy();
    const deleted = await User.findByPk(user.id);
    expect(deleted).toBeNull();
  });

  /**
   * Test: createUser_StateMissingRequiredFields_ShouldThrowError
   * Purpose: Should throw an error if required fields are missing (edge case)
   */
  test('createUser_StateMissingRequiredFields_ShouldThrowError', async () => {
    // Purpose: Should throw an error if required fields are missing
    await expect(
      User.create({})
    ).rejects.toThrow();
  });
});