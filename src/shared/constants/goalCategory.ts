export enum GoalCategoryEnum {
  PROFESSIONAL_GROWTH = 'PROFESSIONAL_GROWTH',
  CAREER_TRANSITION = 'CAREER_TRANSITION',
  LIFESTYLE_ROUTINE = 'LIFESTYLE_ROUTINE',
  WEALTH_BUILDING = 'WEALTH_BUILDING',
  SIDE_PROJECT = 'SIDE_PROJECT',
  NETWORKING = 'NETWORKING',
}

export const GOAL_CATEGORY_MAP = {
  [GoalCategoryEnum.PROFESSIONAL_GROWTH]: '스터디',
  [GoalCategoryEnum.CAREER_TRANSITION]: '취업/이직',
  [GoalCategoryEnum.LIFESTYLE_ROUTINE]: '루틴',
  [GoalCategoryEnum.WEALTH_BUILDING]: '재테크',
  [GoalCategoryEnum.SIDE_PROJECT]: '사이드 프로젝트',
  [GoalCategoryEnum.NETWORKING]: '네트워킹',
};

export const GOAL_CATEGORIES = [
  { id: GoalCategoryEnum.PROFESSIONAL_GROWTH, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.PROFESSIONAL_GROWTH] },
  { id: GoalCategoryEnum.CAREER_TRANSITION, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.CAREER_TRANSITION] },
  { id: GoalCategoryEnum.LIFESTYLE_ROUTINE, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.LIFESTYLE_ROUTINE] },
  { id: GoalCategoryEnum.WEALTH_BUILDING, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.WEALTH_BUILDING] },
  { id: GoalCategoryEnum.SIDE_PROJECT, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.SIDE_PROJECT] },
  { id: GoalCategoryEnum.NETWORKING, label: GOAL_CATEGORY_MAP[GoalCategoryEnum.NETWORKING] },
];