import { index as Accounts } from "@/routes/accounts";
import { Head } from "@inertiajs/react";

export default function AccountIndex() {
    return (
        <>
            <Head title="Accounts" />
        </>
    );
}

AccountIndex.layout = {
    breadcrumbs: [
        {
            title: 'Account',
            href: Accounts(),
        },
    ],
};