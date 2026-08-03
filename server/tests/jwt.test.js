const { generateTokens, verifyToken } = require('../utils/jwtUtils');

describe('JWT Utilities', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-access-secret';
    process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
  });

  it('should generate valid access and refresh tokens containing user payload', () => {
    const user = { _id: '12345', role: 'Administrator', branchId: 'branch_1', restaurantId: 'rest_1', email: 'test@test.com' };
    const tokens = generateTokens(user);
    
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
    
    const decodedAccess = verifyToken(tokens.accessToken, false);
    expect(decodedAccess.userId).toBe('12345');
    expect(decodedAccess.role).toBe('Administrator');
    expect(decodedAccess.branchId).toBe('branch_1');
    expect(decodedAccess.exp).toBeDefined();

    const decodedRefresh = verifyToken(tokens.refreshToken, true);
    expect(decodedRefresh.userId).toBe('12345');
  });
});
