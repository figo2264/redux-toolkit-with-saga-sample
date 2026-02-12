import { NotificationSection, FilterTab } from './notificationTypes';

const randomUserAvatar = () =>
  Math.random() < 0.5 ? 'ic_sample_avatar.svg' : 'ic_no_avatar.svg';

export const DUMMY_SECTIONS: NotificationSection[] = [
  {
    label: '오늘 받은 알림',
    items: [
      {
        id: 'noti-1',
        avatarType: 'user',
        avatarIcon: randomUserAvatar(),
        isUnread: true,
        title: '포털 배포 승인',
        workspaceName: 'DAMP 워크스페이스',
        message: '##{김수용}님이 ##{DAMP 포털 v2.1.0} 배포를 승인했습니다.',
        timestamp: '10분 전',
      },
      {
        id: 'noti-2',
        avatarType: 'user',
        avatarIcon: randomUserAvatar(),
        isUnread: true,
        title: '포털 배포 반려',
        workspaceName: 'DAMP 워크스페이스',
        message: '##{이영희}님이 ##{DAMP 포털 v2.0.9} 배포를 반려했습니다. 사유: 테스트 미완료',
        timestamp: '1시간 전',
      },
    ],
  },
  {
    label: '이전 알림',
    items: [
      {
        id: 'noti-3',
        avatarType: 'user',
        avatarIcon: randomUserAvatar(),
        isUnread: false,
        title: '포털 배포 요청',
        workspaceName: 'DAMP 워크스페이스',
        message: '##{박민수}님이 ##{DAMP 포털 v2.0.8} 배포를 요청했습니다.',
        timestamp: '2025.01.10 오후 03:42',
      },
      {
        id: 'noti-4',
        avatarType: 'system',
        avatarIcon: 'ic_system_alarm.svg',
        isUnread: false,
        title: '도메인 권한 요청',
        message: '새로운 도메인 권한 요청이 있습니다. 관리자 페이지에서 확인해주세요.',
        timestamp: '2025.01.09 오전 10:15',
      },
      {
        id: 'noti-5',
        avatarType: 'system',
        avatarIcon: 'ic_system_alarm.svg',
        isUnread: false,
        title: '신규 공지사항 등록',
        message: '새로운 공지사항이 등록되었습니다. 공지사항 페이지에서 확인해주세요.',
        timestamp: '2025.01.08 오후 02:30',
      },
      {
        id: 'noti-6',
        avatarType: 'system',
        avatarIcon: 'ic_system_alarm.svg',
        isUnread: false,
        title: '액션명',
        message: '##{시스템}에서 자동으로 생성된 알림입니다. 이 알림은 매우 긴 메시지를 포함하고 있어서 더보기 버튼이 표시되어야 합니다. 이 메시지는 두 줄을 초과하여 말줄임 처리가 필요한 케이스를 테스트하기 위한 것입니다. 충분히 길어야 하므로 추가 텍스트를 포함합니다.',
        timestamp: '2025.01.04 오전 09:05',
      },
    ],
  },
];

export const FILTER_TABS: FilterTab[] = [
  { label: '전체', hasUnread: false },
  { label: '워크스페이스', hasUnread: true },
  { label: '배포', hasUnread: true },
  { label: '권한', hasUnread: false },
  { label: '자산', hasUnread: false },
];
