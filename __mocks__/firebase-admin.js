module.exports = {
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(() => 'mocked-credential-object') // Simula la función `cert` para que devuelva un objeto simulado
  },
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({}) })),
      })),
    })),
  })),
};