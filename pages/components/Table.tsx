// Imports
"use client"
import { useEffect, useState, useMemo } from 'react';
import { sendRequest } from '../api/ElancoClient';
import DataTable from "react-data-table-component";


// Interface
interface TableRow {
    ConsumedQuantity: string;
    Cost: string;
    Date: string;
    InstanceId: string;
    MeterCategory: string;
    ResourceGroup: string;
    ResourceLocation: string;
    Tags: {
        'app-name': string;
        environment: string;
        'business-unit': string;
    };
    UnitOfMeasure: string;
    Location: string;
    ServiceName: string;
    [key: string]: string | Record<string, string>;
}

export default function Table() {

    // Constants Variables
    const [searchText, setSearchText] = useState<string>('');
    const [filterDate, setFilterDate] = useState<TableRow[]>([]);
    const [data, setData] = useState<TableRow[]>([]);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const columns: any = useMemo(
        () => [
            {
                name: 'Date',
                selector: 'Date',
                sortable: true,
            },
            {
                name: 'Cost',
                selector: 'Cost',
                sortable: true,
            },
            {
                name: 'Resource Group',
                selector: 'ResourceGroup',
                sortable: true,
                wrap: true,
                width: '150px'
            },
            {
                name: 'Resource Location',
                selector: 'ResourceLocation',
                sortable: true,
                width: '160px'
            },
            {
                name: 'Location',
                selector: 'Location',
                sortable: true
            },
            {
                name: 'Service Name',
                selector: 'ServiceName',
                sortable: true,
                maxWidth: '200px'
            },
            {
                name: 'Tags',
                selector: 'Tags',
                sortable: true,
                width: '450px',
                cell: (row: TableRow) => (
                    <div>
                        <span className="bg-blue-500 text-white rounded-full px-2 py-1 mr-2">
                            {row.Tags['app-name']}
                        </span>
                        <span className="bg-yellow-500 text-white rounded-full px-2 py-1 mr-2">
                            {row.Tags.environment}
                        </span>
                        <span className="bg-gray-500 text-white rounded-full px-2 py-1 mr-2">
                            {row.Tags['business-unit']}
                        </span>
                    </div>
                ),
            },
            {
                name: 'Consumed Quantity',
                selector: 'ConsumedQuantity',
                sortable: true,
                width: '180px'
            },
            {
                name: 'Unit Of Measure',
                selector: 'UnitOfMeasure',
                sortable: true,
                width: '180px'
            },

            {
                name: 'Meter Category',
                selector: 'MeterCategory',
                sortable: true,
                width: '150px'
            },
            {
                name: 'Instance Id',
                selector: 'InstanceId',
                sortable: true,
                width: '400px'
            },
        ],
        []
    );
    const options: { value: string; label: string }[] = useMemo(() => {
        return columns.map((key) => ({ value: key.selector, label: key.name })).filter((key) => (key.value !== 'Tags'));
    }, []);




    // PreRender Functions
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await sendRequest<TableRow[]>({
                url: '/raw', // Replace with your API endpoint
                method: 'GET',
            });
            setData(result);
            setFilterDate(result)
        } catch (error) {
            console.error(error);
        }
    };



    // Handler Functions
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleFilter = () => {
        const filtered = data.filter((item) => {
            if (selectedValue !== 'Select Column' && searchText !== '') {
                return String(item[selectedValue]).toLowerCase() === String(searchText).toLowerCase();
            } else {
                return true;
            }
        });
        setFilterDate(filtered);
        if (selectedValue == 'Select Column' && searchText == '') {
            setFilterDate(data);
        }
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value)
        setSelectedValue(event.target.value);
    };



    // JSX
    return (
        <div className='border border-black-600 overflow-auto'>
            <div className="flex items-center">

                <div className="relative w-full lg:max-w-sm">
                    <select value={selectedValue} onChange={handleSelectChange} className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                        <option>Select Column</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Filter Column Data"
                    value={searchText}
                    onChange={handleSearch}
                />
                <button onClick={handleFilter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Search
                </button>
            </div>

            <DataTable
                columns={columns}
                data={filterDate}
                striped={true}
                highlightOnHover={true}
                pagination={true}
            />
        </div>
    )
}
