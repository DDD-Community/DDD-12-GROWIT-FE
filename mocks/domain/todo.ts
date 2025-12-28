import { http, HttpResponse } from 'msw';
import { Todo, DAY_OF_THE_WEEK } from '@/shared/type/Todo';

// CORS preflight 요청 처리
export const optionsHandler = http.options('*', () => {
  return new HttpResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
});

// 테스트용 Todo 데이터 (요일별로 구성)
export const mockTodosByPlan: Record<string, Record<DAY_OF_THE_WEEK, Todo[]>> = {
  'plan-1': {
    MONDAY: [
      {
        id: 'todo-1',
        goalId: 'goal-1',
        planId: 'plan-1',
        date: '2024-01-15',
        content: 'React 컴포넌트 리팩토링하기',
        isCompleted: false,
      },
      {
        id: 'todo-2',
        goalId: 'goal-1',
        planId: 'plan-1',
        date: '2024-01-15',
        content: '컴포넌트 테스트 코드 작성하기',
        isCompleted: true,
      },
    ],
    TUESDAY: [
      {
        id: 'todo-3',
        goalId: 'goal-1',
        planId: 'plan-1',
        date: '2024-01-16',
        content: '성능 최적화 적용하기',
        isCompleted: false,
      },
    ],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  },
  'plan-2': {
    MONDAY: [
      {
        id: 'todo-4',
        goalId: 'goal-1',
        planId: 'plan-2',
        date: '2024-01-15',
        content: 'TypeScript 타입 정의 추가하기',
        isCompleted: true,
      },
    ],
    TUESDAY: [
      {
        id: 'todo-5',
        goalId: 'goal-1',
        planId: 'plan-2',
        date: '2024-01-16',
        content: 'API 연동 테스트하기',
        isCompleted: false,
      },
    ],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  },
  'plan-3': {
    MONDAY: [
      {
        id: 'todo-6',
        goalId: 'goal-2',
        planId: 'plan-3',
        date: '2024-01-15',
        content: '디자인 토큰 정의하기',
        isCompleted: false,
      },
    ],
    TUESDAY: [
      {
        id: 'todo-7',
        goalId: 'goal-2',
        planId: 'plan-3',
        date: '2024-01-16',
        content: '컴포넌트 설계하기',
        isCompleted: false,
      },
    ],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  },
  'plan-4': {
    MONDAY: [
      {
        id: 'todo-8',
        goalId: 'goal-2',
        planId: 'plan-4',
        date: '2024-01-15',
        content: '스토리북 설정하기',
        isCompleted: false,
      },
    ],
    TUESDAY: [
      {
        id: 'todo-9',
        goalId: 'goal-2',
        planId: 'plan-4',
        date: '2024-01-16',
        content: '컴포넌트 문서화하기',
        isCompleted: false,
      },
    ],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  },
  'plan-5': {
    MONDAY: [
      {
        id: 'todo-10',
        goalId: 'goal-3',
        planId: 'plan-5',
        date: '2024-01-15',
        content: '프로젝트 기획서 작성하기',
        isCompleted: true,
      },
    ],
    TUESDAY: [
      {
        id: 'todo-11',
        goalId: 'goal-3',
        planId: 'plan-5',
        date: '2024-01-16',
        content: '요구사항 분석하기',
        isCompleted: false,
      },
    ],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  },
  'plan-6': {
    MONDAY: [
      {
        id: 'todo-12',
        goalId: 'goal-3',
        planId: 'plan-6',
        date: '2024-01-15',
        content: '팀 미팅 준비하기',
        isCompleted: false,
      },
    ],
    TUESDAY: [
      {
        id: 'todo-13',
        goalId: 'goal-3',
        planId: 'plan-6',
        date: '2024-01-16',
        content: '커뮤니케이션 가이드라인 작성하기',
        isCompleted: false,
      },
    ],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  },
};

// 모든 Todo를 평면 배열로 변환하는 헬퍼 함수
const getAllTodos = (): Todo[] => {
  return Object.values(mockTodosByPlan).flatMap(planTodos => Object.values(planTodos).flat());
};

// 주간 Todo 리스트 조회 (요일별로 그룹화)
export const getWeeklyTodoList = http.get('/mock/todos', ({ request }) => {
  const url = new URL(request.url);
  const goalId = url.searchParams.get('goalId');
  const planId = url.searchParams.get('planId');

  if (!goalId || !planId) {
    return HttpResponse.json(
      { message: 'goalId와 planId가 필요합니다.' },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  const planTodos = mockTodosByPlan[planId];
  if (!planTodos) {
    return HttpResponse.json(
      { message: '해당 Plan을 찾을 수 없습니다.' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  return HttpResponse.json(
    {
      data: planTodos,
      message: '주간 Todo 리스트를 성공적으로 조회했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// 전체 Todo 리스트 조회 (기존 호환성 유지)
export const getTodos = http.get('/mock/todos/all', ({ request }) => {
  const url = new URL(request.url);
  const goalId = url.searchParams.get('goalId');
  const planId = url.searchParams.get('planId');
  const date = url.searchParams.get('date');

  let filteredTodos = getAllTodos();

  if (goalId) {
    filteredTodos = filteredTodos.filter(todo => todo.goalId === goalId);
  }
  if (planId) {
    filteredTodos = filteredTodos.filter(todo => todo.planId === planId);
  }
  if (date) {
    filteredTodos = filteredTodos.filter(todo => todo.date === date);
  }

  return HttpResponse.json(
    {
      data: filteredTodos,
      message: 'Todo 리스트를 성공적으로 조회했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// 특정 Todo 조회
export const getTodoById = http.get('/mock/todos/:todoId', ({ params }) => {
  const { todoId } = params;
  const allTodos = getAllTodos();
  const todo = allTodos.find(t => t.id === todoId);

  if (!todo) {
    return HttpResponse.json(
      { message: '해당 Todo를 찾을 수 없습니다.' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  return HttpResponse.json(
    {
      data: todo,
      message: 'Todo를 성공적으로 조회했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// Todo 생성
export const createTodo = http.post('/mock/todos', async ({ request }) => {
  const body = (await request.json()) as Omit<Todo, 'id'>;

  const newTodo: Todo = {
    ...body,
    id: `todo-${Date.now()}`,
  };

  // 해당 plan의 요일별 todo에 추가
  const dayOfWeek = getDayOfWeek(newTodo.date);
  if (!mockTodosByPlan[newTodo.planId]) {
    mockTodosByPlan[newTodo.planId] = {
      MONDAY: [],
      TUESDAY: [],
      WEDNESDAY: [],
      THURSDAY: [],
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    };
  }
  mockTodosByPlan[newTodo.planId][dayOfWeek].push(newTodo);

  return HttpResponse.json(
    {
      data: newTodo,
      message: 'Todo를 성공적으로 생성했습니다.',
    },
    {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// Todo 상태 변경 (완료/미완료)
export const updateTodoStatus = http.patch('/mock/todos/:todoId', async ({ params, request }) => {
  const { todoId } = params;
  const body = (await request.json()) as { isCompleted: boolean };

  const allTodos = getAllTodos();
  const todoIndex = allTodos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    return HttpResponse.json(
      { message: '해당 Todo를 찾을 수 없습니다.' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  const todo = allTodos[todoIndex];
  const dayOfWeek = getDayOfWeek(todo.date);
  const planTodos = mockTodosByPlan[todo.planId][dayOfWeek];
  const planTodoIndex = planTodos.findIndex(t => t.id === todoId);

  if (planTodoIndex !== -1) {
    planTodos[planTodoIndex].isCompleted = body.isCompleted;
  }

  return HttpResponse.json(
    {
      data: planTodos[planTodoIndex],
      message: 'Todo 상태를 성공적으로 변경했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// Todo 수정
export const updateTodo = http.put('/mock/todos/:todoId', async ({ params, request }) => {
  const { todoId } = params;
  const body = (await request.json()) as Partial<Todo>;

  const allTodos = getAllTodos();
  const todoIndex = allTodos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    return HttpResponse.json(
      { message: '해당 Todo를 찾을 수 없습니다.' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  const todo = allTodos[todoIndex];
  const dayOfWeek = getDayOfWeek(todo.date);
  const planTodos = mockTodosByPlan[todo.planId][dayOfWeek];
  const planTodoIndex = planTodos.findIndex(t => t.id === todoId);

  if (planTodoIndex !== -1) {
    planTodos[planTodoIndex] = { ...planTodos[planTodoIndex], ...body };
  }

  return HttpResponse.json(
    {
      data: planTodos[planTodoIndex],
      message: 'Todo를 성공적으로 수정했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// Todo 삭제
export const deleteTodo = http.delete('/mock/todos/:todoId', ({ params }) => {
  const { todoId } = params;
  const allTodos = getAllTodos();
  const todoIndex = allTodos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    return HttpResponse.json(
      { message: '해당 Todo를 찾을 수 없습니다.' },
      {
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  const todo = allTodos[todoIndex];
  const dayOfWeek = getDayOfWeek(todo.date);
  const planTodos = mockTodosByPlan[todo.planId][dayOfWeek];
  const planTodoIndex = planTodos.findIndex(t => t.id === todoId);

  if (planTodoIndex !== -1) {
    const deletedTodo = planTodos.splice(planTodoIndex, 1)[0];
    return HttpResponse.json(
      {
        data: deletedTodo,
        message: 'Todo를 성공적으로 삭제했습니다.',
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }

  return HttpResponse.json(
    { message: 'Todo 삭제에 실패했습니다.' },
    {
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// 주간 Todo 리스트 조회 (날짜별로 그룹화)
export const getWeeklyTodos = http.get('/mock/todos/weekly', ({ request }) => {
  const url = new URL(request.url);
  const goalId = url.searchParams.get('goalId');
  const startDate = url.searchParams.get('startDate');
  const endDate = url.searchParams.get('endDate');

  let filteredTodos = getAllTodos();

  if (goalId) {
    filteredTodos = filteredTodos.filter(todo => todo.goalId === goalId);
  }
  if (startDate && endDate) {
    filteredTodos = filteredTodos.filter(todo => todo.date >= startDate && todo.date <= endDate);
  }

  // 날짜별로 그룹화
  const groupedByDate = filteredTodos.reduce(
    (acc, todo) => {
      if (!acc[todo.date]) {
        acc[todo.date] = [];
      }
      acc[todo.date].push(todo);
      return acc;
    },
    {} as Record<string, Todo[]>
  );

  return HttpResponse.json(
    {
      data: groupedByDate,
      message: '주간 Todo 리스트를 성공적으로 조회했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// 오늘의 Todo 리스트 조회
export const getTodayTodos = http.get('/mock/todos/today', ({ request }) => {
  const url = new URL(request.url);
  const goalId = url.searchParams.get('goalId');

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식

  let filteredTodos = getAllTodos().filter(todo => todo.date === today);

  if (goalId) {
    filteredTodos = filteredTodos.filter(todo => todo.goalId === goalId);
  }

  return HttpResponse.json(
    {
      data: filteredTodos,
      message: '오늘의 Todo 리스트를 성공적으로 조회했습니다.',
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
});

// 날짜를 요일로 변환하는 헬퍼 함수
function getDayOfWeek(dateString: string): DAY_OF_THE_WEEK {
  const date = new Date(dateString);
  const day = date.getDay();

  const dayMap: Record<number, DAY_OF_THE_WEEK> = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
  };

  return dayMap[day];
}

// 모든 Todo 핸들러들을 배열로 export
export const todoHandlers = [
  optionsHandler,
  getWeeklyTodoList,
  getTodos,
  getTodoById,
  createTodo,
  updateTodoStatus,
  updateTodo,
  deleteTodo,
  getWeeklyTodos,
  getTodayTodos,
];
