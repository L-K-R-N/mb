import PORTFOLIO_IMAGE_1 from '@/shared/assets/portfolio/portfolio-1.jpg';
import PORTFOLIO_IMAGE_2 from '@/shared/assets/portfolio/portfolio-2.jpg';
import PORTFOLIO_IMAGE_3 from '@/shared/assets/portfolio/portfolio-3.jpg';
import PORTFOLIO_IMAGE_4 from '@/shared/assets/portfolio/portfolio-4.jpg';
import PORTFOLIO_IMAGE_5 from '@/shared/assets/portfolio/portfolio-5.jpg';
import PORTFOLIO_IMAGE_6 from '@/shared/assets/portfolio/portfolio-6.jpg';
import PORTFOLIO_IMAGE_7 from '@/shared/assets/portfolio/portfolio-7.jpg';
import PORTFOLIO_IMAGE_8 from '@/shared/assets/portfolio/portfolio-8.jpg';

import REVIEW_IMAGE_1 from '@/shared/assets/reviews/review-avatar-1.jpg';
import REVIEW_IMAGE_2 from '@/shared/assets/reviews/review-avatar-2.jpg';
import REVIEW_IMAGE_3 from '@/shared/assets/reviews/review-avatar-3.jpg';
import REVIEW_IMAGE_4 from '@/shared/assets/reviews/review-avatar-4.jpg';
import REVIEW_IMAGE_5 from '@/shared/assets/reviews/review-avatar-5.jpg';
import REVIEW_IMAGE_6 from '@/shared/assets/reviews/review-avatar-6.jpg';
import { CameraIcon, CosmeticIcon, DressIcon, HouseIcon } from '@/shared/ui/icon';

export const ACHIEVEMENTS_LIST = [
    {
        count: "9",
        title: 'лет опыта фотографии'
    },
    {
        count: "100+",
        title: 'портретных съемок'
    },
    {
        count: "12",
        title: 'публикаций в журналах'
    },
    {
        count: "25",
        title: 'съемок знаменитостей'
    },
    {
        count: "14",
        title: 'рекламных компаний'
    },
    {
        count: "5",
        title: 'побед в конкурсах'
    },
]

export const PORTFOLIO_IMAGES = [PORTFOLIO_IMAGE_1, PORTFOLIO_IMAGE_2, PORTFOLIO_IMAGE_3, PORTFOLIO_IMAGE_4, PORTFOLIO_IMAGE_5, PORTFOLIO_IMAGE_6, PORTFOLIO_IMAGE_7, PORTFOLIO_IMAGE_8]
export const REVIEWS_LIST = [
    {
        avatar: REVIEW_IMAGE_1,
        name: 'Екатерина',
        age: "18 лет",
        text: "Я очень очень довольна результатом! Безумна рада что испонилась еще одня моя маленькая мечта))) когда я первый раз увидела твои фото в facebook я даже не могла предположить что попаду в твой объектив"
    },
    {
        avatar: REVIEW_IMAGE_2,
        name: 'Кристина',
        age: "25 лет",
        text: "Не просто хороший фотограф, но и прекрасный человек, фотографии получились совершенно необычные , он видит людей немного с другой стороны. Спасибо, за проведенное время, было очень весело и приятно с тобой пообщаться"
    },
    {
        avatar: REVIEW_IMAGE_3,
        name: 'Регина',
        age: "23 года",
        text: "Встретившись, я была удивлена его подходом. Он пытается разговорить человека, понять его и раскрыть. Очень комфортный в общении, улавливает твое состояние и плавно, незаметно переходит к работе. "
    },
    {
        avatar: REVIEW_IMAGE_4,
        name: 'Мария',
        age: "26 лет",
        text: "Большому кораблю, большое плавание! Максим, спасибо за незабываемую фотосессию, за твое видение и терпение. Спасибо, за то, что смог передать настроение и суть."
    },
    {
        avatar: REVIEW_IMAGE_5,
        name: 'Александр',
        age: "30 лет",
        text: "Фотосессия с Максимом была одной из лучших и незабываемых. Он умеет правильно воплотить характер человека в фотографии. Очень легко было работать!"
    },
    {
        avatar: REVIEW_IMAGE_6,
        name: 'Стефания',
        age: "19 лет",
        text: "Ваш почерк для меня - это магия и мистика. Вы - гений. Гений места, гений изгибов и смыслов. Я счастлива, что ваш талант прикоснулся ко мне."
    },
]

export const COST_LIST = [
    {
        icon: <CameraIcon/>,
        title: "съемка портретов",
        cost: <span>50 000 ₽</span>,
    },
    {
        icon: <HouseIcon/>,
        title: "аренда студии",
        cost: <span>1 000 ₽ <span>/ час</span></span>,
    },
    {
        icon: <CosmeticIcon/>,
        title: "макияж, прическа",
        cost: <span>5 000 ₽</span>,
    },
    {
        icon: <DressIcon/>,
        title: "аренда одежды",
        cost: <span>10 000 ₽</span>,
    },
    
]