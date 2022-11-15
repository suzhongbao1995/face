import { useLocation } from 'react-router-dom';
import { flatMenuRouters } from '@/routers';

const useBreadcrumb = () => {
  const { pathname } = useLocation();
  const menuMap = flatMenuRouters();
  const pathSnippets = pathname.split('/').filter((i) => i);
  const breadcrumbList = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      url,
      title: menuMap.get(url)?.meta.title,
      disabled: menuMap.get(url)?.disabledLink,
    };
  });
  return breadcrumbList;
};

export default useBreadcrumb;
