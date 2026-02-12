import React, { useState, useRef, useEffect } from 'react';
import { NotificationItemData } from './notificationTypes';
import styles from './NotificationCard.module.scss';

interface NotificationCardProps {
  item: NotificationItemData;
}

function parseMessage(message: string): React.ReactNode[] {
  const parts = message.split(/(##{[^}]*})/g);
  return parts.map((part, idx) => {
    const match = part.match(/^##{(.+)}$/);
    if (match) {
      return <strong key={idx} className={styles.bold}>{match[1]}</strong>;
    }
    return <span key={idx}>{part}</span>;
  });
}

const NotificationCard: React.FC<NotificationCardProps> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setNeedsTruncation(el.scrollHeight > el.clientHeight);
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleLeft}>
          <div className={styles.avatarArea}>
            <img
              className={styles.avatarIcon}
              src={`/styles/images/icon/${item.avatarIcon}`}
              alt={item.avatarType}
            />
            {item.isUnread && <span className={styles.unreadDot} />}
          </div>
          <span className={styles.title}>{item.title}</span>
          {item.workspaceName && (
            <>
              <span className={styles.dot} />
              <span className={styles.workspace}>{item.workspaceName}</span>
            </>
          )}
        </div>
        <button type="button" className={styles.btnClose} aria-label="알림 삭제"></button>
      </div>
      <div className={styles.messageArea}>
        <p ref={textRef} className={!expanded ? styles.clamped : ''}>
          {parseMessage(item.message)}
        </p>
        {needsTruncation && (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setExpanded(prev => !prev)}
          >
            {expanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
      <span className={styles.timestamp}>{item.timestamp}</span>
    </div>
  );
};

export default NotificationCard;
