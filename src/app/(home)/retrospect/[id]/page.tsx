import RetrospectRouteClient from './route-client';

export function generateStaticParams() {
  return [{ id: '_' }];
}

const WeeklyRetrospectPageRoute = () => {
  return <RetrospectRouteClient />;
};

export default WeeklyRetrospectPageRoute;
