const users = [{
    id: 1,
    name: 'John Doe',
    email: 'johnDoe@testmail.com',
    password: 'password123',
    role: 'admin'
},{
    id: 2,
    name: 'Jane Smith',
    email: 'janeSmith@testmail.com',
    password: 'password456',
    role: 'user'
},{
    id: 3,
    name: 'Alice Johnson',
    email: 'aliceJohnson@testmail.com',
    password: 'password789',
    role: 'user'
}]

const process = [{
    id: 1,
    name: 'Process 1',
    status: 'active',
    date: '2023-10-01',
    subscribers : [2, 3]
},{
    id: 2,
    name: 'Process 2',
    status: 'inactive',
    date: '2023-10-02',
    subscribers : [3]
},{
    id: 3,
    name: 'Process 3',
    status: 'active',
    date: '2023-10-03',
    subscribers : [2]
}]

module.exports = { users, process };