// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';
import useAPI from '../customHooks/API/useAPI';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const BlogDetails = () => {
    const [blogDetails, setBlogDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log("blogDetails", blogDetails)

    const { slug } = useParams();
    const { getApi } = useAPI();

    let API = `/api/v2/blogs/blog/slug/${slug}`;

    const fetchBlog = async (url) => {
        try {
            const { data } = await getApi({ endpoint: url });
            if (data) {
                setBlogDetails(data);
            } else {
                toast.error('Blog not found', { position: 'top-right' });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message, { position: 'top-right' });
        } finally {
            setLoading(true);
        }
    };

    useEffect(() => {
        fetchBlog(API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createMarkup = (htmlString) => {
        return { __html: htmlString };
    };

    return (
       <>
        <Navbar />
        <div className="blog-details-main pt-[100px]">
            <div className="container">
                {loading ? (
                    blogDetails && (
                        <>
                            <div className="blog-image-div">
                                <img src={blogDetails.large_thumb[0].url} alt="" />
                            </div>
                            <div className="blog-details-content">
                                <h2>{blogDetails.title}</h2>
                                <p>{blogDetails.blogDescription}</p>
                                <p>Posted By: {blogDetails.postedBy}</p>
                                <div dangerouslySetInnerHTML={createMarkup(blogDetails.body)} />
                                {/* Add more details as needed */}
                            </div>
                        </>
                    )
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
        <Footer />
       </>
    );
};

export default BlogDetails;
