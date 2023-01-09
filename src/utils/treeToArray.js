export const data = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 },
];

export const treeData = [
  {
    id: 1,
    title: '小叶同学1',
    parentId: 0,
  },
  {
    id: 2,
    title: '小叶同学2',
    parentId: 0,
    children: [
      {
        id: 3,
        title: '小叶同学2-1',
        parentId: 2,
        children: [
          {
            id: 4,
            title: '小叶同学3-1',
            parentId: 3,
            children: [
              {
                id: 5,
                title: '小叶同学4-1',
                parentId: 4,
              },
            ],
          },
        ],
      },
      {
        id: 6,
        title: '小叶同学2-2',
        parentId: 2,
      },
    ],
  },
];

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
