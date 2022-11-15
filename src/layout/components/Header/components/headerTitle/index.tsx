import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import useBreadcrumb from './hooks/useBreadcrumb';
// 面包屑
const HeaderTitle = () => {
  const breadcrumbList = useBreadcrumb();
  return (
    <Breadcrumb>
      {breadcrumbList.map(({ url, title, disabled }) => {
        return (
          <Breadcrumb.Item key={url}>
            {disabled ? title : <Link to={url}>{title}</Link>}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default HeaderTitle;
