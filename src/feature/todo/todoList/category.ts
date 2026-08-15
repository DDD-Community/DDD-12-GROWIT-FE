export const TODO_CATEGORY_ORDER = ['NOW', 'STEADY', 'SKIP', 'DELETE'] as const;

export type TodoCategory = (typeof TODO_CATEGORY_ORDER)[number];

export const TODO_CATEGORY_NAV_META: Record<
  TodoCategory,
  { label: string; activeColor: string }
> = {
  NOW: { label: '긴급', activeColor: '#FF6467' },
  STEADY: { label: '꾸준히', activeColor: '#FFB900' },
  SKIP: { label: '넘겨도', activeColor: '#51A2FF' },
  DELETE: { label: '지워도', activeColor: '#ABAB9C' },
};
