import React from 'react';
import { FilterTab } from './notificationTypes';
import styles from './NotificationFilterTabs.module.scss';

interface NotificationFilterTabsProps {
  tabs: FilterTab[];
}

const NotificationFilterTabs: React.FC<NotificationFilterTabsProps> = ({ tabs }) => {
  return (
    <div className={styles.filterRow}>
      <div className={styles.chipList}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            type="button"
            className={`${styles.chip} ${idx === 0 ? styles.chipActive : ''} ${tab.hasUnread ? styles.hasUnread : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button type="button" className={styles.expandBtn} aria-label="더보기"></button>
    </div>
  );
};

export default NotificationFilterTabs;
