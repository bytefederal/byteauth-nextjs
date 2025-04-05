import './__mocks__/nextjs';
import { ByteAuth, QRLogin, useByteAuth, useByteAuthStore, byteAuthConfig } from '../index';

describe('ByteAuth NextJS Package Exports', () => {
  test('All exports should be defined', () => {
    expect(ByteAuth).toBeDefined();
    expect(QRLogin).toBeDefined();
    expect(useByteAuth).toBeDefined();
    expect(useByteAuthStore).toBeDefined();
    expect(byteAuthConfig).toBeDefined();
  });
});