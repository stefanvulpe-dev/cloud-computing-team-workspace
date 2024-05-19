import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

const credential = new DefaultAzureCredential();

export const secretClient = new SecretClient(
  process.env.AZURE_KEY_VAULT_URL!,
  credential,
);
