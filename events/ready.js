export const name = 'ready';
export const once = true;
export function execute(client) {
  console.log(`Ready!\nLogged in as ${client.user.tag}`);
}
