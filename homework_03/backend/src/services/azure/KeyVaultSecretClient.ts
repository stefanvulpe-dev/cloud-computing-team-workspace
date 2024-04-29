import { ManagedIdentityCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

const credential = new ManagedIdentityCredential();

export const secretClient = new SecretClient(
  process.env.AZURE_KEY_VAULT_URL!,
  credential,
);
