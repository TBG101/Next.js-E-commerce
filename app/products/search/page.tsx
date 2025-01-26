import SearchPage from '@/app/components/SearchPage'
import React from 'react'

function Search() {
    return (
        <main className="flex flex-col justify-center items-center w-full min-w-[375px] overflow-auto transition-all duration-300 ease-in-out">
            <SearchPage />
        </main>
    )
}

export default Search