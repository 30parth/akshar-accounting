import { Form, Head, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React from 'react';
import ProductCategoryController from '@/actions/App/Http/Controllers/ProductCategoryController';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index as CategoryIndex } from '@/routes/product-categories';

export default function CreateCategory() {
    return (
        <>
            <Head title="Create Category" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6 max-w-xl">
                <Heading
                    title="Create Category"
                    description="Create a new product category."
                />

                <div className="rounded-xl border border-sidebar-border/80 bg-card p-6 shadow-xs">
                    <Form
                        {...ProductCategoryController.store.form()}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Category Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="e.g. Electronics, Groceries, Apparel"
                                        required
                                        autoFocus
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] mt-1 block w-full dark:bg-neutral-900"
                                        defaultValue="Active"
                                        required
                                    >
                                        <option value="Active" className="dark:bg-neutral-900">Active</option>
                                        <option value="Inactive" className="dark:bg-neutral-900">Inactive</option>
                                    </select>
                                    <InputError message={errors.status} />
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-sidebar-border/60">
                                    <Button
                                        asChild
                                        variant="outline"
                                        disabled={processing}
                                        className="cursor-pointer"
                                    >
                                        <Link href={CategoryIndex().url}>
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button type="submit" disabled={processing} className="cursor-pointer">
                                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Save
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </>
    );
}

CreateCategory.layout = {
    breadcrumbs: [
        {
            title: 'Categories',
            href: CategoryIndex(),
        },
        {
            title: 'Create',
            href: '/product-categories/create',
        },
    ],
};
