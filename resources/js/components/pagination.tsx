import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export interface PaginationLinkType {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLinkType[];
    from: number | null;
    to: number | null;
    total: number;
    className?: string;
}

export function Pagination({ links, from, to, total, className }: PaginationProps) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-sidebar-border/80 px-4 py-3 sm:px-6 mt-4", className)}>
            <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium text-foreground">{from ?? 0}</span> to{' '}
                    <span className="font-medium text-foreground">{to ?? 0}</span> of{' '}
                    <span className="font-medium text-foreground">{total}</span> results
                </p>
            </div>
            
            <div>
                <ShadcnPagination className="justify-center sm:justify-end">
                    <PaginationContent>
                        {links.map((link, idx) => {
                            const isPrev = idx === 0;
                            const isNext = idx === links.length - 1;
                            
                            if (isPrev) {
                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationPrevious
                                            href={link.url ?? undefined}
                                            className={cn(!link.url && "pointer-events-none opacity-50")}
                                        />
                                    </PaginationItem>
                                );
                            }
                            
                            if (isNext) {
                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationNext
                                            href={link.url ?? undefined}
                                            className={cn(!link.url && "pointer-events-none opacity-50")}
                                        />
                                    </PaginationItem>
                                );
                            }
                            
                            if (link.label === '...') {
                                return (
                                    <PaginationItem key={idx}>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                );
                            }
                            
                            return (
                                <PaginationItem key={idx}>
                                    <PaginationLink
                                        href={link.url ?? undefined}
                                        isActive={link.active}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                    </PaginationContent>
                </ShadcnPagination>
            </div>
        </div>
    );
}
