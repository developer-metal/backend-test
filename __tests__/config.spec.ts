describe('configuration', () => {
    const originalEnv = { ...process.env };
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv };
    });
  
    it('should use default values when environment variables are not set', () => {
      delete process.env.USERNAME;
      delete process.env.APIKEY;
      delete process.env.PORT;
      const configuration = {
        username: 'default', 
        apikey: 'default-key',
        port: '4000'
      }
      expect(configuration.username).toBe('default');
      expect(configuration.apikey).toBe('default-key');
      expect(configuration.port).toBe('4000');
    });
    it('should use environment variables when they are set', () => {
      process.env.USERNAME = 'testuser';
      process.env.APIKEY = 'testkey';
      process.env.PORT = '3000';
      const { configuration } = require('../src/config');
      expect(configuration.username).toBe('testuser');
      expect(configuration.apikey).toBe('testkey');
      expect(configuration.port).toBe('3000');
    });
  });