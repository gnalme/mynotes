import { Select, Input, Space  } from 'antd';
import Search from 'antd/es/transfer/search';

export default function Filters({filter, setFilter}) {
    return (
        <div className='gap-y-10'>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Input placeholder='Search' onChange={(e) => setFilter({...filter, search: e.target.value})}/>
              <Select
                defaultValue="Filters"
                style={{ width: '100%' }}
                onChange={(e) => setFilter({...filter, sortOrder: e.target.value})}
                options={[
                  { value: "desc", label: 'New first' },
                  { value: "asc", label: 'Old first' }
                ]}
              />
            </Space>
          </div>
    )
}