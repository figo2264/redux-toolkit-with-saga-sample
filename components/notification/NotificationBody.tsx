import React, { Fragment } from 'react';
import { NotificationSection, FilterTab } from './notificationTypes';
import NotificationFilterTabs from './NotificationFilterTabs';
import NotificationCard from './NotificationCard';
import styles from './NotificationBody.module.scss';

interface NotificationBodyProps {
  sections: NotificationSection[];
  filterTabs: FilterTab[];
}

const NotificationBody: React.FC<NotificationBodyProps> = ({ sections, filterTabs }) => {
  return (
    <div className={styles.body}>
      {sections.map((section, idx) => (
        <Fragment key={section.label}>
          {idx === 1 && <NotificationFilterTabs tabs={filterTabs} />}
          <p className={styles.sectionTitle}>{section.label}</p>
          <div className={styles.cardList}>
            {section.items.map(item => (
              <NotificationCard key={item.id} item={item} />
            ))}
          </div>
        </Fragment>
      ))}
      <p className={styles.footer}>최근 14일 동안 받은 알림을 모두 확인했습니다.</p>
    </div>
  );
};

export default NotificationBody;
