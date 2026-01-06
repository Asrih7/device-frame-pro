import fs from 'fs';
import path from 'path';
import detectPort from 'detect-port';

export interface FrameworkInfo {
  name: string;
  version?: string;
  defaultPort: number;
  devCommand: string;
}

export async function detectFramework(cwd: string): Promise<FrameworkInfo> {
  const packageJsonPath = path.join(cwd, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return {
      name: 'unknown',
      defaultPort: 3000,
      devCommand: 'npm start'
    };
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  // Detection with version info
  if (deps['next']) {
    return {
      name: 'nextjs',
      version: deps['next'],
      defaultPort: 3000,
      devCommand: 'npm run dev'
    };
  }
  
  if (deps['nuxt']) {
    return {
      name: 'nuxt',
      version: deps['nuxt'],
      defaultPort: 3000,
      devCommand: 'npm run dev'
    };
  }
  
  if (deps['@ionic/angular'] || deps['@ionic/react'] || deps['@ionic/vue']) {
    return {
      name: 'ionic',
      version: deps['@ionic/angular'] || deps['@ionic/react'] || deps['@ionic/vue'],
      defaultPort: 8100,
      devCommand: 'ionic serve'
    };
  }
  
  if (deps['react'] || deps['react-dom']) {
    return {
      name: 'react',
      version: deps['react'],
      defaultPort: 3000,
      devCommand: 'npm start'
    };
  }
  
  if (deps['vue']) {
    return {
      name: 'vue',
      version: deps['vue'],
      defaultPort: 8080,
      devCommand: 'npm run serve'
    };
  }
  
  if (deps['@angular/core']) {
    return {
      name: 'angular',
      version: deps['@angular/core'],
      defaultPort: 4200,
      devCommand: 'ng serve'
    };
  }
  
  if (deps['svelte']) {
    return {
      name: 'svelte',
      version: deps['svelte'],
      defaultPort: 5173,
      devCommand: 'npm run dev'
    };
  }
  
  return {
    name: 'unknown',
    defaultPort: 3000,
    devCommand: 'npm start'
  };
}

export async function detectDevServer(framework: FrameworkInfo): Promise<string> {
  const port = framework.defaultPort;
  const availablePort = await detectPort(port);
  
  if (availablePort !== port) {
    console.warn(`⚠️  Port ${port} is available. Make sure to run: ${framework.devCommand}`);
  }
  
  return `http://localhost:${port}`;
}