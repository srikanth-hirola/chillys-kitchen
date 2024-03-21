import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { server } from '../../server';

const NewsLetterInput = () => {
    const [email, setEmail] = useState('');

    const handleEmailSubscribe = async () => {
        if (!email) {
            toast.error('Email Id is required');
            return;
        }
        try {
            await axios.post(`${server}/newsletter/subscribe-to-newsletter`, { email })
            toast.success('Subscribed successfully')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div className="DronesNewsletter-parent w-full bg-red-100 p-12 flex justify-center">
                <div>
                    <div className='DronesNewsletter-text text-center'>
                        <h5>
                            News Letter
                        </h5>
                        <p>Subscribe to get latest updates</p>
                    </div>
                    <div className='DronesNewsletter-email-parent flex justify-center flex-col'>
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}
                            required />
                        <div className='DronesNewsletter-email-image'>
                            <img src="./DronesHomepage/email.png" alt="newsletter" />
                        </div>
                        <button onClick={handleEmailSubscribe} className='bg-blue-300 rounded-sm p-2 '>Subscribe</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default NewsLetterInput