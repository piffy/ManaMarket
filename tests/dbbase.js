const { sequelize } = require('../models/index'); // Import sequelize instance

describe('Sequelize', () => {
  // Edge case: Track if the connection was closed in a test
  let isClosed = false;

  // Teardown: Reconnect if the connection was closed in a test
  afterEach(async () => {
    if (isClosed) {
      // Reconnect for other tests
      await sequelize.sync();
      isClosed = false;
    }
  });

  /**
   * Test: authenticate_StateValidConfig_ShouldConnectWithoutError
   * Purpose: Ensure sequelize can authenticate with a valid config.
   */
  test('authenticate_StateValidConfig_ShouldConnectWithoutError', async () => {
    // The authenticate method should resolve without throwing
    await expect(sequelize.authenticate()).resolves.not.toThrow();
  });

});