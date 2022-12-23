import { FC, PropsWithChildren } from "react";
import { Header } from "./Header/Header";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}