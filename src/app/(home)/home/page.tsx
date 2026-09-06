'use client';

import { HomeBootstrapGate, TodoListContainer } from '@/composite/home';

export default function MainPage() {
  return (
    <HomeBootstrapGate>
      <TodoListContainer />
    </HomeBootstrapGate>
  );
}
