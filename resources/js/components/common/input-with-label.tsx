import { Input } from '../ui/input'
import { Label } from '../ui/label'
import InputError from '../input-error'

interface InputProps {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    error?: string;
}

export default function InputWithLabel({
    label,
    name,
    type,
    placeholder,
    error,
}: InputProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
            />

            <InputError message={error} />
        </div>
    )
}
