import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';

const ROUTE_LABELS = {
  '': 'Home',
  'about': 'About',
  'work': 'Work',
  'tools': 'Lab',
  'work-with-me': 'Work With Me',
  'notes': 'Notes',
  'contact': 'Contact',
};

export const Breadcrumbs = ({ noteTitle }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Don't show breadcrumbs on homepage
  if (pathnames.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-20 pb-4">
      <Breadcrumb data-testid="breadcrumbs">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                to="/"
                className="flex items-center gap-1 transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-accent, #00f0ff)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
              >
                <Home size={14} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathnames.map((segment, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = isLast && noteTitle
              ? noteTitle
              : ROUTE_LABELS[segment] || segment;

            return (
              <React.Fragment key={to}>
                <BreadcrumbSeparator>
                  <ChevronRight size={14} style={{ color: 'rgba(255,255,255,0.2)' }} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage
                      className="font-medium"
                      style={{ color: 'var(--theme-accent, #00f0ff)' }}
                    >
                      {label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        to={to}
                        className="transition-colors duration-200"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                      >
                        {label}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
