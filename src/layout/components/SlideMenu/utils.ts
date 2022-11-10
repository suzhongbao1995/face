export const calcOpenKeys = (path: string) => {
  const paths = path.split('/').filter((item) => item);
  let str = '';
  let strArr: string[] = [];
  for (let i = 0; i < paths.length; i++) {
    str += `/${paths[i]}`;
    strArr.push(str);
  }
  return strArr;
};
