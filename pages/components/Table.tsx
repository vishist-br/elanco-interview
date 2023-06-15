
import { useEffect, useState } from 'react';
import { sendRequest } from '../api/ElancoClient';


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
}


export default function Table() {
  const [data, setData] = useState<TableRow[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await sendRequest<TableRow[]>({
        url: '/applications/Macao', // Replace with your API endpoint
        method: 'GET',
      });
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Cost</th>
          <th className="py-2 px-4 border-b">Resource Group</th>
          <th className="py-2 px-4 border-b">Location</th>
          {/* Add more table headers as needed */}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.InstanceId}>
            <td className="py-2 px-4 border-b">{row.Date}</td>
            <td className="py-2 px-4 border-b">{row.Cost}</td>
            <td className="py-2 px-4 border-b">{row.ResourceGroup}</td>
            <td className="py-2 px-4 border-b">{row.Location}</td>
            {/* Add more table cells as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
