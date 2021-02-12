import * as React from 'react';

export interface HeaderProps {
  title: React.ReactNode;
}

export function Header({ title }: HeaderProps) {
  const titleRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        if (titleRef.current) {
          const active = (document.scrollingElement?.scrollTop || 0) >= 40;
          titleRef.current.style.opacity = active ? '1.0' : '0.0';
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="App-header">
      <div className="App-navBar">
        <h1 ref={titleRef}>{title}</h1>
      </div>

      <h1 className="App-heading" aria-hidden>
        {title}
      </h1>
    </header>
  );
}
