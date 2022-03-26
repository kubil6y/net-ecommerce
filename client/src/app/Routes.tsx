import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Catalog, ProductDetails } from "../features";
import { AboutPage } from "../features/about";
import { ContactPage } from "../features/contact";
import { HomePage } from "../features/home";

const routes = [
  { id: 0, path: "/", component: () => <HomePage />, exact: true },
  { id: 1, path: "/catalog", component: () => <Catalog />, exact: true },
  {
    id: 2,
    path: "/catalog/:id",
    component: () => <ProductDetails />,
    exact: true,
  },
  { id: 3, path: "/about", component: () => <AboutPage />, exact: true },
  { id: 4, path: "/contact", component: () => <ContactPage />, exact: true },
  { id: 99, path: "*", component: () => <h1>NOT FOUND</h1> },
];

export const Routes: FC = () => {
  return (
    <Switch>
      {routes.map(({ id, path, component, exact }) => (
        <Route
          key={id}
          path={path}
          component={component}
          exact={Boolean(exact)}
        />
      ))}
    </Switch>
  );
};
