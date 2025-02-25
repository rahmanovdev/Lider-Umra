'use client';
import styles from './styles.module.scss';
import { useGetFoodInfoQuery } from '@/redux/api/tour-details';
import { ImageSlider } from '../shared/ImageSlider';
import { useParams } from 'next/navigation';
import { useGetTourByIdQuery } from '@/redux/api/tour';

export const FoodSection: React.FC = () => {
  const params = useParams();
  const tourId = Number(params.id); // Пакеттин ID-сы (мисалы, 17)

  const { data: tourData, isLoading: tourLoading } =
    useGetTourByIdQuery(tourId);
  const { data: foodInfo, isLoading: foodLoading } =
    useGetFoodInfoQuery('FoodInfo');

  console.log(foodInfo, 'foodInfo');
  console.log(tourData, 'tourData');

  if (tourLoading || foodLoading) {
    return <div>Жүктөлүүдө...</div>;
  }

  if (!foodInfo || foodInfo.length === 0 || !tourData) {
    return <div>Маалымат табылган жок</div>;
  }

  const tourCategory = tourData.category?.name?.toLowerCase() || '';

  console.log('Тур категориясы:', tourCategory);

  const filteredFoodItems = foodInfo.filter((food) => {
    const matchesTourId = food.id === tourId;

    const isComfortFood = food.title?.toLowerCase().includes('комфорт');
    const isStandardFood = food.title?.toLowerCase().includes('стандарт');

    if (tourCategory.includes('комфорт')) {
      return matchesTourId && isComfortFood;
    } else if (tourCategory.includes('стандарт')) {
      return matchesTourId && isStandardFood;
    }

    return false;
  });

  const displayFoodItems =
    filteredFoodItems.length > 0 ? filteredFoodItems : foodInfo;

  return (
    <div className={styles.foodSection}>
      <h3 className={styles.packageTitle}>
        {tourCategory} категориясындагы тамактар
      </h3>

      {displayFoodItems.length > 0 ? (
        displayFoodItems.map((food) => (
          <div key={food.id} className={styles.foodContent}>
            <div className={styles.foodSlider}>
              {food.images && food.images.length > 0 ? (
                <ImageSlider images={food.images} height={400} />
              ) : (
                <div>Сүрөт жок</div>
              )}
            </div>
            <div className={styles.foodInfo}>
              <h2>{food.title}</h2>
              <div
                className={styles.description_content}
                dangerouslySetInnerHTML={{
                  __html: food.description,
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <div>Бул категория боюнча тамактар табылган жок</div>
      )}
    </div>
  );
};
