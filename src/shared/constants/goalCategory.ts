export enum GoalCategoryEnum {
  STUDY = 'STUDY',
  FINANCE = 'FINANCE',
  IT_PROJECT = 'IT_PROJECT',
}

export const GOAL_CATEGORY_MAP = {
  [GoalCategoryEnum.STUDY]: '스터디',
  [GoalCategoryEnum.FINANCE]: '재테크',
  [GoalCategoryEnum.IT_PROJECT]: 'IT 프로젝트',
};

export const GOAL_CATEGORIES = [
  { id: GoalCategoryEnum.STUDY, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.STUDY] },
  { id: GoalCategoryEnum.FINANCE, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.FINANCE] },
  { id: GoalCategoryEnum.IT_PROJECT, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.IT_PROJECT] },
];
