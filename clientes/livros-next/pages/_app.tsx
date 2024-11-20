import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
        <head>
            <meta name="viewport"
                content="width=device-width, initial-scale=1" />
        </head>
        <Component {...pageProps} />
        </>
    )
}

export default MyApp;