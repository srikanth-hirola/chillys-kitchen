/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import sidebar_menu from '../../../constants/sidebar-menu';
import SideBar from '../../../components/Sidebar';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined ,PlusOutlined} from '@ant-design/icons';
import { Button, Input, Space, Table, Typography } from 'antd';
import useAPI from '../../../customHooks/API/useAPI';
import EditButton from './Buttons/EditButton';
import DeleteButton from './Buttons/DeleteButton';
import { SearchOutlined } from "@ant-design/icons";
import DashboardHeader from '../../../components/DashboardHeader';

function BlogList() {
    const { getApi, deleteApi } = useAPI();
    const [filteredBlog, setFilteredBlog] = useState([]);
    const [pagefound, setPageFound] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchInputRef = useRef(null);

    const { Search } = Input;
    const { Text } = Typography;

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalRows, setTotalRows] = useState(0);

    function formatDate(inputDate) {
        const dateObject = new Date(inputDate);

        // Get date, month name, and year
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();

        const month = dateObject.toLocaleString('default', { month: 'short' });

        // Get the month name based on the month index
        const monthName = month;

        return `${day} ${monthName} ${year}`
    }


    const columns = [
        {
            title: "Index",
            dataIndex: "rowNumber",
            key: "rowNumber",
            render: (text, record, index) => (
                <span>{totalRows - (currentPage - 1) * pageSize - index}</span>
            ),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            ...getColumnSearchProps("title", "Title"),
            render: (text, record) => (
                <Link to={`/admin/blog/${record.slug}`}>
                    {text}
                </Link>

            ),
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
            ...getColumnSearchProps("slug", "Slug"),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            ...getColumnSearchProps('category', 'Category'),
        },
        {
            title: "Post Date",
            dataIndex: "post_date",
            key: "post_date",
            ...getColumnSearchProps("post_date", "Post Date"),
            render: (text, record) => (
                <span>
                    {record.post_date ? (
                        record.post_date
                    ) : (
                        // Assuming createdAt is a valid field in your record
                        formatDate(record.createdAt)
                    )}
                </span>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <EditButton path={`/admin-blogs/${record._id}`} />
                    <DeleteButton
                        id={record._id}
                        setLoading={setLoading}
                        endpoint={`blog/delete/${record._id}`}
                        message="Deleted Blog Successfully"
                    />
                </Space>
            ),
        },
    ];

    function getColumnSearchProps(dataIndex, placeholder) {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Search
                        placeholder={`Search ${placeholder}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                        }
                        onSearch={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        enterButton
                        ref={(node) => {
                            searchInputRef.current = node;
                        }}
                    />
                    <Space>
                        <button
                            onClick={() => handleReset(clearFilters)}
                            style={{ width: 90 }}
                        >
                            Reset
                        </button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
            ),
            onFilter: (value, record) => {
                const formattedDate = record[dataIndex] ? record[dataIndex].toString() : "";
                const createdAt = record.createdAt ? formatDate(record.createdAt).toString() : "";

                return (
                    formattedDate.toLowerCase().includes(value.toLowerCase()) ||
                    createdAt.toLowerCase().includes(value.toLowerCase())
                );
            },
            onFilterDropdownOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInputRef.current?.select());
                }
            },
            render: (text) =>
                searchText ? <Text type="success">{text}</Text> : text,
        };
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const fetchBlog = async (url) => {
        try {
            const { data, error } = await getApi({ endpoint: url })
            console.log(data)
            if (data) {
                setLoading(true);
                if (data.length > 0) {
                    setFilteredBlog(data);
                    setTotalRows(data.length);
                } else {
                    setPageFound("Notfound");
                }
            }
            if (error) {
                alert(error?.response?.data?.message)
            }
        } catch (e) {
            alert(e?.response?.data?.message)
        } finally {
            setLoading(true);
        }
    };

    useEffect(() => {
        let API = `/api/v2/blogs/blogs-list`;
        fetchBlog(API);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className='dashboard-container'>
                <SideBar menu={sidebar_menu} />
                <div className='dashboard-content'>
                <div className="dashboard-header">
                    <h3>Products List</h3>
                    <div className="add-btn">
                        <DashboardHeader />
                        <div >
                            <Button type="primary" icon={<PlusOutlined />}>
                               <Link className='text-decoration-none' to='/add-blogs'> Add Blog</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                    <div className="custom-cursor__cursor" style={{ transform: 'translate3d(calc(492px - 50%), calc(172px - 50%), 0px)' }}></div>
                    <div className="custom-cursor__cursor-two" style={{ left: '591px', top: '181px' }}></div>
                    {loading ? (
                        <div>
                            {pagefound === "Notfound" ? (
                                <p>No Blogs are available</p>
                            ) : (
                                <Table
                                    dataSource={filteredBlog}
                                    columns={columns}
                                    resizeable
                                    onChange={handleTableChange}
                                    pagination={{ current: currentPage, pageSize: pageSize }} />
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    );
}



export default BlogList;
