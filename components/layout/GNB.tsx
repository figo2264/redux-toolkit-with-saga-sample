import React, { useState } from 'react';
import NotificationPanel from './NotificationPanel';

interface GNBProps {
  className?: string;
}

const GNB: React.FC<GNBProps> = ({ className }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className={`header-container ${className || ''}`}>
      <header>
        <div className="header-left-area">
          <h1 className="logo control">현대오토에버</h1>
        </div>
        <div className="header-right-area">
          <div className="button-box">
            <button
              type="button"
              className="btn-alarm active"
              title="알림"
              onClick={() => setIsNotificationOpen(prev => !prev)}
            ></button>
            <button type="button" className="btn-service active" title="서비스 이동"></button>
          </div>
          <div className="divider"></div>
          <div className="profile-box">
            <button type="button" title="김수용님 환영합니다.">
              <div className="profile-assets color-4">
                <span>김</span>
              </div>
            </button>
          </div>
        </div>
      </header>
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default GNB;
