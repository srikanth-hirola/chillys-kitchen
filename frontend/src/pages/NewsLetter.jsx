import { useState } from "react";
import { StyleConfig } from "../utils/StyleConfig";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../server";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import DashboardHeader from "../components/DashboardHeader";

const NewsLetter = () => {

    const styles = StyleConfig();

    const [haveTemp, setHaveTemp] = useState(false);
    const [emailContent, setEmailContent] = useState({
        subject: '',
        body: ''
    })

    const handleMailChange = (e) => {
        const { name, value } = e.target;
        setEmailContent({
            ...emailContent,
            [name]: value
        })
    }

    const handleMailSend = async () => {
        if (!emailContent?.subject || !emailContent?.body) {
            toast.error("Subject and Body is required");
            return;
        }
        try {
            await axios.post(`${server}/newsletter/send-newsletter`, { haveTemp, emailContent })
            toast.success('Assigned to send mails')
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='dashboard-container'>
            <SideBar menu={sidebar_menu} />
            <div className="dashboard-content">
            <div className="dashboard-header">
                <h3>Newsletter</h3>
                <div className="add-btn">
                    <DashboardHeader />
                </div>
            </div>
           <div className="dashboard-newsletter-parent">
           <div className="w-full min-h-[45vh] pt-5 rounded flex flex-col items-center gap-4 outer1-div">
                <div className="w-[97%] flex justify-center border-1 rounded h-fit py-3">
                    <div className='w-6/12'>
                        <h3 className='text-center pt-2 pb-4'>Create Newsletter</h3>
                        <div className='flex justify-between'>
                            <div className='flex items-center'>
                                <label className='font-semibold pr-2'>Plain Text Email</label>
                                <input type='radio' name='haveTemp' onChange={() => { setHaveTemp(false); setEmailContent({ subject: '', body: '' }) }} checked={!haveTemp ? true : false} style={{ accentColor: styles?.mainColor }} className='w-[18px] h-[18px]' />
                            </div>
                            <div className='flex items-center'>
                                <label className='font-semibold pr-2'>Email Banners</label>
                                <input type='radio' name='haveTemp' onChange={() => { setHaveTemp(true); setEmailContent({ subject: '', body: '' }) }} checked={haveTemp ? true : false} style={{ accentColor: styles?.mainColor }} className='w-[18px] h-[18px]' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[97%] flex justify-center border-1 rounded h-fit py-3">
                    <div className='w-full px-6 py-8'>
                        {!haveTemp ?
                            <div>
                                <input type='text' onChange={handleMailChange} name='subject' value={emailContent?.subject} placeholder='Enter Subject' className='border-1 rounded py-2 px-2 w-full mb-3' />
                                <textarea onChange={handleMailChange} name='body' value={emailContent?.body} className='border-1 rounded py-2 px-2 w-full h-[400px]' placeholder='Enter Mail Body...'></textarea>
                            </div> :
                            <div>
                                <input type='text' onChange={handleMailChange} placeholder='Enter Subject' name='subject' value={emailContent?.subject} className='border-1 rounded py-2 px-2 w-full mb-3' />
                                <textarea onChange={handleMailChange} className='border-1 rounded py-2 px-2 w-full h-[400px]' name='body' value={emailContent?.body} placeholder='Paste HTML Converted Banner'></textarea>
                            </div>
                        }
                        <button onClick={handleMailSend} className='py-2 px-4 mt-3 rounded bg-blue-500 text-white' >Send Mails</button>
                    </div>
                </div>
            </div>
           </div>
            </div>

        </div>
    )
}

export default NewsLetter