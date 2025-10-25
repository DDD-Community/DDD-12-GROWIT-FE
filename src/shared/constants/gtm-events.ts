/**
 * GTM 이벤트 상수 정의
 * 일관된 이벤트 이름과 파라미터를 관리하기 위한 파일
 */

// 이벤트 이름 enum
export enum GTM_EVENTS {
  // 페이지 관련
  PAGE_VIEW = 'page_view',

  LOGIN_CLICK = 'login_click',
  SIGN_UP_CLICK = 'signup_click',

  // 목표 관련
  GOAL_ADD_CLICK = 'goal_add_click',
  GOAL_START_CLICK = 'goal_start_click',
  GOAL_CLICK = 'goal_click',

  // home
  HOME_AI_CLICK = 'home_ai_click',
  HOME_TODO_CLICK = 'home_todo_click',
  HOME_GOAL_CLICK = 'home_goal_click',

  // 시트 관련
  SHEET_OPEN = 'sheet_open',
  SHEET_CLOSE = 'sheet_close',

  // 회고
  WEEKLY_REVIEW_CLICK = 'weekly_review_click',
  TOTAL_REVIEW_CLICK = 'total_review_click',

  // 프로필 관련
  MYPAGE_CLICK = 'mypage_click',
}

export enum GTM_BUTTON_NAME {
  // 로그인 페이지
  LOGIN = 'login',
  KAKAO_LOGIN = 'kakao_login',
  SIGN_UP_LINK = 'signup_link',
  SIGN_UP = 'sign_up',

  // 목표 페이지
  CATEGORY_STUDY = 'category_study',
  CATEGORY_INVEST = 'category_invest',
  CATEGORY_IT = 'category_it',
  CATEGORY_NEXT = 'category_next',
  GOAL_EXAMPLE = 'goal_example',
  GOAL_NEXT = 'goal_next',
  PERIOD_4 = 'period_4',
  PERIOD_8 = 'period_8',
  PERIOD_12 = 'period_12',
  PERIOD_NEXT = 'period_next',
  MENTO_CARD = 'mento_card',
  MENTO_NEXT = 'mento_next',
  START_GOAL = 'start_goal',
  PLANET = 'planet',
  PLANET_DELETE = 'planet_delete',
  PLANET_EDIT = 'planet_edit',

  // Home 페이지
  AI_ADVICE = 'ai_advice',
  REVIEW = 'review',
  TODO_CHECK = 'todo_check',
  ADD_TODO = 'add_todo',
  TODO = 'todo',
  TODO_EDIT = 'todo_edit',
  GOAL_OPEN = 'goal_open',
  GOAL_EDIT = 'goal_edit',

  // 시트 관련
  ADD_TODO_SHEET = 'add_todo_sheet',
  EDIT_TODO_SHEET = 'edit_todo_sheet',
  DATE_SELECTOR_SHEET = 'date_selector_sheet',

  // 회고
  REVIEW_EDIT = 'review_edit',
  NEW_REVIEW = 'new_review',
  REVIEW_DONE = 'review_done',
  REVIEW_AI = 'review_ai',
  PAST_TODO = 'past_todo',

  // 프로필 관련
  LOGOUT = 'logout',
  PROFILE_EDIT = 'profile_edit',
  PROFILE_DELETE = 'profile_delete',
}

// 이벤트 파라미터 enum
export enum GTM_PARAMETERS {
  // 공통 파라미터
  USER_ID = 'user_id',
  SESSION_ID = 'session_id',
  PAGE_PATH = 'page_path',
  PAGE_TITLE = 'page_title',
  PAGE_LOCATION = 'page_location',

  // 버튼 관련
  BUTTON_NAME = 'btn_name',
  BUTTON_LOCATION = 'button_location',

  // 폼 관련
  FORM_NAME = 'form_name',
  FORM_SUCCESS = 'form_success',

  // 투두 관련
  TODO_ID = 'todo_id',
  TODO_TITLE = 'todo_title',
  TODO_CATEGORY = 'todo_category',
  TODO_PRIORITY = 'todo_priority',

  // 목표 관련
  GOAL_ID = 'goal_id',
  GOAL_NAME = 'goal_name',
  GOAL_CATEGORY = 'goal_category',
  GOAL_VALUE = 'goal_value',

  // 네비게이션 관련
  NAVIGATION_FROM = 'navigation_from',
  NAVIGATION_TO = 'navigation_to',

  // 에러 관련
  ERROR_MESSAGE = 'error_message',
  ERROR_CODE = 'error_code',
  ERROR_LOCATION = 'error_location',
}
