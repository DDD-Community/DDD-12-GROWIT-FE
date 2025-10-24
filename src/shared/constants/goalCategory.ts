import { GoalCategoryEnum } from '@/shared/type/goal';
import { GTM_BUTTON_NAME } from './gtm-events';

export const GOAL_CATEGORY_MAP = {
  [GoalCategoryEnum.STUDY]: '스터디',
  [GoalCategoryEnum.FINANCE]: '재테크',
  [GoalCategoryEnum.IT_PROJECT]: 'IT 프로젝트',
};

export const GOAL_CATEGORIES = [
  {
    id: GoalCategoryEnum.STUDY,
    label: GOAL_CATEGORY_MAP[GoalCategoryEnum.STUDY],
    gtmButtonName: GTM_BUTTON_NAME.CATEGORY_STUDY,
  },
  {
    id: GoalCategoryEnum.FINANCE,
    label: GOAL_CATEGORY_MAP[GoalCategoryEnum.FINANCE],
    gtmButtonName: GTM_BUTTON_NAME.CATEGORY_INVEST,
  },
  {
    id: GoalCategoryEnum.IT_PROJECT,
    label: GOAL_CATEGORY_MAP[GoalCategoryEnum.IT_PROJECT],
    gtmButtonName: GTM_BUTTON_NAME.CATEGORY_IT,
  },
];
