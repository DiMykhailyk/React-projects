import React from "react";
import MySelect from "../components/UI/select/MySelect";
import MyInput from "../components/UI/input/MyInput";

const PostsFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput
                placeholder="Search..."
                value={filter.query}
                onChange={(e => setFilter({...filter, query: e.target.value}))}
            />
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="sorting"
                options={[
                    { value: 'title', name: 'by name' },
                    { value: 'body', name: 'by description' }
                ]}
            />
        </div>
    )
}

export default PostsFilter;