import TestUserDataPage from './test/TestUserDataPage';
import TestUserServer from './test/TestUserServer';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      hello world!
      <TestUserDataPage />
      <TestUserServer />
    </div>
  );
}
