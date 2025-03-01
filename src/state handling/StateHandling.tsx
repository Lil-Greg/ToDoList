import { Audio } from 'react-loader-spinner';
import { ClockLoader, FadeLoader, SyncLoader } from 'react-spinners';

type Props = {
    error: Error
}

export function ErrorPage({ error }: Props) {
    return (<>
        <center>
            <h1><u>Error Name:</u> {error.name}</h1>
            <h3><u>Error:</u> {error.message}</h3>
        </center>
    </>)
}

export function LoadingPage() {
    const random = Math.round(Math.random() * 3);

    return <>
        <center>
            {random == 1 ?
                <Audio
                    height="80"
                    width="80"
                    color="green"
                    ariaLabel="loading"
                />
                : random == 2 ? <FadeLoader speedMultiplier={0.5} />
                    : random == 3 ? <SyncLoader />
                        : <ClockLoader />
            }
        </center>
    </>
}