import VisitorStatisticsExample from '@/components/VisitorStatisticsExample';
import styles from '@/styles/Home.module.css';

export default function StatisticsPage() {
  return (
    <div className={styles.main}>
      <h1 style={{ marginBottom: '24px' }}>Statistics Dashboard</h1>
      <VisitorStatisticsExample />
    </div>
  );
}
