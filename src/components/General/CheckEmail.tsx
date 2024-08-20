import { useState, useEffect } from 'react'
import axios from 'axios'

interface ValidEmail {
    format?: boolean;
    alias?: boolean;
    domain?: string;
    disposable?: boolean;
    dns?: boolean;
}

// CheckEmail - calls a public API to check validity of email entered
// 2 properties:
//    emailtocheck - email address entered by user that will be checked for validty
//    checktype - string to describe type of email being entered (signup/subscription/etc...)
function CheckEmail(props: any) {

    const [validemail, setvalidemail]: [ValidEmail, (validemail: ValidEmail) => void] = useState<ValidEmail>({});

    if (props === null || props.emailtocheck === null || props.emailtocheck === '')
        return (<div />)

    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true)
    var error = ""

    //using https://cors-anywhere.herokuapp.com/
    //as proxy
    //to get around cors for development
    //since
    //in production app, would control both client and server
    //and set up allowed origin of front end on the backend server
    const apiUrl = `https://cors-anywhere.herokuapp.com/https://disify.com/api/email/${props.emailtocheck}`;

    useEffect(() => {
        axios
            .get<ValidEmail>(apiUrl, {
                method: 'get',
                withCredentials: false,
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: 1000000,
            })
            .then(response => {
                setvalidemail(response.data);
                setLoading(false);
            })
            .catch(ex => {
                const exception = axios.isCancel(ex)
                    ? 'Request Cancelled'
                    : ex.code === "ECONNABORTED"
                        ? "A timeout has occurred"
                        : ex.response.status === 404
                            ? "Resource Not found"
                            : "An unexpected error has occurred";
                error = exception;
                setLoading(false);
            });



    }, [props.emailtocheck]);

    if (!loading && !error && (!validemail?.format || validemail?.disposable || !validemail?.dns))
        return (
            <>
                <div>
                    <p className="error">Email entered was not valid.</p>
                    <p className="error">Emails with invalid formats, that are disposable, or are dns domains that are not in use are not accepted.</p>
                </div>
            </>
        )

    return (
        <>
            <div>
                {loading}
                <div className='bg-gray-100 my-2 px-4 py-2'>
                    <p><u>{validemail?.domain}</u> is a valid domain. Homever, {props.checktype} is not yet available, please check back again soon.</p>
                </div>
                {error && <p className="error">{error}</p>}
            </div>
        </>
    )
}

export default CheckEmail
