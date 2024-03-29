// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router'
import useAPI from '../customHooks/API/useAPI';

const BlogDetails = () => {

  const [blogDetails, setBlogDetails] = useState([]);
  console.log("blogDetails", blogDetails)
  const [loading, setLoading] = useState('');

  const { slug } = useParams();
  const { getApi } = useAPI();
  console.log("slug", slug)

  let API = `/api/v2/blogs/blog/slug/${slug}`;

  const fetchBlog = async (url) => {
    try {
        const { data } = await getApi({ endpoint: url })
        if (data) {
            if (data === '') {
                setPageFound('Notfound');
            } else {
                setBlogDetails({ ...data });
            }
        }
    } catch (e) {
        toast.message(e?.response?.data?.message,{position:'top-right'});
    } finally {
        setLoading(true)
    }
};

useEffect(() => {
    fetchBlog(API);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
  return (
    <div>BlogDetails</div>
  )
}

export default BlogDetails