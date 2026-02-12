import React, { ReactNode } from 'react';
import GNB from './GNB';
import LNB from './LNB';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div id="wrap">
      <GNB />

      <div className="main-container">
        <div className="main-left-container">
          <LNB />
        </div>

        <div className="main-right-container">
          <main>
            <div className="content-container" style={{ overflow: 'hidden' }}>
              {children}
            </div>

            <div className="footer-container">
              <footer>
                <div className="footer-left-container">
                  <span className="copyright">© 2024 Hyundai AutoEver. All rights reserved.</span>
                </div>
                <div className="footer-right-container"></div>
              </footer>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
