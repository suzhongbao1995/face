import t from './t';
const context = require.context('@models', true, /[^index].(js|ts)$/);
context.keys().forEach((item: string) => {
  console.log(item);
});
export default [t];
