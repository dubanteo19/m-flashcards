import Link from "next/link";

export default function Header() {
    return (
        <header className="container mx-auto py-4 px-4 flex gap-4 items-center ">
            <Link href="/" className="text-2xl font-bold text-primary">
                <h1>M Flashcards</h1>
            </Link>
            <span className="text-sm text-muted-foreground">Small app to help you learn Japanese vocabulary</span>
        </header>
    );
}