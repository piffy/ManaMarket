const { sequelize, User } = require('../models/index');

/**
 * CRUD test suite for the User model.
 * Test method naming: MethodName_StateUnderTest_ExpectedBehavior
 * Framework: Jest
 */
describe('UserModel_CRUDOperations_ShouldWorkCorrectly', () => {
  // Setup: Reset the database before each test for isolation
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  // Teardown: Close the connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  // Test: Create a user with valid data
  test('createUser_StateValidData_ShouldCreateUser', async () => {
    // Purpose: Should create a user and set all required fields
    const user = await User.create({
      id: 'char001',
      discord_id: 'discord001',
      refresh_token: 'refresh001',
      access_token: 'access001',
      account: 'account001',
    });
    expect(user).toBeDefined();
    expect(user.id).toEqual('char001');
    expect(user.discord_id).toEqual('discord001');
    expect(user.refresh_token).toEqual('refresh001');
    expect(user.access_token).toEqual('access001');
    expect(user.account).toEqual('account001');
    expect(user.created_at).toBeInstanceOf(Date);
    expect(user.updated_at).toBeInstanceOf(Date);
  });

  // Test: Read a user by primary key
  test('findUser_StateUserExists_ShouldReturnUser', async () => {
    // Purpose: Should find a user by their id
    await User.create({
      id: 'char002',
      discord_id: 'discord002',
      refresh_token: 'refresh002',
      access_token: 'access002',
      account: 'account002',
    });
    const found = await User.findByPk('char002');
    expect(found).not.toBeNull();
    expect(found.id).toEqual('char002');
    expect(found.account).toEqual('account002');
  });

  // Test: Update a user's fields
  test('updateUser_StateUserExists_ShouldUpdateFields', async () => {
    // Purpose: Should update fields of an existing user
    const user = await User.create({
      id: 'char003',
      discord_id: 'discord003',
      refresh_token: 'refresh003',
      access_token: 'access003',
      account: 'account003',
    });
    user.account = 'account003_updated';
    user.refresh_token = 'refresh003_updated';
    await user.save();
    const updated = await User.findByPk('char003');
    expect(updated.account).toEqual('account003_updated');
    expect(updated.refresh_token).toEqual('refresh003_updated');
  });

  // Test: Delete a user
  test('deleteUser_StateUserExists_ShouldRemoveUser', async () => {
    // Purpose: Should delete a user from the database
    const user = await User.create({
      id: 'char004',
      discord_id: 'discord004',
      refresh_token: 'refresh004',
      access_token: 'access004',
      account: 'account004',
    });
    await user.destroy();
    const deleted = await User.findByPk('char004');
    expect(deleted).toBeNull();
  });

  // Edge Case: Try to create a user with missing required fields
  test('createUser_StateMissingRequiredFields_ShouldThrowError', async () => {
    // Purpose: Should throw an error if required fields are missing
    await expect(
      User.create({
        // missing id, refresh_token, access_token, account
        discord_id: 'discord005'
      })
    ).rejects.toThrow();
  });

  // Edge Case: Try to create a user with a duplicate primary key
  test('createUser_StateDuplicatePrimaryKey_ShouldThrowError', async () => {
    // Purpose: Should throw an error if a user with the same id already exists
    await User.create({
      id: 'char006',
      discord_id: 'discord006',
      refresh_token: 'refresh006',
      access_token: 'access006',
      account: 'account006',
    });
    await expect(
      User.create({
        id: 'char006',
        discord_id: 'discord006b',
        refresh_token: 'refresh006b',
        access_token: 'access006b',
        account: 'account006b',
      })
    ).rejects.toThrow();
  });
});