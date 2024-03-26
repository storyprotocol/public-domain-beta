export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="h-full w-full mt-10 xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl">
            {children}
        </main>
    );
}