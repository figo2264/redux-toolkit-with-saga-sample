export type NotificationCategory = '전체' | '워크스페이스' | '배포' | '권한' | '자산';

export interface NotificationItemData {
  id: string;
  avatarType: 'user' | 'system';
  avatarIcon: string;
  isUnread: boolean;
  title: string;
  workspaceName?: string;
  message: string;
  timestamp: string;
}

export interface NotificationSection {
  label: string;
  items: NotificationItemData[];
}

export interface FilterTab {
  label: NotificationCategory;
  hasUnread: boolean;
}
