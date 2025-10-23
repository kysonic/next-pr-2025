import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal: FC<PropsWithChildren> = ({ children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted || typeof window === 'undefined') {
        return null;
    }

    return createPortal(children, document.body);
};

export default Portal;
