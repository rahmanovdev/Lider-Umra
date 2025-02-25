'use client';
import Image from 'next/image';
import styles from './styles.module.scss';
import { useGetWarningsQuery } from '@/redux/api/tour-details';

export const WarningsSection: React.FC = () => {
  const {
    data: warnings,
    isLoading,
    error,
  } = useGetWarningsQuery('Restrictions');

  if (isLoading) {
    return <div>Жүктөлүүдө...</div>;
  }

  if (error) {
    return <div>Эскертүүлөрдү жүктөөдө ката кетти. Кайра аракет кылыңыз.</div>;
  }

  if (!warnings || warnings.length === 0) {
    return <div>Эскертүүлөр табылган жок</div>;
  }

  return (
    <div className={styles.warningsContent}>
      <h1>Көңүл буруңуз!</h1>
      <div className={styles.warningsList}>
        {warnings.map((warning) => {
          // If there's no image, return just the text content
          if (!warning.image) {
            return (
              <div key={warning.id} className={styles.warningItem}>
                <div className={styles.warningInfo}>
                  <h3>{warning.title}</h3>
                  <div
                    className={styles.description_content}
                    dangerouslySetInnerHTML={{
                      __html: warning.description || '',
                    }}
                  />
                </div>
              </div>
            );
          }

          // If there is an image, return the full warning item with image
          return (
            <div key={warning.id} className={styles.warningItem}>
              <div className={styles.warningImageWrapper}>
                <Image
                  src={warning.image}
                  alt={warning.title || 'Warning image'}
                  width={300}
                  height={200}
                  loading="lazy"
                  onError={(e) => {
                    // Handle image loading errors
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className={styles.warningInfo}>
                <h3>{warning.title}</h3>
                <div
                  className={styles.description_content}
                  dangerouslySetInnerHTML={{
                    __html: warning.description || '',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WarningsSection;
