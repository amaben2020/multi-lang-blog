import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <h3>Category</h3>
      {children}
    </div>
  );
};

export default Layout;
