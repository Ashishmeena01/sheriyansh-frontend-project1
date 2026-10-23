import {useQuery } from '@tanstack/react-query'

import React from 'react'
import { getUsers } from '../api/usersApi'

function useUsersData() {

    const q = useQuery({
       queryFn:getUsers,
       queryKey:["userData"]
    })
    return q;
}

export default useUsersData
