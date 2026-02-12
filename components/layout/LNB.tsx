import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface SubMenuItem {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
}

interface MenuItem {
  id: string;
  label: string;
  children: SubMenuItem[];
  isExpanded?: boolean;
}

interface LNBProps {
  className?: string;
}

const menuData: MenuItem[] = [
  {
    id: 'user-group',
    label: '사용자 그룹 관리',
    children: [
      { id: 'member-search', label: '회원 조회' },
    ],
  },
  {
    id: 'request',
    label: '요청 관리',
    children: [
      { id: 'portal-download', label: '포털 다운로드 요청' },
      { id: 'category-permission', label: '카테고리 권한 요청' },
      { id: 'portal-distribution', label: '포털 배포 요청' },
    ],
  },
  {
    id: 'workspace',
    label: '워크스페이스 관리',
    children: [
      { id: 'workspace-search', label: '워크스페이스 조회' },
      { id: 'invitation', label: '초대 관리' },
      { id: 'permission', label: '권한 관리' },
    ],
  },
  {
    id: 'domain',
    label: '도메인 관리',
    children: [
      { id: 'domain-management', label: '도메인 관리' },
    ],
  },
  {
    id: 'data',
    label: '데이터 관리',
    isExpanded: true,
    children: [
      { id: 'metadata', label: '메타데이터 관리' },
      { id: 'metadata-set', label: '메타데이터 세트 관리' },
      { id: 'collection', label: '컬렉션 관리' },
      { id: 'authority-record', label: '전거레코드 관리' },
      { id: 'facet', label: '패싯 관리' },
      { id: 'relationship', label: 'Relationship 관리', href: '/data/relationship' },
    ],
  },
  {
    id: 'inquiry',
    label: '문의 관리',
    children: [
      { id: 'asset-inquiry', label: '자산 문의 관리' },
    ],
  },
  {
    id: 'portal',
    label: '포털 관리',
    children: [
      { id: 'asset-management', label: '자산 관리' },
      { id: 'display-module', label: '전시 모듈 자산 설정' },
      { id: 'collection-config', label: '컬렉션 구성' },
    ],
  },
  {
    id: 'monitoring',
    label: '모니터링',
    children: [
      { id: 'system-status', label: '시스템 현황' },
      { id: 'user-status', label: '사용자 현황' },
    ],
  },
  {
    id: 'common',
    label: '공통 관리',
    children: [
      { id: 'notice', label: '공지사항' },
      { id: 'faq', label: 'FAQ' },
      { id: 'terms', label: '이용약관' },
    ],
  },
];

const LNB: React.FC<LNBProps> = ({ className }) => {
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    menuData.forEach(item => {
      if (item.isExpanded) {
        initial.add(item.id);
      }
    });
    return initial;
  });

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const handleMenuClick = (child: SubMenuItem) => {
    if (child.href) {
      router.push(child.href);
    }
  };

  const isMenuActive = (child: SubMenuItem) => {
    if (child.href) {
      return router.pathname === child.href;
    }
    return child.isActive;
  };

  return (
    <nav className={className}>
      <div className="lnb-container">
        <div className="lnb-top-area">
          <nav className="lnb">
            <ul className="menu-list depth-1 expand">
              {menuData.map((menu) => {
                const isExpanded = expandedMenus.has(menu.id);
                return (
                  <li key={menu.id} className="menu team has-child">
                    <button
                      type="button"
                      className={`btn-menu${isExpanded ? ' show' : ''}`}
                      onClick={() => toggleMenu(menu.id)}
                    >
                      <div className="text-box">
                        <span className="text">{menu.label}</span>
                      </div>
                    </button>
                    <ul className={`menu-list depth-2${isExpanded ? ' expand' : ''}`}>
                      {menu.children.map((child) => (
                        <li key={child.id} className="menu folder">
                          <button
                            type="button"
                            className={`btn-menu${isMenuActive(child) ? ' active' : ''}`}
                            onClick={() => handleMenuClick(child)}
                          >
                            <div className="text-box">
                              <span className="text">{child.label}</span>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default LNB;
