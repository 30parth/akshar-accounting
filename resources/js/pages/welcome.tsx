import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Receipt,
    Package,
    BarChart3,
    Wallet,
    Check,
    Plus,
    Trash2,
    Play
} from 'lucide-react';
import { useState } from 'react';
import { dashboard, login, register } from '@/routes';

interface InvoiceItem {
    id: number;
    name: string;
    qty: number;
    price: number;
}

interface InventoryItem {
    id: number;
    name: string;
    sku: string;
    stock: number;
    minStock: number;
    price: number;
}

export default function Welcome() {
    const { auth } = usePage().props;

    // Interactive Billing Calculator State
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
        { id: 1, name: 'Premium Office Chair', qty: 2, price: 149.00 },
        { id: 2, name: 'Wireless Keyboard & Mouse Combo', qty: 1, price: 59.00 },
        { id: 3, name: 'Type-C Hub Adapter', qty: 3, price: 35.00 }
    ]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQty, setNewItemQty] = useState(1);
    const [newItemPrice, setNewItemPrice] = useState(25.00);

    // Dynamic Inventory Demo State
    const [inventory] = useState<InventoryItem[]>([
        { id: 1, name: 'Premium Office Chair', sku: 'FUR-001', stock: 12, minStock: 5, price: 149.00 },
        { id: 2, name: 'Wireless Keyboard', sku: 'TEC-012', stock: 3, minStock: 10, price: 59.00 },
        { id: 3, name: 'Type-C Hub Adapter', sku: 'TEC-045', stock: 45, minStock: 15, price: 35.00 }
    ]);

    const handleAddInvoiceItem = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newItemName.trim()) {
            return;
        }

        const newItem: InvoiceItem = {
            id: Date.now(),
            name: newItemName,
            qty: newItemQty,
            price: newItemPrice
        };

        setInvoiceItems([...invoiceItems, newItem]);
        setNewItemName('');
        setNewItemQty(1);
        setNewItemPrice(25.00);
    };

    const handleRemoveInvoiceItem = (id: number) => {
        setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    };

    const handleQtyChange = (id: number, val: number) => {
        if (val < 1) {
            return;
        }

        setInvoiceItems(invoiceItems.map(item => item.id === id ? { ...item, qty: val } : item));
    };

    // Calculate subtotal, tax (8%), and grand total
    const subtotal = invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <>
            <Head title="Akshar Accounting - Simple Billing & Inventory" />
            <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-500 selection:text-white">
                
                {/* Header / Top Navigation */}
                <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80 transition-colors duration-300">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-650 shadow-md shadow-indigo-600/20 text-white">
                                <Receipt className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
                                Akshar Accounting
                            </span>
                        </div>

                        {/* Navigation links */}
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
                            <a href="#interactive-demo" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Live Calculator</a>
                            <a href="#inventory" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Inventory</a>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/10 active:scale-[0.98] transition-all"
                                >
                                    Go to Dashboard
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-sm font-semibold text-slate-700 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 px-3 py-2 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-600/10 active:scale-[0.98] transition-all"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-radial-[at_50%_0%] from-indigo-500/10 via-transparent to-transparent opacity-60 dark:from-indigo-600/10" />
                    
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        {/* Tag */}
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 mb-6 animate-fade-in border border-indigo-200/30">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                            Version 1.0 Release
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white max-w-4xl mx-auto leading-none">
                            Simple Billing, Inventory, and Accounting for <span className="bg-linear-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Small Businesses</span>.
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                            Create professional invoices, track live stock levels, and stay on top of your accounts without the complexity of traditional ERP systems.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-655 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/15 hover:bg-indigo-600 active:scale-[0.98] transition-all"
                                >
                                    Manage Your Business
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-655 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/15 hover:bg-indigo-600 active:scale-[0.98] transition-all"
                                    >
                                        Start Free Trial
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                    <a
                                        href="#interactive-demo"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-655 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800/80 dark:hover:text-indigo-400 transition-all"
                                    >
                                        <Play className="h-4.5 w-4.5 fill-current" />
                                        Try Calculator Demo
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Live Dashboard Preview */}
                        <div className="mt-16 md:mt-20 relative max-w-5xl mx-auto rounded-2xl border border-slate-200/80 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden group">
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
                            <div className="relative overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                                <img 
                                    src="/images/dashboard_mockup.png" 
                                    alt="Akshar Accounting Dashboard Preview" 
                                    className="w-full object-cover aspect-16/10 rounded-lg group-hover:scale-[1.01] transition-transform duration-500" 
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-white dark:bg-slate-900/40 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                                Everything you need to run your operations
                            </h2>
                            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                                Simple billing software, inventory tracking, and clean books built to fit your daily workflow perfectly.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Feature 1 */}
                            <div className="relative rounded-2xl border border-slate-100 p-6 shadow-xs hover:shadow-md dark:border-slate-800 dark:bg-slate-900/65 transition-all hover:-translate-y-1">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-655 dark:bg-indigo-950/60 dark:text-indigo-400 mb-5">
                                    <Receipt className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Billing & Invoices</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Quickly generate clean tax invoices, configure item sales taxes, send email invoices, and track outstanding client balances.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="relative rounded-2xl border border-slate-100 p-6 shadow-xs hover:shadow-md dark:border-slate-800 dark:bg-slate-900/65 transition-all hover:-translate-y-1">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-655 dark:bg-indigo-950/60 dark:text-indigo-400 mb-5">
                                    <Package className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory Stocks</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Real-time tracking of product stock counts, minimum stock alerts, product categories, and unit measurements.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="relative rounded-2xl border border-slate-100 p-6 shadow-xs hover:shadow-md dark:border-slate-800 dark:bg-slate-900/65 transition-all hover:-translate-y-1">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-655 dark:bg-indigo-950/60 dark:text-indigo-400 mb-5">
                                    <Wallet className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Accounting Accounts</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Configure customized accounts, record transaction journal entries, track cash vs credit, and stay cash-flow positive.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="relative rounded-2xl border border-slate-100 p-6 shadow-xs hover:shadow-md dark:border-slate-800 dark:bg-slate-900/65 transition-all hover:-translate-y-1">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-655 dark:bg-indigo-950/60 dark:text-indigo-400 mb-5">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Analytics Dashboard</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                                    Clean visual graphs on income, dynamic summaries, product-wise sales reports, and export capabilities.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Invoice Builder Section */}
                <section id="interactive-demo" className="py-20 relative">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Text info */}
                            <div className="lg:col-span-5 space-y-6">
                                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/20">
                                    Live Demonstration
                                </span>
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                    Test the Interactive Invoice Calculator
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Experience how fast and simple it is to build invoices and calculate taxes. Add customized items, edit quantities, and watch the values auto-update dynamically.
                                </p>
                                <ul className="space-y-3 font-medium text-slate-700 dark:text-slate-300">
                                    <li className="flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                                            <Check className="h-4 w-4 stroke-[3]" />
                                        </div>
                                        Dynamic subtotals & taxes calculation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                                            <Check className="h-4 w-4 stroke-[3]" />
                                        </div>
                                        Instant custom item adding & deletion
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                                            <Check className="h-4 w-4 stroke-[3]" />
                                        </div>
                                        Clean print-ready layout styling
                                    </li>
                                </ul>
                            </div>

                            {/* Interactive Component Container */}
                            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-6 md:p-8 dark:bg-slate-900 dark:border-slate-800">
                                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Sales Invoice</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Transaction ID: INV-2026-009</p>
                                    </div>
                                    <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/20">
                                        Active Draft
                                    </span>
                                </div>

                                {/* Items Table */}
                                <div className="mt-6 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-slate-100 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                                <th className="py-2.5">Item Details</th>
                                                <th className="py-2.5 text-center w-20">Qty</th>
                                                <th className="py-2.5 text-right w-28">Price ($)</th>
                                                <th className="py-2.5 text-right w-28">Total ($)</th>
                                                <th className="py-2.5 w-10"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100/50 dark:divide-slate-800/50 text-sm">
                                            {invoiceItems.map((item) => (
                                                <tr key={item.id} className="group">
                                                    <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">{item.name}</td>
                                                    <td className="py-3 text-center">
                                                        <input 
                                                            type="number" 
                                                            value={item.qty} 
                                                            onChange={(e) => handleQtyChange(item.id, parseInt(e.target.value) || 1)}
                                                            className="w-12 text-center rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent py-0.5 text-sm outline-hidden focus:border-indigo-550 dark:focus:border-indigo-400"
                                                            min="1"
                                                        />
                                                    </td>
                                                    <td className="py-3 text-right text-slate-600 dark:text-slate-400">{item.price.toFixed(2)}</td>
                                                    <td className="py-3 text-right font-bold text-slate-900 dark:text-white">{(item.qty * item.price).toFixed(2)}</td>
                                                    <td className="py-3 text-center">
                                                        <button 
                                                            onClick={() => handleRemoveInvoiceItem(item.id)}
                                                            className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                            title="Delete Item"
                                                            type="button"
                                                        >
                                                            <Trash2 className="h-4.5 w-4.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Add Item Form */}
                                <div className="mt-6 flex flex-wrap gap-2.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 dark:bg-slate-950/60 dark:border-slate-800">
                                    <div className="flex-1 min-w-[200px]">
                                        <input 
                                            type="text" 
                                            placeholder="Add customized item..." 
                                            value={newItemName}
                                            onChange={(e) => setNewItemName(e.target.value)}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm outline-hidden focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-400"
                                        />
                                    </div>
                                    <div className="w-18">
                                        <input 
                                            type="number" 
                                            placeholder="Qty" 
                                            value={newItemQty}
                                            onChange={(e) => setNewItemQty(parseInt(e.target.value) || 1)}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-center outline-hidden focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-400"
                                            min="1"
                                        />
                                    </div>
                                    <div className="w-24">
                                        <input 
                                            type="number" 
                                            placeholder="Price" 
                                            step="0.01"
                                            value={newItemPrice}
                                            onChange={(e) => setNewItemPrice(parseFloat(e.target.value) || 0)}
                                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm text-right outline-hidden focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:focus:border-indigo-400"
                                            min="0"
                                        />
                                    </div>
                                    <button 
                                        onClick={handleAddInvoiceItem}
                                        type="button"
                                        className="inline-flex items-center justify-center gap-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4.5 py-2 transition-colors cursor-pointer"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Add
                                    </button>
                                </div>

                                {/* Summary calculation breakdown */}
                                <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3 max-w-sm ml-auto text-sm">
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Subtotal:</span>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                        <span>Sales Tax (8%):</span>
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-base text-slate-900 dark:text-white font-extrabold">
                                        <span>Grand Total:</span>
                                        <span className="text-indigo-600 dark:text-indigo-400">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Inventory Stock Demonstration Section */}
                <section id="inventory" className="py-20 bg-slate-100/40 dark:bg-slate-900/20 border-t border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            
                            {/* Inventory card display */}
                            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 shadow-xl p-6 dark:bg-slate-900 dark:border-slate-800 overflow-hidden order-last lg:order-first">
                                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">Live Inventory Alert</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Real-time counts mapped with warning alerts</p>
                                    </div>
                                    <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>

                                <div className="space-y-4">
                                    {inventory.map((item) => {
                                        const isLow = item.stock <= item.minStock;

                                        return (
                                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/40 transition-colors">
                                                <div className="space-y-0.5">
                                                    <span className="text-xs font-bold text-slate-400 dark:text-slate-550">{item.sku}</span>
                                                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">{item.name}</h4>
                                                </div>
                                                <div className="mt-3 sm:mt-0 flex items-center gap-4.5 justify-between">
                                                    <div>
                                                        <span className="text-xs text-slate-400 dark:text-slate-500 block">Unit Price</span>
                                                        <span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-slate-400 dark:text-slate-500 block">Available Stock</span>
                                                        <div className="flex items-center gap-2 mt-0.5 justify-end">
                                                            <span className={`text-sm font-bold ${isLow ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-650 dark:text-emerald-400'}`}>
                                                                {item.stock} Units
                                                            </span>
                                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                                                                isLow 
                                                                    ? 'bg-rose-50 text-rose-700 border-rose-200/20 dark:bg-rose-950/30 dark:text-rose-400' 
                                                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200/20 dark:bg-emerald-950/30 dark:text-emerald-400'
                                                            }`}>
                                                                {isLow ? 'Low Warning' : 'Healthy'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Inventory info text */}
                            <div className="lg:col-span-5 space-y-6">
                                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-200/20">
                                    Stock Management
                                </span>
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                    Automated Inventory Tracking & Alerts
                                </h2>
                                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Avoid selling out or over-purchasing stock. Our system monitors inventory thresholds and fires low-stock alerts automatically, keeping your supply chain flowing.
                                </p>
                                <ul className="space-y-3 font-medium text-slate-700 dark:text-slate-300">
                                    <li className="flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                                            <Check className="h-4 w-4 stroke-[3]" />
                                        </div>
                                        Instant stock level calculations upon invoices
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                                            <Check className="h-4 w-4 stroke-[3]" />
                                        </div>
                                        Categorized tracking with customizable SKU codes
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="rounded-full bg-emerald-500/10 p-1 text-emerald-600 dark:text-emerald-400">
                                            <Check className="h-4 w-4 stroke-[3]" />
                                        </div>
                                        Flexible units of measurement (e.g. pcs, kg, hrs)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call To Action Banner */}
                <section className="py-20 relative overflow-hidden bg-slate-950 text-white border-t border-slate-900">
                    <div className="absolute inset-0 -z-10 bg-radial-[at_50%_0%] from-indigo-500/20 via-transparent to-transparent opacity-60" />
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl max-w-3xl mx-auto">
                            Simplify your business billing and accounting today
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                            Set up your account in under 2 minutes. Get full access to accounts, inventory control, product categories, and billing management.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/15 hover:bg-indigo-500 active:scale-[0.98] transition-all"
                                >
                                    Go to Dashboard
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/15 hover:bg-indigo-500 active:scale-[0.98] transition-all"
                                    >
                                        Create Free Account
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-6 py-3.5 text-base font-semibold text-slate-200 hover:bg-slate-850 transition-all"
                                    >
                                        Log in to Account
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white py-12 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8 text-sm">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                    <Receipt className="h-4 w-4" />
                                </div>
                                <span className="font-bold tracking-tight text-slate-800 dark:text-slate-200">
                                    Akshar Accounting
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400">Features</a>
                                <a href="#interactive-demo" className="hover:text-indigo-600 dark:hover:text-indigo-400">Calculator</a>
                                <a href="#inventory" className="hover:text-indigo-600 dark:hover:text-indigo-400">Stock Alerts</a>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-semibold text-slate-400 dark:text-slate-500">
                            <p>© 2026 Akshar Accounting. All rights reserved.</p>
                            <p>Designed with clean minimalism and professional slate hues.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
