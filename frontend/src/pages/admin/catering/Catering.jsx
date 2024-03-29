/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Input, Space, Table, Typography } from 'antd';
import DashboardHeader from '../../../components/DashboardHeader';
import SideBar from '../../../components/Sidebar';
import sidebar_menu from '../../../constants/sidebar-menu';
import { server } from '../../../server';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SearchOutlined } from "@ant-design/icons";


function Catering() {

    const { Search } = Input;
    const { Text } = Typography;

    const [filteredCatering, setFilteredCatering] = useState([]);
    const [pagefound, setPageFound] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const searchInputRef = useRef(null);

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


    const fetchcateringForm = async () => {
       try {
        const response  = await axios.get(`${server}/form/cateringform`)
            console.log(response)
            if (response.status === 200) {
                setLoading(true);
                if (response.data.caterings.length > 0) {
                    setFilteredCatering(response.data.caterings);
                    setTotalRows(response.data.caterings.length);
                } else {
                    setPageFound("Notfound");
                }
            } else {
                // toast.error(error?.response?.data?.message)
            }
       } catch (error) {
          console.log(error);
          toast.error(error);
       }
    };

    useEffect(() => {
        fetchcateringForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        // {
        //     title: "Index",
        //     dataIndex: "rowNumber",
        //     key: "rowNumber",
        //     render: (text, record, index) => (
        //         <span>{totalRows - (currentPage - 1) * pageSize - index}</span>
        //     ),
        // },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps("name", "Name"),
        },
        {
            title: "EmailID",
            dataIndex: "email",
            key: "email",
            ...getColumnSearchProps("email", "EmailID"),
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            ...getColumnSearchProps('phoneNumber', 'Phone Number'),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            ...getColumnSearchProps('category', 'Category'),
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            ...getColumnSearchProps('type', 'Type'),
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            ...getColumnSearchProps('date', 'Date'),
            render: (text, record) => (
                <span>
                    {record.date ? (
                        formatDate(record.date)
                    ) : (
                        // Assuming createdAt is a valid field in your record
                        ""
                    )}
                </span>
            ),
        },
        {
            title: "Location",
            dataIndex: "location",
            key: "location",
            ...getColumnSearchProps('location', 'Location'),
        },
        {
            title: "Pincode",
            dataIndex: "pincode",
            key: "pincode",
            ...getColumnSearchProps('pincode', 'Pincode'),
        },
        {
            title: "No Of People",
            dataIndex: "noOfPeople",
            key: "noOfPeople",
            ...getColumnSearchProps('noOfPeople', 'No Of People'),
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message",
            ...getColumnSearchProps('message', 'Message'),
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
                const createdAt = record.date ? formatDate(record.date).toString() : "";

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

    return (
        <div className='dashboard-container'>
        <SideBar menu={sidebar_menu}/>
         <div className='dashboard-content'>
            <div className="dashboard-header">
              
              <h3>Category List</h3>
              <div className="add-btn">
              <DashboardHeader/>
              
              </div>
          </div>
          {loading ? (
                        <div>
                            {pagefound === "Notfound" ? (
                                <p>No data are available</p>
                            ) : (
                                <Table
                                    dataSource={filteredCatering}
                                    columns={columns}
                                    resizeable
                                    onChange={handleTableChange}
                                    pagination={{ current: currentPage, pageSize: pageSize }}
                                />
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
        </div>
        </div>
    );
}

export default Catering;
