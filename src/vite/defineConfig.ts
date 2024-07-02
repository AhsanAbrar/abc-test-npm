import { UserConfig } from 'vite'
import { hotFilePlugin } from './hot'

export function defineConfig(baseConfig: UserConfig, productionConfig?: UserConfig): ({ command }: { command: string }) => UserConfig {
  return ({ command }: { command: string }): UserConfig => {
    const config: UserConfig = {
      ...baseConfig,
      plugins: [
        ...(baseConfig.plugins || []),
        hotFilePlugin(),
      ],
    }

    if (command === 'build' && productionConfig) {
      return {
        ...config,
        ...productionConfig,
      }
    }

    return config
  }
}
