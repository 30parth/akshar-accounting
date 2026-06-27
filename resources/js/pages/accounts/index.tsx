import { Head } from "@inertiajs/react";
import { index as Accounts } from "@/routes/accounts";

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