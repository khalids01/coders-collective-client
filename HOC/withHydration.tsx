import { useState, useEffect } from "react";

function withHydration<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithHydration(props: P) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    return isMounted ? <WrappedComponent {...props} /> : null;
  };
}

export default withHydration;
