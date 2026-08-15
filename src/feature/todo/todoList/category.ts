export const TODO_CATEGORY_ORDER = ['NOW', 'STEADY', 'SKIP', 'DELETE'] as const;

export type TodoCategory = (typeof TODO_CATEGORY_ORDER)[number];

export const TODO_CATEGORY_NAV_META: Record<TodoCategory, { label: string; activeClassName: string }> = {
  NOW: { label: '긴급', activeClassName: 'bg-category-now' },
  STEADY: { label: '꾸준히', activeClassName: 'bg-category-nav-steady' },
  SKIP: { label: '넘겨도', activeClassName: 'bg-category-skip' },
  DELETE: { label: '지워도', activeClassName: 'bg-category-delete' },
};
