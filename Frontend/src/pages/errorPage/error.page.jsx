

export const ErrorPage = ({ error }) => {
    return (
        <>
            {error ? (
                <h1>{error}</h1>
            ) : (
                <>          
                    <h1 className="text-4xl font-bold">404</h1>
                    <h2>Page not found</h2>
                </>
            )}
        </>
    )
}