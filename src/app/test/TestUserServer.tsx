const TestUserServer = async () => {
  const fetcher = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const users = await fetcher();
  //   const result = fetcher();
  return (
    <div>
      ✅ 서버 컴포넌트 MSW 테스트:
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
};

export default TestUserServer;
