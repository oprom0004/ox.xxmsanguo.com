'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import DownloadGateway from './components/DownloadGateway';

interface GatewayContextType {
    openGateway: () => void;
    closeGateway: () => void;
}

const GatewayContext = createContext<GatewayContextType | undefined>(undefined);

function shouldOpenGateway(target: any) {
    try {
        if (!target) return false;
        
        // Handle cases where the target is a text node (nodeType === 3)
        let element = target;
        if (target.nodeType === 3 && target.parentElement) {
            element = target.parentElement;
        }
        
        // Safety check if the element has closest method
        if (!element || typeof element.closest !== 'function') {
            return false;
        }
        
        const clickable = element.closest('a,button') as HTMLElement | null;
        if (!clickable) return false;
        
        const isCta = clickable.getAttribute('data-cta');
        if (isCta === 'false') return false;
        return isCta === 'true';
    } catch (err) {
        console.error('[CTA Interceptor] Error matching target:', err);
        return false;
    }
}

function CtaClickInterceptor() {
    const { openGateway } = useGateway();

    React.useEffect(() => {
        const onClickCapture = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target) return;
            
            if (shouldOpenGateway(target)) {
                console.log('[CTA Interceptor] Click captured successfully!', target);
                event.preventDefault();
                event.stopPropagation();
                openGateway();
            }
        };

        document.addEventListener('click', onClickCapture, true);
        return () => document.removeEventListener('click', onClickCapture, true);
    }, [openGateway]);

    return null;
}

export function GatewayProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openGateway = () => setIsOpen(true);
    const closeGateway = () => setIsOpen(false);

    return (
        <GatewayContext.Provider value={{ openGateway, closeGateway }}>
            <CtaClickInterceptor />
            {children}
            <DownloadGateway
                isOpen={isOpen}
                onClose={closeGateway}
            />
        </GatewayContext.Provider>
    );
}

export function useGateway() {
    const context = useContext(GatewayContext);
    if (context === undefined) {
        throw new Error('useGateway must be used within a GatewayProvider');
    }
    return context;
}

interface GatewayTriggerProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    asChild?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}

export function GatewayTrigger({ children, className, style, onClick, ...props }: GatewayTriggerProps) {
    const { openGateway } = useGateway();

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) onClick(e);
        openGateway();
    };

    return (
        <button className={className} style={style} onClick={handleClick} {...props}>
            {children}
        </button>
    );
}
