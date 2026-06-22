import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <Button
                onClick={() => {
                    alert("This is Hello From Yoo")
                }}
            >

                Save
            </Button>
        </>
    );
}
