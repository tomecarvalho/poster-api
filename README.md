## Environment

[Dotenv](https://www.dotenv.org/) is used to sync ``.env``. Its [VS Code extension](https://marketplace.visualstudio.com/items?itemName=dotenv.dotenv-vscode) is recommended.  
Only the ``.env.vault`` file should be versioned. **Do not** version any other related files.

### Usage

Log in: ``npx dotenv-vault login``  
Pull: ``npx dotenv-vault pull``  
Push: ``npx dotenv-vault push``