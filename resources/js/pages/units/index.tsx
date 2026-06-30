import { Form, Head, usePage, router } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import UnitController from '@/actions/App/Http/Controllers/UnitController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
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
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { index as UnitIndex } from '@/routes/unit';

interface Unit {
    id: number;
    name: string;
    short_name: string;
    status: 'Active' | 'Inactive';
    created_at?: string;
}

interface PaginatedUnits {
    data: Unit[];
    links: any[];
    from: number | null;
    to: number | null;
    total: number;
    current_page: number;
    last_page: number;
}

interface Props extends Record<string, unknown> {
    units: PaginatedUnits;
    filters: {
        search?: string;
    };
    flash?: {
        toast?: any;
    };
}

export default function Units() {
    const { props } = usePage<Props>();
    const { units, filters } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
    const [deletingUnit, setDeletingUnit] = useState<Unit | null>(null);
    const [search, setSearch] = useState(filters.search ?? '');

    // Handle search input with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search ?? '')) {
                router.get(
                    UnitIndex().url,
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

    const openCreateModal = () => {
        setEditingUnit(null);
        setIsOpen(true);
    };

    const openEditModal = (unit: Unit) => {
        setEditingUnit(unit);
        setIsOpen(true);
    };

    return (
        <>
            <Head title="Units" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 md:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Heading
                        title="Units"
                        description="Manage measurement units for inventory and sales."
                    />

                    <Button
                        onClick={openCreateModal}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Plus className="h-4 w-4" />
                        Create Unit
                    </Button>
                </div>

                {/* Filters and Search */}
                <div className="flex items-center gap-2 max-w-md">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search units..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 w-full bg-background"
                        />
                    </div>
                </div>

                {/* Units Table */}
                <div className="rounded-lg border border-sidebar-border/80 bg-card shadow-xs">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='p-3'>Name</TableHead>
                                <TableHead className='p-3'>Short Name</TableHead>
                                <TableHead className='p-3'>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {units.data.length > 0 ? (
                                units.data.map((unit) => (
                                    <TableRow key={unit.id} className="hover:bg-muted/30">
                                        <TableCell>{unit.name}</TableCell>
                                        <TableCell>{unit.short_name}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "px-2.5 py-0.5 border text-xs font-semibold rounded-full",
                                                    unit.status === 'Active'
                                                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/25 dark:text-emerald-300"
                                                        : "bg-neutral-500/10 text-neutral-600 border-neutral-500/20 dark:bg-neutral-500/25 dark:text-neutral-400"
                                                )}
                                            >
                                                {unit.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => openEditModal(unit)}
                                                    className="h-8 w-8 hover:text-foreground cursor-pointer text-muted-foreground"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeletingUnit(unit)}
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
                                        No units found. Click "Create Unit" to add one.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <Pagination
                    links={units.links}
                    from={units.from}
                    to={units.to}
                    total={units.total}
                />
            </div>

            {/* Create/Edit Modal Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingUnit ? 'Edit Unit' : 'Create Unit'}</DialogTitle>
                        <DialogDescription>
                            {editingUnit
                                ? 'Update the details for this unit.'
                                : 'Add a new unit for your product catalog.'}
                        </DialogDescription>
                    </DialogHeader>

                    <Form
                        {...(editingUnit
                            ? UnitController.update.form({ unit: editingUnit.id })
                            : UnitController.store.form()
                        )}
                        onSuccess={() => setIsOpen(false)}
                        options={{
                            preserveScroll: true,
                        }}
                        key={editingUnit?.id ?? 'create'}
                        className="space-y-4 py-2"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Unit Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        defaultValue={editingUnit?.name ?? ''}
                                        placeholder="e.g. Kilogram, Piece, Litre"
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="short_name">Short Name / Symbol</Label>
                                    <Input
                                        id="short_name"
                                        name="short_name"
                                        defaultValue={editingUnit?.short_name ?? ''}
                                        placeholder="e.g. kg, pc, L"
                                        required
                                    />
                                    <InputError message={errors.short_name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] mt-1 block w-full dark:bg-neutral-900"
                                        defaultValue={editingUnit?.status ?? 'Active'}
                                        required
                                    >
                                        <option value="Active" className="dark:bg-neutral-900">Active</option>
                                        <option value="Inactive" className="dark:bg-neutral-900">Inactive</option>
                                    </select>
                                    <InputError message={errors.status} />
                                </div>

                                <DialogFooter className="gap-2 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                        disabled={processing}
                                        className="cursor-pointer"
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing} className="cursor-pointer">
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deletingUnit !== null} onOpenChange={(open) => !open && setDeletingUnit(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Delete Unit</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the unit <strong>{deletingUnit?.name}</strong>?
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDeletingUnit(null)}
                            className="cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (deletingUnit) {
                                    router.delete(UnitController.destroy.url(deletingUnit.id), {
                                        preserveScroll: true,
                                        onSuccess: () => setDeletingUnit(null),
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

Units.layout = {
    breadcrumbs: [
        {
            title: 'Units',
            href: UnitIndex(),
        },
    ],
};
