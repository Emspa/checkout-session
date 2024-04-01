export interface ILoginProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    error: string;
}