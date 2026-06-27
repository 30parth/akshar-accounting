import { Head, usePage, router, Link } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import ProductCategoryController from '@/actions/App/Http/Controllers/ProductCategoryController';
import Heading from '@/components/heading';
import { Pagination } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { index as CategoryIndex, create as CreateCategory, edit as EditCategory } from '@/routes/product-categories';

interface Category {
    id: number;
    name: string;
    name_slug: string;
    status: 'Active' | 'Inactive';
}

interface PaginatedCategories {
    data: Category[];
    links: any[];
    from: number | null;
    to: number | null;
    total: number;
    current_page: number;
    last_page: number;
}

interface Props extends Record<string, unknown> {
    categories: PaginatedCategories;
    filters: {
        search?: string;
    };
}

export default function ProductCategories() {
    const { props } = usePage<Props>();
    const { categories, filters } = props;

    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');

    // Handle search input with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search ?? '')) {
                router.get(
                    CategoryIndex().url,
                    { search },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true,
                    }
                );
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search, filters.search]);

    return (
        <>
            <Head title="Product Categories" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Categories"
                        description="Manage categories for your product catalog."
                    />
                    
                    <Button asChild className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer">
                        <Link href={CreateCategory().url}>
                            <Plus className="h-4 w-4" />
                            Create Category
                        </Link>
                    </Button>
                </div>

                {/* Filters and Search */}
                <div className="flex items-center gap-2 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 w-full bg-background"
                        />
                    </div>
                </div>

                {/* Categories Table */}
                <div className="rounded-lg border border-sidebar-border/80 bg-card shadow-xs">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-6 py-4">Name</TableHead>
                                <TableHead className="px-6 py-4">Slug</TableHead>
                                <TableHead className="px-6 py-4">Status</TableHead>
                                <TableHead className="px-6 py-4 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.data.length > 0 ? (
                                categories.data.map((category) => (
                                    <TableRow key={category.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="px-6 py-4 font-medium">{category.name}</TableCell>
                                        <TableCell className="px-6 py-4 text-muted-foreground">{category.name_slug}</TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "px-2.5 py-0.5 border text-xs font-semibold rounded-full",
                                                    category.status === 'Active'
                                                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/25 dark:text-emerald-300"
                                                        : "bg-neutral-500/10 text-neutral-600 border-neutral-500/20 dark:bg-neutral-500/25 dark:text-neutral-400"
                                                )}
                                            >
                                                {category.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 hover:text-foreground cursor-pointer text-muted-foreground"
                                                >
                                                    <Link href={EditCategory(category.id).url}>
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeletingCategory(category)}
                                                    className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                                        No categories found. Click "Create Category" to add one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <Pagination
                    links={categories.links}
                    from={categories.from}
                    to={categories.to}
                    total={categories.total}
                />
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deletingCategory !== null} onOpenChange={(open) => !open && setDeletingCategory(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Category</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the category <strong>{deletingCategory?.name}</strong>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeletingCategory(null)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (deletingCategory) {
                                    router.delete(ProductCategoryController.destroy.url(deletingCategory.id), {
                                        preserveScroll: true,
                                        onSuccess: () => setDeletingCategory(null),
                                    });
                                }
                            }}
                            className="cursor-pointer"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

ProductCategories.layout = {
    breadcrumbs: [
        {
            title: 'Categories',
            href: CategoryIndex(),
        },
    ],
};
