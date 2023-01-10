export const data = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 0 },
  { id: 3, name: '部门1-2', pid: 1 },
  { id: 4, name: '部门1-3', pid: 1 },
  { id: 5, name: '部门2-1', pid: 2 },
  { id: 6, name: '部门2-2', pid: 2 },
  { id: 7, name: '部门2-3', pid: 2 },
];

export function arrayToTree4(data) {
  const result = [];
  const hashMap = new Map();
  for (const node of data) {
    const id = node.id;
    const pid = node.pid;
    if (!hashMap.has(id)) {
      // 设置对象 id ---> node
      hashMap.set(id, { ...node, children: [] });
    }

    if (pid === 0) {
      result.push(hashMap.get(id));
    } else {
      hashMap.get(pid).children.push(hashMap.get(id));
    }
  }
  return result;
}

export function arrayToTree1(data, pid) {
  const result = [];
  for (const node of data) {
    if (node.pid === pid) {
      const child = arrayToTree1(data, node.id);
      if (child.length) {
        node.children = child;
      }
      result.push(node);
    }
  }
  return result;
}

export function arrayToTree2(data, pid) {
  return data.reduce((acc, item) => {
    if (item.pid === pid) {
      return [...acc, { ...item, children: arrayToTree2(data, item.id) }];
    }
    return acc;
  }, []);
}

export function arrayToTree3(data, pid) {
  const result = [];

  function getChildren(data, result, pid) {
    for (const node of data) {
      if (node.pid === pid) {
        const item = { ...node, children: [] };
        result.push(item);
        getChildren(data, item.children, item.id);
      }
    }
  }

  getChildren(data, result, pid);
  return result;
}
