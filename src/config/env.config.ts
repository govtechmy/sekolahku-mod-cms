import { SecretsManagerService } from '@/services/secret-manager.svc'

async function resolveEnvFromSecretsManager() {
  const secretName = process.env.AWS_SECRET_NAME

  if (secretName) {
    try {
      const secretsManagerService = new SecretsManagerService()
      const secrets = await secretsManagerService.getSecret(secretName)

      for (const [key, value] of Object.entries(secrets)) {
        if (value !== null && value !== undefined && value !== '') {
          if (typeof value === 'string') {
            process.env[key] = value
          } else {
            process.env[key] = JSON.stringify(value)
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch secrets from AWS Secrets Manager:', error)
    }
  }
  // If AWS_SECRET_NAME is not set, use .env values
}

export { resolveEnvFromSecretsManager }
