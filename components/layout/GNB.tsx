import React from 'react';

interface GNBProps {
  className?: string;
}

const GNB: React.FC<GNBProps> = ({ className }) => {
  return (
    <div className={`header-container ${className || ''}`}>
      <header>
        <div className="header-left-area">
          <h1 className="logo control">현대오토에버</h1>
        </div>
        <div className="header-right-area">
          <div className="button-box">
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
    </div>
  );
};

export default GNB;
